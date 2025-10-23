import axios from 'axios';
import authService from '../services/authService.js';

// Base URL for the backend API - adjust based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

// Create an Axios instance with default configurations
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set the Authorization header with the JWT token
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Initialize auth token if exists
const token = authService.getToken();
if (token) {
    setAuthToken(token);
}

// Request interceptor - add token to every request
apiClient.interceptors.request.use(
    async (config) => {
        // Check if token is expired before making request
        if (authService.isTokenExpired()) {
            const newToken = await authService.refreshAccessToken();
            if (newToken) {
                setAuthToken(newToken);
                config.headers['Authorization'] = `Bearer ${newToken}`;
            }
        } else {
            const token = authService.getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle 401 errors and retry with refreshed token
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const newToken = await authService.refreshAccessToken();

                if (newToken) {
                    // Update token and retry original request
                    setAuthToken(newToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, clear auth and redirect to login
                authService.clearAuth();
                setAuthToken(null);

                // Redirect to login page
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            }
        }

        // For other errors or if refresh failed
        if (error.response && error.response.status === 401) {
            authService.clearAuth();
            setAuthToken(null);
            console.error('Unauthorized: Token expired or invalid');
        }

        return Promise.reject(error);
    }
);

export default apiClient;
