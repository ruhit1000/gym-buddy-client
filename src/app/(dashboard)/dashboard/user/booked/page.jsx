import React from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import MyBookedClassesClient from '@/Components/Dashboard/User/MyBookedClassesClient';
import { CalendarDays } from 'lucide-react';
import { getMyBookings } from '@/lib/api/bookings';

const MyBookedClassesPage = async () => {
    const user = await getUserSession();
    
    if (!user) {
        redirect('/login');
    }

    const res = await getMyBookings();
    const bookings = res?.success && res?.data ? res.data : [];

    return (
        <div className="w-full min-h-screen bg-background text-foreground px-4 md:px-6 py-10 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Header Block */}
                <div className="mb-8">
                    <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
                        <CalendarDays className="size-6 text-brand" /> My Booked Classes
                    </h1>
                    <p className="text-sm text-foreground/60">
                        Review your active class schedule enrollments, trainer assignments, and payment invoices.
                    </p>
                </div>

                {/* Client Grid System */}
                <MyBookedClassesClient initialBookings={bookings} />
            </div>
        </div>
    );
};

export default MyBookedClassesPage;