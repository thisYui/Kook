import apiClient, { setAuthToken } from './apiClient';

// Auth API methods
export const authApi = {
    // Login user
    login: async (email, password, rememberMe = false) => {
        const body = {
            email,
            password,
            remember_me: rememberMe,
            jwt_token: {
                device: navigator.platform,
                user_agent: navigator.userAgent,
            }
        };

        const response = await apiClient.post('/api/auth/login', body);

        if (response.data.token) {
            setAuthToken(response.data.token);
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    },

    // Register new user - Backend expects: email, password, fullName
    signup: async (fullName, email, password, confirmPassword) => {
        const response = await apiClient.post('/api/auth/signup', {
            fullName,  // Changed from full_name to fullName
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
            newPassword,  // Changed from new_password to newPassword
            confirm_password: confirmPassword
        });
        return response.data;
    },

    // Change email - Backend expects: uid, newEmail
    changeEmail: async (uid, newEmail, password) => {
        const response = await apiClient.post('/api/auth/change-email', {
            uid,  // Changed from user_id to uid
            newEmail,  // Changed from new_email to newEmail
            password
        });
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

    // Renew token
    renewToken: async (oldToken) => {
        const response = await apiClient.post('/api/auth/renew-token', {
            token: oldToken,
            device: navigator.platform,
            user_agent: navigator.userAgent,
        });

        if (response.data.token) {
            setAuthToken(response.data.token);
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    },

    // Logout
    logout: async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return { success: true };
        }

        const response = await apiClient.post('/api/auth/logout', {
            jti: token,
            device: navigator.platform,
            user_agent: navigator.userAgent,
        });

        setAuthToken(null);
        sessionStorage.clear();
        localStorage.removeItem('token');

        return response.data;
    },
};

export default authApi;
