const logger = require('../utils/logger');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Verify password
        // TODO: Generate JWT token
        // TODO: Save token to database
        
        res.status(200).json({ message: 'Đăng nhập thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check email exists
        // TODO: Hash password
        // TODO: Create user
        // TODO: Generate OTP
        // TODO: Send OTP email
        
        res.status(200).json({ message: 'Chờ mã xác nhận!' });

    } catch (error) {
        logger.error('Lỗi khi tạo tài khoản:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function confirmOTP(req, res) {
    const { email, otp } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check OTP valid
        // TODO: Check OTP expired
        // TODO: Activate user account
        // TODO: Generate JWT token
        
        res.status(200).json({ message: 'Xác nhận thành công!' });

    } catch (error) {
        logger.error('Lỗi khi xác nhận OTP:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function requestOTP(req, res) {
    const { email } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Generate new OTP
        // TODO: Send OTP email
        // TODO: Save OTP to database
        
        res.status(200).json({ message: 'Đã gửi mã OTP!' });

    } catch (error) {
        logger.error('Lỗi khi gửi OTP:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check OTP valid
        // TODO: Check OTP expired
        // TODO: Hash new password
        // TODO: Update user password
        // TODO: Invalidate all tokens
        
        res.status(200).json({ message: 'Đặt lại mật khẩu thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đặt lại mật khẩu:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function changeEmail(req, res) {
    const { uid, newEmail } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check user exists
        // TODO: Check new email not exists
        // TODO: Generate OTP for new email
        // TODO: Send OTP to new email
        
        res.status(200).json({ message: 'Chờ xác nhận email mới!' });

    } catch (error) {
        logger.error('Lỗi khi đổi email:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
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
        
        res.status(200).json({ message: 'Đổi mật khẩu thành công!' });

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
        
        res.status(200).json({ message: 'Đổi avatar thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đổi avatar:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function verifyToken(req, res) {
    const { uid, token, ipAddress, userAgent } = req.body;

    try {
        // TODO: Validate input
        // TODO: Verify JWT token
        // TODO: Check token not revoked
        // TODO: Check token not expired
        // TODO: Return user info
        
        res.status(200).json({ message: 'Token hợp lệ!' });

    } catch (error) {
        logger.error('Lỗi khi xác thực token:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function renewToken(req, res) {
    const { uid, refreshToken, ipAddress, userAgent } = req.body;

    try {
        // TODO: Validate input
        // TODO: Verify refresh token
        // TODO: Check token not revoked
        // TODO: Generate new access token
        // TODO: Generate new refresh token
        // TODO: Save new tokens to database
        
        res.status(200).json({ message: 'Làm mới token thành công!' });

    } catch (error) {
        logger.error('Lỗi khi làm mới token:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function logout(req, res) {
    const { uid, token } = req.body;

    try {
        // TODO: Validate input
        // TODO: Revoke token in database
        // TODO: Clear session if any
        
        res.status(200).json({ message: 'Đăng xuất thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đăng xuất:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
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
    renewToken,
    logout,
}