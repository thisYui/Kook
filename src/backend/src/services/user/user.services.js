const userRepository = require('../../db/repositories/postgres/user.repository.prisma');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const validateUtils = require('../../utils/validateUtils');
const bcrypt = require('bcryptjs');
const { BCRYPT_SALT_ROUNDS } = require('../../constants');
const jwtTokenService = require('../auth/jwtToken.service');
const fileService = require('./file.services');

/**
 * User Service
 * Handles user-related business logic
 */

class UserService {
    /**
     * Change user language preference
     * @param {string} uid - User ID
     * @param {string} language - Language code (vi, en)
     * @returns {Object} - Updated user data
     */
    async changeLanguage(uid, language) {
        try {
            // Validate language value
            validateUtils.validateLanguage(language);

            // Validate user is active
            await validateUtils.validateUserActiveById(userRepository.findById.bind(userRepository), uid);

            // Update language preference
            const updatedUser = await userRepository.updateLanguage(uid, language);

            logger.info(`User ${uid} changed language to ${language}`);

            return true;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing language:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change language');
        }
    }

    /**
     * Change user theme preference
     * @param {string} uid - User ID
     * @param {string} theme - Theme name (light, dark, system)
     * @returns {Object} - Updated user data
     */
    async changeTheme(uid, theme) {
        try {
            // Validate theme value
            validateUtils.validateTheme(theme);

            // Validate user is active
            await validateUtils.validateUserActiveById(userRepository.findById.bind(userRepository), uid);

            // Update theme preference
            const updatedUser = await userRepository.updateTheme(uid, theme);

            logger.info(`User ${uid} changed theme to ${theme}`);

            return true;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing theme:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change theme');
        }
    }

    /**
     * Delete user account (soft delete)
     * @param {string} uid - User ID
     * @param {string} token - JWT token (for verification)
     * @returns {Object} - Success response
     */
    async deleteUserAccount(uid, token) {
        try {
            // Verify token (business rule)
            const decoded = await jwtTokenService.validateToken(token);
            if (decoded.uid !== uid) {
                throw new AppError(ErrorCodes.AUTH_UNAUTHORIZED, 'Token does not match user ID');
            }

            // Validate user exists and check if not already deleted
            const user = await userRepository.findById(uid);
            validateUtils.validateUserActive(user);

            // Soft delete user account
            await userRepository.softDelete(uid);

            // Revoke all tokens
            await jwtTokenService.revokeAllUserTokens(uid);

            logger.info(`User ${uid} account deleted successfully`);

            return {
                uid,
                deleted_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error deleting user account:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to delete user account');
        }
    }

    /**
     * Reset password using OTP
     * @param {string} uid - User ID
     * @param {string} newPassword - New password
     * @returns {Object} - Success response
     */
    async resetPassword(uid, newPassword) {
        try {
            // Find and validate user
            const user = await validateUtils.validateUserActiveById(userRepository.findById.bind(userRepository), uid);

            // Validate password strength
            validateUtils.validatePassword(newPassword);

            // Hash new password
            const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
            const passwordHash = await bcrypt.hash(newPassword, salt);

            // Update user password
            await userRepository.updatePassword(user.id, passwordHash);

            // Revoke all existing tokens
            await jwtTokenService.revokeAllUserTokens(user.id);

            logger.info(`User ${user.id} reset password successfully`);

            return true;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error resetting password:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to reset password');
        }
    }

    /**
     * Change user email
     * @param {string} uid - User ID
     * @param {string} newEmail - New email address
     * @returns {Object} - Success response
     */
    async changeEmail(uid, newEmail) {
        try {
            // Validate email format
            validateUtils.validateEmail(newEmail);

            // Validate user is active
            await validateUtils.validateUserActiveById(userRepository.findById.bind(userRepository), uid);

            // Check if new email already exists
            const existingUser = await userRepository.findByEmail(newEmail);
            if (existingUser) {
                throw new AppError(ErrorCodes.AUTH_EMAIL_EXISTS, 'Email already in use');
            }

            // Update email (will set is_verified to false)
            await userRepository.updateEmail(uid, newEmail);

            logger.info(`User ${uid} changed email to ${newEmail}`);

            return true;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing email:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change email');
        }
    }

    /**
     * Change user avatar
     * @param {string} uid - User ID
     * @param {string} avatarData - Base64 encoded avatar data
     * @param {string} formatFile - File format (jpg, png, etc.)
     * @returns {Object} - Updated user data with avatar URL
     */
    async changeAvatar(uid, avatarData, formatFile) {
        try {
            // Validate user is active and get current user
            const currentUser = await validateUtils.validateUserActiveById(userRepository.findById.bind(userRepository), uid);

            // Delete old avatar if it exists and is not a default avatar
            if (currentUser.avatar_url) {
                const isDefaultAvatar = currentUser.avatar_url.includes('/uploads/system/') ||
                                       currentUser.avatar_url.includes('default_avatar');

                if (!isDefaultAvatar) {
                    try {
                        // Extract filename from URL (e.g., /api/file/uid/avatar_123.jpg -> avatar_123.jpg)
                        const urlParts = currentUser.avatar_url.split('/');
                        const oldFilename = urlParts[urlParts.length - 1];

                        // Delete old avatar file
                        await fileService.deleteFile(uid, oldFilename);
                        logger.info(`Deleted old avatar for user ${uid}: ${oldFilename}`);
                    } catch (deleteError) {
                        // Log error but don't fail the avatar change if delete fails
                        logger.warn(`Failed to delete old avatar for user ${uid}:`, deleteError.message);
                    }
                }
            }

            // Upload new avatar using file service
            const uploadResult = await fileService.uploadAvatar(uid, avatarData, formatFile);

            // Update user avatar URL in database
            await userRepository.updateAvatar(uid, uploadResult.url);

            logger.info(`User ${uid} changed avatar to ${uploadResult.url}`);

            return true;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing avatar:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change avatar');
        }
    }

    /**
     * Get user profile
     * @param {string} uid - User ID to get profile
     * @param {string} senderID - ID of user requesting the profile
     * @returns {Object} - User profile data with statistics
     */
    async getUserProfile(uid) {
        try {
            // Find user by ID and validate
            const user = await userRepository.findById(uid);
            validateUtils.validateUserActive(user);

            // Get user statistics
            const stats = await userRepository.getUserStats(uid);

            // Check if sender is following this user
            let isFollowing = false;
            if (senderID && senderID !== uid) {
                isFollowing = await userRepository.isFollowing(senderID, uid);
            }

            // Prepare response
            const profileData = {
                uid: user.id,
                name: user.name,
                avatar_url: user.avatar_url,
                bio: user.bio,
                role: user.role,
                is_verified: user.is_verified,
                created_at: user.created_at,
                stats: {
                    posts_count: stats.posts_count || 0,
                    followers_count: stats.followers_count || 0,
                    following_count: stats.following_count || 0,
                },
                is_following: isFollowing,
                is_own_profile: senderID === uid,
            };

            logger.info(`Viewed profile of user ${uid}`);

            return profileData;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting user profile:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get user profile');
        }
    }
}

module.exports = new UserService();
