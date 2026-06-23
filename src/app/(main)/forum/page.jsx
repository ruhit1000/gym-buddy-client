import React from 'react';
import { getAllForumPosts } from '@/lib/api/forum';
import ForumPageClient from '@/Components/Forum/ForumPageClient';

const CommunityForumPage = async ({ searchParams }) => {
    const params = await searchParams;
    const currentPage = parseInt(params?.page || '1', 10);
    const searchQuery = params?.search || '';

    const res = await getAllForumPosts({
        search: searchQuery,
        page: currentPage,
        limit: 15
    });

    const posts = res?.success && res?.data ? res.data : [];
    const meta = res?.success && res?.meta ? res.meta : { totalPages: 1 };

    return (
        <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="font-heading font-black text-4xl uppercase tracking-wider text-foreground mb-3">
                        The Pulse Forum
                    </h1>
                    <p className="text-sm text-foreground/60 max-w-2xl leading-relaxed">
                        Connect with athletes, share your routines, and get expert advice. This is the heart of the IRON PULSE community.
                    </p>
                </div>

                {/* Main Client Grid Handler */}
                <ForumPageClient 
                    initialPosts={posts} 
                    totalPages={meta.totalPages} 
                    currentPage={currentPage}
                    initialSearch={searchQuery}
                />
            </div>
        </div>
    );
};

export default CommunityForumPage;