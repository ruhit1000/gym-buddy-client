import React from "react";
import Link from "next/link";
import { FaRegComment, FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { latestForumPosts } from "@/lib/api/stats";

const LatestForumPosts = async () => {
  const res = await latestForumPosts();
  const posts = res?.success && res?.data ? res.data : [];

  return (
    <section className="bg-background py-20 px-6 md:px-12 border-b border-border transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-foreground uppercase tracking-wider transition-colors duration-300">
            Community <span className="text-brand">Conversations</span>
          </h2>
          <p className="text-xs font-medium text-foreground/50 mt-1 uppercase tracking-widest">
            Latest trends and insights shared by instructors and staff[cite: 103].
          </p>
        </div>

        {/* Empty State Fallback */}
        {posts.length === 0 ? (
          <div className="w-full text-center py-12 border border-dashed border-border rounded-2xl bg-foreground/1">
            <p className="text-sm text-foreground/40 font-medium">No recent forum entries recorded on the feed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/forum/${post._id}`}
                className="bg-card border border-border p-6 rounded-xl flex flex-col justify-between h-60 transition-all duration-300 hover:border-brand/40 group shadow-sm"
              >
                {/* Author Information Identity row */}
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="w-8 h-8 text-foreground/40 group-hover:text-brand transition-colors duration-300 shrink-0" />
                  <div className="leading-tight">
                    <h4 className="font-heading font-bold text-sm text-foreground tracking-wide transition-colors duration-300">
                      {post.authorName || "Anonymous Staff"}
                    </h4>
                    <span className="text-[10px] bg-brand/10 text-brand px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      {post.authorRole || "Trainer"}
                    </span>
                  </div>
                </div>

                {/* Forum Topic Headline */}
                <p className="font-sans font-bold text-base text-foreground line-clamp-3 leading-snug tracking-wide group-hover:text-brand/90 transition-colors duration-300 my-4 uppercase">
                  {post.title}
                </p>

                {/* Social Counters Row Layout */}
                <div className="flex items-center space-x-4 text-xs font-heading font-bold uppercase tracking-wider text-foreground/50">
                  <div className="flex items-center space-x-1.5 hover:text-brand transition-colors">
                    <FaRegComment className="w-4 h-4 shrink-0" />
                    <span>{post.commentCount || 0} Replies</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 hover:text-brand transition-colors">
                    <FaRegThumbsUp className="w-4 h-4 shrink-0" />
                    <span>{post.likes?.length || 0} Likes</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default LatestForumPosts;