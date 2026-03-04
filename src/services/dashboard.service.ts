// ============================================================================
// DASHBOARD SERVICE
// ============================================================================

import { apiClient } from './ApiClient';
import type { DashboardData } from '../types/types';



export const dashboardService = {
    /**
     * Get dashboard data including stats and packet list
     */
    async getDashboardData(): Promise<DashboardData> {
        const response = await apiClient.get<DashboardData>('/dashboard');
        return response.data;
    },
};
