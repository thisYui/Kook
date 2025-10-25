const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Post Repository
 * Handles all database operations related to posts
 */

class PostRepository {
    /**
     * Create a new post
     * @param {Object} postData - Post data
     * @returns {Object} - Created post
     */
    async create(postData) {
        try {
            return await prisma.post.create({
                data: postData,
            });
        } catch (error) {
            logger.error('Error creating post:', error);
            throw error;
        }
    }

    /**
     * Find post by ID
     * @param {string} postId - Post ID
     * @returns {Object|null} - Post or null
     */
    async findById(postId) {
        try {
            return await prisma.post.findUnique({
                where: { id: postId },
            });
        } catch (error) {
            logger.error('Error finding post by ID:', error);
            throw error;
        }
    }

    /**
     * Update post
     * @param {string} postId - Post ID
     * @param {Object} updateData - Update data
     * @returns {Object} - Updated post
     */
    async update(postId, updateData) {
        try {
            return await prisma.post.update({
                where: { id: postId },
                data: updateData,
            });
        } catch (error) {
            logger.error('Error updating post:', error);
            throw error;
        }
    }

    /**
     * Soft delete post
     * @param {string} postId - Post ID
     * @returns {Object} - Deleted post
     */
    async softDelete(postId) {
        try {
            return await prisma.post.update({
                where: { id: postId },
                data: {
                    is_deleted: true,
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            logger.error('Error soft deleting post:', error);
            throw error;
        }
    }

    /**
     * Increment view count
     * @param {string} postId - Post ID
     * @returns {Object} - Updated post
     */
    async incrementViewCount(postId) {
        try {
            return await prisma.post.update({
                where: { id: postId },
                data: {
                    view_count: { increment: 1 },
                },
            });
        } catch (error) {
            logger.error('Error incrementing view count:', error);
            throw error;
        }
    }

    /**
     * Increment repost count
     * @param {string} postId - Post ID
     * @returns {Object} - Updated post
     */
    async incrementRepostCount(postId) {
        try {
            return await prisma.post.update({
                where: { id: postId },
                data: {
                    repost_count: { increment: 1 },
                },
            });
        } catch (error) {
            logger.error('Error incrementing repost count:', error);
            throw error;
        }
    }

    /**
     * Increment notebook count
     * @param {string} postId - Post ID
     * @returns {Object} - Updated post
     */
    async incrementNotebookCount(postId) {
        try {
            return await prisma.post.update({
                where: { id: postId },
                data: {
                    notebook_count: { increment: 1 },
                },
            });
        } catch (error) {
            logger.error('Error incrementing notebook count:', error);
            throw error;
        }
    }

    /**
     * Increment comment count
     * @param {string} postId - Post ID
     * @returns {Object} - Updated post
     */
    async incrementCommentCount(postId) {
        try {
            return await prisma.post.update({
                where: { id: postId },
                data: {
                    comment_count: { increment: 1 },
                },
            });
        } catch (error) {
            logger.error('Error incrementing comment count:', error);
            throw error;
        }
    }
}

module.exports = new PostRepository();
