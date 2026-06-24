import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function ActiveClassesPanel({ classes }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col justify-between shadow-sm transition-colors">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-black text-lg uppercase tracking-wider text-foreground">
            Active Classes
          </h3>
          <Link 
            href="/dashboard/trainer/manage-classes" 
            className="text-xs font-bold text-brand hover:underline uppercase tracking-wider"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {classes.length === 0 ? (
            <p className="text-foreground/40 text-xs py-6">No active classes created yet.</p>
          ) : (
            classes.map((cls) => (
              <div 
                key={cls._id} 
                className="flex items-center justify-between p-4 bg-foreground/2 rounded-xl border border-border/60 group hover:border-brand/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 bg-foreground/5 text-brand flex items-center justify-center rounded-lg">
                    <Activity className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors uppercase tracking-tight">
                      {cls.className}
                    </h4>
                    <p className="text-[11px] text-foreground/40 font-medium mt-0.5">
                      {cls.duration || "60 mins"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-brand font-mono">
                    {cls.bookingCount} Students
                  </span>
                  <p className="text-[10px] text-foreground/40 font-semibold uppercase mt-0.5">
                    Capacity: {cls.capacityPercentage}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}