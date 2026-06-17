"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <nav className="bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#2D2D2D] sticky top-0 z-50 px-6 py-4 font-['Inter'] text-[#F4F4F4]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <span className="text-[#CCFF00] font-black text-4xl">IRON PULSE</span>

        {/* Middle: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-[#CCFF00] transition-colors duration-200 text-sm tracking-wide ${pathname === link.path ? "text-[#CCFF00]" : ""}`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href={`/dashboard/${userRole}`}
              className={`text-[#CCFF00] hover:opacity-80 transition-opacity duration-200 text-sm font-semibold tracking-wide ${pathname === `/dashboard/${userRole}` ? "text-[#CCFF00]" : ""}`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right: User Authentication / Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-full border-2 border-[#CCFF00] overflow-hidden bg-[#2D2D2D] relative flex items-center justify-center">
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
                    className="w-5 h-5 text-[#F4F4F4]"
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
                className="bg-transparent border border-[#2D2D2D] hover:border-red-500 hover:text-red-500 text-xs uppercase tracking-widest px-4 py-2 rounded transition-colors duration-200 font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-[#CCFF00] hover:bg-[#bce600] text-[#1A1A1A] font-['Montserrat'] text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#F4F4F4] focus:outline-none"
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

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#2D2D2D] space-y-3 flex flex-col font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`hover:text-[#CCFF00] py-1 text-sm ${pathname === link.path ? "text-[#CCFF00]" : ""}`}
            >
              {link.name}
            </a>
          ))}
          {isAuthenticated && (
            <a
              href={`/dashboard/${userRole}`}
              className={`py-1 text-sm ${pathname === `/dashboard/${userRole}` ? "text-[#CCFF00]" : "hover:text-[#CCFF00]"}`}
            >
              Dashboard
            </a>
          )}
          <div className="pt-2 border-t border-[#2D2D2D]">
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest py-2.5 rounded font-bold"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-center bg-[#CCFF00] text-[#1A1A1A] font-['Montserrat'] text-xs font-bold uppercase tracking-widest py-2.5 rounded"
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
