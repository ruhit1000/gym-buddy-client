import React from "react";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-start px-6 md:px-12 bg-background transition-colors duration-300 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
          alt="Athletic training background"
          fill
          priority
          className="object-cover object-center opacity-35 dark:opacity-40"
        />
        {/* Dynamic gradient mask adapting cleanly to light/dark canvas tokens */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-transparent transition-colors duration-300" />
      </div>

      {/* Content Container */}
      <div className ="container mx-auto">
        <div className="relative z-10 max-w-3xl font-sans text-foreground transition-colors duration-300">
          <h1 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mb-6">
            Unleash Your <br />
            <span className="text-brand transition-colors duration-300">
              Inner Athlete
            </span>
          </h1>

          <p className="text-sm sm:text-base text-foreground/80 max-w-lg mb-8 leading-relaxed tracking-wide">
            Train with elite professionals in high-intensity environments. Track
            every metric, beat every record, and join a community that pushes
            your limits daily.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/classes"
              className="bg-brand hover:opacity-90 text-background font-heading text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded transition-all duration-200 cursor-pointer"
            >
              Explore Classes
            </Link>

            <Link
              href="/forum"
              className="bg-transparent border-2 border-brand hover:bg-brand hover:text-background text-brand font-heading text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded transition-all duration-200 cursor-pointer"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
