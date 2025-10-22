const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require('../utils/errorHandler');
const authService = require('../services/auth/auth.services');

async function login(req, res) {
    const { email, password, rememberMe, jwtToken } = req.body;

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

        // Device info from request
        const deviceInfo = {
            device: jwtToken?.device || req.headers['user-agent'],
            userAgent: jwtToken?.user_agent || req.headers['user-agent'],
            ip: req.ip,
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
    const { email, password, fullName, confirm_password } = req.body;

    try {
        // Validation
        if (!email || !password || !fullName) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // Validate email
        if (!authService.validateEmail(email)) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_EMAIL_INVALID);
        }

        // Check password match
        if (password !== confirm_password) {
            return ErrorResponse.send(res, ErrorCodes.AUTH_PASSWORD_MISMATCH);
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

        // TODO: Check email exists
        // TODO: Hash password
        // TODO: Create user
        // TODO: Generate OTP
        // TODO: Send OTP email
        
        res.status(200).json({
            success: true,
            message: 'Chờ mã xác nhận!'
        });

    } catch (error) {
        logger.error('Lỗi khi tạo tài khoản:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}

async function confirmOTP(req, res) {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // TODO: Validate input
        // TODO: Check OTP valid
        // if (!isValidOTP) {
        //     return ErrorResponse.send(res, ErrorCodes.AUTH_OTP_INVALID);
        // }

        // TODO: Check OTP expired
        // if (isExpired) {
        //     return ErrorResponse.send(res, ErrorCodes.AUTH_OTP_EXPIRED);
        // }

        // TODO: Activate user account
        // TODO: Generate JWT token
        
        res.status(200).json({
            success: true,
            message: 'Xác nhận thành công!'
        });

    } catch (error) {
        logger.error('Lỗi khi xác nhận OTP:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}

async function requestOTP(req, res) {
    const { email } = req.body;

    try {
        if (!email) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_EMAIL_INVALID);
        }

        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Generate new OTP
        // TODO: Send OTP email
        // TODO: Save OTP to database
        
        res.status(200).json({
            success: true,
            message: 'Đã gửi mã OTP!'
        });

    } catch (error) {
        logger.error('Lỗi khi gửi OTP:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}

async function resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;

    try {
        if (!email || !otp || !newPassword) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // TODO: Validate input
        // TODO: Check OTP valid
        // TODO: Check OTP expired
        // TODO: Hash new password
        // TODO: Update user password
        // TODO: Invalidate all tokens
        
        res.status(200).json({
            success: true,
            message: 'Đặt lại mật khẩu thành công!'
        });

    } catch (error) {
        logger.error('Lỗi khi đặt lại mật khẩu:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}

async function changeEmail(req, res) {
    const { uid, newEmail } = req.body;

    try {
        if (!uid || !newEmail) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_REQUIRED_FIELD);
        }

        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Check new email not exists
        // TODO: Update email

        res.status(200).json({
            success: true,
            message: 'Đổi email thành công!'
        });
    } catch (error) {
        logger.error('Lỗi khi đổi email:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}

async function changePassword(req, res) {
    const { uid, oldPassword, newPassword } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Verify old password
        // TODO: Hash new password
        // TODO: Update user password
        // TODO: Invalidate all tokens except current
        
        res.status(200).json({
            success: true,
            message: 'Đổi mật khẩu thành công!'
        });

    } catch (error) {
        logger.error('Lỗi khi đổi mật khẩu:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function changeAvatar(req, res) {
    const { uid, avatarData, formatFile } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Upload avatar to storage
        // TODO: Update user avatar_url
        
        res.status(200).json({
            success: true,
            message: 'Đổi avatar thành công!'
        });

    } catch (error) {
        logger.error('Lỗi khi đổi avatar:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
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

        // Verify refresh token
        const decoded = authService.verifyRefreshToken(token);

        // Generate new tokens
        const deviceInfo = {
            device: req.body.device || req.headers['user-agent'],
            userAgent: req.body.user_agent || req.headers['user-agent'],
        };

        const newToken = authService.generateToken(decoded.uid, deviceInfo);
        const newRefreshToken = authService.generateRefreshToken(decoded.uid, deviceInfo);

        res.status(200).json({
            success: true,
            message: 'Làm mới token thành công!',
            data: {
                token: newToken,
                refresh_token: newRefreshToken,
                expires_in: 3600,
            }
        });

    } catch (error) {
        logger.error('Lỗi khi làm mới token:', error);

        if (error.errorCode) {
            return ErrorResponse.send(res, error.errorCode, error.message);
        }

        return ErrorResponse.sendServerError(res, error);
    }
}

async function logout(req, res) {
    const { uid, token } = req.body;

    try {
        // TODO: Validate input
        // TODO: Revoke token in database
        // TODO: Clear session if any
        
        res.status(200).json({
            success: true,
            message: 'Đăng xuất thành công!'
        });

    } catch (error) {
        logger.error('Lỗi khi đăng xuất:', error);
        return ErrorResponse.sendServerError(res, error);
    }
}

module.exports = {
    login,
    signup,
    confirmOTP,
    requestOTP,
    resetPassword,
    changeEmail,
    changePassword,
    changeAvatar,
    verifyToken,
    refreshToken,
    logout,
};
