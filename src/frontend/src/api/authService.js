/**
 * Authentication Service
 * Handles token management, refresh token, and auto-login
 */

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';
const USER_DATA_KEY = 'user_data';

class AuthService {
    constructor() {
        this.refreshTokenTimeout = null;
        this.isRefreshing = false;
        this.refreshSubscribers = [];
    }

    /**
     * Save authentication tokens
     */
    setTokens(token, refreshToken, expiresIn = 3600) {
        localStorage.setItem(TOKEN_KEY, token);
        if (refreshToken) {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }

        // Calculate expiry time (current time + expiresIn seconds - 5 minutes buffer)
        const expiryTime = Date.now() + (expiresIn * 1000) - (5 * 60 * 1000);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

        // Schedule token refresh
        this.scheduleTokenRefresh(expiryTime);
    }

    /**
     * Get current access token
     */
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    /**
     * Get refresh token
     */
    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    /**
     * Get token expiry time
     */
    getTokenExpiry() {
        const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
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
        return !!token && !this.isTokenExpired();
    }

    /**
     * Save user data
     */
    setUserData(userData) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }

    /**
     * Get user data
     */
    getUserData() {
        const data = localStorage.getItem(USER_DATA_KEY);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Clear all authentication data
     */
    clearAuth() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        sessionStorage.clear();

        // Cancel scheduled refresh
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
            this.refreshTokenTimeout = null;
        }
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

        if (!refreshToken) {
            this.isRefreshing = false;
            this.clearAuth();
            return null;
        }

        try {
            // Import apiClient here to avoid circular dependency
            const { authApi } = await import('./auth');

            const response = await authApi.renewToken(refreshToken);

            if (response.token) {
                this.setTokens(
                    response.token,
                    response.refresh_token || refreshToken,
                    response.expires_in || 3600
                );

                // Notify all subscribers
                this.refreshSubscribers.forEach(callback => callback(response.token));
                this.refreshSubscribers = [];

                this.isRefreshing = false;
                return response.token;
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
            ...rest
        } = loginResponse;

        this.setTokens(token, refresh_token, expires_in);

        if (user) {
            this.setUserData(user);
        }

        return { success: true, user };
    }

    /**
     * Handle logout
     */
    async handleLogout() {
        try {
            const { authApi } = await import('./auth');
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    /**
     * Get current user ID
     */
    getCurrentUserId() {
        const userData = this.getUserData();
        return userData?.id || userData?.uid || null;
    }

    /**
     * Update user data partially
     */
    updateUserData(updates) {
        const currentData = this.getUserData() || {};
        const newData = { ...currentData, ...updates };
        this.setUserData(newData);
        return newData;
    }
}

// Export singleton instance
const authService = new AuthService();
export default authService;

