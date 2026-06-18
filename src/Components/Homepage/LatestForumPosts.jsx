import React from "react";
import Link from "next/link";
import { FaRegComment, FaRegThumbsUp, FaUserCircle } from "react-icons/fa";

const latestPostsMock = [
  {
    id: "post-001",
    author: "Alex_PR_Machine",
    timeAgo: "2 hours ago",
    title: "Best pre-workout snacks for high-intensity HIIT days?",
    commentsCount: 24,
    likesCount: 142,
  },
  {
    id: "post-002",
    author: "Strong_Sarah",
    timeAgo: "5 hours ago",
    title: "Form check: Transitioning from high-bar to low-bar squats.",
    commentsCount: 18,
    likesCount: 89,
  },
  {
    id: "post-003",
    author: "Iron_Junkie_99",
    timeAgo: "Just now",
    title: "Recovery rituals: Who else is swearing by cold plunges?",
    commentsCount: 5,
    likesCount: 31,
  },
];

const LatestForumPosts = () => {
  return (
    <section className="bg-background py-20 px-6 md:px-12 border-b border-border transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-heading font-bold text-2xl text-foreground tracking-wide transition-colors duration-300">
            Community Conversations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPostsMock.map((post) => (
            <Link
              key={post.id}
              href={`/forum/${post.id}`}
              className="bg-card border border-border p-6 rounded-xl flex flex-col justify-between h-56 transition-all duration-300 hover:border-brand/40 group shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <FaUserCircle className="w-8 h-8 text-foreground/40 group-hover:text-brand transition-colors duration-300 shrink-0" />
                <div className="leading-tight">
                  <h4 className="font-heading font-bold text-sm text-foreground tracking-wide transition-colors duration-300">
                    {post.author}
                  </h4>
                  <span className="text-[11px] text-foreground/50 transition-colors duration-300">
                    {post.timeAgo}
                  </span>
                </div>
              </div>

              <p className="font-sans font-medium text-base text-foreground line-clamp-3 leading-snug tracking-wide group-hover:text-brand/90 transition-colors duration-300 my-4">
                {post.title}
              </p>

              <div className="flex items-center space-x-4 text-xs font-heading font-semibold text-foreground/60 transition-colors duration-300">
                <div className="flex items-center space-x-1.5 hover:text-brand transition-colors">
                  <FaRegComment className="w-4 h-4 shrink-0" />
                  <span>{post.commentsCount}</span>
                </div>
                <div className="flex items-center space-x-1.5 hover:text-brand transition-colors">
                  <FaRegThumbsUp className="w-4 h-4 shrink-0" />
                  <span>{post.likesCount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default LatestForumPosts;