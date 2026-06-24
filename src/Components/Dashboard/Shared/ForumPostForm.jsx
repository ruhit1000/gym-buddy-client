"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileImage, Loader2, PenSquare } from "lucide-react";
import { Button } from "@heroui/react";
import { createForumPost } from "@/lib/action/forum";

export default function ForumPostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || isSubmitting) return;

    setIsSubmitting(true);
    let uploadedImageUrl = "";

    try {
      if (imageFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", imageFile);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: "POST",
          body: imgFormData,
        });

        const imgData = await response.json();
        if (imgData?.success) {
          uploadedImageUrl = imgData.data.url;
        } else {
          throw new Error("Image upload failed.");
        }
      }

      const res = await createForumPost({
        ...formData,
        image: uploadedImageUrl,
      });

      if (res?.success) {
        router.push("/forum");
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating forum post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-1 flex items-center gap-2">
          <PenSquare className="size-6 text-brand" /> Create Forum Post
        </h1>
        <p className="text-sm text-foreground/60">
          Publish premium articles, tips, or announcements directly to the community workspace channel.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g., Optimizing Compound Lift Form Metrics"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full bg-foreground/2 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
            Cover Banner Image
          </label>
          <div className="relative w-full border border-border rounded-xl bg-foreground/1 hover:bg-foreground/2 p-4 flex flex-col items-center justify-center gap-2 transition-colors group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <FileImage className="size-6 text-foreground/30 group-hover:text-brand transition-colors" />
            <span className="text-xs font-medium text-foreground/60 max-w-xs text-center truncate">
              {imageFile ? imageFile.name : "Select cover image file"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-foreground/70">
            Article Content Body
          </label>
          <textarea
            name="description"
            required
            rows={8}
            placeholder="Write your discussion thread content parameters completely here..."
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-foreground/2 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand transition-colors resize-none font-sans leading-relaxed"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
            className="px-6 py-2 bg-brand text-background text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Publishing Thread...
              </>
            ) : (
              "Publish Post"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}