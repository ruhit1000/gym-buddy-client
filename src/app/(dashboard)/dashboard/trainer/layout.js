import { requireRole } from '@/lib/core/session';
import React from 'react';

const TrainerDashboardLayout = async ({ children }) => {
    await requireRole('trainer');
    return children;
};

export default TrainerDashboardLayout;