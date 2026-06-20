"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

export default function PublicClassCard({ classItem }) {
  const {
    _id,
    className,
    image,
    category,
    duration,
    price,
    trainerName
  } = classItem;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:border-brand/30 transition-all duration-300 flex flex-col group">
      
      {/* Upper Cover Media Frame */}
      <div className="w-full h-48 relative bg-background border-b border-border/40 overflow-hidden shrink-0">
        <Image
          src={image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600"}
          alt={`${className} session cover banner`}
          fill
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Category Pill Tag */}
        <span className="absolute top-4 left-4 bg-brand text-background font-heading font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
          {category}
        </span>
      </div>

      {/* Primary Details Block */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between space-x-2 mb-2">
            <h3 className="font-heading font-black text-lg text-foreground tracking-wide leading-tight line-clamp-1">
              {className}
            </h3>
            <span className="text-brand font-heading font-black text-base tracking-wide whitespace-nowrap">
              ${price ? price.toFixed(0) : "0"}
            </span>
          </div>

          {/* Trainer Identity Frame */}
          <div className="flex items-center space-x-2 text-foreground/60 mb-5">
            <div className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center shrink-0 overflow-hidden text-foreground/40">
              <User className="size-3" />
            </div>
            <span className="text-xs font-medium font-sans truncate">
              {trainerName || "Expert Coach"}
            </span>
          </div>
        </div>

        {/* Lower Metadata Row with Action Trigger */}
        <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
          <div className="flex items-center text-xs text-foreground/40 font-medium">
            <Clock className="size-3.5 mr-1.5 text-foreground/30" />
            <span>{duration || "45 MIN"}</span>
          </div>
          
          <Link
            href={`/classes/${_id}`}
            className="bg-brand hover:opacity-90 text-background font-heading text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>

    </div>
  );
}