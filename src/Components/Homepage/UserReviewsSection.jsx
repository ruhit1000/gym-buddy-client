"use client";
import React from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

const mockReviews = [
  {
    id: 1,
    name: "Jason Rivera",
    role: "Competitive Boxer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    comment: "The precision of tracking at IRON PULSE is unlike anything I've used. I broke through a six-month plateau in just three weeks of Strike Elite training.",
  },
  {
    id: 2,
    name: "Miranda Hayes",
    role: "Marathon Runner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    comment: "More than just a gym, it's a performance lab. The trainers don't just count reps; they analyze movement. The community keeps me accountable every single day.",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Powerlifter",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    comment: "The environment here is raw energy. Having immediate dashboard updates for personal records makes scaling weight targets completely seamless.",
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Yoga Practitioner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    comment: "The studio space balances beautifully with the strength floors. Instructors help fine-tune alignments without disrupting the meditative breathing rhythm.",
  },
  {
    id: 5,
    name: "David Cho",
    role: "Calisthenics Athlete",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop",
    comment: "Clean equipment transitions and dynamic coaching setups. It provides an absolute powerhouse layout for weight progression and community networking.",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    role: "CrossFit Competitor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    comment: "High-intensity circuits that truly test mental resilience. You run at peak capacity because the overall platform makes monitoring milestones trivial.",
  },
  {
    id: 7,
    name: "Tariq Mahmood",
    role: "HIIT Instructor",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=150&auto=format&fit=crop",
    comment: "Every metric mapped here pushes standard members into premium athletes. The tracking system removes all guesswork from program management.",
  },
  {
    id: 8,
    name: "Nina Simone",
    role: "Dance Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop",
    comment: "Incredibly energetic community threads! It offers direct value through class bookings alongside instant accountability peer links.",
  },
  {
    id: 9,
    name: "Robert Kraft",
    role: "Triathlete",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
    comment: "Structuring swim-to-run transition periods demands rigorous scheduling engines. IRON PULSE solves this perfectly through modular class paths.",
  },
  {
    id: 10,
    name: "Aisha Rahman",
    role: "Corporate Executive",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=150&auto=format&fit=crop",
    comment: "Booking morning slots works instantly around demanding calendars. Secure dashboard workflows help protect my health metrics flawlessly.",
  }
];

const UserReviewsSection = () => {
  // Double the array to ensure a gap-free infinite scrolling marquee loop
  const duplicatedReviews = [...mockReviews, ...mockReviews];

  return (
    <section className="bg-background py-20 border-b border-border transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center md:text-left">
        <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground uppercase tracking-tight mb-3 transition-colors duration-300">
          Athlete <span className="text-brand">Testimonials</span>
        </h2>
        <p className="font-sans text-sm md:text-base text-foreground/70 max-w-xl transition-colors duration-300">
          See how our active global community maximizes potential, breaks tracking records, and targets peak athletic perfection.
        </p>
      </div>

      <div className="w-full flex mask-linear-marquee overflow-hidden">
        <motion.div
          className="flex space-x-6 pr-6"
          animate={{ x: ["0%", "-30%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserReviewsSection;