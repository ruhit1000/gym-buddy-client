"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "@gravity-ui/icons";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setMounted(true);

    const documentHtml = document.querySelector("html");
    if (documentHtml) {
      documentHtml.setAttribute("data-theme", savedTheme);
      if (savedTheme === "dark") {
        documentHtml.classList.add("dark");
      } else {
        documentHtml.classList.remove("dark");
      }
    }
  }, []);

  // Update DOM when the theme state changes post-mount
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("theme", theme);
    const documentHtml = document.querySelector("html");
    if (documentHtml) {
      documentHtml.setAttribute("data-theme", theme);
      if (theme === "dark") {
        documentHtml.classList.add("dark");
      } else {
        documentHtml.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (!mounted) {
    return (
      <div className="relative inline-flex shrink-0 h-6 w-11 md:h-8 md:w-14 bg-[#2D2D2D] border-2 border-[#2D2D2D] rounded-full opacity-0" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Theme"
      className={`
        relative inline-flex shrink-0 cursor-pointer rounded-full 
        border-2 transition-colors duration-300 ease-in-out focus:outline-none
        
        /* Responsive Framework Dimensions */
        h-6 w-11 md:h-8 md:w-14
        
        ${isDark ? "bg-volt/20 border-volt" : "bg-[#2D2D2D] border-[#2D2D2D]"}
      `}
    >
      {/* Sliding Switch Thumb */}
      <span
        className={`
          pointer-events-none flex transform items-center justify-center 
          rounded-full shadow-md ring-0 transition duration-300 ease-in-out
          
          /* Responsive Thumb Sizing & Position */
          h-5 w-5 md:h-7 md:w-7
          ${isDark ? "translate-x-5 md:translate-x-6 bg-volt" : "translate-x-0 bg-[#F4F4F4]"}
        `}
      >
        {isDark ? (
          <Moon className="size-3 md:size-4 text-charcoal font-bold" />
        ) : (
          <Sun className="size-3 md:size-4 text-[#2D2D2D]" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
