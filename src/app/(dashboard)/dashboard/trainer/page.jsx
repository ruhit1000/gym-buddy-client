import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import TrainerProfileCard from '@/Components/Dashboard/Trainer/TrainerProfileCard';
import TrainerMetricCard from '@/Components/Dashboard/Trainer/TrainerMetricCard';
import ActiveClassesPanel from '@/Components/Dashboard/Trainer/ActiveClassesPanel';
import ForumBuzzSidebar from '@/Components/Dashboard/Trainer/ForumBuzzSidebar';
import { Dumbbell, Users } from 'lucide-react';
import { getTrainerDashboardStats } from '@/lib/api/stats';

const TrainerDashboardPage = async () => {
    const user = await getUserSession();
    if (!user || (user.role !== 'trainer' && user.role !== 'admin')) {
        redirect('/login');
    }

    const res = await getTrainerDashboardStats();
    const stats = res?.success && res?.data ? res.data : {
        totalClassesCreated: 0,
        totalStudentsEnrolled: 0,
        activeClasses: [],
        forumBuzz: []
    };

    return (
        <div className="w-full min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 space-y-6 transition-colors duration-300">
            {/* Metric Overview Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TrainerProfileCard user={user} />
                
                <TrainerMetricCard 
                    title="Total Classes Created" 
                    value={stats.totalClassesCreated} 
                    footerText="Since last week"
                    icon={<Dumbbell className="size-6 opacity-40" />}
                />
                
                <TrainerMetricCard 
                    title="Total Students Enrolled" 
                    value={stats.totalStudentsEnrolled} 
                    footerText="High engagement rate"
                    icon={<Users className="size-6 opacity-40" />}
                />
            </div>

            {/* Split Content Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ActiveClassesPanel classes={stats.activeClasses} />
                </div>
                <div>
                    <ForumBuzzSidebar buzz={stats.forumBuzz} />
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboardPage;