"use client";
import React from "react";
import Link from "next/link";
import { PenSquare, ShieldAlert } from "lucide-react";

export default function CommunityPulseControls() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm transition-colors flex flex-col justify-between">
      <div>
        <h3 className="font-heading font-black text-base uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
          📢 Community Pulse
        </h3>
        <p className="text-xs text-foreground/60 leading-relaxed font-medium">
          Drive engagement by posting new challenges, nutritional guides, or facility updates to the community forum workspace module.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Link 
          href="/dashboard/add-forum"
          className="p-3 bg-brand text-background hover:opacity-95 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition-opacity shadow-sm cursor-pointer"
        >
          <PenSquare className="size-4" />
          <span className="text-[10px] font-black uppercase tracking-wider">Create Post</span>
        </Link>

        <Link 
          href="/dashboard/admin/manage-forums"
          className="p-3 bg-foreground/5 hover:bg-foreground/10 border border-border text-foreground/80 hover:text-foreground rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShieldAlert className="size-4" />
          <span className="text-[10px] font-black uppercase tracking-wider">Moderation</span>
        </Link>
      </div>
    </div>
  );
}