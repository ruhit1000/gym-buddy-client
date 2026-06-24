"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Mail, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const checkMarkVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.2 },
  },
};

export default function PaymentSuccessClient({
  customerEmail,
  amount,
  transactionId,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-md w-full bg-card border border-border/80 shadow-xl rounded-3xl p-6 md:p-8 text-center flex flex-col items-center"
    >
      <motion.div
        variants={checkMarkVariants}
        className="size-16 bg-brand text-background rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20 mb-6"
      >
        <Check className="size-8 stroke-3" />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="font-heading font-black text-2xl md:text-3xl uppercase tracking-wide text-foreground mb-2"
      >
        Payment Approved
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-sm text-foreground/60 leading-relaxed px-2 mb-6"
      >
        Your premium subscription transaction finalized securely. Welcome to the
        elite tier tracking space.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="w-full bg-foreground/1 dark:bg-foreground/1 border border-border/60 rounded-2xl p-4 text-left space-y-3 mb-8 text-xs font-medium"
      >
        <div className="flex justify-between items-center pb-2.5 border-b border-border/40">
          <span className="text-foreground/40 uppercase tracking-wider font-bold">
            Total Paid
          </span>
          <span className="text-sm font-black text-brand">${amount} USD</span>
        </div>
        {transactionId && (
          <div className="flex justify-between items-center">
            <span className="text-foreground/40 uppercase tracking-wider font-bold">
              Receipt ID
            </span>
            <span className="font-mono text-foreground/70 truncate max-w-45">
              {transactionId}
            </span>
          </div>
        )}
        <div className="flex items-start gap-2 pt-1 text-foreground/50 leading-normal">
          <Mail className="size-3.5 text-brand shrink-0 mt-0.5" />
          <span>
            A confirmation receipt was sent straight onto your mailbox at{" "}
            <strong className="text-foreground/80 font-semibold">
              {customerEmail}
            </strong>
            .
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full flex flex-col sm:flex-row items-center gap-3 mt-2"
      >
        <Link
          href="/dashboard/user/booked"
          className="w-full sm:flex-1 py-3 px-6 bg-brand text-background text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-95 shadow-lg shadow-brand/10 cursor-pointer flex items-center justify-center gap-2 group transition-all"
        >
          <motion.span
            className="flex items-center gap-2"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Go to Dashboard
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </motion.span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto py-3 px-5 text-foreground/50 hover:text-foreground text-xs font-black uppercase tracking-widest rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-colors"
        >
          <motion.span
            className="flex items-center gap-2"
            whileHover={{ x: -2 }}
          >
            <Home className="size-4" />
            <span className="sm:hidden">Return Home</span>
          </motion.span>
        </Link>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-[10px] text-foreground/30 font-semibold uppercase tracking-wider mt-6"
      >
        Questions? Contact{" "}
        <a
          href="mailto:orders@example.com"
          className="text-brand/80 hover:underline"
        >
          orders@example.com
        </a>
      </motion.p>
    </motion.div>
  );
}
