import React from 'react';
import { redirect } from 'next/navigation';
import { getForumPostDetails } from '@/lib/api/forum';
import ForumDetailsClient from '@/Components/Forum/ForumDetailsClient';
import { getUserSession } from '@/lib/core/session';

const ForumPostDetailsPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if (!user) {
        redirect(`/login?redirectTo=/forum/${id}`);
    }

    const res = await getForumPostDetails(id);
    if (!res?.success || !res?.data) {
        return (
            <div className="w-full text-center py-20 bg-background text-foreground">
                <p className="text-foreground/50 text-sm font-medium">Discussion thread not found.</p>
            </div>
        );
    }

    const { post, comments: initialComments } = res.data;

    return (
        <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
            <ForumDetailsClient post={post} initialComments={initialComments} currentUser={user} />
        </div>
    );
};

export default ForumPostDetailsPage;