"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  InputGroup,
  Select,
  ListBox,
  toast,
} from "@heroui/react";
import {
  Dumbbell,
  DollarSign,
  Clock,
  Calendar,
  BarChart,
  Camera,
  Tag,
} from "lucide-react";
import { createClass } from "@/lib/action/classes";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AddClassForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const trainerProfile = session?.user || null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
    if (!apiKey) {
      console.error("ImgBB Key is missing from environment variables.");
      return null;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const resData = await response.json();
      if (resData.success) return resData.data.url;
      return null;
    } catch (err) {
      console.error("ImgBB image pipeline breakdown:", err);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const imageFile = formData.get("classImage");

    let hostedImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      hostedImageUrl = await uploadToImgBB(imageFile);
    }

    const combinedSchedule =
      rawData.scheduleDays && rawData.scheduleTime
        ? `${rawData.scheduleDays} • ${rawData.scheduleTime}`
        : "Schedule Not Specified";

    const classDocument = {
      className: rawData.className,
      image:
        hostedImageUrl ||
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
      category: rawData.category,
      difficultyLevel: rawData.difficultyLevel,
      duration: rawData.duration,
      schedule: combinedSchedule,
      price: Number(rawData.price),
      trainerId: trainerProfile?.id,
      trainerName: trainerProfile?.name,
      status: "Pending",
      bookingCount: 0,
    };

    try {
      const res = await createClass(classDocument);
      toast.info(res.message);
      router.push("/dashboard/trainer/my-classes");
    } catch (err) {
      console.error("Database CRUD push failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-card text-foreground border border-border p-8 md:p-12 rounded-3xl transition-all duration-300 shadow-xl font-sans">
      <div className="mb-8">
        <h2 className="font-heading font-black text-2xl uppercase tracking-wider text-brand mb-1">
          Create Dynamic Session
        </h2>
        <p className="text-sm text-foreground/60">
          Fill out the structural metrics parameters required to push a new
          performance profile class to the register pipeline index.
        </p>
      </div>

      <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
        {/* Banner Media Input */}
        <div className="flex flex-col group mb-2">
          <Label className="font-heading text-xs font-bold uppercase tracking-widest text-foreground/50 mb-3">
            Cover Banner Image (Optional)
          </Label>
          <label className="relative w-full h-44 rounded-2xl border-2 border-dashed border-border group-hover:border-brand flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 overflow-hidden bg-background/50">
            <input
              type="file"
              name="classImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Banner preview"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-foreground/40 group-hover:text-brand transition-colors duration-300">
                <Camera className="size-8 mb-2" />
                <span className="text-xs font-medium font-sans">
                  Upload Banner File Asset
                </span>
              </div>
            )}
          </label>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Class Name */}
          <TextField isRequired name="className" className="w-full">
            <div className="flex items-center space-x-2 mb-2 text-foreground/60">
              <Dumbbell className="size-4 text-brand" />
              <Label className="text-sm font-medium">Class Name</Label>
            </div>
            <InputGroup>
              <Input placeholder="e.g., Elite Power HIIT" className="w-full" />
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Category */}
          <TextField isRequired name="category" className="w-full">
            <div className="flex items-center space-x-2 mb-2 text-foreground/60">
              <Tag className="size-4 text-brand" />
              <Label className="text-sm font-medium">Category</Label>
            </div>
            <InputGroup>
              <Input
                placeholder="e.g., Cardio, Strength, Yoga"
                className="w-full"
              />
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Difficulty Level Dropdown Component */}
          <div className="flex flex-col w-full">
            <div className="flex items-center space-x-2 mb-2 text-foreground/60">
              <BarChart className="size-4 text-brand" />
              <Label id="difficulty-label" className="text-sm font-medium">
                Difficulty Level
              </Label>
            </div>
            <Select
              isRequired
              name="difficultyLevel"
              placeholder="Select intensity standard"
              aria-labelledby="difficulty-label"
              className="w-full text-foreground"
            >
              <Select.Trigger className="w-full bg-background border border-border rounded-xl p-3 flex justify-between items-center text-sm">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-card border border-border rounded-xl shadow-lg">
                <ListBox aria-label="Difficulty Levels">
                  <ListBox.Item
                    id="Beginner"
                    textValue="Beginner"
                    className="p-2.5 rounded-lg text-sm hover:bg-brand hover:text-background cursor-pointer"
                  >
                    Beginner
                  </ListBox.Item>
                  <ListBox.Item
                    id="Intermediate"
                    textValue="Intermediate"
                    className="p-2.5 rounded-lg text-sm hover:bg-brand hover:text-background cursor-pointer"
                  >
                    Intermediate
                  </ListBox.Item>
                  <ListBox.Item
                    id="Advanced"
                    textValue="Advanced"
                    className="p-2.5 rounded-lg text-sm hover:bg-brand hover:text-background cursor-pointer"
                  >
                    Advanced
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Duration */}
          <TextField isRequired name="duration" className="w-full">
            <div className="flex items-center space-x-2 mb-2 text-foreground/60">
              <Clock className="size-4 text-brand" />
              <Label className="text-sm font-medium">Duration</Label>
            </div>
            <InputGroup>
              <Input placeholder="e.g., 45 Mins, 1 Hour" className="w-full" />
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Re-arranged Dynamic Schedule Subgrid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:col-span-2">
            {/* Day Selection Dropdown */}
            <div className="flex flex-col w-full">
              <div className="flex items-center space-x-2 mb-2 text-foreground/60">
                <Calendar className="size-4 text-brand" />
                <Label id="days-label" className="text-sm font-medium">
                  Select Training Days
                </Label>
              </div>

              <Select
                isRequired
                name="scheduleDays"
                placeholder="Choose days"
                aria-labelledby="days-label"
                className="w-full text-foreground"
              >
                <Select.Trigger className="w-full bg-background border border-border rounded-xl p-3 flex justify-between items-center text-sm">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-card border border-border rounded-xl shadow-lg">
                  <ListBox
                    selectionMode="multiple"
                    aria-label="Training Days Selection"
                  >
                    <ListBox.Item
                      id="Mon, Wed, Fri"
                      textValue="Mon, Wed, Fri"
                      className="p-2.5 rounded-lg text-sm hover:bg-brand hover:text-background cursor-pointer"
                    >
                      Mon, Wed, Fri (Standard Split)
                    </ListBox.Item>
                    <ListBox.Item
                      id="Tue, Thu"
                      textValue="Tue, Thu"
                      className="p-2.5 rounded-lg text-sm hover:bg-brand hover:text-background cursor-pointer"
                    >
                      Tue, Thu (Midweek Split)
                    </ListBox.Item>
                    <ListBox.Item
                      id="Sat, Sun"
                      textValue="Sat, Sun"
                      className="p-2.5 rounded-lg text-sm hover:bg-brand hover:text-background cursor-pointer"
                    >
                      Sat, Sun (Weekend Warriors)
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Time Picking Metric Box */}
            <TextField isRequired name="scheduleTime" className="w-full">
              <div className="flex items-center space-x-2 mb-2 text-foreground/60">
                <Clock className="size-4 text-brand" />
                <Label className="text-sm font-medium">Daily Start Time</Label>
              </div>
              <InputGroup>
                <Input
                  type="time"
                  className="font-sans w-full text-base transition-colors duration-300 bg-background border border-border rounded-xl p-3"
                />
              </InputGroup>
              <FieldError />
            </TextField>
          </div>

          {/* Price */}
          <TextField isRequired name="price" className="w-full">
            <div className="flex items-center space-x-2 mb-2 text-foreground/60">
              <DollarSign className="size-4 text-brand" />
              <Label className="text-sm font-medium">
                Registration Price ($)
              </Label>
            </div>
            <InputGroup>
              <Input
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                className="w-full"
              />
            </InputGroup>
            <FieldError />
          </TextField>
        </div>

        {/* Submit Action Button Container */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand hover:opacity-90 text-background font-heading text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-md mt-4 disabled:opacity-50"
        >
          {isSubmitting
            ? "Compiling Structure Matrix..."
            : "Submit Class for Verification"}
        </Button>
      </Form>
    </div>
  );
};

export default AddClassForm;
