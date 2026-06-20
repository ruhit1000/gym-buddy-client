"use client";

import React from "react";
import Image from "next/image";
import { Edit2, Users, Calendar, Clock, BarChart } from "lucide-react";
import { Button } from "@heroui/react";
import { DeleteClassAlert } from "@/Components/Shared/DeleteClassAlert";
import { UpdateClass } from "./UpdateClass";

const TrainerClassRowCard = ({ classItem }) => {
  const {
    className,
    image,
    category,
    difficultyLevel,
    duration,
    schedule,
    price,
    status,
    bookingCount
  } = classItem;

  const statusStyles = {
    Approved: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
    Pending: "bg-amber-500/10 border-amber-500/30 text-amber-500",
    Rejected: "bg-rose-500/10 border-rose-500/30 text-rose-500",
  };

  const currentStatusStyle = statusStyles[status] || statusStyles["Pending"];

  return (
    <div className="bg-card border border-border p-5 md:p-4 rounded-2xl md:grid md:grid-cols-12 md:gap-4 items-center shadow-sm hover:border-brand/30 transition-all duration-300 group">
      
      {/* 1. Meta Details & Branding Info */}
      <div className="col-span-5 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 md:mb-0">
        <div className="w-full sm:w-24 h-24 sm:h-16 rounded-xl overflow-hidden relative border border-border shrink-0 shadow-inner bg-background">
          <Image
            src={image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200"}
            alt={className}
            fill
            sizes="(max-w-768px) 100vw, 96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-heading font-black tracking-widest text-brand">
              {category}
            </span>
            <span className="text-foreground/30 text-xs">•</span>
            <div className="flex items-center text-foreground/50 text-xs font-medium">
              <BarChart className="size-3 mr-1 text-foreground/40" />
              {difficultyLevel}
            </div>
          </div>
          <h3 className="font-heading font-bold text-base text-foreground truncate leading-snug">
            {className}
          </h3>
          <div className="flex items-center text-xs text-foreground/40 font-medium mt-1">
            <Clock className="size-3 mr-1 text-foreground/30" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* 2. Schedule Configuration Column */}
      <div className="col-span-2 flex md:justify-center items-center text-xs font-medium text-foreground/70 mb-3 md:mb-0 bg-background/40 md:bg-transparent p-2.5 md:p-0 rounded-xl border border-border/40 md:border-transparent">
        <Calendar className="size-3.5 mr-2 text-brand shrink-0 md:hidden" />
        <span className="truncate md:text-center w-full leading-tight font-sans">
          {schedule}
        </span>
      </div>

      {/* 3. Pricing Matrix Frame */}
      <div className="col-span-1 flex md:justify-center items-center mb-4 md:mb-0">
        <span className="text-xs md:text-sm font-heading font-black tracking-wide text-foreground md:text-center w-full bg-brand/10 md:bg-transparent md:text-foreground px-3 py-1 md:p-0 rounded-lg">
          ${price?.toFixed(2)}
        </span>
      </div>

      {/* 4. Validation Badging Field */}
      <div className="col-span-2 flex md:justify-center items-center mb-5 md:mb-0">
        <div className={`w-full max-w-30 md:text-center py-1.5 px-3 rounded-xl border font-heading text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-1.5 ${currentStatusStyle}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{status}</span>
        </div>
      </div>

      {/* 5. Dynamic Action Controls Panel */}
      <div className="col-span-2 flex items-center justify-end space-x-2 border-t border-border/50 md:border-transparent pt-4 md:pt-0">
        
        {/* View Students Trigger */}
        <Button
          isIconOnly
          aria-label="View registered students"
          size="sm"
          variant="ghost"
          className="hover:bg-brand/10 hover:text-brand border border-border/80 text-foreground/60 rounded-xl cursor-pointer"
        >
          <Users className="size-4" />
        </Button>

        {/* Update Trigger */}
        <UpdateClass classItem={classItem} />

        {/* Delete Trigger */}
        <DeleteClassAlert classId={classItem._id} className={classItem.className} />

      </div>

    </div>
  );
};

export default TrainerClassRowCard;