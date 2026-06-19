import React from 'react';
import { getUserSession } from '@/lib/core/session';
import TrainerStatsGrid from '@/Components/Dashboard/Trainer/TrainerStatsGrid';

const TrainerDashboardOverview = async () => {
    const user = await getUserSession();

    return (
        <div className="w-full bg-background text-foreground transition-colors duration-300">
            <TrainerStatsGrid serverUser={user} />
        </div>
    );
};

export default TrainerDashboardOverview;