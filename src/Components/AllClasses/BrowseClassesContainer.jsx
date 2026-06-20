"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Select, ListBox } from "@heroui/react";
import PublicClassCard from "./PublicClassCard";
import { AppPagination } from "../Shared/AppPagination";

export default function BrowseClassesContainer({
  initialData,
  meta,
  availableCategories = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (category) params.set("category", category);
    params.set("page", "1");

    router.push(`/classes?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, category, router]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/classes?${params.toString()}`);
  };

  return (
    <section className="w-full min-h-screen bg-background text-foreground py-12 px-6 max-w-7xl mx-auto font-sans">
      {/* Header Panel Controls matching reference block layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-3">
            FIND YOUR <span className="text-brand">POWER</span>
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed font-medium">
            Push your limits with our expert-led sessions designed for
            high-intensity performance and precision tracking.
          </p>
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full sm:w-56 shrink-0">
          <Select
            placeholder="All Categories"
            aria-label="Category Filters selection parameters"
            selectedKeys={new Set([category])}
            onSelectionChange={(keys) => {
              const selectedValue = keys.toString() || "";
              setCategory(selectedValue);
            }}
            className="w-full text-foreground text-sm"
          >
            <Select.Trigger className="w-full bg-card border border-border rounded-xl p-3 h-11 flex justify-between items-center text-sm text-foreground/60 hover:text-foreground">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-xl shadow-2xl">
              <ListBox aria-label="Available Category selections options">
                <ListBox.Item
                  id=""
                  textValue="All Categories"
                  className="p-2.5 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer font-medium text-brand"
                >
                  All Categories
                </ListBox.Item>

                {availableCategories.map((uniqueCategory) => (
                  <ListBox.Item
                    key={uniqueCategory}
                    id={uniqueCategory}
                    textValue={uniqueCategory}
                    className="p-2.5 rounded-md text-sm hover:bg-brand hover:text-background cursor-pointer"
                  >
                    {uniqueCategory}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* Grid Display Arena */}
      {initialData.length === 0 ? (
        <div className="w-full py-24 text-center border border-dashed border-border rounded-3xl bg-card/20">
          <p className="text-foreground/50 text-sm font-medium">
            No approved classes match your designated search criteria filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialData.map((item) => (
              <PublicClassCard key={item._id} classItem={item} />
            ))}
          </div>

          {/* Dynamic Reusable Pagination Footer anchor */}
          <AppPagination
            currentPage={meta?.currentPage || 1}
            totalPages={meta?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}
