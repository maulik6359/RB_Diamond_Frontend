// ============================================================================
// PACKET SERVICE - API CALLS
// ============================================================================

import { apiClient } from './ApiClient';
import type {
    Packet,
    CreatePacketRequest,
    UpdatePacketRequest,
    AssignPacketRequest,
    UpdatePacketStatusRequest,
    PacketStatusSummary,
    PacketStatus,
    PaginatedResponse,
    PaginationParams,
} from '../types/types';

// ============================================================================
// PACKET API ENDPOINTS
// ============================================================================

export const packetService = {
    /**
     * Get all packets with optional pagination
     */
    async getAll(params?: PaginationParams): Promise<PaginatedResponse<Packet>> {
        const response = await apiClient.get<PaginatedResponse<Packet>>('/packets', {
            params,
        });
        return response.data;
    },

    /**
     * Get packet by ID
     */
    async getById(id: string): Promise<Packet> {
        const response = await apiClient.get<Packet>(`/packets/${id}`);
        return response.data;
    },

    /**
     * Get packets by status
     */
    async getByStatus(status: PacketStatus, params?: PaginationParams): Promise<PaginatedResponse<Packet>> {
        const response = await apiClient.get<PaginatedResponse<Packet>>('/packets/by-status', {
            params: { ...params, status },
        });
        return response.data;
    },

    /**
     * Get packet status summary
     */
    async getStatus(): Promise<PacketStatusSummary> {
        const response = await apiClient.get<PacketStatusSummary>('/packets/status');
        return response.data;
    },

    /**
     * Create new packet
     */
    async create(data: CreatePacketRequest): Promise<Packet> {
        const response = await apiClient.post<Packet>('/packets', data);
        return response.data;
    },

    /**
     * Update existing packet
     */
    async update(id: string, data: UpdatePacketRequest): Promise<Packet> {
        const response = await apiClient.put<Packet>(`/packets/${id}`, data);
        return response.data;
    },

    /**
     * Delete packet
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete(`/packets/${id}`);
    },

    /**
     * Assign packet to employee
     */
    async assign(id: string, data: AssignPacketRequest): Promise<Packet> {
        const response = await apiClient.post<Packet>(`/packets/${id}/assign`, data);
        return response.data;
    },

    /**
     * Update packet status
     */
    async updateStatus(id: string, data: UpdatePacketStatusRequest): Promise<Packet> {
        const response = await apiClient.patch<Packet>(`/packets/${id}/status`, data);
        return response.data;
    },
};
