export const dynamic = 'force-dynamic';
import React from 'react';
import { getMyClasses } from '@/lib/api/classes';
import TrainerClassesList from '@/Components/Dashboard/Trainer/TrainerClassesList';

const TrainerClassesPage = async () => {
    const classesData = await getMyClasses();
    
    return (
        <div className="w-full bg-background text-foreground transition-colors duration-300">
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-foreground mb-1">
                    My Managed Classes
                </h1>
                <p className="text-sm text-foreground/60">
                    Review, update status, and manage active, pending, or rejected training sessions.
                </p>
            </div>
            
            <TrainerClassesList initialClasses={classesData} />
        </div>
    );
};

export default TrainerClassesPage;