// ============================================================================
// CLIENT SLICE - REDUX STATE MANAGEMENT
// ============================================================================

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Client, PaginationMeta } from '../../types/types';

interface ClientState {
    clients: Client[];
    currentClient: Client | null;
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
}

const initialState: ClientState = {
    clients: [],
    currentClient: null,
    loading: false,
    error: null,
    pagination: null,
};

const clientSlice = createSlice({
    name: 'client',
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

        setClients(state, action: PayloadAction<{ data: Client[]; meta: PaginationMeta }>) {
            state.clients = action.payload.data;
            state.pagination = action.payload.meta;
            state.loading = false;
            state.error = null;
        },

        setCurrentClient(state, action: PayloadAction<Client | null>) {
            state.currentClient = action.payload;
        },

        addClient(state, action: PayloadAction<Client>) {
            state.clients.unshift(action.payload);
        },

        updateClient(state, action: PayloadAction<Client>) {
            const index = state.clients.findIndex((cli) => cli.id === action.payload.id);
            if (index !== -1) {
                state.clients[index] = action.payload;
            }
            if (state.currentClient?.id === action.payload.id) {
                state.currentClient = action.payload;
            }
        },

        removeClient(state, action: PayloadAction<string>) {
            state.clients = state.clients.filter((cli) => cli.id !== action.payload);
            if (state.currentClient?.id === action.payload) {
                state.currentClient = null;
            }
        },
    },
});

export const {
    setLoading,
    setError,
    clearError,
    setClients,
    setCurrentClient,
    addClient,
    updateClient,
    removeClient,
} = clientSlice.actions;

export default clientSlice.reducer;
