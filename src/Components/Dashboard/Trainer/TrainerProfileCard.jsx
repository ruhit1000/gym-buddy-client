"use client";
import React from "react";
import { Button } from "@heroui/react";

export default function TrainerProfileCard({ user }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm transition-colors">
      <div className="size-20 rounded-full border-2 border-brand p-1 mb-4 overflow-hidden bg-foreground/10 text-foreground flex items-center justify-center font-bold uppercase text-2xl">
        {user?.name?.charAt(0)}
      </div>
      <span className="text-[10px] font-black tracking-widest text-background bg-brand px-2.5 py-0.5 rounded-full uppercase font-heading mb-2">
        {user?.role || "Trainer"}
      </span>
      <h3 className="font-heading font-black text-xl uppercase tracking-tight text-foreground">{user?.name}</h3>
      <p className="text-xs text-foreground/50 font-mono mb-4">{user?.email}</p>
      
      <Button 
        size="sm" 
        variant="bordered" 
        className="border-border text-foreground text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-foreground/5 transition-colors"
      >
        Edit Profile
      </Button>
    </div>
  );
}