"use client";

import React from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ApplicationDetailModal from './ApplicationDetailModal';
import { reviewTrainerApplication } from '@/lib/action/trainerApplication';

export default function ApplicationTable({ initialApplications }) {
  const router = useRouter();

  const handleSubmitReview = async (userId, actionType, feedbackText) => {
    try {
      const res = await reviewTrainerApplication({
        userId,
        action: actionType,
        feedback: actionType === 'reject' ? feedbackText : undefined
      });

      if (res?.success) {
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed to execute evaluation action:`, error);
    }
  };

  if (initialApplications.length === 0) {
    return (
      <div className="w-full text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card">
        <p className="text-sm text-foreground/50 font-medium">No pending or rejected applications found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="border-b border-border bg-foreground/2 text-xs font-bold uppercase tracking-wider text-foreground/70 font-heading">
              <th className="p-4 pl-6">Applicant</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Specialties</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {initialApplications.map((app) => {
              const details = app.trainerApplicationDetails;
              const formattedDate = details?.appliedAt 
                ? new Date(details.appliedAt).toLocaleDateString() 
                : 'N/A';

              return (
                <tr key={app._id} className="hover:bg-foreground/1 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      {app.image ? (
                        <div className="relative size-9 overflow-hidden rounded-xl bg-border">
                          <Image 
                            src={app.image} 
                            alt={app.name || "Avatar"} 
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="size-9 bg-brand/10 text-brand rounded-xl flex items-center justify-center font-bold font-heading">
                          {app.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-foreground">{app.name}</div>
                        <div className="text-xs text-foreground/50">{app.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-medium text-foreground">
                    {details?.experience ? `${details.experience} Years` : '0 Years'}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {details?.specialties?.map((spec, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] font-bold bg-foreground/5 border border-border px-2 py-0.5 rounded-md text-foreground/70"
                        >
                          {spec}
                        </span>
                      )) || <span className="text-foreground/40 text-xs">None</span>}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      app.trainerApplication === 'pending'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {app.trainerApplication}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-foreground/40 mt-1">
                      <Calendar className="size-3" /> {formattedDate}
                    </div>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <ApplicationDetailModal 
                      application={app} 
                      onSubmitReview={handleSubmitReview} 
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}