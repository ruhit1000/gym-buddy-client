import React from 'react';
import ManageClassesTable from '@/Components/Dashboard/Admin/ManageClassesTable';
import { getSubmittedClasses } from '@/lib/api/classes';

const ClassesManagePage = async () => {
    const res = await getSubmittedClasses();
    const cleanClasses = res?.success && res?.data ? JSON.parse(JSON.stringify(res.data)) : [];

    return (
        <div className="w-full min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-foreground mb-1">
                    Manage Classes
                </h1>
                <p className="text-sm text-foreground/60">
                    Review and moderate curriculum proposals submitted by verified instructors.
                </p>
            </div>

            <ManageClassesTable initialClasses={cleanClasses} />
        </div>
    );
};

export default ClassesManagePage;