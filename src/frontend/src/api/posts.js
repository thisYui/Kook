import apiClient from './apiClient';
import authService from '../services/authService';

// Posts API methods
export const postsApi = {
    // Create a new post - Backend expects: uid, title, description, images, tags, countryCode, recipeData
    newPost: async (postData) => {
        const uid = authService.getUserId();
        const {
            title,
            description,
            images,
            tags,
            countryCode,
            recipeData
        } = postData;

        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('title', title);
        formData.append('description', description);

        // Add tags as JSON array
        if (tags && tags.length > 0) {
            formData.append('tags', JSON.stringify(tags));
        }

        // Add country code
        if (countryCode) {
            formData.append('countryCode', countryCode);
        }

        // Add images if provided
        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        // Add recipe data as JSON (ingredients, steps, cookingTime, servings, difficulty)
        if (recipeData) {
            formData.append('recipeData', JSON.stringify(recipeData));
        }

        const response = await apiClient.post('/api/post/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },

    // Rate a post - Backend expects: uid, postID, rating
    ratePost: async (postID, rating) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/post/rating-post', {
            uid,
            postID,
            rating
        });
        return response.data;
    },

    // Comment on a post - Backend expects: uid, postID, content
    commentPost: async (postID, content) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/post/new-comment-post', {
            uid,
            postID,
            content
        });
        return response.data;
    },

    // Delete a comment - Backend expects: uid, commentId
    deleteCommentPost: async (commentId) => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/post/delete-comment-post', {
            data: {
                uid,
                commentId
            }
        });
        return response.data;
    },

    // Delete a post - Backend expects: uid, postID
    deletePost: async (postID) => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/post/delete-post', {
            data: {
                uid,
                postID
            }
        });
        return response.data;
    },

    // Repost - Backend expects: uid, postID
    repost: async (postID) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/post/repost', {
            uid,
            postID
        });
        return response.data;
    },

    // Cancel repost - Backend expects: uid, postID
    cancelRepost: async (postID) => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/post/cancel-repost', {
            data: {
                uid,
                postID
            }
        });
        return response.data;
    },

    // Save post to notebook - Backend expects: uid, postID
    saveToNotebook: async (postID) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/post/save-to-notebook', {
            uid,
            postID
        });
        return response.data;
    },

    // Remove post from notebook - Backend expects: uid, postID
    removeFromNotebook: async (postID) => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/post/remove-from-notebook', {
            data: {
                uid,
                postID
            }
        });
        return response.data;
    },

    // Get post details - Backend expects: postID (no auth required for public posts)
    getPostDetails: async (postID) => {
        const response = await apiClient.get(`/api/post/${postID}`);
        return response.data;
    },

    // Get user's posts - Backend expects: uid (can be different from logged user)
    getUserPosts: async (targetUid, page = 1, limit = 20) => {
        const response = await apiClient.get('/api/post/user', {
            params: {
                uid: targetUid,
                page,
                limit
            }
        });
        return response.data;
    },
};

export default postsApi;
