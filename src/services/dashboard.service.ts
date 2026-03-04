// ============================================================================
// DASHBOARD SERVICE
// ============================================================================

import { apiClient } from './ApiClient';
import type { DashboardData } from '../types/types';

interface DashboardResponse {
    success: boolean;
    data: DashboardData;
    meta?: any;
}

export const dashboardService = {
    /**
     * Get dashboard data including stats and packet list
     */
    async getDashboardData(): Promise<DashboardData> {
        const response = await apiClient.get<DashboardResponse>('/dashboard');
        return response.data.data;
    },
};
