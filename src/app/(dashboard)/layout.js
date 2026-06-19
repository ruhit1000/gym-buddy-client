import React from 'react';
import DashboardNavbar from "@/Components/Dashboard/DashboardNavbar";

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
