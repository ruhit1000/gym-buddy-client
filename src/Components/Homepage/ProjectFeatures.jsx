import React from "react";
import { Dumbbell, LineChart, Users } from "lucide-react";

const ProjectFeatures = () => {
  const features = [
    {
      id: 1,
      icon: Dumbbell,
      title: "Expert Trainers",
      description:
        "Vetted professionals with decades of combined athletic coaching experience.",
    },
    {
      id: 2,
      icon: LineChart,
      title: "Modern Gear",
      description:
        "State-of-the-art equipment integrated with digital performance tracking.",
    },
    {
      id: 3,
      icon: Users,
      title: "Community",
      description:
        "A powerful ecosystem of athletes driving each other towards perfection.",
    },
  ];

  return (
    <section className="bg-background py-16 px-6 border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center max-w-sm mx-auto group"
            >
              {/* Circular Icon Wrapper with an adaptive brand-color alpha transparency layer */}
              <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5 transition-all duration-300 group-hover:scale-110">
                <IconComponent className="w-6 h-6 stroke-2" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-foreground text-lg font-bold tracking-wide mb-3 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-foreground/70 text-sm leading-relaxed tracking-normal transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectFeatures;
