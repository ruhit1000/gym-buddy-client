export const dynamic = 'force-dynamic';
import React from 'react';
import UsersTable from '@/Components/Dashboard/Admin/UsersTable';
import { getAllUsers } from '@/lib/api/users';

const UsersManagementPage = async () => {
    const res = await getAllUsers();
    const cleanUsers = res?.success && res?.data ? JSON.parse(JSON.stringify(res.data)) : [];

    return (
        <div className="w-full min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-foreground mb-1">
                    Manage Users
                </h1>
                <p className="text-sm text-foreground/60">
                    Monitor platform registration profiles, alter permission states, and enforce security soft-blocks.
                </p>
            </div>

            <UsersTable initialUsers={cleanUsers} />
        </div>
    );
};

export default UsersManagementPage;