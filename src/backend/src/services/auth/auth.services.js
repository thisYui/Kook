const bcrypt = require('bcryptjs');
const userRepository = require('../../db/repositories/user.repository.prisma');
const jwtTokenService = require('./jwtToken.service');
const { ErrorCodes } = require('../../utils/errorHandler');
const { AppError } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Auth Service
 * Handles authentication business logic
 */

class AuthService {
    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {boolean} rememberMe - Remember me option
     * @param {Object} deviceInfo - Device information (platform, userAgent, ip)
     * @returns {Object} - User data and token (only if rememberMe is true)
     */
    async login(email, password, rememberMe = false, deviceInfo = {}) {
        try {
            // 1. Validate input
            if (!email || !password) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'Email and password are required');
            }

            // 2. Find user by email
            const user = await userRepository.findByEmail(email);
            if (!user) {
                logger.warn(`Login attempt with non-existent email: ${email}`);
                throw new AppError(ErrorCodes.AUTH_EMAIL_NOT_FOUND);
            }

            // 3. Check if account is verified
            if (!user.is_verified) {
                throw new AppError(ErrorCodes.AUTH_ACCOUNT_NOT_VERIFIED);
            }

            // 4. Check if account is disabled
            if (user.is_disabled) {
                throw new AppError(ErrorCodes.AUTH_ACCOUNT_DISABLED);
            }

            // 5. Verify password (use password_hash from schema)
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                logger.warn(`Failed login attempt for user: ${email}`);
                throw new AppError(ErrorCodes.AUTH_INVALID_CREDENTIALS);
            }

            // 6. Update last login time
            await userRepository.updateLastLogin(user.id);

            // 7. Return user data (exclude password_hash)
            const { password_hash: _, ...userWithoutPassword } = user;

            // 8. Prepare response based on rememberMe option
            const response = {
                success: true,
                uid: user.id,
                user: userWithoutPassword,
                remember_me: rememberMe
            };

            // 9. Only generate and send tokens if rememberMe is true
            if (rememberMe) {
                // Create token pair (access + refresh) using JWT service
                const tokenPair = await jwtTokenService.createTokenPair(user.id, deviceInfo);

                response.token = tokenPair.accessToken;
                response.refresh_token = tokenPair.refreshToken;
                response.expires_in = tokenPair.expiresIn;

                logger.info(`User logged in successfully with token: ${email}`);
            } else {
                logger.info(`User logged in successfully without token (session only): ${email}`);
            }

            return response;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            logger.error('Login error:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Login failed');
        }
    }

    /**
     * Logout user - revoke token
     * @param {string} jti - JWT ID
     * @returns {Object} - Success response
     */
    async logout(jti) {
        try {
            if (!jti) {
                return { success: true, message: 'No token to revoke' };
            }

            await jwtTokenService.revokeToken(jti);
            return { success: true, message: 'Logged out successfully' };
        } catch (error) {
            logger.error('Logout error:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Logout failed');
        }
    }

    /**
     * Refresh access token
     * @param {string} refreshToken - Refresh token
     * @param {Object} deviceInfo - Device information
     * @returns {Object} - New access token
     */
    async refreshToken(refreshToken, deviceInfo = {}) {
        try {
            return await jwtTokenService.refreshAccessToken(refreshToken, deviceInfo);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Refresh token error:', error);
            throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_INVALID, 'Failed to refresh token');
        }
    }

    /**
     * Verify password
     * @param {string} plainPassword - Plain text password
     * @param {string} hashedPassword - Hashed password from database
     * @returns {boolean}
     */
    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    /**
     * Hash password
     * @param {string} password - Plain text password
     * @returns {string} - Hashed password
     */
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    /**
     * Verify JWT token
     * @param {string} token - JWT token
     * @returns {Object} - Decoded token payload
     */
    async verifyToken(token) {
        return await jwtTokenService.validateToken(token);
    }

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {Object} - Validation result
     */
    validatePasswordStrength(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const isValid = password.length >= minLength &&
                       hasUpperCase &&
                       hasLowerCase &&
                       hasNumbers;

        return {
            isValid,
            errors: {
                minLength: password.length < minLength,
                hasUpperCase: !hasUpperCase,
                hasLowerCase: !hasLowerCase,
                hasNumbers: !hasNumbers,
                hasSpecialChar: !hasSpecialChar,
            }
        };
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = new AuthService();
