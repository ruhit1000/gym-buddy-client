"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  User,
  MessageSquare,
  Send,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Edit2,
  X,
  Check,
} from "lucide-react";
import { Button, toast } from "@heroui/react";
import {
  createPostComment,
  togglePostVote,
  updateComment,
  deleteComment,
} from "@/lib/action/forum";

export default function ForumDetailsClient({
  post,
  initialComments,
  currentUser,
}) {
  const [comments, setComments] = useState(initialComments);
  const [votes, setVotes] = useState({
    likes: post.likes || [],
    dislikes: post.dislikes || [],
  });

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const currentUserId = currentUser?.id
  const hasLiked = votes.likes.some((id) => id.toString() === currentUserId);
  const hasDisliked = votes.dislikes.some(
    (id) => id.toString() === currentUserId,
  );

  const handleVote = async (actionType) => {
    try {
      const res = await togglePostVote(post._id, actionType);
      if (res?.success) {
        setVotes({ likes: res.likes, dislikes: res.dislikes });
      }
    } catch (err) {
      console.error("Voting failed:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await createPostComment(post._id, commentText);
      if (res?.success && res?.data) {
        setComments((prev) => [...prev, res.data]);
        setCommentText("");
      }
      else if (res?.success === false) {
        toast.danger(res?.message || "Failed to post comment. Please try again.");
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSave = async (commentId) => {
    if (!editText.trim()) return;
    try {
      const res = await updateComment(commentId, editText);
      if (res?.success) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, text: editText.trim() } : c,
          ),
        );
        setEditingCommentId(null);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      const res = await deleteComment(commentId);
      if (res?.success) {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
      }
    } catch (err) {
      console.error("Deletion failed:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      {/* Post Header */}
      <div className="mb-6">
        <span className="text-[10px] font-black uppercase tracking-wider bg-brand/10 text-brand px-2.5 py-1 rounded-md border border-brand/20">
          {post.authorRole || "Community"}
        </span>
        <h1 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight text-foreground mt-3 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/50 font-medium">
            <div className="flex items-center gap-1.5">
              <User className="size-3.5" />
              <span>By {post.authorName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="size-3.5" />
              <span>{comments.length} Comments</span>
            </div>
          </div>

          {/* Interaction Voting Block Elements */}
          <div className="flex items-center gap-2 bg-foreground/3 p-1 rounded-xl border border-border">
            <button
              onClick={() => handleVote("like")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                hasLiked
                  ? "bg-brand text-background shadow-sm"
                  : "text-foreground/60 hover:bg-foreground/5"
              }`}
            >
              <ThumbsUp
                className={`size-3.5 ${hasLiked ? "fill-current text-background" : "text-foreground/60"}`}
              />
              <span>{votes.likes.length}</span>
            </button>

            <div className="w-px h-4 bg-border" />

            <button
              onClick={() => handleVote("dislike")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                hasDisliked
                  ? "bg-destructive text-destructive-foreground shadow-sm"
                  : "text-foreground/60 hover:bg-foreground/5"
              }`}
            >
              <ThumbsDown
                className={`size-3.5 ${hasDisliked ? "fill-current text-destructive-foreground" : "text-foreground/60"}`}
              />
              <span>{votes.dislikes.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Post Thumbnail Image */}
      {post.image && (
        <div className="relative w-full aspect-video bg-muted border border-border rounded-2xl overflow-hidden shadow-sm mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-w-1200px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      )}

      {/* Post Content Body */}
      <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
        <p className="text-foreground/80 text-base md:text-lg leading-relaxed whitespace-pre-line font-sans">
          {post.description}
        </p>
      </div>

      {/* Comments Section Wrapper */}
      <div className="pt-8 border-t border-border">
        <h2 className="font-heading font-black text-xl uppercase tracking-wider mb-6 flex items-center gap-2">
          Discussion ({comments.length})
        </h2>

        {/* Comment Input Field Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex gap-3 mb-8 items-start"
        >
          <div className="size-8 bg-brand/10 text-brand flex items-center justify-center text-xs font-black rounded-xl uppercase shrink-0 mt-1">
            {currentUser?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 relative">
            <textarea
              rows={3}
              placeholder="Share your thoughts on this topic..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-foreground/2 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-brand transition-colors resize-none pr-12"
            />
            <div className="absolute right-3 bottom-3.5">
              <Button
                type="submit"
                disabled={!commentText.trim() || isSubmitting}
                className="p-2 min-w-0 size-8 bg-brand text-background rounded-lg cursor-pointer disabled:opacity-40"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Comments Loop Mapping */}
        {comments.length === 0 ? (
          <p className="text-sm text-foreground/40 text-center py-6">
            No comments published yet. Start the conversation!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const isCommentOwner =
                comment.userId?.toString() === currentUserId;
              const isEditing = editingCommentId === comment._id;

              return (
                <div
                  key={comment._id}
                  className="flex gap-3 p-4 rounded-xl border border-border/60 bg-foreground/1"
                >
                  <div className="size-7 bg-foreground/10 text-foreground/70 flex items-center justify-center text-xs font-black rounded-lg uppercase shrink-0">
                    {comment.userName?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-foreground/90">
                        {comment.userName}
                      </span>
                      <span className="text-[10px] text-foreground/40 font-medium">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Comment Text or Inline Edit Input Window */}
                    {isEditing ? (
                      <div className="mt-2 flex gap-2 items-center">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-brand"
                        />
                        <button
                          onClick={() => handleEditSave(comment._id)}
                          className="p-1.5 rounded-md bg-brand text-background hover:opacity-90 cursor-pointer"
                        >
                          <Check className="size-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="p-1.5 rounded-md bg-foreground/5 border border-border hover:bg-foreground/10 cursor-pointer"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                          {comment.text}
                        </p>

                        {/* Permanent action panel row for post owners */}
                        {isCommentOwner && (
                          <div className="flex items-center gap-3 mt-2 pt-1">
                            <button
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setEditText(comment.text);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand hover:underline cursor-pointer"
                            >
                              <Edit2 className="size-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-destructive hover:underline cursor-pointer"
                            >
                              <Trash2 className="size-3" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
