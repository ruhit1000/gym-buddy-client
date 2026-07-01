export const dynamic = 'force-dynamic';
import React from 'react';
import { getAllTrainers } from '@/lib/api/trainerApplication';
import TrainersTable from '@/Components/Dashboard/Admin/TrainersTable';

const ManageTrainersPage = async () => {
    const res = await getAllTrainers();
    const cleanTrainers = res?.success && res?.data ? JSON.parse(JSON.stringify(res.data)) : [];

    return (
        <div className="w-full min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-foreground mb-1">
                    Manage Trainers
                </h1>
                <p className="text-sm text-foreground/60">
                    Monitor verified platform instructors, check active fields, and handle platform role privileges.
                </p>
            </div>

            <TrainersTable initialTrainers={cleanTrainers} />
        </div>
    );
};

export default ManageTrainersPage;