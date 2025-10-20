import axios from 'axios';

// Base URL for the backend API - adjust based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:3000`;

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
const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

// Axios interceptors for handling responses and errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token might be expired or invalid
            setAuthToken(null);
            localStorage.removeItem('token');
            console.error('Unauthorized: Token expired or invalid');
        }
        return Promise.reject(error);
    }
);

export default apiClient;

