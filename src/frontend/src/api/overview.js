import apiClient from './apiClient';

/**
 * Overview API methods
 */
export const overviewApi = {
    /**
     * Get dashboard data
     * @returns {Promise<Object>} The dashboard data
     */
    getDashboardData: async () => {
        const response = await apiClient.get('/api/overview/dashboard');
        return response.data;
    },
};

export default overviewApi;
