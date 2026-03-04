// ============================================================================
// APP LAYOUT - Wrapper for all private routes
// ============================================================================

import React from 'react';
import TopBar from './TopBar';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopBar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
