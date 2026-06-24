import React from "react";

export default function AdminCounterCard({ title, value, growth, icon }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-colors relative">
      <div className="flex justify-between items-start">
        <h4 className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider leading-tight">
          {title}
        </h4>
        <div className="text-brand opacity-60">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-3xl md:text-4xl font-black font-heading tracking-tight text-foreground">
          {value.toLocaleString()}
        </div>
        <p className="text-[10px] text-brand font-bold mt-2 font-mono">
          {growth}
        </p>
      </div>
    </div>
  );
}