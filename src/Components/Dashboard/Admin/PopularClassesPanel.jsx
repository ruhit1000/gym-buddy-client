import React from "react";

export default function PopularClassesPanel({ classes }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm transition-colors">
      <h3 className="font-heading font-black text-base uppercase tracking-wider text-foreground mb-4">
        Popular Classes
      </h3>

      <div className="space-y-4">
        {classes.length === 0 ? (
          <p className="text-foreground/40 text-xs py-2">No class engagement data recorded.</p>
        ) : (
          classes.map((cls) => (
            <div key={cls._id} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <div>
                  <h4 className="text-foreground font-black uppercase tracking-tight">{cls.className}</h4>
                  <p className="text-[10px] text-foreground/40 font-medium mt-0.5">{cls.schedule || "Mon, Wed, Fri • 08:00 AM"}</p>
                </div>
                <span className="text-brand font-black font-mono">{cls.capacityPercentage}% Full</span>
              </div>
              <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand rounded-full transition-all duration-500" 
                  style={{ width: `${cls.capacityPercentage}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}