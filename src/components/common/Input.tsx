// ============================================================================
// INPUT COMPONENT - Reusable input with floating labels
// ============================================================================

import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
    variant?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea';
    rows?: number;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    variant = 'text',
    rows = 4,
    className = '',
    value,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';
    const isFloating = isFocused || hasValue;

    const baseClasses = 'peer w-full px-4 pt-6 pb-2 text-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
    const iconClasses = icon ? 'pl-11' : '';

    const labelClasses = `absolute left-4 transition-all duration-200 pointer-events-none ${isFloating
            ? 'top-2 text-xs text-gray-500'
            : 'top-1/2 -translate-y-1/2 text-base text-gray-400'
        }`;

    const commonProps = {
        className: `${baseClasses} ${errorClasses} ${iconClasses} ${className}`,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        value,
        ...props,
    };

    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>
            )}

            {variant === 'textarea' ? (
                <textarea
                    {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    rows={rows}
                />
            ) : (
                <input
                    type={variant}
                    {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}

            <label className={labelClasses}>
                {label}
            </label>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;
