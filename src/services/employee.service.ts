// ============================================================================
// EMPLOYEE SERVICE - API CALLS
// ============================================================================

import { apiClient } from './ApiClient';
import type {
    Employee,
    CreateEmployeeRequest,
    UpdateEmployeeRequest,
    PaginatedResponse,
    PaginationParams,
} from '../types/types';

// ============================================================================
// EMPLOYEE API ENDPOINTS
// ============================================================================

export const employeeService = {
    /**
     * Get all employees with optional pagination
     */
    async getAll(params?: PaginationParams): Promise<PaginatedResponse<Employee>> {
        const response = await apiClient.get<Employee[]>('/employees', {
            params,
        });
        return {
            data: response.data,
            meta: response.meta,
        };
    },

    /**
     * Get employee by ID
     */
    async getById(id: string): Promise<Employee> {
        const response = await apiClient.get<Employee>(`/employees/${id}`);
        return response.data;
    },

    /**
     * Create new employee
     */
    async create(data: CreateEmployeeRequest): Promise<Employee> {
        const response = await apiClient.post<Employee>('/employees', data);
        return response.data;
    },

    /**
     * Update existing employee
     */
    async update(id: string, data: UpdateEmployeeRequest): Promise<Employee> {
        const response = await apiClient.put<Employee>(`/employees/${id}`, data);
        return response.data;
    },

    /**
     * Delete employee
     */
    async delete(id: string): Promise<void> {
        await apiClient.delete(`/employees/${id}`);
    },
};
