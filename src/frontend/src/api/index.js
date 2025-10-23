/**
 * Central export for all API modules
 *
 * Usage:
 * import api from '@/api';
 * await api.auth.login(email, password);
 *
 * Or import specific modules:
 * import { authApi, postsApi, authService } from '@/api';
 * await authApi.login(email, password);
 */

import apiClient from './apiClient';
import authService from '../services/authService.js';
import { authApi } from './auth';
import { postsApi } from './posts';
import { usersApi } from './users';
import { aiApi } from './ai';
import { searchApi } from './search';
import { overviewApi } from './overview';
import { filesApi } from './files';

// Export individual APIs
export {
    apiClient,
    authService,
    authApi,
    postsApi,
    usersApi,
    aiApi,
    searchApi,
    overviewApi,
    filesApi,
};

// Default export with all APIs combined
export default {
    auth: authApi,
    posts: postsApi,
    users: usersApi,
    ai: aiApi,
    search: searchApi,
    overview: overviewApi,
    files: filesApi,
    authService,
};
