import React from "react";
import ClassCard from "../Shared/ClassCard";

// 3 mock data instances sorted by total baseline booking volumes
const featuredData = [
  {
    id: "class-101",
    className: "HIIT Power",
    trainerName: "Sarah J.",
    category: "Cardio",
    price: 25,
    duration: "45m",
    bookingCount: 142,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "class-102",
    className: "Iron Sculpt",
    trainerName: "Marcus Vance",
    category: "Weights",
    price: 30,
    duration: "60m",
    bookingCount: 118,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "class-103",
    className: "Vinyasa Flow",
    trainerName: "Elena Rostova",
    category: "Yoga",
    price: 20,
    duration: "50m",
    bookingCount: 95,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
  }
];

const FeaturedClasses = () => {
  return (
    <section className="bg-background py-20 px-6 md:px-12 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading Label */}
        <div className="text-center md:text-left mb-12">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-3 transition-colors duration-300">
            Featured <span className="text-brand">Classes</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-foreground/70 max-w-xl transition-colors duration-300">
            Our most popular training paths curated to build endurance, dynamic core strength, and structural mobility.
          </p>
        </div>

        {/* Layout Grid Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredData.map((item) => (
            <ClassCard key={item.id} classData={item} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedClasses;