import React from 'react';
import { getUserSession, requireRole } from '@/lib/core/session';
import TrainerStatsGrid from '@/Components/Dashboard/Trainer/TrainerStatsGrid';
import { redirect } from 'next/navigation';

const TrainerDashboardOverview = async () => {
    const user = await requireRole('trainer');
    if (!user) {
        return redirect("/unauthorized");
    }

    return (
        <div className="w-full bg-background text-foreground transition-colors duration-300">
            <TrainerStatsGrid serverUser={user} />
        </div>
    );
};

export default TrainerDashboardOverview;