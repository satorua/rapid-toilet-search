import React from 'react';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
}

const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30',
};

export default function ActionButton({
    children,
    isLoading,
    variant = 'primary',
    className = '',
    ...props
}: ActionButtonProps) {
    return (
        <button
            className={`
        w-full py-4 px-6 rounded-xl font-bold text-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2
        ${variants[variant]}
        ${className}
      `}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {children}
        </button>
    );
}
