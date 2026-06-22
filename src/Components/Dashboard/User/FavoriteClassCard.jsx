"use client";

import React from "react";
import { Clock, Users, Star } from "lucide-react";
import Link from "next/link";

export default function FavoriteClassCard({ favoriteId, classData }) {

  if (!classData) return null;

  const totalSlots = classData.totalSlots || 0;
  const bookingCount = classData.bookingCount || 0;
  const remainingSlots = Math.max(0, totalSlots - bookingCount);
  const targetIntensity = Math.min(5, Math.max(1, classData.intensity || 3));

  return (
    <div
      className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300`}
    >
      {/* Upper Metadata Block */}
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[10px] font-bold bg-brand/10 text-brand px-2.5 py-1 rounded-md uppercase tracking-wider font-heading">
            {classData.category || "Fitness"}
          </span>
          <span className="text-xl font-black text-foreground font-heading">
            ${classData.price ?? 45}
          </span>
        </div>

        <h3 className="font-heading font-bold text-lg leading-snug mb-4 line-clamp-1 text-foreground">
          {classData.className}
        </h3>

        {/* Structural Metrics */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-foreground/70">
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-brand" /> Duration
            </div>
            <span className="font-medium">
              {classData.duration || "60 Min"}
            </span>
          </div>

          <div className="flex justify-between items-center text-foreground/70">
            <div className="flex items-center gap-2">
              <Users className="size-3.5 text-brand" /> Availability
            </div>
            <span className="font-medium text-foreground">
              {totalSlots > 0 ? `${remainingSlots} Slots Left` : "Fully Booked"}
            </span>
          </div>

          <div className="flex justify-between items-center text-foreground/70">
            <div className="flex items-center gap-2">
              <Star className="size-3.5 text-brand" /> Intensity
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-1 rounded-full ${i < targetIntensity ? "bg-brand" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          href={`/classes/${classData._id}`}
          className="w-full bg-brand hover:opacity-90 text-background font-heading text-xs font-bold py-2.5 rounded-lg transition-all shadow-sm cursor-pointer flex items-center justify-center text-center"
        >
          View & Book
        </Link>
      </div>
    </div>
  );
}
