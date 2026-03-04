// ============================================================================
// DASHBOARD PAGE
// ============================================================================

import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../../services/dashboard.service';
import type { DashboardData } from '../../../types/types';
import DashboardStats from '../components/DashboardStats';
import DashboardTable from '../components/DashboardTable';
import { showError } from '../../../utils/toast';

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const dashboardData = await dashboardService.getDashboardData();
            setData(dashboardData);
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to load dashboard data';
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center space-y-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                    Overview of packet status and recent activity.
                </p>
            </div>

            {data && (
                <>
                    <DashboardStats stats={data.stats} />
                    <DashboardTable packets={data.packets} />
                </>
            )}
        </div>
    );
};

export default DashboardPage;
