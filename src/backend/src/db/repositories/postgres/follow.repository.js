const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Follow Repository
 * Handles all database operations related to follow relationships
 */

class FollowRepository {
    /**
     * Get user's followers
     * @param {string} userId - User ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Array} - List of followers
     */
    async getFollowers(userId, options = {}) {
        try {
            const { limit = 20, offset = 0 } = options;

            return await prisma.follow.findMany({
                where: {
                    followee_id: userId,
                },
                include: {
                    follower: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar_url: true,
                            bio: true,
                            count_posts: true,
                            count_followers: true,
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
                take: limit,
                skip: offset,
            });
        } catch (error) {
            logger.error('Error getting followers:', error);
            throw error;
        }
    }

    /**
     * Get user's following
     * @param {string} userId - User ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Array} - List of following users
     */
    async getFollowing(userId, options = {}) {
        try {
            const { limit = 20, offset = 0 } = options;

            return await prisma.follow.findMany({
                where: {
                    follower_id: userId,
                },
                include: {
                    followee: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar_url: true,
                            bio: true,
                            count_posts: true,
                            count_followers: true,
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
                take: limit,
                skip: offset,
            });
        } catch (error) {
            logger.error('Error getting following:', error);
            throw error;
        }
    }

    /**
     * Count followers
     * @param {string} userId - User ID
     * @returns {number} - Number of followers
     */
    async countFollowers(userId) {
        try {
            return await prisma.follow.count({
                where: {
                    followee_id: userId,
                },
            });
        } catch (error) {
            logger.error('Error counting followers:', error);
            throw error;
        }
    }

    /**
     * Count following
     * @param {string} userId - User ID
     * @returns {number} - Number of following
     */
    async countFollowing(userId) {
        try {
            return await prisma.follow.count({
                where: {
                    follower_id: userId,
                },
            });
        } catch (error) {
            logger.error('Error counting following:', error);
            throw error;
        }
    }

    /**
     * Check if user is following another user
     * @param {string} followerId - Follower user ID
     * @param {string} followeeId - Followee user ID
     * @returns {boolean} - True if following
     */
    async isFollowing(followerId, followeeId) {
        try {
            const follow = await prisma.follow.findFirst({
                where: {
                    follower_id: followerId,
                    followee_id: followeeId,
                },
            });
            return !!follow;
        } catch (error) {
            logger.error('Error checking follow status:', error);
            throw error;
        }
    }

    /**
     * Follow a user
     * @param {string} followerId - Follower user ID
     * @param {string} followeeId - Followee user ID
     * @returns {Object} - Created follow relationship
     */
    async follow(followerId, followeeId) {
        try {
            return await prisma.follow.create({
                data: {
                    follower_id: followerId,
                    followee_id: followeeId,
                },
            });
        } catch (error) {
            logger.error('Error creating follow:', error);
            throw error;
        }
    }

    /**
     * Unfollow a user
     * @param {string} followerId - Follower user ID
     * @param {string} followeeId - Followee user ID
     * @returns {Object} - Deleted follow relationship
     */
    async unfollow(followerId, followeeId) {
        try {
            return await prisma.follow.deleteMany({
                where: {
                    follower_id: followerId,
                    followee_id: followeeId,
                },
            });
        } catch (error) {
            logger.error('Error deleting follow:', error);
            throw error;
        }
    }

    /**
     * Get follower IDs for a user
     * @param {string} userId - User ID
     * @returns {Array<string>} - Array of follower user IDs
     */
    async getFollowerIds(userId) {
        try {
            const followers = await prisma.follow.findMany({
                where: {
                    followee_id: userId,
                },
                select: {
                    follower_id: true,
                },
            });
            return followers.map(f => f.follower_id);
        } catch (error) {
            logger.error('Error getting follower IDs:', error);
            throw error;
        }
    }
}

module.exports = new FollowRepository();
