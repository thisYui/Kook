import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Protected Route Component
 * Wrap routes that require authentication
 *
 * Usage:
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <DashboardPage />
 *   </ProtectedRoute>
 * } />
 */
export const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

/**
 * Public Only Route Component
 * Redirect to home if already logged in (for login/signup pages)
 *
 * Usage:
 * <Route path="/login" element={
 *   <PublicOnlyRoute>
 *     <LoginPage />
 *   </PublicOnlyRoute>
 * } />
 */
export const PublicOnlyRoute = ({ children, redirectTo = '/' }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default ProtectedRoute;

