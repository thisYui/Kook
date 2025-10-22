import apiClient, { setAuthToken } from './apiClient';
import authService from './authService';

// Auth API methods
export const authApi = {
    // Login user
    login: async (email, password, rememberMe = false) => {
        const body = {
            email,
            password,
            rememberMe: rememberMe,
            jwtToken: {
                device: navigator.platform,
                user_agent: navigator.userAgent,
            }
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
    signup: async (fullName, email, password, confirmPassword) => {
        const response = await apiClient.post('/api/auth/signup', {
            fullName,
            email,
            password,
            confirm_password: confirmPassword
        });
        return response.data;
    },

    // Confirm OTP
    confirmOTP: async (email, otp) => {
        const response = await apiClient.post('/api/auth/confirm', {
            email,
            otp
        });

        // If OTP confirmation returns token, handle login
        if (response.data.token) {
            authService.handleLogin(response.data);
            setAuthToken(response.data.token);
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

    // Reset password - Backend expects: email, otp, newPassword
    resetPassword: async (email, otp, newPassword, confirmPassword) => {
        const response = await apiClient.post('/api/auth/reset-password', {
            email,
            otp,
            newPassword,
            confirm_password: confirmPassword
        });
        return response.data;
    },

    // Change email - Backend expects: uid, newEmail
    changeEmail: async (uid, newEmail, password) => {
        const response = await apiClient.post('/api/auth/change-email', {
            uid,
            newEmail,
            password
        });

        // Update user data if successful
        if (response.data.success) {
            authService.updateUserData({ email: newEmail });
        }

        return response.data;
    },

    // Change password
    changePassword: async (userId, oldPassword, newPassword, confirmPassword) => {
        const response = await apiClient.post('/api/auth/change-password', {
            user_id: userId,
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        });
        return response.data;
    },

    // Change avatar
    changeAvatar: async (userId, avatarFile) => {
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('avatar', avatarFile);

        const response = await apiClient.post('/api/auth/change-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        // Update user data if successful
        if (response.data.success && response.data.avatar_url) {
            authService.updateUserData({ avatar: response.data.avatar_url });
        }

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

        if (response.data.token) {
            authService.setTokens(
                response.data.token,
                response.data.refresh_token || oldToken,
                response.data.expires_in || 3600
            );
            setAuthToken(response.data.token);
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
                jti: token,
                device: navigator.platform,
                user_agent: navigator.userAgent,
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
