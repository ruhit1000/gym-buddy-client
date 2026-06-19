"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Dumbbell, 
  MessageSquare, 
  Users, 
  UserCheck, 
  CreditCard, 
  Settings, 
  LogOut,
  User,
  Search,
  Bell
} from "lucide-react";

const DashboardNavbar = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [searchQuery, setSearchQuery] = useState("");
  
  const userRole = session?.user?.role || "user"; 
  const userImage = session?.user?.image;
  const userName = session?.user?.name || "Athlete";
  const userEmail = session?.user?.email || "";

  const linksByRole = {
    admin: [
      { id: "overview", label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
      { id: "users", label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { id: "applied", label: "Applied Trainers", href: "/dashboard/admin/applied", icon: UserCheck },
      { id: "classes", label: "Manage Classes", href: "/dashboard/admin/classes", icon: Dumbbell },
      { id: "forum", label: "Forum Manage", href: "/dashboard/admin/forum", icon: MessageSquare },
      { id: "transactions", label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
    ],
    trainer: [
      { id: "overview", label: "Overview", href: "/dashboard/trainer", icon: LayoutDashboard },
      { id: "add-class", label: "Add Class", href: "/dashboard/trainer/add-class", icon: PlusCircle },
      { id: "my-classes", label: "My Classes", href: "/dashboard/trainer/my-classes", icon: Dumbbell },
      { id: "add-forum", label: "Add Forum Post", href: "/dashboard/trainer/add-forum", icon: PlusCircle },
      { id: "my-forums", label: "My Forum Posts", href: "/dashboard/trainer/my-forums", icon: MessageSquare },
    ],
    user: [
      { id: "overview", label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
      { id: "booked", label: "Booked Classes", href: "/dashboard/user/booked", icon: Dumbbell },
      { id: "apply", label: "Apply as Trainer", href: "/dashboard/user/apply", icon: UserCheck },
      { id: "favorites", label: "Favorite Classes", href: "/dashboard/user/favorites", icon: MessageSquare },
    ]
  };

  const currentNavLinks = linksByRole[userRole] || linksByRole["user"];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  if (isPending) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 md:flex">
      
      {/* =========================================================
          DESKTOP SIDEBAR VIEW ENGINE (md: and above)
         ========================================================= */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-card border-r border-border h-screen sticky top-0 shrink-0 p-6 z-50 transition-colors duration-300">
        <div>
          {/* Header Branding */}
          <div className="mb-10 px-2">
            <Link href="/" className="font-heading font-black text-2xl tracking-wider text-brand uppercase block">
              GYM BUDDY
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold block mt-0.5">
              {userRole} space
            </span>
          </div>

          {/* Dynamic Link Arrays Mapping */}
          <nav className="space-y-1.5">
            {currentNavLinks.map((link) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-brand text-background shadow-md"
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <IconComponent className="size-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Fixed Foot Tray Control Panel */}
        <div className="border-t border-border/60 pt-4 space-y-1">
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === "/dashboard/settings" ? "bg-foreground/10 text-brand" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <Settings className="size-4 shrink-0" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer text-left font-sans"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          CORE CONTENT VIEWPORT (Houses Topbar + Main Canvas)
         ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* DESKTOP LARGE SCREEN TOPBAR PANEL */}
        <header className="hidden md:flex items-center justify-between h-20 px-10 bg-card border-b border-border sticky top-0 z-40 transition-colors duration-300">
          
          {/* Left Context Segment: Title & Universal Context Search Box */}
          <div className="flex items-center space-x-8 flex-1 max-w-xl">
            <h1 className="font-heading font-black text-xl uppercase tracking-wide text-foreground whitespace-nowrap">
              Overview
            </h1>
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40 group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Search routines, metrics, or community threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-2.5 text-sm font-sans text-foreground placeholder-foreground/40 outline-hidden focus:border-brand/60 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Profile Actions Segment */}
          <div className="flex items-center space-x-6">
            
            {/* Quick Status Pill/Indicators */}
            <div className="flex items-center space-x-3 text-xs font-heading font-black bg-background border border-border px-3 py-1.5 rounded-lg text-foreground/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="uppercase tracking-wider">Server Sync</span>
            </div>

            {/* Notification Badge Anchor */}
            <button className="relative p-2 text-foreground/60 hover:text-brand transition-colors duration-200 cursor-pointer">
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full" />
            </button>

            {/* Horizontal Divider Rule */}
            <div className="w-px h-8 bg-border" />

            {/* Profile Frame Profile Tray */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden xl:block leading-tight">
                <h4 className="font-heading font-bold text-sm text-foreground tracking-wide truncate max-w-35">
                  {userName}
                </h4>
                <p className="text-[10px] text-brand uppercase font-black tracking-widest">
                  {userRole}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-background border-2 border-brand/40 overflow-hidden relative shadow-md">
                {userImage ? (
                  <Image 
                    src={userImage} 
                    alt={`${userName}'s identity matrix profile`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground/40">
                    <User className="size-5" />
                  </div>
                )}
              </div>
            </div>

          </div>
        </header>

        {/* MOBILE VIEW NAVIGATION CONTAINER ROW */}
        <div className="md:hidden w-full h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-300">
          <Link href="/" className="font-heading font-black text-xl tracking-wider text-brand uppercase">
            GYM BUDDY
          </Link>
          
          <div className="w-8 h-8 rounded-full bg-background border border-border overflow-hidden relative shrink-0">
            {userImage ? (
              <Image 
                src={userImage} 
                alt={userName} 
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-foreground/40">
                <User className="size-4" />
              </div>
            )}
          </div>
        </div>

        {/* VIEWPORT CANVAS SHELL CONTENT HOST */}
        <main className="flex-1 w-full pb-24 md:pb-0 min-h-screen">
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

      {/* MOBILE BOTTOM NAVIGATION PANEL DOCK */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-card border-t border-border h-20 z-40 px-2 transition-colors duration-300 shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
        <nav className="flex items-center justify-start overflow-x-auto h-full scrollbar-none space-x-1 py-1 px-2">
          {currentNavLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`flex flex-col items-center justify-center min-w-19 px-2 h-full rounded-xl transition-all duration-200 shrink-0 ${
                  isActive ? "text-brand" : "text-foreground/50"
                }`}
              >
                <IconComponent className="size-5 mb-1 shrink-0" />
                <span className="text-[9px] font-heading font-black uppercase tracking-tight text-center max-w-18 truncate">
                  {link.id.replace("-", " ")}
                </span>
              </Link>
            );
          })}
          
          <Link
            href="/dashboard/settings"
            className={`flex flex-col items-center justify-center min-w-19 px-2 h-full rounded-xl shrink-0 ${
              pathname === "/dashboard/settings" ? "text-brand" : "text-foreground/50"
            }`}
          >
            <Settings className="size-5 mb-1 shrink-0" />
            <span className="text-[9px] font-heading font-black uppercase tracking-tight">Set</span>
          </Link>
        </nav>
      </div>

    </div>
  );
};

export default DashboardNavbar;