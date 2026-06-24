import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import AdminForumTable from '@/Components/Dashboard/Admin/AdminForumTable';
import { ShieldAlert } from 'lucide-react';
import { getAllPostsForAdmin } from '@/lib/api/forum';

const AdminForumManagePage = async () => {
    const user = await getUserSession();

    if (!user || user?.role !== 'admin') {
        redirect('/unauthorized');
    }

    const res = await getAllPostsForAdmin();
    const allPosts = res?.success && res?.data ? res.data : [];

    return (
        <div className="w-full min-h-screen bg-background text-foreground px-4 md:px-6 py-10 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                        <ShieldAlert className="size-6 text-red-500" /> Global Forum Moderation
                    </h1>
                    <p className="text-sm text-foreground/60">
                        Review community topics across all tiers. Remove inappropriate or rule-violating articles instantly.
                    </p>
                </div>

                <AdminForumTable posts={allPosts} />
            </div>
        </div>
    );
};

export default AdminForumManagePage;