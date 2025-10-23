const userRepository = require('../../db/repositories/user.repository.prisma');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const { SUPPORTED_LANGUAGES, SUPPORTED_THEMES } = require('../../constants');
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
            // 1. Validate required fields
            if (!uid || !language) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and language are required');
            }

            // 2. Validate language value
            if (!SUPPORTED_LANGUAGES.includes(language)) {
                throw new AppError(
                    ErrorCodes.VALIDATION_INVALID_VALUE,
                    `Invalid language. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
                );
            }

            // 3. Validate user is active
            await this.validateUserActive(uid);

            // 4. Update language preference
            const updatedUser = await userRepository.updateLanguage(uid, language);

            logger.info(`User ${uid} changed language to ${language}`);

            return {
                uid: updatedUser.id,
                language: updatedUser.language,
            };

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
            // 1. Validate required fields
            if (!uid || !theme) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and theme are required');
            }

            // 2. Validate theme value
            if (!SUPPORTED_THEMES.includes(theme)) {
                throw new AppError(
                    ErrorCodes.VALIDATION_INVALID_VALUE,
                    `Invalid theme. Supported themes: ${SUPPORTED_THEMES.join(', ')}`
                );
            }

            // 3. Validate user is active
            await this.validateUserActive(uid);

            // 4. Update theme preference
            const updatedUser = await userRepository.updateTheme(uid, theme);

            logger.info(`User ${uid} changed theme to ${theme}`);

            return {
                uid: updatedUser.id,
                theme: updatedUser.theme,
            };

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
            // 1. Validate required fields
            if (!uid || !token) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and token are required');
            }

            // 2. Verify token
            const decoded = await jwtTokenService.validateToken(token);
            if (decoded.uid !== uid) {
                throw new AppError(ErrorCodes.AUTH_UNAUTHORIZED, 'Token does not match user ID');
            }

            // 3. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            if (user.is_deleted) {
                throw new AppError(ErrorCodes.USER_DELETED, 'Account already deleted');
            }

            // 4. Soft delete user account
            await userRepository.softDelete(uid);

            // 5. Revoke all tokens
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
            // 1. Validate required fields
            if (!uid || !newPassword) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and new password are required');
            }

            // 2. Find user by id
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 3. Validate password strength
            if (newPassword.length < 8) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Password must be at least 8 characters');
            }

            // 4. Hash new password
            const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
            const passwordHash = await bcrypt.hash(newPassword, salt);

            // 5. Update user password
            await userRepository.updatePassword(user.id, passwordHash);

            // 6. Revoke all existing tokens
            await jwtTokenService.revokeAllUserTokens(user.id);

            logger.info(`User ${user.id} reset password successfully`);

            return {
                uid: user.id,
                email: user.email,
            };

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
            // 1. Validate required fields
            if (!uid || !newEmail) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and new email are required');
            }

            // 2. Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newEmail)) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Invalid email format');
            }

            // 3. Validate user is active
            await this.validateUserActive(uid);

            // 4. Check if new email already exists
            const existingUser = await userRepository.findByEmail(newEmail);
            if (existingUser) {
                throw new AppError(ErrorCodes.AUTH_EMAIL_EXISTS, 'Email already in use');
            }

            // 5. Update email (will set is_verified to false)
            const updatedUser = await userRepository.updateEmail(uid, newEmail);


            logger.info(`User ${uid} changed email to ${newEmail}`);

            return {
                uid: updatedUser.id,
                email: updatedUser.email,
                verification_required: true,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing email:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change email');
        }
    }

    /**
     * Change user password
     * @param {string} uid - User ID
     * @param {string} oldPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Object} - Success response
     */
    async changePassword(uid, oldPassword, newPassword) {
        try {
            // 1. Validate required fields
            if (!uid || !oldPassword || !newPassword) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID, old password, and new password are required');
            }

            // 2. Find user with password hash
            const user = await userRepository.findByEmail((await userRepository.findById(uid)).email);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 3. Validate user is active
            if (user.is_disabled) {
                throw new AppError(ErrorCodes.AUTH_ACCOUNT_DISABLED, 'Account is disabled');
            }

            if (user.is_deleted) {
                throw new AppError(ErrorCodes.USER_DELETED, 'Account has been deleted');
            }

            // 4. Verify old password
            const isValidPassword = await bcrypt.compare(oldPassword, user.password_hash);
            if (!isValidPassword) {
                throw new AppError(ErrorCodes.AUTH_INVALID_CREDENTIALS, 'Current password is incorrect');
            }

            // 5. Validate new password strength
            if (newPassword.length < 8) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Password must be at least 8 characters');
            }

            // Check if new password is same as old password
            const isSamePassword = await bcrypt.compare(newPassword, user.password_hash);
            if (isSamePassword) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'New password must be different from current password');
            }

            // 6. Hash new password
            const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
            const passwordHash = await bcrypt.hash(newPassword, salt);

            // 7. Update user password
            await userRepository.updatePassword(uid, passwordHash);

            // 8. Optionally revoke all tokens (except current one)
            // This forces re-login on all other devices
            // await jwtTokenService.revokeAllUserTokens(uid);

            logger.info(`User ${uid} changed password successfully`);

            return {
                uid,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing password:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change password');
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
            // 1. Validate required fields
            if (!uid || !avatarData || !formatFile) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID, avatar data, and format are required');
            }

            // 2. Validate user is active
            await this.validateUserActive(uid);

            // 3. Upload avatar using file service
            const uploadResult = await fileService.uploadAvatar(uid, avatarData, formatFile);

            // 4. Update user avatar URL in database
            const updatedUser = await userRepository.updateAvatar(uid, uploadResult.url);

            logger.info(`User ${uid} changed avatar to ${uploadResult.url}`);

            return {
                uid: updatedUser.id,
                avatar_url: updatedUser.avatar_url,
                filename: uploadResult.filename,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error changing avatar:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to change avatar');
        }
    }

    /**
     * Validate user exists and is active
     * @param {string} uid - User ID
     * @returns {Object} - User data
     * @private
     */
    async validateUserActive(uid) {
        const user = await userRepository.findById(uid);

        if (!user) {
            throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
        }

        if (user.is_disabled) {
            throw new AppError(ErrorCodes.AUTH_ACCOUNT_DISABLED, 'Account is disabled');
        }

        if (user.is_deleted) {
            throw new AppError(ErrorCodes.USER_DELETED, 'Account has been deleted');
        }

        return user;
    }
}

module.exports = new UserService();
