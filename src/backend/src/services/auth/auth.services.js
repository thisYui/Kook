const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/user.repository.prisma');
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
     * @param {Object} deviceInfo - Device information (platform, userAgent)
     * @returns {Object} - User data and token
     */
    async login(email, password, deviceInfo = {}) {
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

            // 5. Check login attempts (rate limiting)
            if (user.login_attempts >= 5) {
                const lastAttempt = new Date(user.last_login_attempt);
                const now = new Date();
                const diffMinutes = (now - lastAttempt) / 1000 / 60;

                // Block for 15 minutes after 5 failed attempts
                if (diffMinutes < 15) {
                    throw new AppError(
                        ErrorCodes.AUTH_TOO_MANY_ATTEMPTS,
                        `Too many login attempts. Please try again in ${Math.ceil(15 - diffMinutes)} minutes`
                    );
                }
                // Reset attempts after 15 minutes
                await userRepository.resetLoginAttempts(user.id);
            }

            // 6. Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                // Increment failed login attempts
                await userRepository.incrementLoginAttempts(user.id);

                logger.warn(`Failed login attempt for user: ${email}`);
                throw new AppError(ErrorCodes.AUTH_INVALID_CREDENTIALS);
            }

            // 7. Reset login attempts on successful login
            await userRepository.resetLoginAttempts(user.id);

            // 8. Update last login time
            await userRepository.updateLastLogin(user.id);

            // 9. Generate JWT token
            const token = this.generateToken(user.id, deviceInfo);
            const refreshToken = this.generateRefreshToken(user.id, deviceInfo);

            // 10. Return user data (exclude password)
            const { password: _, ...userWithoutPassword } = user;

            logger.info(`User logged in successfully: ${email}`);

            return {
                success: true,
                token,
                refresh_token: refreshToken,
                expires_in: 3600, // 1 hour
                user: userWithoutPassword,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Login error:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Login failed');
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
     * Generate JWT access token
     * @param {number} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {string} - JWT token
     */
    generateToken(userId, deviceInfo = {}) {
        const payload = {
            uid: userId,
            type: 'access',
            device: deviceInfo.device || 'unknown',
            userAgent: deviceInfo.userAgent || 'unknown',
            iat: Math.floor(Date.now() / 1000),
        };

        return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1h', // 1 hour
        });
    }

    /**
     * Generate JWT refresh token
     * @param {number} userId - User ID
     * @param {Object} deviceInfo - Device information
     * @returns {string} - Refresh token
     */
    generateRefreshToken(userId, deviceInfo = {}) {
        const payload = {
            uid: userId,
            type: 'refresh',
            device: deviceInfo.device || 'unknown',
            userAgent: deviceInfo.userAgent || 'unknown',
            iat: Math.floor(Date.now() / 1000),
        };

        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key', {
            expiresIn: '7d', // 7 days
        });
    }

    /**
     * Verify JWT token
     * @param {string} token - JWT token
     * @returns {Object} - Decoded token payload
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new AppError(ErrorCodes.AUTH_TOKEN_EXPIRED);
            }
            throw new AppError(ErrorCodes.AUTH_INVALID_TOKEN);
        }
    }

    /**
     * Verify refresh token
     * @param {string} token - Refresh token
     * @returns {Object} - Decoded token payload
     */
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_EXPIRED);
            }
            throw new AppError(ErrorCodes.AUTH_REFRESH_TOKEN_INVALID);
        }
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

