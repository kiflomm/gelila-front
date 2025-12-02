"use client";

import { Button } from "@/components/ui/button";
import newsData from "@/data/news.json";

interface FilterChipsSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function FilterChipsSection({
  activeCategory,
  setActiveCategory,
}: FilterChipsSectionProps) {
  // Build categories from news.json categoryMap
  const categories = [
    { id: "all", label: "All" },
    ...Object.entries(newsData.categoryMap).map(([id, label]) => ({
      id,
      label: label as string,
    })),
  ];

  return (
    <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 md:px-6">
      <div className="flex gap-2 p-1.5 bg-zinc-900/5 dark:bg-white/5 rounded-lg overflow-x-auto w-full sm:w-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            variant={activeCategory === category.id ? "default" : "ghost"}
            size="lg"
            className="shrink-0 text-xs sm:text-sm md:text-base"
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
