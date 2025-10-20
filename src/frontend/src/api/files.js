import apiClient from './apiClient';

/**
 * Files API methods
 *
 * This module provides methods to interact with files stored in the backend.
 * It allows you to get the file URL and to show or download the file.
 */
export const filesApi = {
    // Get file URL
    getFileUrl: (id, filename) => {
        return `${apiClient.defaults.baseURL}/storage/${id}/${filename}`;
    },

    // Show/download file
    showFile: async (id, filename) => {
        const response = await apiClient.get(`/storage/${id}/${filename}`, {
            responseType: 'blob'
        });
        return response.data;
    },
};

export default filesApi;
