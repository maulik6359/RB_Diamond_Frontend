// ============================================================================
// CLIENT SERVICE - API CALLS
// ============================================================================

import { apiClient } from './ApiClient';
import type {
    Client,
    CreateClientRequest,
    UpdateClientRequest,
    PaginatedResponse,
    PaginationParams,
} from '../types/types';

// ============================================================================
// CLIENT API ENDPOINTS
// ============================================================================

export const clientService = {
    /**
     * Get all clients with optional pagination
     */
    async getAll(params?: PaginationParams): Promise<PaginatedResponse<Client>> {
        const response = await apiClient.get<Client[]>('/clients', {
            params,
        });
        return {
            data: response.data,
            meta: response.meta,
        };
    },

    /**
     * Get client by ID
     */
    async getById(id: string): Promise<Client> {
        const response = await apiClient.get<Client>(`/clients/${id}`);
        return response.data;
    },

    /**
     * Create new client
     */
    async create(data: CreateClientRequest): Promise<Client> {
        const response = await apiClient.post<Client>('/clients', data);
        return response.data;
    },

    /**
     * Update existing client
     */
    async update(id: string, data: UpdateClientRequest): Promise<Client> {
        const response = await apiClient.put<Client>(`/clients/${id}`, data);
        return response.data;
    },

    /**
     * Delete client
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete(`/clients/${id}`);
    },
};
