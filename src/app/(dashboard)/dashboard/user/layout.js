import { requireRole } from '@/lib/core/session';
import React from 'react';

const UserDashboardLayout = async ({ children }) => {
    await requireRole('user');
    return children;
};

export default UserDashboardLayout;