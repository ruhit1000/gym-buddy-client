"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        
        {/* Animated Visual Illustration Group */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative mb-8"
        >
          {/* Neon/Brand Aura Layer */}
          <div className="absolute inset-0 bg-brand/10 blur-3xl rounded-full scale-75" />
          
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-24 bg-card border border-border rounded-3xl flex items-center justify-center shadow-xl text-brand mx-auto"
          >
            <Dumbbell className="size-12 stroke-[2.5]" />
          </motion.div>
          
          {/* Giant Background Ghost Typography */}
          <h1 className="text-9xl font-black tracking-tighter opacity-5 font-heading absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">
            404
          </h1>
        </motion.div>

        {/* Text Metadata Group */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-3 mb-8"
        >
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight">
            Session Out of Bounds
          </h2>
          <p className="text-sm text-foreground/60 leading-relaxed font-sans px-4">
            The resource path or workout module you are searching for does not exist or has been relocated by an administrator.
          </p>
        </motion.div>

        {/* Interactive Action Redirect Trigger */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand text-background text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-95 shadow-lg shadow-brand/10 group transition-all cursor-pointer"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home 
          </Link>
        </motion.div>

      </div>
    </div>
  );
}