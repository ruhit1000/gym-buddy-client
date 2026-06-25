import React from "react";
import ClassCard from "../Shared/ClassCard";
import { featuredClasses } from "@/lib/api/stats";

const FeaturedClasses = async () => {
  const res = await featuredClasses();
  const featuredData = res?.success && res?.data ? res.data : [];
  
  return (
    <section className="bg-background py-20 px-6 md:px-12 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center md:text-left mb-12">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-3 transition-colors duration-300">
            Featured <span className="text-brand">Classes</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-foreground/70 max-w-xl transition-colors duration-300">
            Our most popular training paths curated to build endurance, dynamic core strength, and structural mobility[cite: 73].
          </p>
        </div>

        {featuredData.length === 0 ? (
          <div className="w-full text-center py-12 border border-dashed border-border rounded-2xl bg-foreground/1">
            <p className="text-sm text-foreground/40 font-medium">No featured classes available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredData.map((item) => (
              <ClassCard key={item._id} classData={item} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default FeaturedClasses;