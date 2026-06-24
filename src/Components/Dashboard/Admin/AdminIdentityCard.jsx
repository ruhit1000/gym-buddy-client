"use client";
import React from "react";

export default function AdminIdentityCard({ user }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm transition-colors">
      <div className="size-16 rounded-full border-2 border-brand p-1 mb-3 bg-foreground/5 flex items-center justify-center font-heading font-black text-xl text-foreground">
        {user?.name?.charAt(0)}
      </div>
      <h3 className="font-heading font-black text-base uppercase tracking-tight text-foreground">{user?.name}</h3>
      <p className="text-[10px] text-foreground/40 font-mono mb-3 truncate max-w-full">{user?.email}</p>
      <span className="text-[9px] font-black tracking-widest text-background bg-brand px-3 py-0.5 rounded-md uppercase font-heading">
        {user?.role || "ADMIN"}
      </span>
    </div>
  );
}