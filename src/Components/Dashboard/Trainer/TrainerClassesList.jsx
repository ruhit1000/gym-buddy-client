"use client";

import React from "react";
import Link from "next/link";
import { Plus, Dumbbell } from "lucide-react";
import TrainerClassRowCard from "./TrainerClassRowCard";

const TrainerClassesList = ({ initialClasses }) => {
  if (!initialClasses || initialClasses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-card border border-border rounded-3xl min-h-100 shadow-sm">
        <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-brand border border-border/80 mb-4 shadow-xs">
          <Dumbbell className="size-8" />
        </div>
        <h3 className="font-heading font-black text-xl uppercase tracking-wider text-foreground mb-2">
          No Classes Created Yet
        </h3>
        <p className="text-sm text-foreground/60 max-w-sm mb-6 font-sans">
          You haven't listed any training programs yet. Create your first class session to start accepting student bookings.
        </p>
        <Link 
          href="/dashboard/trainer/add-class"
          className="flex items-center space-x-2 bg-brand hover:opacity-90 text-background font-heading text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl transition-all duration-200"
        >
          <Plus className="size-4" />
          <span>Add Your First Class</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 font-sans">
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-card/40 border border-border rounded-xl text-xs font-heading font-black uppercase tracking-widest text-foreground/50">
        <div className="col-span-5">Class Specifics</div>
        <div className="col-span-2 text-center">Schedule Metric</div>
        <div className="col-span-1 text-center">Price</div>
        <div className="col-span-2 text-center">Verification Status</div>
        <div className="col-span-2 text-right">Actions Matrix</div>
      </div>

      <div className="flex flex-col gap-4">
        {initialClasses.map((item) => (
          <TrainerClassRowCard key={item._id || item.id} classItem={item} />
        ))}
      </div>
    </div>
  );
};

export default TrainerClassesList;