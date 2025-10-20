import apiClient from './apiClient';

/**
 * Search API methods
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
        const response = await apiClient.post('/api/search/search-by-ingredient', {
            ingredientID,
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
        const response = await apiClient.post('/api/search/search-by-user-name', {
            username,
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
        const response = await apiClient.post('/api/search/search-by-title', {
            title,
            page,
            limit
        });
        return response.data;
    },
};

export default searchApi;
