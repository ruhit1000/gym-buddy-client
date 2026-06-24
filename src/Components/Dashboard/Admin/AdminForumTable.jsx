"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageSquare, ThumbsUp, ArrowUpRight, Calendar, ShieldAlert } from "lucide-react";
import { adminDeleteForumPost } from "@/lib/action/forum";
import DeleteForumDialog from "../Shared/DeleteForumDialog";

export default function AdminForumTable({ posts: initialPosts }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState(null);

  const handleAdminDelete = async (postId) => {
    setDeletingId(postId);
    try {
      const res = await adminDeleteForumPost(postId);
      if (res?.success) {
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        router.refresh();
      }
    } catch (error) {
      console.error("Admin moderation deletion failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full text-center py-16 border border-dashed border-border rounded-2xl bg-foreground/1">
        <p className="text-foreground/40 text-sm font-medium">No community posts found on the platform.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-foreground/80">
        <thead className="bg-foreground/2 border-b border-border text-xs font-bold uppercase tracking-wider text-foreground/60">
          <tr>
            <th className="px-6 py-4">Topic Title</th>
            <th className="px-6 py-4">Author</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4 text-center">Stats</th>
            <th className="px-6 py-4 text-right">Moderation Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-foreground/1 transition-colors group">
              <td className="px-6 py-4 font-bold text-foreground max-w-xs truncate">
                {post.title}
              </td>
              <td className="px-6 py-4 text-foreground/70 font-medium">
                {post.authorName}
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  post.authorRole === 'admin' 
                    ? "bg-red-500/10 text-red-500 border-red-500/20" 
                    : "bg-brand/10 text-brand border-brand/20"
                }`}>
                  {post.authorRole || "user"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3 text-xs font-semibold text-foreground/50">
                  <span className="flex items-center gap-1"><ThumbsUp className="size-3" /> {post.likes?.length || 0}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="size-3" /> {post.commentCount || 0}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/forum/${post._id}`}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand hover:underline"
                  >
                    Inspect <ArrowUpRight className="size-3.5" />
                  </Link>
                  <DeleteForumDialog 
                    postTitle={post.title} 
                    isDeleting={deletingId === post._id}
                    onConfirm={() => handleAdminDelete(post._id)}
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