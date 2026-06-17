"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const MainNavbar = ({
  isAuthenticated,
  userRole,
  userProfilePic,
  onLogout,
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 px-6 py-4 font-sans text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo (Now using the universal brand color) */}
        <span className="font-heading font-black text-4xl tracking-wider select-none text-brand transition-colors duration-300">
          GYM BUDDY
        </span>

        {/* Middle: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-brand transition-colors duration-200 text-sm tracking-wide ${
                pathname === link.path ? "text-brand font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href={`/dashboard/${userRole}`}
              className={`text-brand hover:opacity-80 transition-opacity duration-200 text-sm font-semibold tracking-wide ${
                pathname === `/dashboard/${userRole}`
                  ? "underline decoration-2"
                  : ""
              }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* User Authentication / Profile Area */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="w-9 h-9 rounded-full border-2 border-brand overflow-hidden bg-card relative flex items-center justify-center transition-colors duration-300">
                  {userProfilePic ? (
                    <Image
                      src={userProfilePic}
                      alt="User Profile Picture"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 text-foreground opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="bg-transparent border border-border hover:border-red-500 hover:text-red-500 text-xs uppercase tracking-widest px-4 py-2 rounded transition-colors duration-200 font-bold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-brand text-background font-heading text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded hover:opacity-90 transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-border space-y-3 flex flex-col font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`hover:text-brand py-1 text-sm transition-colors ${
                pathname === link.path ? "text-brand font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href={`/dashboard/${userRole}`}
              onClick={() => setIsOpen(false)}
              className={`py-1 text-sm text-brand ${
                pathname === `/dashboard/${userRole}` ? "font-bold" : ""
              }`}
            >
              Dashboard
            </Link>
          )}
          <div className="pt-2 border-t border-border">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest py-2.5 rounded font-bold cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-brand text-background font-heading text-xs font-bold uppercase tracking-widest py-2.5 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
