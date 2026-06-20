"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  FieldError,
  InputGroup,
  Select,
  ListBox,
  toast,
} from "@heroui/react";
import {
  Edit2,
  Dumbbell,
  Tag,
  BarChart,
  Clock,
  Calendar,
  DollarSign,
  Camera,
} from "lucide-react";
import { updateClass } from "@/lib/action/classes";

export function UpdateClass({ classItem }) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(classItem?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deconstruct schedule back to its friendly parts if it matches the 'Days • Time' split format
  const initialScheduleParts = classItem?.schedule?.split(" • ") || [];
  const initialDays = initialScheduleParts[0] || "";
  const initialTime = initialScheduleParts[1] || "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
    if (!apiKey) return null;

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
      console.error("ImgBB image update breakdown:", err);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(false);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const imageFile = formData.get("classImage");

    let hostedImageUrl = classItem?.image || "";
    if (imageFile && imageFile.size > 0) {
      const newUrl = await uploadToImgBB(imageFile);
      if (newUrl) hostedImageUrl = newUrl;
    }

    // Combine individual friendly scheduling items back to single target schema string
    const updatedSchedule =
      rawData.scheduleDays && rawData.scheduleTime
        ? `${rawData.scheduleDays} • ${rawData.scheduleTime}`
        : classItem?.schedule;

    const updatedDocument = {
      className: rawData.className,
      image: hostedImageUrl,
      category: rawData.category,
      difficultyLevel: rawData.difficultyLevel,
      duration: rawData.duration,
      schedule: updatedSchedule,
      price: Number(rawData.price),
    };

    setIsSubmitting(true);
    const res = await updateClass(classItem?._id, updatedDocument);
    if (res?.success) {
      toast.success(res.message || "Class updated successfully!");
    } else {
      toast.danger(res?.message || "Failed to update class. Please try again.");
      console.error("Class update error details:", res);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      router.refresh();
    }, 1000);
  };

  return (
    <Modal>
      {/* Trigger Button Row element inside your class table row card */}
      <Button
        isIconOnly
        aria-label="Update class settings"
        size="sm"
        variant="ghost"
        className="hover:bg-amber-500/10 hover:text-amber-500 border border-border/80 text-foreground/60 rounded-xl cursor-pointer"
      >
        <Edit2 className="size-3.5" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl bg-card border border-border text-foreground rounded-3xl shadow-2xl">
            <Modal.CloseTrigger className="text-foreground/60 hover:text-foreground" />

            <Modal.Header className="border-b border-border/60 pb-4">
              <Modal.Icon className="bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Dumbbell className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="font-heading font-black uppercase tracking-wider text-xl">
                Update Class Metrics
              </Modal.Heading>
              <p className="mt-1 text-xs text-foreground/60 font-sans">
                Modify performance criteria blocks or schedule streams for this
                session registry item.
              </p>
            </Modal.Header>

            <Modal.Body className="py-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <Surface
                variant="default"
                className="bg-transparent p-0 shadow-none"
              >
                <Form
                  id="update-class-form"
                  className="flex flex-col gap-5"
                  onSubmit={onSubmit}
                >
                  {/* Dynamic Optional Banner Upload Layer */}
                  <div className="flex flex-col group w-full">
                    <Label className="font-heading text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-2">
                      Update Banner Image (Optional)
                    </Label>
                    <label className="relative w-full h-32 rounded-xl border-2 border-dashed border-border group-hover:border-brand flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 overflow-hidden bg-background/40">
                      <input
                        type="file"
                        name="classImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                      />
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Class banner preview slot"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-foreground/40 group-hover:text-brand transition-colors duration-300">
                          <Camera className="size-6 mb-1" />
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Class Name */}
                    <TextField
                      isRequired
                      name="className"
                      defaultValue={classItem?.className}
                      className="w-full"
                    >
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <Dumbbell className="size-3.5 text-brand" />
                        <Label className="text-xs font-semibold">
                          Class Name
                        </Label>
                      </div>
                      <InputGroup>
                        <Input
                          placeholder="Class Name"
                          className="w-full text-sm bg-background border border-border"
                        />
                      </InputGroup>
                      <FieldError />
                    </TextField>

                    {/* Category */}
                    <TextField
                      isRequired
                      name="category"
                      defaultValue={classItem?.category}
                      className="w-full"
                    >
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <Tag className="size-3.5 text-brand" />
                        <Label className="text-xs font-semibold">
                          Category
                        </Label>
                      </div>
                      <InputGroup>
                        <Input
                          placeholder="Category Index"
                          className="w-full text-sm bg-background border border-border"
                        />
                      </InputGroup>
                      <FieldError />
                    </TextField>

                    {/* Difficulty Level Select Dropdown */}
                    <div className="flex flex-col w-full">
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <BarChart className="size-3.5 text-brand" />
                        <Label
                          id="update-diff-lbl"
                          className="text-xs font-semibold"
                        >
                          Difficulty Level
                        </Label>
                      </div>
                      <Select
                        isRequired
                        name="difficultyLevel"
                        placeholder="Select level"
                        aria-labelledby="update-diff-lbl"
                        defaultSelectedKeys={[
                          classItem?.difficultyLevel || "Beginner",
                        ]}
                        className="w-full text-foreground text-sm"
                      >
                        <Select.Trigger className="w-full bg-background border border-border rounded-xl p-2.5 flex justify-between items-center text-sm text-foreground/80">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-card border border-border rounded-xl shadow-xl">
                          <ListBox aria-label="Difficulty Selection Options">
                            <ListBox.Item
                              id="Beginner"
                              textValue="Beginner"
                              className="p-2 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                            >
                              Beginner
                            </ListBox.Item>
                            <ListBox.Item
                              id="Intermediate"
                              textValue="Intermediate"
                              className="p-2 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                            >
                              Intermediate
                            </ListBox.Item>
                            <ListBox.Item
                              id="Advanced"
                              textValue="Advanced"
                              className="p-2 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                            >
                              Advanced
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Duration Input */}
                    <TextField
                      isRequired
                      name="duration"
                      defaultValue={classItem?.duration}
                      className="w-full"
                    >
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <Clock className="size-3.5 text-brand" />
                        <Label className="text-xs font-semibold">
                          Duration Parameters
                        </Label>
                      </div>
                      <InputGroup>
                        <Input
                          placeholder="e.g., 45 Mins"
                          className="w-full text-sm bg-background border border-border"
                        />
                      </InputGroup>
                      <FieldError />
                    </TextField>

                    {/* Friendly Schedule Days Dropdown Selection */}
                    <div className="flex flex-col w-full">
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <Calendar className="size-3.5 text-brand" />
                        <Label
                          id="update-days-lbl"
                          className="text-xs font-semibold"
                        >
                          Training Days
                        </Label>
                      </div>
                      <Select
                        isRequired
                        name="scheduleDays"
                        placeholder="Choose splits"
                        aria-labelledby="update-days-lbl"
                        defaultSelectedKeys={initialDays ? [initialDays] : []}
                        className="w-full text-foreground text-sm"
                      >
                        <Select.Trigger className="w-full bg-background border border-border rounded-xl p-2.5 flex justify-between items-center text-sm text-foreground/80">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-card border border-border rounded-xl shadow-xl">
                          <ListBox
                            selectionMode="multiple"
                            aria-label="Day Scheduling Tracks"
                          >
                            <ListBox.Item
                              id="Mon, Wed, Fri"
                              textValue="Mon, Wed, Fri"
                              className="p-2 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                            >
                              Mon, Wed, Fri
                            </ListBox.Item>
                            <ListBox.Item
                              id="Tue, Thu"
                              textValue="Tue, Thu"
                              className="p-2 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                            >
                              Tue, Thu
                            </ListBox.Item>
                            <ListBox.Item
                              id="Sat, Sun"
                              textValue="Sat, Sun"
                              className="p-2 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                            >
                              Sat, Sun
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Friendly Native Clock input selection field */}
                    <TextField
                      isRequired
                      name="scheduleTime"
                      defaultValue={initialTime}
                      className="w-full"
                    >
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <Clock className="size-3.5 text-brand" />
                        <Label className="text-xs font-semibold">
                          Daily Start Time
                        </Label>
                      </div>
                      <InputGroup>
                        <Input
                          type="time"
                          className="w-full text-sm bg-background border border-border rounded-xl p-2.5 outline-hidden"
                        />
                      </InputGroup>
                      <FieldError />
                    </TextField>

                    {/* Pricing Field Input */}
                    <TextField
                      isRequired
                      name="price"
                      defaultValue={classItem?.price?.toString()}
                      className="w-full sm:col-span-2"
                    >
                      <div className="flex items-center space-x-2 mb-1.5 text-foreground/60">
                        <DollarSign className="size-3.5 text-brand" />
                        <Label className="text-xs font-semibold">
                          Base Registration Cost ($)
                        </Label>
                      </div>
                      <InputGroup>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="0.00"
                          className="w-full text-sm bg-background border border-border"
                        />
                      </InputGroup>
                      <FieldError />
                    </TextField>
                  </div>
                </Form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="border-t border-border/60 pt-4 flex items-center justify-end space-x-2">
              <Button
                slot="close"
                variant="ghost"
                className="border border-border/80 text-foreground/70 hover:bg-foreground/5 rounded-xl text-xs font-heading font-black uppercase tracking-wider px-4 py-2 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="update-class-form"
                disabled={isSubmitting}
                className="bg-brand hover:opacity-90 text-background font-heading text-xs font-black uppercase tracking-wider px-5 py-2 rounded-xl shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving Matrix Modifications..."
                  : "Save Modifications"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
