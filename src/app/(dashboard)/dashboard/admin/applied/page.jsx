import React from 'react';
import ApplicationTable from '@/Components/Dashboard/Admin/ApplicationTable';
import { getTrainerApplications } from '@/lib/api/trainerApplication';

const AppliedTrainersPage = async () => {
    const res = await getTrainerApplications();
    const cleanApplications = res?.success && res?.data ? JSON.parse(JSON.stringify(res.data)) : [];
    
    return (
        <div className="w-full min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-foreground mb-1">
                    Trainer Applications
                </h1>
                <p className="text-sm text-foreground/60">
                    Review candidate credentials, specialties, and process platform access approvals.
                </p>
            </div>

            <ApplicationTable initialApplications={cleanApplications} />
        </div>
    );
};

export default AppliedTrainersPage;