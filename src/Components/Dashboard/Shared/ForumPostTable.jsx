"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquare, ThumbsUp, ArrowUpRight, Calendar } from "lucide-react";
import { deleteForumPost } from "@/lib/action/forum";
import DeleteForumDialog from "./DeleteForumDialog";

export default function ForumPostTable({ posts: initialPosts }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteExecution = async (postId) => {
    setDeletingId(postId);
    try {
      const res = await deleteForumPost(postId);
      if (res?.success) {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        router.refresh();
      }
    } catch (error) {
      console.error("Failed executing post deletion lifecycle pipeline:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full text-center py-16 border border-dashed border-border rounded-2xl bg-foreground/1">
        <p className="text-foreground/40 text-sm font-medium">No published forum posts available.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-foreground/80">
        <thead className="bg-foreground/2 border-b border-border text-xs font-bold uppercase tracking-wider text-foreground/60">
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Published Date</th>
            <th className="px-6 py-4 text-center">Likes</th>
            <th className="px-6 py-4 text-center">Engagement</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-foreground/1 transition-colors group">
              <td className="px-6 py-4 font-bold text-foreground max-w-sm truncate">
                {post.title}
              </td>
              <td className="px-6 py-4 text-foreground/60">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar className="size-3.5 text-foreground/30" />
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </td>
              <td className="px-6 py-4 text-center font-semibold text-foreground/70">
                <span className="inline-flex items-center gap-1 justify-center">
                  <ThumbsUp className="size-3.5 text-foreground/30" />
                  {post.likes?.length || 0}
                </span>
              </td>
              <td className="px-6 py-4 text-center font-semibold text-foreground/70">
                <span className="inline-flex items-center gap-1 justify-center">
                  <MessageSquare className="size-3.5 text-foreground/30" />
                  {post.commentCount || 0}
                </span>
              </td>
              
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/forum/${post._id}`}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand hover:underline group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    View <ArrowUpRight className="size-3.5" />
                  </Link>
                  
                  <DeleteForumDialog 
                    postTitle={post.title} 
                    isDeleting={deletingId === post._id}
                    onConfirm={() => handleDeleteExecution(post._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}