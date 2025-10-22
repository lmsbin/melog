import { memo } from 'react';

export const Loading = memo(function Loading() {
    return (
        <div className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center">
            <div className="absolute inset-0 bg-gray-500 opacity-50 backdrop-blur-sm" />
            <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
});
