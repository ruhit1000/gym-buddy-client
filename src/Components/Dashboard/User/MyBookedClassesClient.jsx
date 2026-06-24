"use client";

import React, { useState } from "react";
import { CreditCard, Calendar, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MyBookedClassesClient({ initialBookings }) {
  const [bookings] = useState(initialBookings);

  if (bookings.length === 0) {
    return (
      <div className="w-full text-center py-20 border border-dashed border-border rounded-2xl bg-foreground/1">
        <p className="text-foreground/40 text-sm font-medium mb-1">You haven't enrolled in any classes yet.</p>
        <Link href="/classes" className="text-xs font-bold uppercase tracking-wider text-brand hover:underline">
          Browse Classes
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="group flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border/80 hover:border-border-hover rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden gap-4"
        >
          {/* Left Vertical Accent Bar */}
          <div className="absolute top-0 left-0 h-full w-0.75 bg-brand/10 group-hover:bg-brand transition-colors" />

          {/* Left Core Block: Metadata & Typography */}
          <div className="flex-1 min-w-0 pl-2">
            <h3 className="font-heading font-black text-lg md:text-xl uppercase tracking-tight text-foreground line-clamp-1 group-hover:text-brand transition-colors mb-3">
              {booking.className || "Fitness Training Session"}
            </h3>
            
            {/* Inline metadata cluster */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-foreground/60">
              <div className="flex items-center gap-1.5">
                <User className="size-4 text-foreground/30 shrink-0" />
                <span>Trainer: <strong className="text-foreground/90 font-semibold">{booking.trainerName || "Assigning Staff"}</strong></span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4 text-foreground/30 shrink-0" />
                <span>Enrolled: {new Date(booking.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <CreditCard className="size-4 text-foreground/30 shrink-0" />
                <span className="font-mono text-[11px]" title={booking.transactionId}>
                  TxID: {booking.transactionId || "Stripe Checkout"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Core Block: Invoice Summary & Quick-link Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0 pl-2 sm:pl-0">
            <div className="flex flex-col sm:text-right">
              <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider leading-none mb-1">Paid Amount</span>
              <span className="text-base font-black text-foreground">${Number(booking.amount).toFixed(2)}</span>
            </div>

            <Link
              href={`/forum`}
              className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand hover:underline group-hover:translate-x-0.5 transition-transform cursor-pointer bg-brand/5 sm:bg-transparent px-4 sm:px-0 py-2 sm:py-0 rounded-xl sm:rounded-none"
            >
              Enter Hub <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}