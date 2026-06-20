import React from 'react';

export default function ClassHero({ data }) {
  return (
    <div className="relative w-full h-[60vh] min-h-100 flex items-end pb-16 px-6 font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data?.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200"})`,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto w-full flex flex-col gap-4">
        <div className="flex gap-3 text-[10px] font-bold tracking-widest uppercase font-heading">
          <span className="bg-brand text-background px-3 py-1 rounded-full shadow-sm">
            {data?.category || "Strength"}
          </span>
          <span className="bg-card/80 text-foreground/80 px-3 py-1 rounded-full border border-border backdrop-blur-sm">
            {data?.difficultyLevel || "Elite Tier"}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight font-heading">
          {data?.className || "Elite Strength Training"}
        </h1>
        
        <p className="text-foreground/70 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
          {data?.description || "Master the fundamentals of powerlifting and hypertrophy with pro-grade coaching."}
        </p>
      </div>
    </div>
  );
}