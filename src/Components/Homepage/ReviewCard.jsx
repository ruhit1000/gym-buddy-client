import React from "react";
import Image from "next/image";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-card border border-border p-8 rounded-xl min-w-[320px] md:min-w-100 max-w-100 flex flex-col justify-between shrink-0 transition-all duration-300 hover:border-brand/40 select-none">
      <div>
        <span className="font-heading font-black text-4xl text-brand tracking-tighter leading-none block mb-4 transition-colors duration-300">
          “ ”
        </span>
        
        {/* Review Comment Text */}
        <p className="font-sans text-foreground/80 text-sm md:text-base italic leading-relaxed tracking-wide mb-6 transition-colors duration-300">
          "{review.comment}"
        </p>
      </div>

      {/* User Information Profile Array */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full border border-border overflow-hidden bg-background relative shrink-0">
          <Image
            src={review.image}
            alt={`${review.name}'s profile avatar`}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm text-foreground tracking-wide transition-colors duration-300">
            {review.name}
          </h4>
          <p className="font-sans text-xs text-foreground/60 transition-colors duration-300">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;