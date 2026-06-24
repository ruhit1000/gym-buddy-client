import DashboardNavbar from '@/Components/Dashboard/Shared/DashboardNavbar';
import React from 'react';

export const metadata = {
    title: 'Dashboard - Gym Buddy',
    description: 'Dashboard for Gym Buddy application',
};

const DashboardLayout = ({ children }) => {
    return (
        <DashboardNavbar>
            {children}
        </DashboardNavbar>
    );
};

export default DashboardLayout;
