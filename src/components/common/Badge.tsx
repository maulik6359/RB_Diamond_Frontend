// ============================================================================
// BADGE COMPONENT - Status indicators
// ============================================================================

import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
    dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    size = 'md',
    className = '',
    dot = false,
}) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';

    const variantClasses = {
        primary: 'bg-indigo-100 text-indigo-800',
        secondary: 'bg-amber-100 text-amber-800',
        success: 'bg-emerald-100 text-emerald-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-gray-100 text-gray-800',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-2.5 py-1 text-sm gap-1.5',
        lg: 'px-3 py-1.5 text-base gap-2',
    };

    const dotClasses = {
        primary: 'bg-indigo-600',
        secondary: 'bg-amber-600',
        success: 'bg-emerald-600',
        warning: 'bg-yellow-600',
        danger: 'bg-red-600',
        info: 'bg-blue-600',
        neutral: 'bg-gray-600',
    };

    const dotSizes = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5',
    };

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
            {dot && <span className={`${dotSizes[size]} ${dotClasses[variant]} rounded-full`}></span>}
            {children}
        </span>
    );
};

export default Badge;
