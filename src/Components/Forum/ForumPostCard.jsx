"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, ThumbsUp, ArrowRight } from 'lucide-react';

export default function ForumPostCard({ post }) {
    const isTrainer = post.authorRole === "trainer";

    return (
        <div className="group flex flex-col bg-card border border-border hover:border-border-hover rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
            <div className="relative w-full aspect-16/10 bg-muted overflow-hidden">
                {post.image ? (
                    <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-foreground/20">
                        No Image Available
                    </div>
                )}
                <span className={`absolute left-4 top-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border ${
                    isTrainer 
                        ? "bg-brand text-background border-brand" 
                        : "bg-emerald-500/90 text-white border-emerald-600"
                }`}>
                    {isTrainer ? "Training" : "Community"}
                </span>
            </div>

            {/* Card Descriptions Content Frame */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-heading font-black text-lg lg:text-xl uppercase tracking-tight text-foreground line-clamp-2 mb-3 min-h-14 leading-tight group-hover:text-brand transition-colors">
                    {post.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                    <div className="size-6 bg-foreground/10 text-foreground flex items-center justify-center text-xs font-black rounded-md uppercase">
                        {post.authorName?.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-foreground/80">{post.authorName}</span>
                </div>

                <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div className="flex items-center gap-4 text-foreground/40 text-xs font-bold">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="size-3.5" />
                            <span>{post.commentCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="size-3.5" />
                            <span>{post.likes?.length || 0}</span>
                        </div>
                    </div>

                    <Link 
                        href={`/forum/${post._id}`}
                        className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    >
                        Read More <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}