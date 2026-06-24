"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

export default function DashboardHeader({ upcomingCount }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex items-start gap-4 p-2">
      <div className="size-16 md:size-20 bg-foreground/10 text-foreground flex items-center justify-center text-2xl font-black rounded-2xl uppercase border border-border shadow-sm shrink-0">
        {user?.name?.charAt(0) || "U"}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground truncate">
            {user?.name || "Premium Athlete"}
          </h2>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-brand/10 text-brand border border-brand/20">
            {user?.role || "User"}
          </span>
        </div>
        <p className="text-xs text-foreground/40 font-mono mb-3 truncate">{user?.email}</p>
        <p className="text-sm text-foreground/60 leading-relaxed font-sans max-w-xl">
          Pushing the limits today? You have{" "}
          <strong className="text-brand font-black">{upcomingCount} classes</strong> scheduled for this week. Let's make every rep count.
        </p>
      </div>
    </div>
  );
}