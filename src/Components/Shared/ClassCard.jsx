import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

const ClassCard = ({ classData }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand/40 group shadow-md">
      {/* Upper Thumbnail Layer */}
      <div className="relative w-full h-52 shrink-0">
        <Image
          src={classData.image}
          alt={`${classData.className} workout session`}
          width={400}
          height={208}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        {/* Category Pill Tag (Uses unified brand theme background) */}
        <span className="absolute top-4 left-4 bg-brand text-background font-heading font-bold text-xs uppercase px-3 py-1.5 rounded-md tracking-wider transition-colors duration-300">
          {classData.category}
        </span>
      </div>

      {/* Lower Meta Metrics Section */}
      <div className="p-6 flex flex-col grow justify-between">
        <div>
          {/* Class Name */}
          <h3 className="font-heading font-bold text-xl text-foreground mb-2 tracking-wide transition-colors duration-300">
            {classData.className}
          </h3>

          {/* Trainer Assignment */}
          <div className="flex items-center space-x-2 text-foreground/70 mb-6 transition-colors duration-300">
            <User className="w-4 h-4 text-brand shrink-0" />
            <span className="font-sans text-sm tracking-wide">{classData.trainerName}</span>
          </div>
        </div>

        {/* Dynamic Metric Rows */}
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider">
            {/* Price / Duration Split Column */}
            <div className="flex flex-col">
              <span className="text-foreground/50 text-[10px] mb-1">Price</span>
              <span className="text-foreground text-sm font-black transition-colors duration-300">
                ${classData.price} / {classData.duration}
              </span>
            </div>

            {/* Total System Booking Trailing Status */}
            <div className="flex flex-col items-end">
              <span className="text-foreground/50 text-[10px] mb-1">Bookings</span>
              <span className="text-brand text-sm font-black transition-colors duration-300">
                {classData.bookingCount} Completed
              </span>
            </div>
          </div>

          {/* Core Action Navigation Wrapper */}
          <Link
            href={`/classes/${classData.id}`}
            className="block w-full text-center bg-foreground/10 hover:bg-brand text-foreground hover:text-background font-heading text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;