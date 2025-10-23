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
            // 1. Validate required fields
            if (!uid || !type) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and type are required');
            }

            // 2. Validate user exists and is active
            await this.validateUserActive(uid);

            // 3. Create notification
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
            // 1. Validate required fields
            if (!uid || !notificationID) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and notification ID are required');
            }

            // 2. Validate user exists and is active
            await this.validateUserActive(uid);

            // 3. Check if notification belongs to user
            const belongsToUser = await notificationRepository.belongsToUser(notificationID, uid);
            if (!belongsToUser) {
                throw new AppError(ErrorCodes.AUTH_UNAUTHORIZED, 'Notification does not belong to user');
            }

            // 4. Mark notification as read
            const updatedNotification = await notificationRepository.markAsRead(notificationID);

            logger.info(`User ${uid} marked notification ${notificationID} as seen`);

            return {
                success: true,
                notification_id: updatedNotification.id,
                is_read: updatedNotification.is_read,
                read_at: updatedNotification.read_at,
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
     * Get user notifications
     * @param {string} uid - User ID
     * @param {Object} options - Query options (limit, offset, unread_only)
     * @returns {Object} - List of notifications
     */
    async getUserNotifications(uid, options = {}) {
        try {
            // 1. Validate user exists and is active
            await this.validateUserActive(uid);

            const { limit = 20, offset = 0, unread_only = false } = options;

            // 2. Get notifications from repository
            const notifications = await notificationRepository.getUserNotifications(uid, {
                limit,
                offset,
                unreadOnly: unread_only,
            });

            // 3. Get total count
            const total = await notificationRepository.countUserNotifications(uid, unread_only);
            const unreadCount = await notificationRepository.countUserNotifications(uid, true);

            logger.info(`Getting notifications for user ${uid}: ${notifications.length} items`);

            return {
                success: true,
                uid,
                notifications,
                total,
                unread_count: unreadCount,
                limit,
                offset,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting user notifications:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get notifications');
        }
    }

    /**
     * Mark all notifications as seen
     * @param {string} uid - User ID
     * @returns {Object} - Success response
     */
    async markAllNotificationsSeen(uid) {
        try {
            // 1. Validate user exists and is active
            await this.validateUserActive(uid);

            // 2. Mark all as read
            const result = await notificationRepository.markAllAsRead(uid);

            logger.info(`User ${uid} marked all notifications as seen: ${result.count} updated`);

            return {
                success: true,
                uid,
                updated_count: result.count,
                read_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error marking all notifications as seen:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to mark all notifications as seen');
        }
    }

    /**
     * Delete notification
     * @param {string} uid - User ID
     * @param {string} notificationID - Notification ID
     * @returns {Object} - Success response
     */
    async deleteNotification(uid, notificationID) {
        try {
            // 1. Validate required fields
            if (!uid || !notificationID) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'UID and notification ID are required');
            }

            // 2. Validate user exists and is active
            await this.validateUserActive(uid);

            // 3. Check if notification belongs to user
            const belongsToUser = await notificationRepository.belongsToUser(notificationID, uid);
            if (!belongsToUser) {
                throw new AppError(ErrorCodes.AUTH_UNAUTHORIZED, 'Notification does not belong to user');
            }

            // 4. Delete notification
            await notificationRepository.delete(notificationID);

            logger.info(`User ${uid} deleted notification ${notificationID}`);

            return {
                success: true,
                uid,
                notification_id: notificationID,
                deleted_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error deleting notification:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to delete notification');
        }
    }

    /**
     * Delete all user notifications
     * @param {string} uid - User ID
     * @returns {Object} - Success response
     */
    async deleteAllNotifications(uid) {
        try {
            // 1. Validate user exists and is active
            await this.validateUserActive(uid);

            // 2. Delete all notifications
            const result = await notificationRepository.deleteAllUserNotifications(uid);

            logger.info(`User ${uid} deleted all notifications: ${result.count} deleted`);

            return {
                success: true,
                uid,
                deleted_count: result.count,
                deleted_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error deleting all notifications:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to delete all notifications');
        }
    }

    /**
     * Batch create notifications for multiple users
     * @param {Array} userIds - Array of user IDs
     * @param {string} type - Notification type
     * @param {string} title - Notification title
     * @param {string} content - Notification content
     * @returns {Object} - Success response
     */
    async createBatchNotifications(userIds, type, title, content) {
        try {
            // 1. Validate required fields
            if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'User IDs array is required');
            }

            if (!type) {
                throw new AppError(ErrorCodes.VALIDATION_REQUIRED_FIELD, 'Notification type is required');
            }

            // 2. Create batch notifications
            const result = await notificationRepository.createBatch(userIds, type, title, content);

            logger.info(`Created ${result.count} notifications for ${userIds.length} users`);

            return {
                success: true,
                created_count: result.count,
                user_count: userIds.length,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error creating batch notifications:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to create batch notifications');
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

module.exports = new NotificationService();
