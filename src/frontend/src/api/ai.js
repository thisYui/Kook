import apiClient from './apiClient';

// AI API methods
export const aiApi = {
    // Generate weekly menu plan - Backend expects: uid, preferences, dietaryRestrictions
    generateMenuWeek: async (uid, preferences, dietaryRestrictions) => {
        const response = await apiClient.post('/api/ai/generate-menu-week', {
            uid,
            preferences,
            dietaryRestrictions
        });
        return response.data;
    },

    // Image recognition for food/ingredients - Backend expects: uid, imageData, formatFile
    imageRecognition: async (uid, imageData, formatFile) => {
        const response = await apiClient.post('/api/ai/image-recognition', {
            uid,
            imageData,
            formatFile
        });
        return response.data;
    },

    // Get suggested dishes based on ingredients - Backend expects: uid, ingredients, preferences
    suggestedDishes: async (uid, ingredients, preferences = {}) => {
        const response = await apiClient.post('/api/ai/suggested-dishes', {
            uid,
            ingredients,
            preferences
        });
        return response.data;
    },

    // Analyze nutrition of a recipe/meal - Backend expects: uid, recipeId, ingredients
    nutritionAnalysis: async (uid, recipeId, ingredients) => {
        const response = await apiClient.post('/api/ai/nutrition-analysis', {
            uid,
            recipeId,
            ingredients
        });
        return response.data;
    },
};

export default aiApi;
