"use client";

import React from "react";
import { CalendarDays, Heart } from "lucide-react";

export default function MetricCards({ totalBooked, totalFavorites }) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {/* Booked Total Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group shadow-sm">
        <div className="flex justify-between items-start text-foreground/30 group-hover:text-brand transition-colors">
          <CalendarDays className="size-5" />
          <span className="text-[9px] font-black uppercase tracking-widest bg-foreground/3 px-1.5 py-0.5 rounded">Logs</span>
        </div>
        <div>
          <div className="text-2xl font-black font-heading tracking-tight text-foreground">
            {String(totalBooked).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Total Booked</div>
        </div>
      </div>

      {/* Favorites Total Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 flex flex-col justify-between h-28 relative overflow-hidden group shadow-sm">
        <div className="flex justify-between items-start text-foreground/30 group-hover:text-brand transition-colors">
          <Heart className="size-5" />
          <span className="text-[9px] font-black uppercase tracking-widest bg-foreground/3 px-1.5 py-0.5 rounded">Saved</span>
        </div>
        <div>
          <div className="text-2xl font-black font-heading tracking-tight text-foreground">
            {String(totalFavorites).padStart(2, "0")}
          </div>
          <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Favorites</div>
        </div>
      </div>
    </div>
  );
}