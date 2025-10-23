const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require("../utils/errorHandler");
const userService = require('../services/user/user.services');

/**
 * Change user language preference
 * @route POST /api/user/change-lang
 */
async function changeLanguage(req, res) {
    const { uid, language } = req.body;

    try {
        const result = await userService.changeLanguage(uid, language);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in changeLanguage controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Change user theme preference
 * @route POST /api/user/change-theme
 */
async function changeTheme(req, res) {
    const { uid, theme } = req.body;

    try {
        const result = await userService.changeTheme(uid, theme);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in changeTheme controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
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

/**
 * Mark notifications as seen
 * @route POST /api/user/seen-notifications
 */
async function markNotificationsSeen(req, res) {
    const { uid, notificationID } = req.body;

    try {
        const result = await userService.markNotificationsSeen(uid, notificationID);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in markNotificationsSeen controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Delete user account (soft delete)
 * @route POST /api/user/delete-account
 */
async function deleteUserAccount(req, res) {
    const { uid, token } = req.body;

    try {
        const result = await userService.deleteUserAccount(uid, token);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in deleteUserAccount controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Reset password using OTP
 * @route POST /api/auth/reset-password
 */
async function resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;

    try {
        const result = await userService.resetPassword(email, otp, newPassword);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in resetPassword controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Change user email
 * @route POST /api/auth/change-email
 */
async function changeEmail(req, res) {
    const { uid, newEmail } = req.body;

    try {
        const result = await userService.changeEmail(uid, newEmail);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in changeEmail controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Change user password
 * @route POST /api/auth/change-password
 */
async function changePassword(req, res) {
    const { uid, oldPassword, newPassword } = req.body;

    try {
        const result = await userService.changePassword(uid, oldPassword, newPassword);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in changePassword controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Change user avatar
 * @route POST /api/auth/change-avatar
 */
async function changeAvatar(req, res) {
    const { uid, avatarData, formatFile } = req.body;

    try {
        const result = await userService.changeAvatar(uid, avatarData, formatFile);

        res.status(200).json({
            success: true,
            message: 'Đổi avatar thành công!',
            data: result
        });

    } catch (error) {
        logger.error('Error in changeAvatar controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
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
