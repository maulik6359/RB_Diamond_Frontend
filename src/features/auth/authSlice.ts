// ============================================================================
// AUTH SLICE - REDUX STATE MANAGEMENT
// ============================================================================

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },

    clearError(state) {
      state.error = null;
    },

    login(state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // Persist tokens
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },

    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { login, logout, setUser, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;

