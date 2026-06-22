import React from "react";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-6 font-sans transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-3xl bg-card/40 border border-border/80 shadow-2xl backdrop-blur-md relative overflow-hidden group">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 blur-3xl rounded-full pointer-events-none group-hover:bg-red-600/15 transition-colors duration-500" />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl animate-pulse shadow-sm">
            <ShieldAlert className="size-12 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase font-heading">
              Error Code: 403 Forbidden
            </span>
            <h1 className="text-3xl font-black tracking-tight font-heading uppercase text-foreground">
              Access Denied
            </h1>
          </div>
        </div>

        <p className="text-sm text-foreground/60 leading-relaxed font-medium">
          You do not have the required security credentials or permission roles
          to view this restricted module directory. Please check your account
          state parameters.
        </p>

        {/* Action Controls Divider Row */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/login"
            className="flex-1 bg-transparent hover:bg-foreground/5 border border-border text-foreground font-heading text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="size-4" /> Login Again
          </Link>

          <Link
            href="/"
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-heading text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-red-900/10 cursor-pointer"
          >
            <Home className="size-4" /> Go to Home
          </Link>
        </div>

        <p className="text-[10px] text-foreground/40 font-medium tracking-wide">
          If you believe this restriction is an operational mistake, please
          contact administration.
        </p>
      </div>
    </div>
  );
}
