"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function UpcomingSessionsGrid({ sessions }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-black text-lg uppercase tracking-wider text-foreground">
          Upcoming Sessions
        </h3>
        <Link href="/dashboard/user/booked" className="text-xs font-black uppercase tracking-widest text-brand hover:underline flex items-center gap-1 transition-all">
          View All <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="w-full py-12 text-center border border-dashed border-border rounded-2xl bg-foreground/1">
          <p className="text-sm text-foreground/40 font-medium">No active session schedules tracked.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((session) => (
            <div 
              key={session._id}
              className="group bg-card border border-border/80 hover:border-border-hover rounded-2xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col"
            >
              {/* Card Banner Thumbnail Asset Frame */}
              <div className="relative w-full aspect-16/8 bg-muted overflow-hidden">
                {session.image ? (
                  <Image 
                    src={session.image} 
                    alt={session.className} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-brand/5 to-foreground/5" />
                )}
                <span className="absolute left-3 top-3 text-[9px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded border border-white/10">
                  Confirmed
                </span>
              </div>

              {/* Info Frame Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-black text-base uppercase tracking-tight text-foreground line-clamp-1 group-hover:text-brand transition-colors mb-2">
                    {session.className}
                  </h4>
                  <div className="space-y-1 text-xs text-foreground/60 font-medium">
                    <p className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-brand" /> {session.duration || "60 mins"}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-brand" /> 
                      {new Date(session.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-4 text-[11px] font-bold">
                  <span className="text-foreground/40">Coach: <strong className="text-foreground/70 font-semibold">{session.trainerName}</strong></span>
                  <span className="text-brand uppercase tracking-wider hover:underline cursor-pointer">Reschedule</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}