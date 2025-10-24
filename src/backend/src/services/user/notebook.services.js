const notebookRepository = require('../../db/repositories/postgres/notebook.repository');
const userRepository = require('../../db/repositories/postgres/user.repository.prisma');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Notebook Service
 * Handles user's saved posts (notebook) business logic
 */

class NotebookService {
    /**
     * Get user's notebook (saved posts)
     * @param {string} uid - User ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Object} - Notebook data
     */
    async showUserNotebook(uid, options = {}) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            const { limit = 20, offset = 0 } = options;

            // 2. Get saved posts from notebook
            const notebookItems = await notebookRepository.getUserNotebook(uid, { limit, offset });

            // 3. Get total count
            const totalCount = await notebookRepository.countNotebookItems(uid);

            // 4. Format response
            const savedPosts = notebookItems.map(item => ({
                notebook_id: item.id,
                post: {
                    id: item.post.id,
                    title: item.post.title,
                    short_description: item.post.short_description,
                    image_url: item.post.image_url,
                    rating_avg: item.post.rating_avg,
                    rating_count: item.post.rating_count,
                    view_count: item.post.view_count,
                    comment_count: item.post.comment_count,
                    created_at: item.post.created_at,
                    author: item.post.author,
                    recipe: item.post.recipe,
                },
                saved_at: item.created_at,
            }));

            logger.info(`Notebook retrieved for user ${uid}: ${savedPosts.length} items`);

            return {
                success: true,
                uid,
                saved_posts: savedPosts,
                total: totalCount,
                limit,
                offset,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting user notebook:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get notebook');
        }
    }

    /**
     * Save post to notebook
     * @param {string} uid - User ID
     * @param {string} postId - Post ID
     * @returns {Object} - Success response
     */
    async savePostToNotebook(uid, postId) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 2. Save post to notebook
            const notebook = await notebookRepository.savePost(uid, postId);

            logger.info(`User ${uid} saved post ${postId} to notebook`);

            return {
                success: true,
                notebook_id: notebook.id,
                user_id: uid,
                post_id: postId,
                saved_at: notebook.created_at,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error saving post to notebook:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to save post to notebook');
        }
    }

    /**
     * Remove post from notebook
     * @param {string} uid - User ID
     * @param {string} postId - Post ID
     * @returns {Object} - Success response
     */
    async removePostFromNotebook(uid, postId) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            // 2. Check if post is saved
            const isSaved = await notebookRepository.isSaved(uid, postId);
            if (!isSaved) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Post not in notebook');
            }

            // 3. Remove post from notebook
            await notebookRepository.removePost(uid, postId);

            logger.info(`User ${uid} removed post ${postId} from notebook`);

            return {
                success: true,
                user_id: uid,
                post_id: postId,
                removed_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error removing post from notebook:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to remove post from notebook');
        }
    }
}

module.exports = new NotebookService();

