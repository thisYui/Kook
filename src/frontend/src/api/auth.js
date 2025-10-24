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

        // Backend always returns: { success: true, uid, user, remember_me, token, refresh_token, expires_in }
        const loginData = response.data;

        // Backend now always returns token (with different expiration times)
        if (loginData.token) {
            // Save tokens with rememberMe flag (affects storage location)
            authService.setTokens(
                loginData.token,
                loginData.refresh_token,
                loginData.expires_in || 3600,
                rememberMe
            );
            setAuthToken(loginData.token);
        }

        // Save user data
        if (loginData.user) {
            authService.setUserData(loginData.user, rememberMe);

            // Save theme, language, and role from user data
            if (loginData.user.theme) {
                authService.setTheme(loginData.user.theme, rememberMe);
            }
            if (loginData.user.language) {
                authService.setLanguage(loginData.user.language, rememberMe);
            }
            if (loginData.user.role) {
                authService.setRole(loginData.user.role, rememberMe);
            }
        }

        // Store UID
        if (loginData.uid) {
            authService.setUserId(loginData.uid, rememberMe);
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
            authService.setTokens(
                confirmData.token,
                confirmData.refresh_token,
                confirmData.expires_in || 3600,
                true // Auto login after confirm OTP with rememberMe = true
            );
            setAuthToken(confirmData.token);

            // Save user data
            if (confirmData.user) {
                authService.setUserData(confirmData.user, true);

                // Save theme, language, and role from user data
                if (confirmData.user.theme) {
                    authService.setTheme(confirmData.user.theme, true);
                }
                if (confirmData.user.language) {
                    authService.setLanguage(confirmData.user.language, true);
                }
                if (confirmData.user.role) {
                    authService.setRole(confirmData.user.role, true);
                }
            }

            // Store UID
            if (confirmData.uid) {
                authService.setUserId(confirmData.uid, true);
            }
        }

        return response.data;
    },

    // Resend OTP
    resendOTP: async (email) => {
        const response = await apiClient.post('/api/auth/resend', {
            email
        });
        // Backend returns: { success: true, message, data: { email, expires_in } }
        return response.data;
    },

    // Logout user
    logout: async () => {
        try {
            // Get token data before clearing
            const token = authService.getToken();

            if (token) {
                // Call backend logout to revoke token
                await apiClient.post('/api/auth/logout');
            }
        } catch (error) {
            console.error('Logout API error:', error);
            // Continue with local logout even if API fails
        } finally {
            // Clear local auth data
            authService.clearAuth();
            setAuthToken(null);
        }
    },

    // Refresh access token
    refreshToken: async (refreshToken) => {
        const response = await apiClient.post('/api/auth/refresh', {
            refresh_token: refreshToken
        });

        // Backend returns: { success: true, token, expires_in }
        const tokenData = response.data;

        if (tokenData.token) {
            setAuthToken(tokenData.token);
        }

        return tokenData;
    },

    // Change password
    changePassword: async (oldPassword, newPassword) => {
        const response = await apiClient.post('/api/auth/change-password', {
            old_password: oldPassword,
            new_password: newPassword
        });
        return response.data;
    },

    // Reset password request
    resetPassword: async (email) => {
        const response = await apiClient.post('/api/auth/reset-password', {
            email
        });
        return response.data;
    },

    // Change email
    changeEmail: async (newEmail) => {
        const response = await apiClient.post('/api/auth/change-email', {
            new_email: newEmail
        });
        return response.data;
    },
};

export default authApi;
