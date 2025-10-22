const logger = require('../utils/logger');
const {ErrorResponse, ErrorCodes} = require("../utils/errorHandler");

async function changeLanguage(req, res) {
    const { uid, language } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check language is supported (vi, en)
        // TODO: Update user language preference

        res.status(200).json({ message: 'Đổi ngôn ngữ thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đổi ngôn ngữ:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function changeTheme(req, res) {
    const { uid, theme } = req.body;

    try {
        // TODO: Validate input
        // TODO: Check theme is valid (light, dark, system)
        // TODO: Update user theme preference

        res.status(200).json({ message: 'Đổi giao diện thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đổi giao diện:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

/**
 * allergies (Array of Ingredient): List of ingredients the user is allergic to
*/
async function changeAllergyInfo(req, res) {
    const { uid, allergies } = req.body;

    try {
        // TODO: Validate input
        // TODO: Update user allergy information
        // TODO: Save to database

        res.status(200).json({ message: 'Cập nhật thông tin dị ứng thành công!' });

    } catch (error) {
        logger.error('Lỗi khi cập nhật thông tin dị ứng:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function getUserProfile(req, res) {
    const { uid, senderID } = req.body;

    try {
        // TODO: Validate input
        // TODO: Get user profile from database
        // TODO: Check privacy settings
        // TODO: Return user profile data

        res.status(200).json({ message: 'Lấy thông tin hồ sơ thành công!' });

    } catch (error) {
        logger.error('Lỗi khi lấy thông tin hồ sơ:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function markNotificationsSeen(req, res) {
    const { uid, notificationID } = req.body;

    try {
        // TODO: Validate input
        // TODO: Update notifications as seen
        // TODO: Update seen_at timestamp

        res.status(200).json({ message: 'Đánh dấu thông báo đã xem thành công!' });

    } catch (error) {
        logger.error('Lỗi khi đánh dấu thông báo:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function deleteUserAccount(req, res) {
    const { uid, token } = req.body;

    try {
        // TODO: Validate input
        // TODO: Verify password
        // TODO: Check confirm text matches
        // TODO: Soft delete user account
        // TODO: Revoke all tokens
        // TODO: Schedule data deletion after grace period

        res.status(200).json({ message: 'Xóa tài khoản thành công!' });

    } catch (error) {
        logger.error('Lỗi khi xóa tài khoản:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
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

async function showUserNotebook(req, res) {
    const { uid } = req.body;

    try {
        // TODO: Validate input
        // TODO: Get user's saved posts from notebook
        // TODO: Return notebook posts

        res.status(200).json({ message: 'Lấy sổ tay thành công!' });

    } catch (error) {
        logger.error('Lỗi khi lấy sổ tay:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function overviewUserMealPlans(req, res) {
    const { uid } = req.body;

    try {
        // TODO: Validate input
        // TODO: Get user's meal plans from MongoDB
        // TODO: Return meal plans overview

        res.status(200).json({ message: 'Lấy danh sách kế hoạch bữa ăn thành công!' });

    } catch (error) {
        logger.error('Lỗi khi lấy danh sách kế hoạch bữa ăn:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function showUserMealPlans(req, res) {
    const { uid, mealPlanID } = req.body;

    try {
        // TODO: Validate input
        // TODO: Get user's meal plans from MongoDB
        // TODO: Filter by date range if provided
        // TODO: Return meal plans

        res.status(200).json({ message: 'Lấy kế hoạch bữa ăn thành công!' });

    } catch (error) {
        logger.error('Lỗi khi lấy kế hoạch bữa ăn:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

async function getFollowList(req, res) {
    const { uid } = req.body;

    try {
        // TODO: Validate input
        // TODO: Get user's follow list from PostgreSQL
        // TODO: Return follow list

        res.status(200).json({ message: 'Lấy danh sách theo dõi thành công!' });

    } catch (error) {
        logger.error('Lỗi khi lấy danh sách theo dõi:', error);
        res.status(500).json({ message: 'Lỗi hệ thống!', error });
    }
}

module.exports = {
    changeLanguage,
    changeTheme,
    changeAllergyInfo,
    getUserProfile,
    markNotificationsSeen,
    deleteUserAccount,
    resetPassword,
    changeEmail,
    changePassword,
    changeAvatar,
    showUserNotebook,
    overviewUserMealPlans,
    showUserMealPlans,
    getFollowList
};

