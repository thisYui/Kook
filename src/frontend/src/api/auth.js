import axios from 'axios';

// Base URL for the backend API - adjust based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    || `${window.location.protocol}//${window.location.hostname}:80`;


// Create an Axios instance with default configurations
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set the Authorization header with the JWT token
const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Auth API methods
export const authApi = {
    login: async (email, password, rememberMe = false) => {
        let body;

        if (localStorage.getItem('token') !== null) {
            body = {
                token: {
                    jti: localStorage.getItem('token'),
                    device: navigator.platform,
                    user_agent: navigator.userAgent,
                }
            };
        } else if (email && password) {
            body = {
                email,
                password,
                remember_me: rememberMe,
                jwt_token: {
                    device: navigator.platform,
                    user_agent: navigator.userAgent,
                }
            };
        } else {
            return { error: 'No token or credentials provided' };
        }

        const response = await apiClient.post('/auth/login', body);

        if (response.data.token) {
            setAuthToken(response.data.token);
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    },

    register: async (full_name, email, password, confirm_password) => {
      const response = await apiClient.post('/auth/register', {
          full_name,
          email,
          password,
          confirm_password
      });
      return response.data;
    },

    sendOtp: async (email) => {
        const response = await apiClient.post('/auth/send_otp', { email });
        return response.data;
    },

    confirmOtp: async (email, otp) => {
        const response = await apiClient.post('/auth/confirm_otp', { email, otp });
        return response.data;
    },

    logout: async () => {
        if (localStorage.getItem('token') === null) {
            return true;
        }

        const token = {
            jti: localStorage.getItem('token'),
            device: navigator.platform,
            user_agent: navigator.userAgent,
            user_id: sessionStorage.getItem('user_id'),
        };

        const response = await apiClient.post(`/auth/logout`, token );

        setAuthToken(null);
        sessionStorage.clear();
        localStorage.removeItem('token');

        return response.data;
    },

    renewToken: async () => {
        const token = {
            jti: localStorage.getItem('token'),
            device: navigator.platform,
            user_agent: navigator.userAgent,
        };

        const response = await apiClient.post('/auth/renew_token', token);

        if (response.data.token) {
            setAuthToken(response.data.token);
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    }
};

// Initialize the token from localStorage if it exists
const storedToken = localStorage.getItem('token');
if (storedToken) {
    setAuthToken(storedToken);
}

// Axios interceptors for handling responses and errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token might be expired or invalid
            setAuthToken(null);
            localStorage.removeItem('token');
            // Optionally redirect to login page or show a message
            console.error('Unauthorized: Token expired or invalid');
        }
        return Promise.reject(error);
    }
);

export default apiClient;
