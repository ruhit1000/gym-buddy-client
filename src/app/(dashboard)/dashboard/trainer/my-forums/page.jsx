import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ForumPostTable from '@/Components/Dashboard/Shared/ForumPostTable';
import { MessageSquare } from 'lucide-react';
import { getMyForumPosts } from '@/lib/api/forum';

const MyForumsPage = async () => {
    const user = await getUserSession();
    
    // Authorization Guard
    if (!user || (user?.role !== 'trainer' && user?.role !== 'admin')) {
        return redirect('/login');
    }

    // Fetch personal context threads matrix
    const res = await getMyForumPosts();
    const posts = res?.success && res?.data ? res.data : [];

    return (
        <div className="w-full min-h-screen bg-background text-foreground px-4 md:px-6 py-10 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Header Information Bar */}
                <div className="mb-8">
                    <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                        <MessageSquare className="size-6 text-brand" /> My Published Topics
                    </h1>
                    <p className="text-sm text-foreground/60">
                        Monitor, track analytics metrics, and manage your community discussions from a centralized table dashboard.
                    </p>
                </div>

                {/* Data Table Element */}
                <ForumPostTable posts={posts} />
            </div>
        </div>
    );
};

export default MyForumsPage;