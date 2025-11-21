import { Outlet } from 'react-router-dom';
import React, { Suspense } from 'react';

const PortalLayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            <main>
                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600"></div>
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default PortalLayout;
