import apiClient from './apiClient';

// Users API methods
export const usersApi = {
    // Change language preference - Backend expects: uid, language
    changeLanguage: async (uid, language) => {
        const response = await apiClient.post('/api/users/change-lang', {
            uid,
            language
        });
        return response.data;
    },

    // Change theme preference - Backend expects: uid, theme
    changeTheme: async (uid, theme) => {
        const response = await apiClient.post('/api/users/change-theme', {
            uid,
            theme
        });
        return response.data;
    },

    // Change allergy information - Backend expects: uid, allergies
    changeAllergyInfo: async (uid, allergies) => {
        const response = await apiClient.post('/api/users/change-allergy', {
            uid,
            allergies
        });
        return response.data;
    },

    // Get user profile - Backend expects: uid, senderID
    getUserProfile: async (uid, senderID) => {
        const response = await apiClient.post('/api/users/get-profile', {
            uid,
            senderID
        });
        return response.data;
    },

    // Mark notifications as seen - Backend expects: uid, notificationID
    markNotificationsSeen: async (uid, notificationID) => {
        const response = await apiClient.post('/api/users/seen-notifications', {
            uid,
            notificationID
        });
        return response.data;
    },

    // Delete user account - Backend expects: uid, token
    deleteUserAccount: async (uid, token) => {
        const response = await apiClient.delete('/api/users/delete-account', {
            data: {
                uid,
                token
            }
        });
        return response.data;
    },

    // Show user notebook - Backend expects: uid
    showUserNotebook: async (uid, page = 1, limit = 20) => {
        const response = await apiClient.post('/api/users/show-notebook', {
            uid,
            page,
            limit
        });
        return response.data;
    },

    // Overview user meal plans - Backend expects: uid
    overviewUserMealPlans: async (uid) => {
        const response = await apiClient.post('/api/users/overview-meal-plans', {
            uid
        });
        return response.data;
    },

    // Show user meal plans - Backend expects: uid, mealPlanID
    showUserMealPlans: async (uid, mealPlanID) => {
        const response = await apiClient.post('/api/users/show-meal-plans', {
            uid,
            mealPlanID
        });
        return response.data;
    },

    // Get follow list - Backend expects: uid
    getFollowList: async (uid, type = 'followers') => {
        const response = await apiClient.post('/api/users/get-follow-list', {
            uid,
            type // 'followers' or 'following'
        });
        return response.data;
    },
};

export default usersApi;
