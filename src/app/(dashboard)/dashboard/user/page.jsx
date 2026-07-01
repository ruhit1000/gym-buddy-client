export const dynamic = 'force-dynamic';
import React from 'react';
import { getUserDashboardStats } from '@/lib/api/stats';
import DashboardHeader from '@/Components/Dashboard/User/DashboardHeader';
import MetricCards from '@/Components/Dashboard/User/MetricCards';
import ApplicationStatusBanner from '@/Components/Dashboard/User/ApplicationStatusBanner';
import UpcomingSessionsGrid from '@/Components/Dashboard/User/UpcomingSessionsGrid';
import FavoritesList from '@/Components/Dashboard/User/FavoritesList';

const UserDashboardPage = async () => {
    const res = await getUserDashboardStats();
    const stats = res?.success && res?.data ? res.data : {
        totalBooked: 0,
        totalFavorites: 0,
        application: { status: null, feedback: "" },
        upcomingSessions: [],
        favoriteClasses: []
    };

    return (
        <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300 p-4 md:p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <DashboardHeader upcomingCount={stats.upcomingSessions?.length || 0} />
                </div>
                <div className="w-full">
                    <MetricCards 
                        totalBooked={stats.totalBooked} 
                        totalFavorites={stats.totalFavorites} 
                    />
                </div>
            </div>

            {stats.application?.status && (
                <ApplicationStatusBanner application={stats.application} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                <div className="lg:col-span-2">
                    <UpcomingSessionsGrid sessions={stats.upcomingSessions} />
                </div>
                <div>
                    <FavoritesList favorites={stats.favoriteClasses} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;