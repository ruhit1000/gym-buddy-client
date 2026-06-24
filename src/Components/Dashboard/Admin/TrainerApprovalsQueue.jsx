"use client";
import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function TrainerApprovalsQueue({ requests }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm transition-colors h-full flex flex-col justify-between">
      <div>
        <h3 className="font-heading font-black text-base uppercase tracking-wider text-foreground mb-4">
          Trainer Approvals
        </h3>

        <div className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-foreground/40 text-xs py-4">No pending applications left in queue.</p>
          ) : (
            requests.map((req) => (
              <div key={req._id} className="flex items-center justify-between p-3 bg-foreground/2 rounded-xl border border-border/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-8 bg-foreground/10 text-foreground rounded-lg flex items-center justify-center font-heading text-xs font-black shrink-0">
                    {req.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground truncate uppercase tracking-tight">{req.name}</h4>
                    <p className="text-[10px] text-foreground/40 font-semibold truncate mt-0.5 uppercase tracking-wider">{req.experience || "HIIT Specialist"}</p>
                  </div>
                </div>
                <button className="size-7 bg-brand text-background rounded-lg flex items-center justify-center hover:opacity-90 shadow-sm transition-opacity shrink-0 cursor-pointer">
                  <Check className="size-4 stroke-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Link 
        href="/dashboard/admin/applications" 
        className="text-[10px] font-black uppercase tracking-widest text-brand text-center hover:underline mt-4 block"
      >
        View All Applications
      </Link>
    </div>
  );
}