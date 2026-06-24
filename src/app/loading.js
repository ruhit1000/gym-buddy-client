"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 space-y-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Module Loader Skeleton */}
        <div className="flex items-center gap-4 animate-pulse">
          <div className="size-16 bg-foreground/10 border border-border/40 rounded-2xl shrink-0" />
          <div className="space-y-2 flex-1 min-w-0">
            <div className="h-6 bg-foreground/10 rounded-lg w-1/3 max-w-60" />
            <div className="h-3.5 bg-foreground/5 rounded-md w-1/2 max-w-90" />
          </div>
        </div>

        {/* Dynamic Metric Layout Grid Skeleton Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index} 
              className="h-28 bg-card border border-border/60 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="size-5 bg-foreground/10 rounded" />
              <div className="space-y-2">
                <div className="h-7 bg-foreground/10 rounded-md w-12" />
                <div className="h-2.5 bg-foreground/5 rounded w-16" />
              </div>
              {/* Shimmer overlay block effect */}
              <motion.div 
                className="absolute inset-0 bg-linear-to-r from-transparent via-foreground/3 to-transparent -translate-x-full"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Panel Workspace Grid Split Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          
          {/* Main Content Layout Card Block */}
          <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl p-6 h-64 relative overflow-hidden">
            <div className="h-4 bg-foreground/10 rounded-md w-1/4 mb-6" />
            <div className="space-y-4">
              <div className="h-12 bg-foreground/5 rounded-xl w-full" />
              <div className="h-12 bg-foreground/5 rounded-xl w-full" />
              <div className="h-12 bg-foreground/5 rounded-xl w-full" />
            </div>
          </div>

          {/* Sidebar Content Layout Card Block */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 h-64 relative overflow-hidden">
            <div className="h-4 bg-foreground/10 rounded-md w-1/3 mb-6" />
            <div className="space-y-3">
              <div className="h-10 bg-foreground/5 rounded-xl w-full" />
              <div className="h-10 bg-foreground/5 rounded-xl w-full" />
              <div className="h-10 bg-foreground/5 rounded-xl w-full" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}