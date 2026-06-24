"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";

export default function FavoritesList({ favorites }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-black text-lg uppercase tracking-wider text-foreground">
          Favorites
        </h3>
      </div>

      <div className="bg-card border border-border/80 rounded-2xl p-3 space-y-2.5 shadow-sm">
        {favorites.length === 0 ? (
          <p className="text-xs text-foreground/40 text-center py-8">No favorited tracks saved.</p>
        ) : (
          favorites.map((fav) => (
            <div 
              key={fav._id}
              className="flex items-center justify-between p-2 rounded-xl bg-foreground/1 hover:bg-foreground/3 border border-border/40 transition-colors gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Micro Thumbnail Asset Element */}
                <div className="relative size-10 rounded-lg bg-muted overflow-hidden shrink-0 border border-border/50">
                  {fav.image && (
                    <Image src={fav.image} alt={fav.className} fill className="object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-foreground group-hover:text-brand transition-colors truncate uppercase tracking-tight">
                    {fav.className}
                  </h4>
                  <p className="text-[10px] text-foreground/40 font-semibold uppercase tracking-wider mt-0.5">
                    {fav.duration} • INTENSITY {fav.intensity || 3}/5
                  </p>
                </div>
              </div>

              <Heart className="size-3.5 fill-brand text-brand shrink-0 mr-1" />
            </div>
          ))
        )}

        {/* Dynamic Navigation Row Button Element */}
        <Link 
          href="/classes"
          className="w-full py-2.5 mt-2 border border-dashed border-border/80 hover:border-brand rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-foreground/50 hover:text-brand bg-foreground/0.5 hover:bg-brand/2 transition-all cursor-pointer"
        >
          <Plus className="size-3.5" /> Browse More Classes
        </Link>
      </div>
    </div>
  );
}