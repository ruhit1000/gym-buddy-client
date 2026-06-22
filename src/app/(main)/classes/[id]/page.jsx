import React from "react";
import { getClassById } from "@/lib/api/classes";
import BookingCard from "@/Components/ClassDetails/BookingCard";
import ClassHero from "@/Components/ClassDetails/ClassHero";
import ClassOverview from "@/Components/ClassDetails/ClassOverview";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { isFavourite } from "@/lib/api/favourites";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await getClassById(id);
  const user = await getUserSession();

  if (!user) {
    return redirect(`/login?redirectTo=/classes/${id}`);
  }

  const isUserFavourite  = await isFavourite(id);

  const classData = res?.data || res || {};

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans pb-24">
      <ClassHero data={classData} />

      <div className="w-full bg-background text-foreground transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <ClassOverview data={classData} />
          </div>
          <div className="lg:col-span-1 relative">
            <BookingCard data={classData} isUserFavourite={isUserFavourite.isFavorited} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
