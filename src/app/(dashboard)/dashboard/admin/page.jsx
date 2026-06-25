import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import AdminIdentityCard from '@/Components/Dashboard/Admin/AdminIdentityCard';
import AdminCounterCard from '@/Components/Dashboard/Admin/AdminCounterCard';
import MembershipVelocityChart from '@/Components/Dashboard/Admin/MembershipVelocityChart';
import TrainerApprovalsQueue from '@/Components/Dashboard/Admin/TrainerApprovalsQueue';
import PopularClassesPanel from '@/Components/Dashboard/Admin/PopularClassesPanel';
import CommunityPulseControls from '@/Components/Dashboard/Admin/CommunityPulseControls';
import { Users, Dumbbell, Bookmark } from 'lucide-react';
import { getAdminDashboardStats } from '@/lib/api/stats';

const AdminOverviewDashboard = async () => {
    const user = await getUserSession();
    if (!user || user.role !== 'admin') {
        redirect('/unauthorized');
    }

    const res = await getAdminDashboardStats();
    const stats = res?.success && res?.data ? res.data : {
        totalUsers: 0,
        totalClasses: 0,
        totalBooked: 0,
        approvals: [],
        popularClasses: [],
        chartData: []
    };

    return (
        <div className="w-full min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 space-y-6 transition-colors duration-300">
            {/* Top Metric Deck matching row 1 of image_cd9320.png */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <AdminIdentityCard user={user} />
                
                <AdminCounterCard 
                    title="Total Users" 
                    value={stats.totalUsers} 
                    growth="+12% from last month"
                    icon={<Users className="size-5" />}
                />
                <AdminCounterCard 
                    title="Total Classes" 
                    value={stats.totalClasses} 
                    growth="8 active now"
                    icon={<Dumbbell className="size-5" />}
                />
                <AdminCounterCard 
                    title="Total Booked" 
                    value={stats.totalBooked} 
                    growth="+24% capacity"
                    icon={<Bookmark className="size-5" />}
                />
            </div>

            {/* Mid Section Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MembershipVelocityChart chartData={stats.chartData} />
                </div>
                <div>
                    <TrainerApprovalsQueue requests={stats.approvals} />
                </div>
            </div>

            {/* Bottom Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PopularClassesPanel classes={stats.popularClasses} />
                <CommunityPulseControls />
            </div>
        </div>
    );
};

export default AdminOverviewDashboard;