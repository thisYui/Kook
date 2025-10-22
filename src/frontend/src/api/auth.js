import apiClient, { setAuthToken } from './apiClient';
import authService from './authService';

// Auth API methods
export const authApi = {
    // Login user
    login: async (email, password, rememberMe = false) => {
        const body = {
            email,
            password,
            rememberMe: rememberMe
        };

        const response = await apiClient.post('/api/auth/login', body);

        // Only handle token if rememberMe is true and token exists
        if (rememberMe && response.data.token) {
            // Use authService to handle login with token
            authService.handleLogin(response.data);
            setAuthToken(response.data.token);
        } else {
            // Session-only login without token
            // Store user info in sessionStorage instead of localStorage
            if (response.data.user) {
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
            }
            // Clear any existing tokens
            authService.logout();
        }

        if (response.data.uid) {
            if (rememberMe) {
                localStorage.setItem('uid', response.data.uid);
            } else {
                sessionStorage.setItem('uid', response.data.uid);
            }
        }

        return response.data;
    },

    // Register new user - Backend expects: email, password, fullName
    signup: async (fullName, email, password) => {
        const response = await apiClient.post('/api/auth/signup', {
            fullName,
            email,
            password,
        });
        return response.data;
    },

    // Confirm OTP
    confirmOTP: async (email, otp) => {
        const response = await apiClient.post('/api/auth/confirm', {
            email,
            otp
        });

        // Backend returns nested data: response.data.data.token
        if (response.data.data && response.data.data.token) {
            authService.handleLogin({
                token: response.data.data.token,
                refresh_token: response.data.data.refresh_token,
                expires_in: response.data.data.expires_in,
                uid: response.data.data.uid,
                user: response.data.data.user,
            });
            setAuthToken(response.data.data.token);
        }

        return response.data;
    },

    // Request OTP
    requestOTP: async (email) => {
        const response = await apiClient.post('/api/auth/send-otp', {
            email
        });
        return response.data;
    },

    // Verify token
    verifyToken: async (token) => {
        const response = await apiClient.post('/api/auth/verify-token', {
            token,
            device: navigator.platform,
            user_agent: navigator.userAgent,
        });
        return response.data;
    },

    // Refresh token
    refreshToken: async (oldToken) => {
        const response = await apiClient.post('/api/auth/refresh-token', {
            token: oldToken,
            device: navigator.platform,
            user_agent: navigator.userAgent,
        });

        // Backend returns: response.data.data.token (nested)
        if (response.data.data && response.data.data.token) {
            authService.setTokens(
                response.data.data.token,
                oldToken, // Keep old refresh token
                response.data.data.expires_in || 3600
            );
            setAuthToken(response.data.data.token);
        }

        return response.data;
    },

    // Logout
    logout: async () => {
        const token = authService.getToken();

        if (!token) {
            return { success: true };
        }

        try {
            const response = await apiClient.post('/api/auth/logout', {
                token: token,  // ✅ Changed from 'jti' to 'token'
            });

            authService.clearAuth();
            setAuthToken(null);

            return response.data;
        } catch (error) {
            // Clear auth even if logout request fails
            authService.clearAuth();
            setAuthToken(null);
            throw error;
        }
    },
};

export default authApi;
