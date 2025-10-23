/**
 * Authentication Service
 * Handles token management, refresh token, and auto-login
 * Supports both persistent (localStorage) and session-only (sessionStorage) authentication
 */

import { STORAGE_KEYS } from '../constants/index.js';

class AuthService {
    constructor() {
        this.refreshTokenTimeout = null;
        this.isRefreshing = false;
        this.refreshSubscribers = [];
    }

    /**
     * Check if remember me is enabled
     */
    getRememberMe() {
        return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
    }

    /**
     * Set remember me flag
     */
    setRememberMe(rememberMe) {
        if (rememberMe) {
            localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
        } else {
            localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
        }
    }

    /**
     * Get storage based on rememberMe flag
     */
    getStorage() {
        // Check if remember me is enabled
        const rememberMe = this.getRememberMe();
        return rememberMe ? localStorage : sessionStorage;
    }

    /**
     * Save authentication tokens
     */
    setTokens(token, refreshToken, expiresIn = 3600, rememberMe = false) {
        const storage = rememberMe ? localStorage : sessionStorage;

        // Save remember me flag
        this.setRememberMe(rememberMe);

        storage.setItem(STORAGE_KEYS.TOKEN, token);
        if (refreshToken) {
            storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }

        // Calculate expiry time (current time + expiresIn seconds - 5 minutes buffer)
        const expiryTime = Date.now() + (expiresIn * 1000) - (5 * 60 * 1000);
        storage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());

        // Schedule token refresh
        this.scheduleTokenRefresh(expiryTime);
    }

    /**
     * Get current access token
     */
    getToken() {
        const storage = this.getStorage();
        return storage.getItem(STORAGE_KEYS.TOKEN);
    }

    /**
     * Get refresh token
     */
    getRefreshToken() {
        const storage = this.getStorage();
        return storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    /**
     * Get token expiry time
     */
    getTokenExpiry() {
        const storage = this.getStorage();
        const expiry = storage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
        return expiry ? parseInt(expiry, 10) : null;
    }

    /**
     * Check if token is expired or about to expire
     */
    isTokenExpired() {
        const expiry = this.getTokenExpiry();
        if (!expiry) return true;
        return Date.now() >= expiry;
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        const token = this.getToken();
        return !!(token && !this.isTokenExpired());
    }

    /**
     * Save user data
     */
    setUserData(userData, rememberMe = false) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    }

    /**
     * Get user data
     */
    getUserData() {
        const storage = this.getStorage();
        const data = storage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Save user ID
     */
    setUserId(uid, rememberMe = false) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEYS.UID, uid);
    }

    /**
     * Get user ID
     */
    getUserId() {
        const storage = this.getStorage();
        return storage.getItem(STORAGE_KEYS.UID);
    }

    /**
     * Clear all authentication data
     */
    clearAuth() {
        // Clear from both storages
        [localStorage, sessionStorage].forEach(storage => {
            storage.removeItem(STORAGE_KEYS.TOKEN);
            storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            storage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
            storage.removeItem(STORAGE_KEYS.USER_DATA);
            storage.removeItem(STORAGE_KEYS.UID);
        });

        // Clear remember me flag
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);

        // Cancel scheduled refresh
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
            this.refreshTokenTimeout = null;
        }
    }

    /**
     * Logout - clear all auth data
     */
    logout() {
        this.clearAuth();
    }

    /**
     * Schedule automatic token refresh
     */
    scheduleTokenRefresh(expiryTime) {
        // Cancel any existing scheduled refresh
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
        }

        const now = Date.now();
        const timeUntilRefresh = expiryTime - now;

        if (timeUntilRefresh > 0) {
            this.refreshTokenTimeout = setTimeout(() => {
                this.refreshAccessToken();
            }, timeUntilRefresh);
        } else {
            // Token already expired, refresh immediately
            this.refreshAccessToken();
        }
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshAccessToken() {
        // Prevent multiple simultaneous refresh requests
        if (this.isRefreshing) {
            return new Promise((resolve) => {
                this.refreshSubscribers.push(resolve);
            });
        }

        this.isRefreshing = true;
        const refreshToken = this.getRefreshToken();
        const rememberMe = this.getRememberMe(); // Get current rememberMe flag

        if (!refreshToken) {
            this.isRefreshing = false;
            this.clearAuth();
            return null;
        }

        try {
            // Import apiClient here to avoid circular dependency
            const { authApi } = await import('../api/auth.js');

            // Call refreshToken (not renewToken)
            const response = await authApi.refreshToken(refreshToken);

            // Backend returns: { success: true, data: { token, expires_in } }
            const tokenData = response.data || response;

            if (tokenData.token) {
                // Keep the same rememberMe flag when refreshing
                this.setTokens(
                    tokenData.token,
                    refreshToken, // Keep same refresh token
                    tokenData.expires_in || 3600,
                    rememberMe // Use the same rememberMe flag
                );

                // Notify all subscribers
                this.refreshSubscribers.forEach(callback => callback(tokenData.token));
                this.refreshSubscribers = [];

                this.isRefreshing = false;
                return tokenData.token;
            }
        } catch (error) {
            console.error('Failed to refresh token:', error);
            this.clearAuth();
            this.isRefreshing = false;

            // Redirect to login page
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }

        this.isRefreshing = false;
        return null;
    }

    /**
     * Initialize auth service - check and refresh token if needed
     */
    async initialize() {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        // If token is expired, try to refresh
        if (this.isTokenExpired()) {
            const newToken = await this.refreshAccessToken();
            return !!newToken;
        }

        // Schedule refresh for valid token
        const expiry = this.getTokenExpiry();
        if (expiry) {
            this.scheduleTokenRefresh(expiry);
        }

        return true;
    }

    /**
     * Handle successful login
     */
    handleLogin(loginResponse) {
        const {
            token,
            refresh_token,
            expires_in,
            user,
            remember_me
        } = loginResponse;

        // Only set tokens if they exist (rememberMe = true)
        if (token) {
            this.setTokens(token, refresh_token, expires_in, remember_me);
        }

        if (user) {
            this.setUserData(user, remember_me);
        }

        return { success: true, user };
    }

    /**
     * Update user data
     */
    updateUserData(updates) {
        const currentUser = this.getUserData();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            const storage = this.getStorage();
            storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
            return updatedUser;
        }
        return null;
    }

    getCurrentUserId() {
        return this.getUserId();
    }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
