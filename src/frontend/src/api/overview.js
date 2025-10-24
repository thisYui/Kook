import apiClient from './apiClient';

/**
 * Overview API methods
 * Token is automatically added by apiClient interceptor
 */
export const overviewApi = {
    /**
     * Get dashboard data
     * Requires authentication - token is automatically included
     * @returns {Promise<Object>} The dashboard data
     */
    getDashboardData: async () => {
        const response = await apiClient.get('/api/overview/dashboard');
        return response.data;
    },

    /**
     * Get trending posts
     * @param {number} limit - Number of posts to retrieve
     * @returns {Promise<Object>} Trending posts
     */
    getTrendingPosts: async (limit = 10) => {
        const response = await apiClient.get('/api/overview/trending', {
            params: { limit }
        });
        return response.data;
    },

    /**
     * Get recommended recipes for user
     * Requires authentication
     * @returns {Promise<Object>} Recommended recipes
     */
    getRecommendedRecipes: async () => {
        const response = await apiClient.get('/api/overview/recommended');
        return response.data;
    },
};

export default overviewApi;
