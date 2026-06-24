import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ForumPostForm from '@/Components/Dashboard/Shared/ForumPostForm';

const AdminAddForumPostPage = async () => {
    const user = await getUserSession();

    if (!user || user.role !== 'admin') {
        redirect('/unauthorized');
    }
    
    return (
        <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
            <ForumPostForm />
        </div>
    );
};

export default AdminAddForumPostPage;