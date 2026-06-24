"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function MembershipVelocityChart({ chartData }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm transition-colors h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="font-heading font-black text-base uppercase tracking-wider text-foreground">
            Membership Velocity
          </h3>
          <div className="bg-foreground/5 p-0.5 rounded-lg flex gap-1 text-[10px] font-bold uppercase">
            <span className="px-2 py-1 text-foreground/40">Weekly</span>
            <span className="px-2 py-1 bg-brand text-background rounded-md shadow-sm">Monthly</span>
          </div>
        </div>
        <p className="text-xs text-foreground/50 mb-6 font-medium">
          New athlete acquisitions vs churn rate (30 days)
        </p>
      </div>

      {/* Dynamic Recharts Multi-Bar Frame */}
      <div className="w-full h-48 text-xs font-medium">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-main)" 
              opacity={0.5}
              tickLine={false} 
            />
            <YAxis 
              stroke="var(--text-main)" 
              opacity={0.5}
              tickLine={false} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-subtle)",
                borderRadius: "12px",
                color: "var(--text-main)",
                fontSize: "11px"
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "10px", fontSize: "10px", textTransform: "uppercase" }}
            />
            {/* Acquisitions Bar styled with your corporate brand token */}
            <Bar 
              name="Acquisitions" 
              dataKey="acquisitions" 
              fill="var(--brand-theme)" 
              radius={[4, 4, 0, 0]} 
            />
            {/* Churn Bar styled with a subtle descriptive error token */}
            <Bar 
              name="Churn" 
              dataKey="churn" 
              fill="rgba(239, 68, 68, 0.4)" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}