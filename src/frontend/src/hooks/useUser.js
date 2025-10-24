import { useState, useEffect } from 'react';
import authService from '../services/authService.js';

/**
 * Custom hook for user information
 * Provides easy access to user data (uid, theme, language, role, etc.)
 * For authentication state and token management, use useAuth hook instead
 */
export const useUser = () => {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [theme, setTheme] = useState(null);
    const [language, setLanguage] = useState(null);
    const [role, setRole] = useState(null);

    // Load user data from storage
    const loadUserData = () => {
        const userData = authService.getUserData();
        const userId = authService.getUserId();
        const userTheme = authService.getTheme();
        const userLanguage = authService.getLanguage();
        const userRole = authService.getRole();

        setUser(userData);
        setUid(userId);
        setTheme(userTheme);
        setLanguage(userLanguage);
        setRole(userRole);
    };

    useEffect(() => {
        // Initial load
        loadUserData();

        // Listen for storage changes (login/logout from another tab or same tab)
        const handleStorageChange = (e) => {
            if (e.key === 'user_data' || e.key === 'uid' || e.key === 'theme' || e.key === 'language' || e.key === 'role') {
                loadUserData();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Update theme
    const updateTheme = (newTheme) => {
        const rememberMe = authService.getRememberMe();
        authService.setTheme(newTheme, rememberMe);
        setTheme(newTheme);
    };

    // Update language
    const updateLanguage = (newLanguage) => {
        const rememberMe = authService.getRememberMe();
        authService.setLanguage(newLanguage, rememberMe);
        setLanguage(newLanguage);
    };

    // Update user data
    const updateUser = (updates) => {
        const updatedUser = authService.updateUserData(updates);
        setUser(updatedUser);
    };

    // Refresh user data
    const refresh = () => {
        loadUserData();
    };

    return {
        // User data
        user,
        uid,
        theme,
        language,
        role,

        // Helper methods
        updateTheme,
        updateLanguage,
        updateUser,
        refresh,

        // Computed properties
        isAdmin: role === 'ADMIN',
        isModerator: role === 'MODERATOR',
        isUser: role === 'USER',
    };
};

export default useUser;
