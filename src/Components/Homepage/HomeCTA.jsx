import React from "react";
import Link from "next/link";

const HomeCTA = () => {
  return (
    <section className="bg-background py-10 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto bg-brand rounded-sm px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md transition-colors duration-300">
        
        <h2 className="font-heading font-black text-xl md:text-2xl tracking-widest text-charcoal text-center md:text-left uppercase">
          Ready to transform?
        </h2>

        <Link
          href="/register"
          className="w-full md:w-auto text-center bg-charcoal hover:bg-[#2D2D2D] text-brand font-heading text-xs font-bold uppercase tracking-widest px-8 py-4 rounded shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          Get Started Free
        </Link>
        
      </div>
    </section>
  );
};

export default HomeCTA;