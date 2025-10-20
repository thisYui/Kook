import apiClient from './apiClient';

// Posts API methods
export const postsApi = {
    // Create a new post - Backend expects: uid, title, description, images, tags, countryCode, recipeData
    newPost: async (postData) => {
        const {
            uid,
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

        const response = await apiClient.post('/api/posts/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    },

    // Rate a post - Backend expects: uid, postID, rating
    ratePost: async (uid, postID, rating) => {
        const response = await apiClient.post('/api/posts/rating-post', {
            uid,
            postID,
            rating
        });
        return response.data;
    },

    // Comment on a post - Backend expects: uid, postID, content
    commentPost: async (uid, postID, content) => {
        const response = await apiClient.post('/api/posts/new-comment-post', {
            uid,
            postID,
            content
        });
        return response.data;
    },

    // Delete a comment - Backend expects: uid, commentId
    deleteCommentPost: async (uid, commentId) => {
        const response = await apiClient.delete('/api/posts/delete-comment-post', {
            data: {
                uid,
                commentId
            }
        });
        return response.data;
    },

    // Delete a post - Backend expects: uid, postID
    deletePost: async (uid, postID) => {
        const response = await apiClient.delete('/api/posts/delete-post', {
            data: {
                uid,
                postID
            }
        });
        return response.data;
    },

    // Repost
    repost: async (uid, postID) => {
        const response = await apiClient.post('/api/posts/repost', {
            uid,
            postID
        });
        return response.data;
    },

    // Add post to notebook
    addPostToNotebook: async (uid, postID) => {
        const response = await apiClient.post('/api/posts/add-notebook', {
            uid,
            postID
        });
        return response.data;
    },

    // Add note to repost
    addNoteToRepost: async (uid, repostId, note) => {
        const response = await apiClient.post('/api/posts/add-note', {
            uid,
            repostId,
            note
        });
        return response.data;
    },

    // Delete note from repost
    deleteNoteToRepost: async (uid, repostId) => {
        const response = await apiClient.delete('/api/posts/delete-note', {
            data: {
                uid,
                repostId
            }
        });
        return response.data;
    },
};

export default postsApi;
