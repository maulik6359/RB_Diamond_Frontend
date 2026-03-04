// ============================================================================
// AUTH SERVICE - API CALLS
// ============================================================================

import { apiClient } from './ApiClient';
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    RefreshTokenRequest,
    User,
} from '../types/types';
import { setUser } from '../features/auth/authSlice';
import type { AppDispatch } from '../app/store/store';

// ============================================================================
// AUTH API ENDPOINTS
// ============================================================================

export const authService = {
    /**
     * Login user with username and password
     */
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data as unknown as AuthResponse;
    },

    /**
     * Register new user
     */
    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data as unknown as AuthResponse;
    },

    /**
     * Refresh authentication token
     */
    async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/refresh-token', data);
        return response.data as unknown as AuthResponse;
    },

    /**
     * Get user
     */
    async getUser(dispatch: AppDispatch): Promise<User> {
        const response = await apiClient.get<User>('/auth/user');
        dispatch(setUser(response.data));
        return response.data;
    },
};
