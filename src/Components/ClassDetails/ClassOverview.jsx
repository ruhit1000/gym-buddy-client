import React from "react";
import { Activity, CheckCircle, Zap } from "lucide-react";

export default function ClassOverview({ data }) {
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const scheduleMap = React.useMemo(() => {
    const map = {};
    if (Array.isArray(data?.weeklySchedule)) {
      data.weeklySchedule.forEach((item) => {
        if (item?.day) {
          map[item.day.trim()] = item;
        }
      });
    }
    return map;
  }, [data]);

  return (
    <div className="flex flex-col gap-12 font-sans transition-all duration-300">
      <section className="space-y-6">
        <h2 className="flex items-center gap-2.5 text-2xl font-black text-brand uppercase tracking-wider font-heading">
          <Zap className="size-6 fill-current" /> Class Overview
        </h2>

        <div className="text-sm leading-relaxed text-foreground/80 space-y-4 font-medium max-w-3xl">
          <p>
            {data?.overview ||
              data?.description ||
              "No overview documentation provided for this workout class."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          <div className="bg-card/40 hover:bg-card border border-border/80 p-5 rounded-2xl flex gap-4 items-start shadow-xs transition-all duration-300">
            <div className="p-2.5 bg-brand/10 text-brand rounded-xl shrink-0">
              <CheckCircle className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-foreground uppercase tracking-wide font-heading">
                Advanced Periodization
              </h4>
              <p className="text-xs text-foreground/60 mt-1.5 font-medium leading-normal">
                Cyclical training phases to prevent burnout and maximize gains.
              </p>
            </div>
          </div>

          <div className="bg-card/40 hover:bg-card border border-border/80 p-5 rounded-2xl flex gap-4 items-start shadow-xs transition-all duration-300">
            <div className="p-2.5 bg-brand/10 text-brand rounded-xl shrink-0">
              <Activity className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-foreground uppercase tracking-wide font-heading">
                Biometric Analysis
              </h4>
              <p className="text-xs text-foreground/60 mt-1.5 font-medium leading-normal">
                Utilize pulse sensors to optimize rest periods and intensity.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-black text-brand uppercase tracking-wider mb-6 font-heading">
          Weekly Schedule
        </h2>

        {/* DESKTOP LAYOUT (Hidden on mobile, block on tablet/desktop) */}
        <div className="hidden sm:block border border-border rounded-2xl overflow-hidden bg-card/20 shadow-xs backdrop-blur-xs">
          {/* Calendar Header Column Tracks */}
          <div className="grid grid-cols-7 border-b border-border text-xs font-black text-center text-foreground/50 bg-card/80 py-3.5 uppercase tracking-widest font-heading">
            {dayLabels.map((day) => (
              <div
                key={day}
                className="border-r border-border/40 last:border-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Timetable slots Grid */}
          <div className="grid grid-cols-7 text-[10px] text-center min-h-35 divide-x divide-border">
            {dayLabels.map((day) => {
              const activeSlot = scheduleMap[day];

              if (!activeSlot) {
                return (
                  <div
                    key={day}
                    className="p-3 flex flex-col justify-center items-center bg-transparent opacity-20"
                  >
                    <span className="text-foreground/40 font-bold uppercase tracking-wider font-heading">
                      Rest Day
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={day}
                  className={`p-3 flex flex-col justify-center items-center transition-all duration-200 ${
                    dayLabels.indexOf(day) % 2 === 0
                      ? "bg-card/10 group"
                      : "bg-brand/5"
                  }`}
                >
                  <span className="text-brand font-black tracking-wide text-[11px] mb-1 font-heading">
                    {activeSlot.time || "TBD"}
                  </span>
                  <span className="text-foreground/80 font-black uppercase tracking-wider font-heading block max-w-full truncate px-0.5">
                    {activeSlot.activity || "Training"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE LAYOUT (Visible on mobile, hidden on larger screens) */}
        <div className="block sm:hidden space-y-3">
          {dayLabels.map((day) => {
            const activeSlot = scheduleMap[day];

            return (
              <div
                key={day}
                className={`flex items-center justify-between p-4 rounded-xl border border-border ${
                  activeSlot ? "bg-card" : "bg-card/30 opacity-40"
                }`}
              >
                <div className="text-sm font-black text-foreground uppercase tracking-wider font-heading w-16">
                  {day}
                </div>

                {activeSlot ? (
                  <div className="flex items-center gap-4 text-right">
                    <span className="text-xs bg-brand/10 text-brand font-black px-2.5 py-1 rounded-md font-heading">
                      {activeSlot.time || "TBD"}
                    </span>
                    <span className="text-xs font-bold text-foreground/80 uppercase tracking-wide font-heading">
                      {activeSlot.activity || "Training"}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-foreground/40 font-bold uppercase tracking-wider font-heading">
                    Rest Day
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
