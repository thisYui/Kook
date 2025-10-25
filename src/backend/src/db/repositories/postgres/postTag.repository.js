const prisma = require('../../../config/prisma');
const logger = require('../../../utils/logger');

/**
 * Post Tag Repository
 * Handles all database operations related to post tags
 */

class PostTagRepository {
    /**
     * Add tags to post
     * @param {string} postId - Post ID
     * @param {Array} tags - Array of tag names
     * @param {string} countryCode - Country code (optional)
     * @returns {Object} - Result
     */
    async addTagsToPost(postId, tags, countryCode = null) {
        try {
            // First, ensure tags exist in the Tag table
            const tagPromises = tags.map(async (tagName) => {
                // Find or create tag
                let tag = await prisma.tag.findFirst({
                    where: {
                        name: tagName.toLowerCase(),
                        country_code: countryCode
                    },
                });

                if (!tag) {
                    tag = await prisma.tag.create({
                        data: {
                            name: tagName.toLowerCase(),
                            country_code: countryCode,
                        },
                    });
                }

                return tag;
            });

            const existingTags = await Promise.all(tagPromises);

            // Create post-tag relationships
            const postTagData = existingTags.map(tag => ({
                post_id: postId,
                tag_id: tag.id,
            }));

            return await prisma.postTag.createMany({
                data: postTagData,
                skipDuplicates: true,
            });
        } catch (error) {
            logger.error('Error adding tags to post:', error);
            throw error;
        }
    }

    /**
     * Get tags for post
     * @param {string} postId - Post ID
     * @returns {Array} - List of tags
     */
    async getTagsByPostId(postId) {
        try {
            return await prisma.postTag.findMany({
                where: { post_id: postId },
                include: {
                    tag: true,
                },
            });
        } catch (error) {
            logger.error('Error getting tags for post:', error);
            throw error;
        }
    }

    /**
     * Delete tags from post
     * @param {string} postId - Post ID
     * @returns {Object} - Result
     */
    async deleteByPostId(postId) {
        try {
            return await prisma.postTag.deleteMany({
                where: { post_id: postId },
            });
        } catch (error) {
            logger.error('Error deleting tags from post:', error);
            throw error;
        }
    }
}

module.exports = new PostTagRepository();
