const prisma = require('../../config/prisma');
const logger = require('../../utils/logger');

/**
 * Notification Repository
 * Handles all database operations related to notifications
 */

class NotificationRepository {
    /**
     * Create a new notification
     * @param {string} userId - User ID
     * @param {string} type - Notification type (SYSTEM, FOLLOW, COMMENT, RATING, REPOST, BADGE, etc.)
     * @param {string} title - Notification title
     * @param {string} content - Notification content
     * @returns {Object} - Created notification
     */
    async create(userId, type, title, content) {
        try {
            return await prisma.notification.create({
                data: {
                    user_id: userId,
                    type: type,
                    title: title,
                    content: content,
                    is_read: false,
                },
            });
        } catch (error) {
            logger.error('Error creating notification:', error);
            throw error;
        }
    }

    /**
     * Mark a notification as read
     * @param {string} notificationId - Notification ID
     * @returns {Object} - Updated notification
     */
    async markAsRead(notificationId) {
        try {
            return await prisma.notification.update({
                where: {
                    id: notificationId,
                },
                data: {
                    is_read: true,
                    read_at: new Date(),
                },
            });
        } catch (error) {
            logger.error('Error marking notification as read:', error);
            throw error;
        }
    }

    /**
     * Mark all user notifications as read
     * @param {string} userId - User ID
     * @returns {Object} - Update result
     */
    async markAllAsRead(userId) {
        try {
            return await prisma.notification.updateMany({
                where: {
                    user_id: userId,
                    is_read: false,
                },
                data: {
                    is_read: true,
                    read_at: new Date(),
                },
            });
        } catch (error) {
            logger.error('Error marking all notifications as read:', error);
            throw error;
        }
    }

    /**
     * Get notification by ID
     * @param {string} notificationId - Notification ID
     * @returns {Object|null} - Notification or null
     */
    async findById(notificationId) {
        try {
            return await prisma.notification.findUnique({
                where: {
                    id: notificationId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar_url: true,
                        },
                    },
                },
            });
        } catch (error) {
            logger.error('Error finding notification by ID:', error);
            throw error;
        }
    }

    /**
     * Get user notifications with pagination
     * @param {string} userId - User ID
     * @param {Object} options - Query options
     * @param {number} options.limit - Limit
     * @param {number} options.offset - Offset
     * @param {boolean} options.unreadOnly - Only unread notifications
     * @returns {Array} - List of notifications
     */
    async getUserNotifications(userId, options = {}) {
        try {
            const { limit = 20, offset = 0, unreadOnly = false } = options;

            const where = {
                user_id: userId,
            };

            if (unreadOnly) {
                where.is_read = false;
            }

            return await prisma.notification.findMany({
                where,
                orderBy: {
                    created_at: 'desc',
                },
                take: limit,
                skip: offset,
            });
        } catch (error) {
            logger.error('Error getting user notifications:', error);
            throw error;
        }
    }

    /**
     * Count user notifications
     * @param {string} userId - User ID
     * @param {boolean} unreadOnly - Only count unread
     * @returns {number} - Count
     */
    async countUserNotifications(userId, unreadOnly = false) {
        try {
            const where = {
                user_id: userId,
            };

            if (unreadOnly) {
                where.is_read = false;
            }

            return await prisma.notification.count({
                where,
            });
        } catch (error) {
            logger.error('Error counting user notifications:', error);
            throw error;
        }
    }

    /**
     * Delete notification by ID
     * @param {string} notificationId - Notification ID
     * @returns {Object} - Deleted notification
     */
    async delete(notificationId) {
        try {
            return await prisma.notification.delete({
                where: {
                    id: notificationId,
                },
            });
        } catch (error) {
            logger.error('Error deleting notification:', error);
            throw error;
        }
    }

    /**
     * Delete all user notifications
     * @param {string} userId - User ID
     * @returns {Object} - Delete result
     */
    async deleteAllUserNotifications(userId) {
        try {
            return await prisma.notification.deleteMany({
                where: {
                    user_id: userId,
                },
            });
        } catch (error) {
            logger.error('Error deleting all user notifications:', error);
            throw error;
        }
    }

    /**
     * Delete old read notifications (older than specified days)
     * @param {number} daysOld - Number of days old
     * @returns {Object} - Delete result
     */
    async deleteOldReadNotifications(daysOld = 30) {
        try {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);

            return await prisma.notification.deleteMany({
                where: {
                    is_read: true,
                    read_at: {
                        lt: cutoffDate,
                    },
                },
            });
        } catch (error) {
            logger.error('Error deleting old read notifications:', error);
            throw error;
        }
    }

    /**
     * Batch create notifications for multiple users
     * @param {Array} userIds - Array of user IDs
     * @param {string} type - Notification type
     * @param {string} title - Notification title
     * @param {string} content - Notification content
     * @returns {Object} - Create result
     */
    async createBatch(userIds, type, title, content) {
        try {
            const notifications = userIds.map(userId => ({
                user_id: userId,
                type: type,
                title: title,
                content: content,
                is_read: false,
            }));

            return await prisma.notification.createMany({
                data: notifications,
            });
        } catch (error) {
            logger.error('Error creating batch notifications:', error);
            throw error;
        }
    }

    /**
     * Check if notification belongs to user
     * @param {string} notificationId - Notification ID
     * @param {string} userId - User ID
     * @returns {boolean} - True if belongs to user
     */
    async belongsToUser(notificationId, userId) {
        try {
            const notification = await prisma.notification.findFirst({
                where: {
                    id: notificationId,
                    user_id: userId,
                },
                select: {
                    id: true,
                },
            });

            return !!notification;
        } catch (error) {
            logger.error('Error checking notification ownership:', error);
            throw error;
        }
    }
}

module.exports = new NotificationRepository();
