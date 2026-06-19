"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Users, TrendingUp } from "lucide-react";

const TrainerStatsGrid = ({ serverUser }) => {
  
  const userName = serverUser?.name || "Marcus Vane";
  const userEmail = serverUser?.email || "m.vane@gymbuddy.fit";
  const userImage = serverUser?.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop";
  const userRole = serverUser?.role || "trainer";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch font-sans">
      
      {/* CARD 1: Profile Identity Information Deck */}
      <div className="bg-card border border-border p-8 rounded-2xl flex flex-col items-center text-center justify-between shadow-sm min-h-85">
        <div className="flex flex-col items-center w-full">
          {/* Avatar Ring Frame Accent */}
          <div className="w-32 h-32 rounded-full border-4 border-brand p-1 bg-background relative overflow-hidden shadow-lg mb-4">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src={userImage}
                alt={`${userName}'s profile avatar`}
                fill
                sizes="128px"
                className="object-cover"
                priority // Priority loading for above-the-fold hero content
              />
            </div>
          </div>

          {/* Role Badge Tag */}
          <span className="bg-brand text-background font-heading font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-xs">
            {userRole}
          </span>

          {/* Name & Credentials */}
          <h2 className="font-heading font-black text-2xl tracking-wide text-foreground leading-tight mb-1 truncate max-w-full">
            {userName}
          </h2>
          <p className="text-xs text-foreground/50 tracking-wide font-medium truncate max-w-full mb-4">
            {userEmail}
          </p>
        </div>

        {/* Action Route Trigger */}
        <Link
          href="/dashboard/settings"
          className="w-full max-w-40 text-center border-2 border-brand/50 hover:bg-brand text-brand hover:text-background font-heading text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-200"
        >
          Edit Profile
        </Link>
      </div>

      {/* CARD 2: Total Classes Created Statistic Data Deck */}
      <div className="bg-card border border-border p-8 rounded-2xl flex flex-col justify-between relative shadow-sm overflow-hidden group min-h-85">
        {/* Subtle Right Side Background Graphic Icon */}
        <Dumbbell className="absolute right-6 top-8 size-20 text-foreground/3 -rotate-12 group-hover:rotate-0 transition-transform duration-300 pointer-events-none" />
        
        {/* Left Vertical Brand Border Indicator */}
        <div className="absolute left-0 top-6 bottom-6 w-1 bg-brand rounded-r" />

        <div>
          <h3 className="font-heading font-black text-xs uppercase tracking-widest text-foreground/50 mb-6">
            Total Classes Created
          </h3>
          <span className="font-heading font-black text-6xl md:text-7xl text-brand tracking-tighter block leading-none select-none">
            08
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-brand/70 font-semibold tracking-wide mt-4">
          <TrendingUp className="size-4 shrink-0" />
          <span>+2 since last week</span>
        </div>
      </div>

      {/* CARD 3: Total Enrolled Students Statistic Data Deck */}
      <div className="bg-card border border-border p-8 rounded-2xl flex flex-col justify-between relative shadow-sm overflow-hidden group min-h-85">
        {/* Subtle Right Side Background Graphic Icon */}
        <Users className="absolute right-6 top-8 size-20 text-foreground/3 pointer-events-none" />
        
        {/* Left Vertical Brand Border Indicator */}
        <div className="absolute left-0 top-6 bottom-6 w-1 bg-brand rounded-r" />

        <div>
          <h3 className="font-heading font-black text-xs uppercase tracking-widest text-foreground/50 mb-6">
            Total Students Enrolled
          </h3>
          <span className="font-heading font-black text-6xl md:text-7xl text-brand tracking-tighter block leading-none select-none">
            142
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-brand/70 font-semibold tracking-wide mt-4">
          <TrendingUp className="size-4 shrink-0" />
          <span>High engagement rate</span>
        </div>
      </div>

    </div>
  );
};

export default TrainerStatsGrid;