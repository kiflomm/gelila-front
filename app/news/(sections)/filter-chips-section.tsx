"use client";

import { cn } from "@/lib/utils";
import {
  useNewsFilterStore,
  getCategoryLabel,
} from "@/store/use-news-filter-store";

export default function FilterChipsSection() {
  const selectedCategory = useNewsFilterStore(
    (state) => state.selectedCategory
  );
  const categories = useNewsFilterStore((state) => state.categories);
  const setCategory = useNewsFilterStore((state) => state.setCategory);

  return (
    <div className="flex justify-center mb-10 lg:mb-12">
      <div className="flex gap-2 p-1.5 bg-zinc-900/5 dark:bg-white/5 rounded-lg overflow-x-auto">
        {categories.map((categoryId) => {
          const isActive = selectedCategory === categoryId;
          return (
            <button
              key={categoryId}
              onClick={() => setCategory(categoryId)}
              className={cn(
                "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-zinc-900/5 dark:hover:bg-white/5"
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium leading-normal",
                  isActive ? "text-white" : "text-zinc-900 dark:text-zinc-100"
                )}
              >
                {getCategoryLabel(categoryId)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
