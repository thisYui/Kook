import apiClient from './apiClient';
import authService from '../services/authService';
/**
 * Search API methods
 * Token is automatically added by apiClient interceptor for authenticated searches
 */
export const searchApi = {
    /**
     * Search posts by ingredient - Backend expects: ingredientID or text
     * @param {string|number} ingredientID - The ingredient ID to search for
     * @param {string} text - The ingredient name to search for
     * @param {number} [page=1] - The page number to retrieve
     * @param {number} [limit=20] - The number of results per page
     * @returns {Promise<Object>} The search results
     */
    searchByIngredient: async (ingredientID = null, text = null, page = 1, limit = 20) => {
        const token = authService.getToken();
        const response = await apiClient.post('/api/search/search-by-ingredient', {
            ingredientID,
            token,
            text,
            page,
            limit
        });
        return response.data;
    },

    /**
     * Search users by username - Backend expects: username
     * @param {string} username - The username to search for
     * @param {number} [page=1] - The page number to retrieve
     * @param {number} [limit=20] - The number of results per page
     * @returns {Promise<Object>} The search results
     */
    searchByUserName: async (username, page = 1, limit = 20) => {
        const token = authService.getToken();
        const response = await apiClient.post('/api/search/search-by-user-name', {
            username,
            token,
            page,
            limit
        });
        return response.data;
    },

    /**
     * Search posts by title - Backend expects: title
     * @param {string} title - The title to search for
     * @param {number} [page=1] - The page number to retrieve
     * @param {number} [limit=20] - The number of results per page
     * @returns {Promise<Object>} The search results
     */
    searchByTitle: async (title, page = 1, limit = 20) => {
        const token = authService.getToken();
        const response = await apiClient.post('/api/search/search-by-title', {
            title,
            token,
            page,
            limit
        });
        return response.data;
    },

    /**
     * Advanced search with multiple filters
     * @param {Object} filters - Search filters
     * @param {number} [page=1] - The page number
     * @param {number} [limit=20] - Results per page
     * @returns {Promise<Object>} The search results
     */
    advancedSearch: async (filters, page = 1, limit = 20) => {
        const token = authService.getToken();
        const response = await apiClient.post('/api/search/advanced', {
            ...filters,
            token,
            page,
            limit
        });
        return response.data;
    },
};

export default searchApi;
