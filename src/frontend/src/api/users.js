import apiClient from './apiClient';
import authService from '../services/authService';

// Users API methods
export const usersApi = {
    // Change language preference - Backend expects: uid, language
    changeLanguage: async (language) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/change-lang', {
            uid,
            language
        });
        return response.data;
    },

    // Change theme preference - Backend expects: uid, theme
    changeTheme: async (theme) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/change-theme', {
            uid,
            theme
        });
        return response.data;
    },

    // Change allergy information - Backend expects: uid, allergies
    changeAllergyInfo: async (allergies) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/change-allergy', {
            uid,
            allergies
        });
        return response.data;
    },

    // Get user allergies - Backend expects: uid
    getUserAllergies: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/allergies', {
            uid
        });
        return response.data;
    },

    // Add allergy - Backend expects: uid, ingredient_key
    addAllergy: async (ingredientKey) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/add-allergy', {
            uid,
            ingredient_key: ingredientKey
        });
        return response.data;
    },

    // Delete allergy - Backend expects: uid, ingredient_key
    deleteAllergy: async (ingredientKey) => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/users/delete-allergy', {
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
        const response = await apiClient.post('/api/users/get-profile', {
            uid: targetUid,
            senderID
        });
        return response.data;
    },

    // Mark notifications as seen - Backend expects: uid, notificationID
    markNotificationsSeen: async (notificationID) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/seen-notifications', {
            uid,
            notificationID
        });
        return response.data;
    },

    // Delete user account - Backend expects: uid
    deleteUserAccount: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.delete('/api/users/delete-account', {
            data: {
                uid
            }
        });
        return response.data;
    },

    // Reset password - Backend expects: uid, newPassword
    resetPassword: async (newPassword) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/auth/reset-password', {
            uid,
            newPassword
        });
        return response.data;
    },

    // Change email - Backend expects: uid, newEmail
    changeEmail: async (newEmail) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/auth/change-email', {
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
        const response = await apiClient.post('/api/auth/change-avatar', {
            uid,
            avatarData,
            formatFile
        });
        return response.data;
    },

    // Show user notebook - Backend expects: uid
    showUserNotebook: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/show-user-notebook', {
            uid
        });
        return response.data;
    },

    // Overview user meal plans - Backend expects: uid
    overviewUserMealPlans: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/overview-user-meal-plans', {
            uid
        });
        return response.data;
    },

    // Show user meal plans - Backend expects: uid, mealPlanID
    showUserMealPlans: async (mealPlanID) => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/show-user-meal-plans', {
            uid,
            mealPlanID
        });
        return response.data;
    },

    // Get follower list
    getListFollowers: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/list-followers', {
            uid
        });
        return response.data;
    },

    // Get following list
    getListFollowing: async () => {
        const uid = authService.getUserId();
        const response = await apiClient.post('/api/users/list-following', {
            uid
        });
        return response.data;
    }
};

export default usersApi;
