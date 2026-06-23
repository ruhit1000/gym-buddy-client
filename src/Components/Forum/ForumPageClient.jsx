"use client";

import React, { useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import ForumPostCard from './ForumPostCard';
import { AppPagination } from '../Shared/AppPagination';

export default function ForumPageClient({ initialPosts, totalPages, currentPage, initialSearch }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState(initialSearch);

    // Sync input parameter states back to Next.js URL query strings
    const handleUrlQueryChange = (searchTerm, pageNumber) => {
        const params = new URLSearchParams();
        if (searchTerm.trim() !== "") params.set("search", searchTerm);
        if (pageNumber > 1) params.set("page", pageNumber.toString());

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleUrlQueryChange(searchValue, 1);
    };

    return (
        <div>
            {/* Search Navigation Row */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-brand text-background">Trending</button>
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-colors">Latest</button>
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-colors">Training</button>
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-colors">Nutrition</button>
                </div>

                <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-xs">
                    <input 
                        type="text"
                        placeholder="Search topics..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full bg-foreground/3 dark:bg-foreground/2 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-brand transition-colors"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                        {isPending ? <Loader2 className="size-4 animate-spin text-brand" /> : <Search className="size-4" />}
                    </div>
                </form>
            </div>

            {/* Posts Cards Grid view layout layout */}
            {initialPosts.length === 0 ? (
                <div className="w-full text-center py-20 border border-dashed border-border rounded-2xl bg-card">
                    <p className="text-foreground/50 text-sm font-medium">No forum threads match your search terms.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialPosts.map((post) => (
                        <ForumPostCard key={post._id} post={post} />
                    ))}
                </div>
            )}

            <AppPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(targetPage) => handleUrlQueryChange(searchValue, targetPage)}
            />
        </div>
    );
}