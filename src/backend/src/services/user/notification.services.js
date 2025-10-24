const userRepository = require('../../db/repositories/user.repository.prisma');
const notificationRepository = require('../../db/repositories/notification.repository');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Notification Service
 * Handles notification-related business logic
 */

class NotificationService {
    /**
     * Create a new notification
     * @param {string} uid - User ID
     * @param {string} type - Notification type
     * @param {string} title - Notification title
     * @param {string} content - Notification content
     * @returns {Object} - Created notification
     */
    async createNotification(uid, type, title, content) {
        try {
            // Validate user exists and is active (business rule)
            await this.validateUserActive(uid);

            // Create notification
            const notification = await notificationRepository.create(uid, type, title, content);

            logger.info(`Notification created for user ${uid}: ${notification.id}`);

            return {
                success: true,
                notification_id: notification.id,
                user_id: notification.user_id,
                type: notification.type,
                title: notification.title,
                content: notification.content,
                is_read: notification.is_read,
                created_at: notification.created_at,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error creating notification:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to create notification');
        }
    }

    /**
     * Mark notification as read (seen)
     * @param {string} uid - User ID
     * @param {string} notificationID - Notification ID
     * @returns {Object} - Success response
     */
    async markNotificationsSeen(uid, notificationID) {
        try {
            // Validate user exists and is active (business rule)
            await this.validateUserActive(uid);

            // Check if notification belongs to user (business rule)
            const belongsToUser = await notificationRepository.belongsToUser(notificationID, uid);
            if (!belongsToUser) {
                throw new AppError(ErrorCodes.AUTH_UNAUTHORIZED, 'Notification does not belong to user');
            }

            // Mark notification as read
            const updatedNotification = await notificationRepository.markAsRead(notificationID);

            logger.info(`User ${uid} marked notification ${notificationID} as seen`);

            return {
                success: true,
                notification_id: updatedNotification.id,
                is_read: updatedNotification.is_read,
                read_at: updatedNotification.updated_at,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error marking notification as seen:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to mark notification as seen');
        }
    }

    /**
     * Validate user exists and is active
     * @param {string} uid - User ID
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

module.exports = new NotificationService();
