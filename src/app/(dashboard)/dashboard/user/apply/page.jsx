import React from 'react';
import { getUserSession } from '@/lib/core/session';
import { Hourglass, XCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ApplyForTrainerPage = async () => {
    const user = await getUserSession();
    const status = user?.trainerApplication || "none"; 

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center bg-background text-foreground p-6 transition-colors duration-300">
            <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 shadow-xl text-center font-sans">
                
                {/* STATE 1: NONE - Invitation to apply */}
                {status === "none" && (
                    <div className="flex flex-col items-center">
                        <div className="size-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6">
                            <Sparkles className="size-8" />
                        </div>
                        <h1 className="font-heading font-black text-2xl uppercase tracking-wider mb-2">
                            Become a Trainer
                        </h1>
                        <p className="text-sm text-foreground/60 mb-8 leading-relaxed">
                            Share your fitness expertise, build your brand, and manage client training sessions through our professional dashboard toolkit.
                        </p>
                        {/* REMOVED cursor-pointer */}
                        <Link 
                            href="/dashboard/user/apply/form"
                            className="w-full bg-brand hover:opacity-90 text-background font-heading text-sm font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center text-center"
                        >
                            Submit Application
                        </Link>
                    </div>
                )}

                {/* STATE 2: PENDING - Waiting for admin review */}
                {status === "pending" && (
                    <div className="flex flex-col items-center">
                        <div className="size-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                            <Hourglass className="size-8" />
                        </div>
                        <h1 className="font-heading font-black text-2xl uppercase tracking-wider mb-2 text-amber-500">
                            Application Pending
                        </h1>
                        <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                            Our administration team is currently reviewing your credentials. This process normally takes up to 24–48 hours.
                        </p>
                        <div className="w-full bg-foreground/5 border border-border text-foreground/50 text-xs py-3 rounded-xl">
                            We will update your dashboard state as soon as a decision is made.
                        </div>
                    </div>
                )}

                {/* STATE 3: REJECTED - Denied with re-apply option */}
                {status === "rejected" && (
                    <div className="flex flex-col items-center">
                        <div className="size-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6">
                            <XCircle className="size-8" />
                        </div>
                        <h1 className="font-heading font-black text-2xl uppercase tracking-wider mb-2 text-destructive">
                            Application Declined
                        </h1>
                        <p className="text-sm text-foreground/60 mb-8 leading-relaxed">
                            Unfortunately, your request did not meet our verification criteria at this time. You can review your profile information and re-apply below.
                        </p>
                        {/* REMOVED cursor-pointer */}
                        <Link 
                            href="/dashboard/user/apply/form"
                            className="w-full bg-transparent hover:bg-foreground/5 border border-border text-foreground font-heading text-sm font-bold py-3.5 rounded-xl transition-all flex items-center justify-center text-center"
                        >
                            Re-apply for Verification
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyForTrainerPage;