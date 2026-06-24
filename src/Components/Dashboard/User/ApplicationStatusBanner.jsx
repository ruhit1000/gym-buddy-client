"use client";

import React from "react";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@heroui/react";

export default function ApplicationStatusBanner({ application }) {
  const isRejected = application.status === "REJECTED";
  const isPending = application.status === "PENDING";

  return (
    <div className={`w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border transition-colors gap-4 shadow-sm ${
      isRejected 
        ? "bg-red-500/5 border-red-500/20 text-red-500" 
        : "bg-amber-500/5 border-amber-500/20 text-amber-500"
    }`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="size-5 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider font-heading leading-tight text-foreground">
            Trainer Application Status
          </h4>
          <p className="text-xs uppercase font-bold tracking-widest mt-0.5 opacity-80">
            • {application.status}
          </p>
        </div>
      </div>

      {isRejected && application.feedback && (
        <Button
          size="sm"
          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 transition-all cursor-pointer flex items-center gap-1 shrink-0"
        >
          View Admin Feedback <ArrowUpRight className="size-3" />
        </Button>
      )}
    </div>
  );
}