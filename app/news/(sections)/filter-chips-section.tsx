"use client";

import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "All" },
  { id: "press-releases", label: "Press Releases" },
  { id: "company-milestones", label: "Company Milestones" },
  { id: "corporate-events", label: "Corporate Events" },
  { id: "industry-insights", label: "Industry Insights" },
];

interface FilterChipsSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function FilterChipsSection({
  activeCategory,
  setActiveCategory,
}: FilterChipsSectionProps) {
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
