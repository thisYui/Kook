import apiClient from './apiClient';
import authService from '../services/authService';

// Users API methods
export const usersApi = {
    // Change language preference - Backend expects: uid, language
    changeLanguage: async (language) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/change-lang', {
            uid,
            language
        });
        return response.data;
    },

    // Change theme preference - Backend expects: uid, theme
    changeTheme: async (theme) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/change-theme', {
            uid,
            theme
        });
        return response.data;
    },

    // Get user allergies - Backend expects: uid
    getUserAllergies: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/allergies', {
            uid
        });
        return response.data;
    },

    // Add allergy - Backend expects: uid, ingredient_key
    addAllergy: async (ingredientKey) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/add-allergy', {
            uid,
            ingredient_key: ingredientKey
        });
        return response.data;
    },

    // Delete allergy - Backend expects: uid, ingredient_key
    deleteAllergy: async (ingredientKey) => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/user/delete-allergy', {
            data: {
                uid,
                ingredient_key: ingredientKey
            }
        });
        return response.data;
    },

    // Get user profile - Backend expects: uid, senderID
    getUserProfile: async (targetUid) => {
        const senderID = authService.getUserId();
        const response = await apiClient.post('/api/user/get-profile', {
            uid: targetUid,
            senderID
        });
        return response.data;
    },

    // Mark notifications as seen - Backend expects: uid, notificationID
    markNotificationsSeen: async (notificationID) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/seen-notifications', {
            uid,
            notificationID
        });
        return response.data;
    },

    // Delete user account - Backend expects: uid
    deleteUserAccount: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/user/delete-account', {
            data: {
                uid
            }
        });
        return response.data;
    },

    // Reset password - Backend expects: uid, newPassword
    resetPassword: async (newPassword) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/reset-password', {
            uid,
            newPassword
        });
        return response.data;
    },

    // Change email - Backend expects: uid, newEmail
    changeEmail: async (newEmail) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/change-email', {
            uid,
            newEmail
        });

        // Update user data if successful
        if (response.data.success) {
            authService.updateUserData({ email: newEmail });
        }

        return response.data;
    },

    // Change avatar - Backend expects: uid, avatarData, formatFile
    changeAvatar: async (avatarData, formatFile) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/change-avatar', {
            uid,
            avatarData,
            formatFile
        });
        return response.data;
    },

    // Show user notebook - Backend expects: uid
    showUserNotebook: async (limit, offset) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/show-notebook', {
            uid,
            limit,
            offset
        });
        return response.data;
    },

    // Overview user meal plans - Backend expects: uid, limit, offset, activeOnly
    overviewUserMealPlans: async (limit, offset, activeOnly) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/overview-meal-plans', {
            uid,
            limit,
            offset,
            activeOnly
        });
        return response.data;
    },

    // Show user meal plans - Backend expects: uid, mealPlanID
    showUserMealPlans: async (mealPlanID) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/show-meal-plans', {
            uid,
            mealPlanID
        });
        return response.data;
    },

    // Follow a user - Backend expects: follower_id, followee_id
    followUser: async (followeeId) => {
        const follower_id = authService.getUserId();
        const response = await apiClient.post('/api/user/follow', {
            follower_id,
            followee_id: followeeId
        });
        return response.data;
    },

    // Unfollow a user - Backend expects: follower_id, followee_id
    unfollowUser: async (followeeId) => {
        const follower_id = authService.getUserId();
        const response = await apiClient.post('/api/user/unfollow', {
            follower_id,
            followee_id: followeeId
        });
        return response.data;
    },

    // Get follower list - Backend expects: uid, limit, offset
    getListFollowers: async (limit, offset) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/list-followers', {
            uid,
            limit,
            offset
        });
        return response.data;
    },

    // Get following list - Backend expects: uid, limit, offset
    getListFollowing: async (limit, offset) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/user/list-following', {
            uid,
            limit,
            offset
        });
        return response.data;
    }
};

export default usersApi;
