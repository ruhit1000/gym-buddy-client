"use client";

import React, { useState } from "react";
import { Clock, Users, Star, Heart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { favouriteToggle } from "@/lib/api/favourites";

export default function BookingCard({ data, isUserFavourite }) {
  const router = useRouter();
  
  const [isFav, setIsFav] = useState(isUserFavourite);
  const [loading, setLoading] = useState(false);

  const totalSlots = data?.totalSlots || 0;
  const bookingCount = data?.bookingCount || 0;
  const remainingSlots = Math.max(0, totalSlots - bookingCount);
  const targetIntensity = Math.min(5, Math.max(1, data?.intensity || 3));

  const handleFavouriteToggle = async () => {
    if (loading || !data?._id) return;
    setLoading(true);
    
    setIsFav(prev => !prev);

    try {
      const res = await favouriteToggle(data._id);
      
      if (res?.success) {
        setIsFav(res.isFavorited);
        router.refresh();
      } else {
        setIsFav(isUserFavourite);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      setIsFav(isUserFavourite);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-xl font-sans transition-colors duration-300">
      <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest mb-2 font-heading">
        Class Investment
      </div>

      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-black text-foreground font-heading">
          ${data?.price ?? 45}
        </span>
        <span className="text-xs text-foreground/50 font-medium">/session</span>
      </div>

      <div className="space-y-4 mb-8 text-sm">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="flex items-center gap-3 text-foreground/70">
            <Clock className="size-4 text-brand" /> Duration
          </div>
          <div className="font-medium text-foreground">
            {data?.duration || "60 Minutes"}
          </div>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="flex items-center gap-3 text-foreground/70">
            <Users className="size-4 text-brand" /> Capacity
          </div>
          <div className="font-medium text-foreground">
            {totalSlots > 0 ? `${remainingSlots} Slots Left` : "Fully Booked"}
          </div>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="flex items-center gap-3 text-foreground/70">
            <Star className="size-4 text-brand" /> Intensity
          </div>
          <div className="flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, index) => {
              const barNumber = index + 1;
              return (
                <div
                  key={index}
                  className={`w-4 h-1.5 rounded-full transition-colors ${
                    barNumber <= targetIntensity ? "bg-brand" : "bg-border"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          disabled={totalSlots > 0 && remainingSlots === 0}
          className="w-full bg-brand hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none text-background font-heading text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
        >
          {totalSlots > 0 && remainingSlots === 0 ? "Full" : "Book Now"}{" "}
          <Zap className="size-4" />
        </button>
        
        {/* Toggle Button Layout */}
        <button 
          onClick={handleFavouriteToggle}
          disabled={loading}
          className="w-full bg-transparent hover:bg-foreground/5 border border-border text-foreground font-heading text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <Heart className={`size-4 transition-transform active:scale-75 ${isFav ? "fill-brand text-brand" : ""}`} />
          {isFav ? "Remove From Favorites" : "Add to Favorites"}
        </button>
      </div>

      <p className="text-[10px] text-foreground/50 text-center mt-6 leading-relaxed">
        Cancellation permitted up to 24 hours before class starts.
        Professional-grade equipment provided.
      </p>
    </div>
  );
}