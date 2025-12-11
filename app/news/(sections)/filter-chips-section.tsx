"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/use-news";

interface FilterChipsSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function FilterChipsSection({
  activeCategory,
  setActiveCategory,
}: FilterChipsSectionProps) {
  const { data: categoriesData, isLoading } = useCategories();

  // Ensure categories is always an array
  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  // Build categories list with "All" option
  const categoryList = [
    { id: "all", label: "All", slug: "all" },
    ...categories.map((cat) => ({
      id: cat.slug,
      label: cat.name,
      slug: cat.slug,
    })),
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 md:px-6 animate-in fade-in duration-300">
        <div className="flex gap-2 p-1.5 bg-zinc-900/5 dark:bg-white/5 rounded-lg overflow-x-auto w-full sm:w-auto">
          <Skeleton className="h-10 w-16 rounded-lg shrink-0" />
          <Skeleton className="h-10 w-28 rounded-lg shrink-0" />
          <Skeleton className="h-10 w-32 rounded-lg shrink-0" />
          <Skeleton className="h-10 w-24 rounded-lg shrink-0" />
          <Skeleton className="h-10 w-36 rounded-lg shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 md:px-6">
      <div className="flex gap-2 p-1.5 bg-zinc-900/5 dark:bg-white/5 rounded-lg overflow-x-auto w-full sm:w-auto">
        {categoryList.map((category) => (
          <Button
            key={category.id}
            onClick={() => setActiveCategory(category.slug)}
            variant={activeCategory === category.slug ? "default" : "ghost"}
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
