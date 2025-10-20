import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import FullPageLayout from './layouts/FullPageLayout';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmOTPPage from './pages/ConfirmOTPPage';
import SettingPage from './pages/SettingPage';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import RepostPage from './pages/RepostPage';
import NotebookPage from './pages/NotebookPage';
import QuestionPage from './pages/QuestionPage';
import SearchPage from './pages/SearchPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AIPage from './pages/AIPage';
import IndexPage from './pages/IndexPage';
import CookPage from './pages/CookPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth components
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';
import authService from './api/authService';

function App() {
  // Initialize auth service when app loads
  useEffect(() => {
    authService.initialize();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Index Page first */}
        <Route path="/" element={<IndexPage />} />

        {/* Public Only Routes - Redirect to home if already logged in */}
        <Route element={
          <PublicOnlyRoute redirectTo="/">
            <AuthLayout />
          </PublicOnlyRoute>
        }>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/confirm-otp" element={<ConfirmOTPPage />} />
        </Route>

        {/* Protected Routes - Require authentication */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/post" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/repost/:id" element={<RepostPage />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/" element={<IndexPage />} />
        </Route>

        {/* Full Page Layout Routes - Protected */}
        <Route element={
          <ProtectedRoute>
            <FullPageLayout />
          </ProtectedRoute>
        }>
          <Route path="/cook/:id" element={<CookPage />} />
        </Route>

        {/* Public Utility Routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
