import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function ForumBuzzSidebar({ buzz }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between h-full shadow-sm transition-colors">
      <div className="space-y-4">
        <h3 className="font-heading font-black text-lg uppercase tracking-wider text-foreground">
          Forum Buzz
        </h3>
        
        <div className="space-y-4">
          {buzz.length === 0 ? (
            <p className="text-foreground/40 text-xs py-4">No recent community threads posted.</p>
          ) : (
            buzz.map((item) => (
              <div key={item._id} className="border-l-2 border-brand/50 pl-3 py-0.5 space-y-1">
                <h4 className="text-xs font-bold text-foreground line-clamp-1 uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-foreground/60 line-clamp-2 leading-normal">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-[9px] text-brand font-bold uppercase tracking-wider pt-0.5">
                  <MessageSquare className="size-2.5" /> {item.commentCount || 0} Replies
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Link 
        href="/forum" 
        className="w-full text-center py-3 mt-6 border border-border hover:bg-foreground/5 text-foreground/80 hover:text-foreground text-xs font-bold uppercase tracking-widest rounded-xl transition-colors block"
      >
        Go to Forum
      </Link>
    </div>
  );
}