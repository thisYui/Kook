const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Notebook Repository
 * Handles all database operations related to user's saved posts (notebook)
 */

class NotebookRepository {
    /**
     * Get user's notebook (saved posts)
     * @param {string} userId - User ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Array} - List of saved posts
     */
    async getUserNotebook(userId, options = {}) {
        try {
            const { limit = 20, offset = 0 } = options;

            return await prisma.notebook.findMany({
                where: {
                    user_id: userId,
                    is_deleted: false,
                },
                include: {
                    post: {
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    name: true,
                                    avatar_url: true,
                                },
                            },
                            recipe: {
                                select: {
                                    id: true,
                                    total_minute: true,
                                    difficulty: true,
                                    calories: true,
                                },
                            },
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
            logger.error('Error getting user notebook:', error);
            throw error;
        }
    }

    /**
     * Count user's notebook items
     * @param {string} userId - User ID
     * @returns {number} - Number of saved posts
     */
    async countNotebookItems(userId) {
        try {
            return await prisma.notebook.count({
                where: {
                    user_id: userId,
                    is_deleted: false,
                },
            });
        } catch (error) {
            logger.error('Error counting notebook items:', error);
            throw error;
        }
    }

    /**
     * Check if post is saved in notebook
     * @param {string} userId - User ID
     * @param {string} postId - Post ID
     * @returns {boolean} - True if saved
     */
    async isSaved(userId, postId) {
        try {
            const notebook = await prisma.notebook.findFirst({
                where: {
                    user_id: userId,
                    post_id: postId,
                    is_deleted: false,
                },
            });
            return !!notebook;
        } catch (error) {
            logger.error('Error checking if post is saved:', error);
            throw error;
        }
    }

    /**
     * Save post to notebook
     * @param {string} userId - User ID
     * @param {string} postId - Post ID
     * @returns {Object} - Created notebook entry
     */
    async savePost(userId, postId) {
        try {
            return await prisma.notebook.upsert({
                where: {
                    user_id_post_id: {
                        user_id: userId,
                        post_id: postId,
                    },
                },
                update: {
                    is_deleted: false,
                    updated_at: new Date(),
                },
                create: {
                    user_id: userId,
                    post_id: postId,
                    is_deleted: false,
                },
            });
        } catch (error) {
            logger.error('Error saving post to notebook:', error);
            throw error;
        }
    }

    /**
     * Remove post from notebook (soft delete)
     * @param {string} userId - User ID
     * @param {string} postId - Post ID
     * @returns {Object} - Updated notebook entry
     */
    async removePost(userId, postId) {
        try {
            return await prisma.notebook.updateMany({
                where: {
                    user_id: userId,
                    post_id: postId,
                    is_deleted: false,
                },
                data: {
                    is_deleted: true,
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            logger.error('Error removing post from notebook:', error);
            throw error;
        }
    }
}

module.exports = new NotebookRepository();

