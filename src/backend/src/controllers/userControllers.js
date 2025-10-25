const logger = require('../utils/logger');
const { ErrorResponse, ErrorCodes } = require("../utils/errorHandler");
const userService = require('../services/user/user.services');
const notificationService = require('../services/user/notification.services');
const followService = require('../services/user/follow.services');
const notebookService = require('../services/user/notebook.services');
const mealPlanService = require('../services/user/mealPlan.services');
const userAllergyService = require('../services/user/userAllergy.services');

/**
 * Change user language preference
 * @route POST /api/user/change-lang
 */
async function changeLanguage(req, res) {
    const { uid, language } = req.body;

    try {
        if (!uid || !language) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and language are required');
        }

        const result = await userService.changeLanguage(uid, language);

        res.status(200).json({ success: true });

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
        if (!uid || !theme) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and theme are required');
        }

        const result = await userService.changeTheme(uid, theme);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Error in changeTheme controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Get user allergies
 * @route POST /api/users/allergies
 */
async function getUserAllergies(req, res) {
    const { uid } = req.body;

    try {
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        const result = await userAllergyService.getUserAllergies(uid);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in getUserAllergies controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Add allergy to user
 * @route POST /api/users/add-allergy
 */
async function addAllergy(req, res) {
    const { uid, ingredient_key } = req.body;

    try {
        if (!uid || !ingredient_key) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and ingredient_key are required');
        }

        await userAllergyService.addAllergy(uid, ingredient_key);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Error in addAllergy controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Delete allergy from user
 * @route DELETE /api/users/delete-allergy
 */
async function deleteAllergy(req, res) {
    const { uid, ingredient_key } = req.body;

    try {
        if (!uid || !ingredient_key) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and ingredient_key are required');
        }

        await userAllergyService.deleteAllergy(uid, ingredient_key);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Error in deleteAllergy controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

async function getUserProfile(req, res) {
    const { uid } = req.body;

    try {
        // Validate input
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        // Get user profile from service
        const result = await userService.getUserProfile(uid);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in getUserProfile controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Mark notifications as seen
 * @route POST /api/user/seen-notifications
 */
async function markNotificationsSeen(req, res) {
    const { uid, notificationID } = req.body;

    try {
        if (!uid || !notificationID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and notificationID are required');
        }

        await notificationService.markNotificationsSeen(uid, notificationID);

        res.status(200).json({ success: true });

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
    const { uid } = req.body;

    try {
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and token are required');
        }

        // Token đã được validate bởi authenticateToken middleware
        // req.user và req.token đã được attach bởi middleware

        if (!req.token || !req.token.jti) {
            // Nếu không có token info (không nên xảy ra vì đã qua middleware)
            return ErrorResponse.send(res, ErrorCodes.UNAUTHORIZED, 'Invalid token');
        }

        await userService.deleteUserAccount(uid, req.token.jti);

        res.status(200).json({ success: true });

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
    const { uid, newPassword } = req.body;

    try {
        if (!uid || !newPassword) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and newPassword are required');
        }

        const result = await userService.resetPassword(uid, newPassword);

        res.status(200).json({ success: true });

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
        if (!uid || !newEmail) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) and newEmail are required');
        }

        const result = await userService.changeEmail(uid, newEmail);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Error in changeEmail controller:', error);
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
        if (!uid || !avatarData || !formatFile) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid), avatarData, and formatFile are required');
        }

        const result = await userService.changeAvatar(uid, avatarData, formatFile);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Error in changeAvatar controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/** * Overview notebook (saved posts)
 * @route POST /api/users/overview-notebook
 */
async function overviewNoteBook(req, res) {
    const { uid, limit, offset } = req.body;

    try {
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        const result = await notebookService.overviewNoteBook(uid, { limit, offset });

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        logger.error('Error in overviewNoteBook controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Show user notebook (saved posts)
 * @route POST /api/users/show-user-notebook
 */
async function showPostNotebook(req, res) {
    const { postID } = req.body;

    try {
        if (!postID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Post ID (postID) is required');
        }

        // TODO: Call function in viewPost
        const result = null;

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in showUserNotebook controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Overview user meal plans
 * @route POST /api/users/overview-user-meal-plans
 */
async function overviewUserMealPlans(req, res) {
    const { uid, limit, offset, activeOnly } = req.body;

    try {
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        const result = await mealPlanService.overviewUserMealPlans(uid, { limit, offset, activeOnly });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in overviewUserMealPlans controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Show user meal plan details
 * @route POST /api/users/show-user-meal-plans
 */
async function showUserMealPlans(req, res) {
    const { uid, mealPlanID } = req.body;

    try {
        if (!uid || !mealPlanID) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        const result = await mealPlanService.showUserMealPlans(uid, mealPlanID);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in showUserMealPlans controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Get user's followers (people who follow this user)
 * @route POST /api/users/get-followers
 */
async function getFollowers(req, res) {
    const { uid, limit, offset } = req.body;

    try {
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        const result = await followService.getFollowers(uid, { limit, offset });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in getFollowers controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Get user's following (people this user follows)
 * @route POST /api/users/get-following
 */
async function getFollowing(req, res) {
    const { uid, limit, offset } = req.body;

    try {
        if (!uid) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'User ID (uid) is required');
        }

        const result = await followService.getFollowing(uid, { limit, offset });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in getFollowing controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Follow a user
 * @route POST /api/users/follow
 */
async function followUser(req, res) {
    const { follower_id, followee_id } = req.body;

    try {
        if (!follower_id || !followee_id) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Follower ID and Followee ID are required');
        }

        const result = await followService.followUser(follower_id, followee_id);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        logger.error('Error in followUser controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

/**
 * Unfollow a user
 * @route POST /api/users/unfollow
 */
async function unfollowUser(req, res) {
    const { follower_id, followee_id } = req.body;

    try {
        if (!follower_id || !followee_id) {
            return ErrorResponse.send(res, ErrorCodes.VALIDATION_ERROR, 'Follower ID and Followee ID are required');
        }

        const result = await followService.unfollowUser(follower_id, followee_id);

        res.status(200).json({ success: true });

    } catch (error) {
        logger.error('Error in unfollowUser controller:', error);
        return ErrorResponse.send(res, error.code || ErrorCodes.SERVER_ERROR, error.message);
    }
}

module.exports = {
    changeLanguage,
    changeTheme,
    getUserAllergies,
    addAllergy,
    deleteAllergy,
    getUserProfile,
    markNotificationsSeen,
    deleteUserAccount,
    resetPassword,
    changeEmail,
    changeAvatar,
    overviewNoteBook,
    showPostNotebook,
    overviewUserMealPlans,
    showUserMealPlans,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
};
