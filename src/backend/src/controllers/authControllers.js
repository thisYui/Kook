const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');
const authService = require('../services/auth/auth.services');
const otpService = require('../services/auth/otp.services');
const userRepository = require('../db/repositories/postgres/user.repository.prisma');
const jwtTokenService = require('../services/auth/jwtToken.service');

async function login(req, res) {
    const { email, password, rememberMe } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return ErrorResponse.send(
                res,
                ErrorCodes.VALIDATION_REQUIRED_FIELD,
                'Email and password are required'
            );
        }

        // Validate email format
        if (!authService.validateEmail(email)) {
            return ErrorResponse.send(
                res,
                ErrorCodes.VALIDATION_EMAIL_INVALID,
                'Invalid email format'
            );
        }

        // Device info from request headers and IP
        const deviceInfo = {
            device: req.headers['user-agent'] || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            ip: req.ip || req.connection.remoteAddress || 'unknown',
        };

        // Call auth service
        const result = await authService.login(email, password, rememberMe, deviceInfo);

        // Return success response
        res.status(200).json(result);

    } catch (error) {
        logger.error('Login controller error:', error);

        // If it's an AppError, send it with the proper error code
        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message, error.details);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        // Validation
        if (!email || !password || !fullName) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // Validate email
        if (!authService.validateEmail(email)) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_EMAIL_INVALID);
        }

        // Validate password strength
        const passwordValidation = authService.validatePasswordStrength(password);
        if (!passwordValidation.isValid) {
            return ErrorResponse.send(
                res,
                ErrorCodes.AUTH_WEAK_PASSWORD,
                'Password is too weak',
                passwordValidation.errors
            );
        }

        // Check email exists
        const emailExists = await userRepository.existsByEmail(email);
        if (emailExists) {
            return ErrorResponse.send(res, ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS);
        }

        // Hash password
        const hashedPassword = await authService.hashPassword(password);

        // Create user (unverified)
        await userRepository.create({
            name: fullName,
            email: email,
            password_hash: hashedPassword,
            is_verified: false,
        });

        // Generate OTP
        const otpData = otpService.createOTP(email);

        // TODO: Send OTP email (implement email service later)
        logger.info(`OTP generated for ${email}: ${otpData.otp}`);

        res.status(201).json({
            success: true,
            data: {
                email: email,
                expires_in: otpData.expires_in,
            }
        });

    } catch (error) {
        logger.error('Signup error:', error);

        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message, error.details);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function confirmOTP(req, res) {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // Validate email format
        if (!authService.validateEmail(email)) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_EMAIL_INVALID);
        }

        // Verify OTP
        const isValid = otpService.verifyOTP(email, otp);

        if (!isValid) {
            return ErrorResponse.send(res, ErrorCodes.AUTH_OTP_INVALID);
        }

        // Find user by email
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return ErrorResponse.send(res, ErrorCodes.USER_NOT_FOUND);
        }

        // Activate user account
        await userRepository.verifyUser(user.id);

        // Generate JWT tokens for automatic login
        const deviceInfo = {
            userAgent: req.headers['user-agent'],
            ip: req.ip,
        };

        const tokenPair = await jwtTokenService.createTokenPair(user.id, deviceInfo);

        logger.info(`User verified successfully: ${email}`);

        res.status(200).json({
            success: true,
            data: {
                uid: user.id,
                token: tokenPair.accessToken,
                refresh_token: tokenPair.refreshToken,
                expires_in: tokenPair.expiresIn,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar_url: user.avatar_url,
                }
            }
        });

    } catch (error) {
        logger.error('Confirm OTP error:', error);

        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message, error.details);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function requestOTP(req, res) {
    const { email } = req.body;

    try {
        if (!email) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_EMAIL_INVALID);
        }

        // Validate email format
        if (!authService.validateEmail(email)) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_EMAIL_INVALID);
        }

        // Check user exists
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return ErrorResponse.send(res, ErrorCodes.USER_NOT_FOUND);
        }

        // Check if can resend OTP
        const canResend = otpService.canResendOTP(email);
        if (!canResend.can_resend) {
            return ErrorResponse.send(
                res,
                ErrorCodes.AUTH_OTP_RESEND_TOO_SOON,
                `Please wait ${canResend.seconds_left} seconds before requesting a new OTP.`,
                { seconds_left: canResend.seconds_left }
            );
        }

        // Generate new OTP
        const otpData = otpService.createOTP(email);

        // TODO: Send OTP email (implement email service later)
        logger.info(`OTP resent for ${email}: ${otpData.otp}`);

        res.status(200).json({
            success: true,
            data: {
                expires_in: otpData.expires_in,
            }
        });

    } catch (error) {
        logger.error('Request OTP error:', error);

        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message, error.details);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function verifyToken(req, res) {
    const { token } = req.body;

    try {
        if (!token) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // Verify token using auth service
        const decoded = authService.verifyToken(token);

        res.status(200).json({
            success: true,
            message: 'Token hợp lệ!',
            data: decoded
        });

    } catch (error) {
        logger.error('Lỗi khi xác thực token:', error);

        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function refreshToken(req, res) {
    const { token } = req.body;

    try {
        if (!token) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // Device info from request
        const deviceInfo = {
            userAgent: req.body.user_agent || req.headers['user-agent'],
            ip: req.ip || req.connection.remoteAddress || 'unknown',
        };

        // Use authService.refreshToken (which calls jwtTokenService internally)
        const result = await authService.refreshToken(token, deviceInfo);

        res.status(200).json({
            success: true,
            data: {
                token: result.token,
                expires_in: result.expiresIn,
            }
        });

    } catch (error) {
        logger.error('Refresh token error:', error);

        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function logout(req, res) {
    try {
        // Token đã được validate bởi authenticateToken middleware
        // req.user và req.token đã được attach bởi middleware

        if (!req.token || !req.token.jti) {
            // Nếu không có token info (không nên xảy ra vì đã qua middleware)
            // Even on error, return success for better UX
            // User wants to logout anyway
            return res.status(200).json({
                success: true
            });
        }

        // Revoke the token using JTI from middleware
        await authService.logout(req.token.jti);
        logger.info(`User logged out and token revoked: ${req.user.id}`);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Logout error:', error);

        // Even on error, return success for better UX
        // User wants to logout anyway
        res.status(200).json({
            success: true
        });
    }
}

module.exports = {
    login,
    signup,
    confirmOTP,
    requestOTP,
    verifyToken,
    refreshToken,
    logout,
};
