import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

const ClassCard = ({ classData }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-brand/40 group shadow-md">
      <div className="relative w-full h-52 shrink-0">
        {classData.image ? (
          <Image
            src={classData.image}
            alt={`${classData.className} workout session`}
            width={400}
            height={208}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-brand/5 to-foreground/5 flex items-center justify-center text-foreground/20 text-xs font-bold uppercase" />
        )}
        
        <span className="absolute top-4 left-4 bg-brand text-background font-heading font-bold text-xs uppercase px-3 py-1.5 rounded-md tracking-wider transition-colors duration-300">
          {classData.category || "Fitness"}
        </span>
      </div>

      <div className="p-6 flex flex-col grow justify-between">
        <div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-2 tracking-wide transition-colors duration-300 uppercase truncate">
            {classData.className}
          </h3>

          <div className="flex items-center space-x-2 text-foreground/70 mb-6 transition-colors duration-300">
            <User className="w-4 h-4 text-brand shrink-0" />
            <span className="font-sans text-sm tracking-wide">{classData.trainerName || "Assigning Staff"}</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider">
            <div className="flex flex-col">
              <span className="text-foreground/50 text-[10px] mb-1">Price / Time</span>
              <span className="text-foreground text-sm font-black transition-colors duration-300 whitespace-nowrap">
                ${classData.price ?? 0} / {classData.duration || "60 mins"}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-foreground/50 text-[10px] mb-1">Bookings</span>
              <span className="text-brand text-sm font-black transition-colors duration-300">
                {classData.bookingCount || 0} Completed
              </span>
            </div>
          </div>

          <Link
            href={`/classes/${classData._id}`}
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