import React from "react";

export default function TrainerMetricCard({ title, value, footerText, icon }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group shadow-sm transition-colors">
      {/* Decorative Brand Left Accent Bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-brand" />
      
      <div className="flex justify-between items-start">
        <h4 className="text-[11px] font-bold text-foreground/60 uppercase tracking-wider max-w-40 leading-tight">
          {title}
        </h4>
        <div className="text-brand">{icon}</div>
      </div>
      
      <div className="mt-4">
        <div className="text-5xl font-black font-heading tracking-tight text-foreground">
          {String(value).padStart(2, "0")}
        </div>
        <p className="text-[10px] text-foreground/40 font-semibold mt-2">
          {footerText}
        </p>
      </div>
    </div>
  );
}