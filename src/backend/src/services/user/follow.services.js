const followRepository = require('../../db/repositories/postgres/follow.repository');
const userRepository = require('../../db/repositories/postgres/user.repository.prisma');
const { AppError, ErrorCodes } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

/**
 * Follow Service
 * Handles follow-related business logic
 */

class FollowService {
    /**
     * Get user's follow list (followers and following)
     * @param {string} uid - User ID
     * @param {Object} options - Query options (type, limit, offset)
     * @returns {Object} - Follow list data
     */
    async getFollowList(uid, options = {}) {
        try {
            // 1. Validate user exists
            const user = await userRepository.findById(uid);
            if (!user) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User not found');
            }

            const { type = 'both', limit = 20, offset = 0 } = options;

            let followers = [];
            let following = [];
            let followerCount = 0;
            let followingCount = 0;

            // 2. Get followers if requested
            if (type === 'followers' || type === 'both') {
                followers = await followRepository.getFollowers(uid, { limit, offset });
                followerCount = await followRepository.countFollowers(uid);
            }

            // 3. Get following if requested
            if (type === 'following' || type === 'both') {
                following = await followRepository.getFollowing(uid, { limit, offset });
                followingCount = await followRepository.countFollowing(uid);
            }

            logger.info(`Follow list retrieved for user ${uid}`);

            return {
                success: true,
                uid,
                followers: followers.map(f => ({
                    id: f.id,
                    user: f.follower,
                    followed_at: f.created_at,
                })),
                following: following.map(f => ({
                    id: f.id,
                    user: f.followee,
                    followed_at: f.created_at,
                })),
                follower_count: followerCount,
                following_count: followingCount,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting follow list:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get follow list');
        }
    }

    /**
     * Get user's followers (people who follow this user)
     * @param {string} uid - User ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Object} - Followers list
     */
    async getFollowers(uid, options = {}) {
        try {
            const { limit = 20, offset = 0 } = options;

            // Get followers
            const followers = await followRepository.getFollowers(uid, { limit, offset });
            const followerCount = await followRepository.countFollowers(uid);

            logger.info(`Followers list retrieved for user ${uid}: ${followers.length} followers`);

            return {
                success: true,
                uid,
                followers: followers.map(f => ({
                    id: f.id,
                    user_id: f.follower.id,
                    name: f.follower.name,
                    email: f.follower.email,
                    avatar_url: f.follower.avatar_url,
                    bio: f.follower.bio,
                    followed_at: f.created_at,
                })),
                total: followerCount,
                limit,
                offset,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting followers:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get followers');
        }
    }

    /**
     * Get user's following (people this user follows)
     * @param {string} uid - User ID
     * @param {Object} options - Query options (limit, offset)
     * @returns {Object} - Following list
     */
    async getFollowing(uid, options = {}) {
        try {
            const { limit = 20, offset = 0 } = options;

            // Get following
            const following = await followRepository.getFollowing(uid, { limit, offset });
            const followingCount = await followRepository.countFollowing(uid);

            logger.info(`Following list retrieved for user ${uid}: ${following.length} following`);

            return {
                success: true,
                uid,
                following: following.map(f => ({
                    id: f.id,
                    user_id: f.followee.id,
                    name: f.followee.name,
                    email: f.followee.email,
                    avatar_url: f.followee.avatar_url,
                    bio: f.followee.bio,
                    followed_at: f.created_at,
                })),
                total: followingCount,
                limit,
                offset,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error getting following:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to get following');
        }
    }

    /**
     * Follow a user
     * @param {string} followerId - Follower user ID
     * @param {string} followeeId - Followee user ID
     * @returns {Object} - Success response
     */
    async followUser(followerId, followeeId) {
        try {
            // 1. Validate both users exist
            const follower = await userRepository.findById(followerId);
            if (!follower) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'Follower user not found');
            }

            const followee = await userRepository.findById(followeeId);
            if (!followee) {
                throw new AppError(ErrorCodes.USER_NOT_FOUND, 'User to follow not found');
            }

            // 2. Check if user is trying to follow themselves
            if (followerId === followeeId) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Cannot follow yourself');
            }

            // 3. Check if already following
            const isAlreadyFollowing = await followRepository.isFollowing(followerId, followeeId);
            if (isAlreadyFollowing) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Already following this user');
            }

            // 4. Create follow relationship
            const follow = await followRepository.follow(followerId, followeeId);

            logger.info(`User ${followerId} followed user ${followeeId}`);

            return {
                success: true,
                follow_id: follow.id,
                follower_id: followerId,
                followee_id: followeeId,
                created_at: follow.created_at,
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error following user:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to follow user');
        }
    }

    /**
     * Unfollow a user
     * @param {string} followerId - Follower user ID
     * @param {string} followeeId - Followee user ID
     * @returns {Object} - Success response
     */
    async unfollowUser(followerId, followeeId) {
        try {
            // 1. Check if following
            const isFollowing = await followRepository.isFollowing(followerId, followeeId);
            if (!isFollowing) {
                throw new AppError(ErrorCodes.VALIDATION_INVALID_VALUE, 'Not following this user');
            }

            // 2. Remove follow relationship
            await followRepository.unfollow(followerId, followeeId);

            logger.info(`User ${followerId} unfollowed user ${followeeId}`);

            return {
                success: true,
                follower_id: followerId,
                followee_id: followeeId,
                unfollowed_at: new Date(),
            };

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            logger.error('Error unfollowing user:', error);
            throw new AppError(ErrorCodes.SERVER_ERROR, 'Failed to unfollow user');
        }
    }
}

module.exports = new FollowService();
