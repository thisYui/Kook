const postRepository = require('../../db/repositories/postgres/post.repository');
const recipeRepository = require('../../db/repositories/postgres/recipe.repository');
const recipeVersionMapRepository = require('../../db/repositories/postgres/recipeVersionMap.repository');
const ingredientRepository = require('../../db/repositories/postgres/ingredient.repository');
const postTagRepository = require('../../db/repositories/postgres/postTag.repository');
const recipeDetailRepository = require('../../db/repositories/mongo/recipeDetail.repositories');
const userRepository = require('../../db/repositories/postgres/user.repository.prisma');
const followRepository = require('../../db/repositories/postgres/follow.repository');
const notificationService = require('../user/notification.services');
const fileService = require('../user/file.services');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Post Service
 * Handles post-related business logic
 */

class PostService {
    /**
     * Create a new post with recipe details
     * @param {string} uid - User ID
     * @param {Object} postData - Post data
     * @returns {Object} - Created post
     */
    async createPost(uid, postData) {
        try {
            const {
                title,
                description,
                imageData,
                imageFormat,
                tags = [],
                countryCode,
                recipeData
            } = postData;

            // 1. Validate user exists and is active
            await this.validateUserActive(uid);

            // 2. Upload image if provided
            let imageUrl = null;
            if (imageData && imageFormat) {
                const uploadResult = await fileService.uploadFile(
                    uid,
                    Buffer.from(imageData, 'base64'),
                    `post_${Date.now()}.${imageFormat}`,
                    'post'
                );
                imageUrl = uploadResult.url;
            }

            // 3. Create post in PostgreSQL
            const post = await postRepository.create({
                author_id: uid,
                title,
                short_description: description,
                image_url: imageUrl,
            });

            // 4. Create recipe if recipeData provided
            if (recipeData) {
                await this.createRecipeForPost(post.id, recipeData);
            }

            // 5. Add tags to post
            if (tags && tags.length > 0) {
                await postTagRepository.addTagsToPost(post.id, tags, countryCode);
            }

            // 6. Update user post count
            await userRepository.incrementPostCount(uid);

            // 7. Notify followers about new post (async, don't wait)
            this.notifyFollowersAboutNewPost(uid, post.id, title).catch(err =>
                logger.error('Error notifying followers:', err)
            );

            logger.info(`Post created: ${post.id} by user ${uid}`);

            return {
                success: true,
                post_id: post.id,
                author_id: post.author_id,
                title: post.title,
                description: post.short_description,
                image_url: post.image_url,
                created_at: post.created_at,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error creating post:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to create post');
        }
    }

    /**
     * Create recipe for a post
     * @param {string} postId - Post ID
     * @param {Object} recipeData - Recipe data
     * @private
     */
    async createRecipeForPost(postId, recipeData) {
        const {
            total_minute,
            cook_minute,
            difficulty,
            calories,
            ingredients = [],
            steps = []
        } = recipeData;

        // Create recipe in PostgreSQL
        const recipe = await recipeRepository.create({
            post_id: postId,
            total_minute,
            cook_minute,
            difficulty,
            total_steps: steps.length,
            current_version: 1,
            calories,
        });

        // Create recipe version map
        await recipeVersionMapRepository.create({
            recipe_id: recipe.id,
            mongo_version: 1,
            is_synced: true,
        });

        // Add ingredients to PostgreSQL
        if (ingredients && ingredients.length > 0) {
            await ingredientRepository.addIngredientsToPost(postId, ingredients);
        }

        // Create recipe details in MongoDB using repository
        await recipeDetailRepository.create({
            recipe_id: recipe.id,
            post_id: postId,
            steps: steps.map((step, index) => ({
                order: step.order || index + 1,
                title: step.title,
                description: step.description,
                media: step.media || [],
                duration: step.duration || 0,
                has_timer: step.has_timer || false,
                tips: step.tips || []
            })),
            version: 1
        });

        return recipe;
    }

    /**
     * Notify followers about new post
     * @param {string} authorId - Author user ID
     * @param {string} postId - Post ID
     * @param {string} title - Post title
     * @private
     */
    async notifyFollowersAboutNewPost(authorId, postId, title) {
        try {
            // Get author info
            const author = await userRepository.findById(authorId);
            if (!author) return;

            // Get all followers
            const followers = await followRepository.getFollowerIds(authorId);

            // Create notification for each follower
            const notificationPromises = followers.map(followerId =>
                notificationService.createNotification(
                    followerId,
                    'POST',
                    'New Post',
                    `${author.name} posted: ${title}`
                ).catch(err => logger.error(`Failed to notify follower ${followerId}:`, err))
            );

            await Promise.all(notificationPromises);

            logger.info(`Notified ${followers.length} followers about new post ${postId}`);

        } catch (error) {
            logger.error('Error notifying followers:', error);
            // Don't throw - this is a background task
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

module.exports = new PostService();
