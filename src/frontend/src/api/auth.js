import apiClient, { setAuthToken } from './apiClient';
import authService from '../services/authService.js';

// Auth API methods
export const authApi = {
    // Login user
    login: async (email, password, rememberMe = false) => {
        const response = await apiClient.post('/api/auth/login', {
            email,
            password,
            rememberMe: rememberMe
        });

        // Backend returns: { success: true, uid, user, remember_me, token?, refresh_token?, expires_in? }
        const loginData = response.data;

        // Handle login based on rememberMe
        if (rememberMe && loginData.token) {
            // Token-based login (rememberMe = true)
            authService.handleLogin({
                token: loginData.token,
                refresh_token: loginData.refresh_token,
                expires_in: loginData.expires_in,
                user: loginData.user,
                remember_me: rememberMe
            });
            setAuthToken(loginData.token);
        } else {
            // Session-only login (rememberMe = false)
            if (loginData.user) {
                authService.setUserData(loginData.user, false); // Use sessionStorage
            }
            // Clear any existing tokens
            setAuthToken(null);
        }

        // Store UID
        if (loginData.uid) {
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('uid', loginData.uid);
        }

        return loginData;
    },

    // Register new user - Backend expects: email, password, fullName
    signup: async (fullName, email, password) => {
        const response = await apiClient.post('/api/auth/signup', {
            fullName,
            email,
            password,
        });
        // Backend returns: { success: true, message, data: { email, expires_in } }
        return response.data;
    },

    // Confirm OTP
    confirmOTP: async (email, otp) => {
        const response = await apiClient.post('/api/auth/confirm', {
            email,
            otp
        });

        // Backend returns: { success: true, message, data: { uid, token, refresh_token, expires_in, user } }
        if (response.data.data && response.data.data.token) {
            const confirmData = response.data.data;
            authService.handleLogin({
                token: confirmData.token,
                refresh_token: confirmData.refresh_token,
                expires_in: confirmData.expires_in,
                user: confirmData.user,
                remember_me: true // Auto login after confirm OTP
            });
            setAuthToken(confirmData.token);

            // Store UID
            if (confirmData.uid) {
                localStorage.setItem('uid', confirmData.uid);
            }
        }

        return response.data;
    },

    // Request OTP
    requestOTP: async (email) => {
        const response = await apiClient.post('/api/auth/send-otp', {
            email
        });
        // Backend returns: { success: true, message, data: { expires_in } }
        return response.data;
    },

    // Verify token
    verifyToken: async (token) => {
        const response = await apiClient.post('/api/auth/verify-token', {
            token
        });
        // Backend returns: { success: true, message, data: decoded }
        return response.data;
    },

    // Refresh token
    refreshToken: async (oldToken) => {
        const response = await apiClient.post('/api/auth/refresh-token', {
            token: oldToken
        });

        // Backend returns: { success: true, message, data: { token, expires_in } }
        if (response.data.data && response.data.data.token) {
            const tokenData = response.data.data;
            authService.setTokens(
                tokenData.token,
                oldToken, // Keep old refresh token
                tokenData.expires_in || 3600
            );
            setAuthToken(tokenData.token);
        }

        return response.data;
    },

    // Logout
    logout: async () => {
        const token = authService.getToken();

        // If no token, just clear local auth and return success
        if (!token) {
            authService.logout();
            setAuthToken(null);
            return { success: true, message: 'Logged out successfully!' };
        }

        try {
            // Backend expects: { token: "jwt_token" }
            // Backend will decode token to get JTI and revoke it
            const response = await apiClient.post('/api/auth/logout', {
                token: token,
            });

            // Clear local auth after successful backend logout
            authService.logout();
            setAuthToken(null);

            return response.data;
        } catch (error) {
            // Clear auth even if logout request fails
            authService.logout();
            setAuthToken(null);
            throw error;
        }
    },
};

export default authApi;
