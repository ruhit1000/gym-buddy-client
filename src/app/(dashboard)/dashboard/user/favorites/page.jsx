export const dynamic = 'force-dynamic';
import React from "react";
import { getUserFavourites } from "@/lib/api/favourites";
import FavoriteClassCard from "@/Components/Dashboard/User/FavoriteClassCard";

const UserFavoriteClassPage = async () => {
  const res = await getUserFavourites();
  
  const favoritesData = res ? JSON.parse(JSON.stringify(res)) : [];

  return (
    <div className="w-full min-h-screen bg-background text-foreground p-6 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl uppercase tracking-wider text-foreground mb-1">
          My Saved Classes
        </h1>
        <p className="text-sm text-foreground/60">
          Access and manage your bookmarked fitness routines and scheduled workspace tracks.
        </p>
      </div>

      {favoritesData.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-12 text-center">
          <p className="text-foreground/50 font-medium mb-2">No bookmarks found</p>
          <p className="text-xs text-foreground/40 max-w-xs">
            Explore public catalogs and save your preferred programs to see them displayed here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritesData.map((item) => (
            <FavoriteClassCard 
              key={item._id} 
              favoriteId={item._id}
              classData={item.classData} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavoriteClassPage;