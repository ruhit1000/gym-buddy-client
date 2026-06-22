"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { applyForTrainer } from "@/lib/action/trainerApply";
import { authClient } from "@/lib/auth-client";

export default function TrainerApplicationForm() {
  const router = useRouter();
  const {data: session} = authClient.useSession();
  const userStatus = session?.user?.trainerApplication || "none";
  
    if (userStatus === "pending") {
        router.push("/dashboard/user/apply");
    }

  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState("");
  const [specialties, setSpecialties] = useState([]);

  const specialtyOptions = [
    "Yoga",
    "Weight Training",
    "Cardio",
    "HIIT",
    "Pilates",
    "CrossFit",
  ];

  const handleCheckboxChange = (specialty) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((item) => item !== specialty)
        : [...prev, specialty],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        experience,
        specialties,
      };

      const res = await applyForTrainer(payload);

      if (res?.success) {
        router.refresh();
        router.push("/dashboard/user/apply");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center bg-background text-foreground p-4 transition-colors duration-300">
      {/* Back to Status Control Link */}
      <div className="w-full max-w-lg mb-4 flex justify-start">
        <Link
          href="/dashboard/user/apply"
          className="flex items-center gap-2 text-xs text-foreground/50 hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />{" "}
          Back to Application Overview
        </Link>
      </div>

      <div className="max-w-lg w-full bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl font-sans">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="size-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="size-6" />
          </div>
          <h1 className="font-heading font-black text-2xl uppercase tracking-wider mb-1">
            Trainer Verification
          </h1>
          <p className="text-xs text-foreground/60 max-w-xs">
            Provide your technical credentials below to begin your platform
            authorization.
          </p>
        </div>

        {/* Input Interface */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Input Block */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="experience"
              className="text-xs font-bold font-heading uppercase text-foreground/70 tracking-wider"
            >
              Professional Experience (Years)
            </label>
            <input
              id="experience"
              type="number"
              min="0"
              max="50"
              required
              disabled={loading}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 3"
              className="w-full px-4 py-3 bg-foreground/2 border border-border rounded-xl text-sm focus:outline-none focus:border-brand transition-colors disabled:opacity-50"
            />
          </div>

          {/* Specialties Checklist Container */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold font-heading uppercase text-foreground/70 tracking-wider">
              Core Specialty Segments{" "}
              <span className="text-brand text-xs">*</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              {specialtyOptions.map((specialty) => {
                const isChecked = specialties.includes(specialty);
                return (
                  <label
                    key={specialty}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer select-none text-sm transition-all duration-200 ${
                      isChecked
                        ? "border-brand bg-brand/5 text-brand font-medium"
                        : "border-border bg-foreground/1 hover:bg-foreground/3 text-foreground/70"
                    }`}
                  >
                    <input
                      type="checkbox"
                      disabled={loading}
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(specialty)}
                      className="accent-brand size-4 cursor-pointer hidden"
                    />
                    <span>{specialty}</span>
                  </label>
                );
              })}
            </div>
            {specialties.length === 0 && (
              <p className="text-[11px] text-foreground/40 mt-1">
                Select at least one specialty domain.
              </p>
            )}
          </div>

          {/* Form Action Dispatcher */}
          <button
            type="submit"
            disabled={loading || !experience || specialties.length === 0}
            className="w-full bg-brand hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none text-background font-heading text-sm font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Processing
                Request...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
