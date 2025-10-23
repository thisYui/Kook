import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

/**
 * Custom hook for authentication
 */
export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());
    const [user, setUser] = useState(authService.getUserData());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize auth service
        const initAuth = async () => {
            setLoading(true);
            const isValid = await authService.initialize();
            setIsLoggedIn(isValid);
            setUser(authService.getUserData());
            setLoading(false);
        };

        initAuth();

        // Listen for storage changes (logout from another tab)
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                setIsLoggedIn(authService.isLoggedIn());
                setUser(authService.getUserData());
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = async (email, password, rememberMe = false) => {
        const { authApi } = await import('../api');
        const response = await authApi.login(email, password, rememberMe);
        setIsLoggedIn(true);
        setUser(authService.getUserData());
        return response;
    };

    const logout = async () => {
        try {
            // Call backend logout API
            const { authApi } = await import('../api');
            await authApi.logout();
        } catch (error) {
            console.error('Logout API failed:', error);
            // Continue with local logout even if API fails
        }

        // Clear local auth data using correct method
        authService.logout();
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    };

    const updateUser = (updates) => {
        authService.updateUserData(updates);
        setUser(authService.getUserData());
    };

    return {
        isLoggedIn,
        user,
        loading,
        login,
        logout,
        updateUser,
        userId: authService.getCurrentUserId(),
    };
};

/**
 * Hook to protect routes - redirect to login if not authenticated
 */
export const useRequireAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isValid = await authService.initialize();

            if (!isValid) {
                navigate('/login', { replace: true });
            }

            setLoading(false);
        };

        checkAuth();
    }, [navigate]);

    return { loading };
};
