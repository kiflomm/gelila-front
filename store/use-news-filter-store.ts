import { create } from "zustand";

export type NewsCategory =
  | "all"
  | "press-releases"
  | "company-milestones"
  | "corporate-events"
  | "industry-insights";

interface NewsFilterStore {
  selectedCategory: NewsCategory;
  categories: NewsCategory[];
  setCategory: (category: NewsCategory) => void;
}

export const useNewsFilterStore = create<NewsFilterStore>((set) => ({
  selectedCategory: "all",
  categories: [
    "all",
    "press-releases",
    "company-milestones",
    "corporate-events",
    "industry-insights",
  ],
  setCategory: (category) => set({ selectedCategory: category }),
}));

// Helper function to map category ID to display label
export const getCategoryLabel = (categoryId: NewsCategory): string => {
  const categoryMap: Record<NewsCategory, string> = {
    all: "All",
    "press-releases": "Press Releases",
    "company-milestones": "Company Milestones",
    "corporate-events": "Corporate Events",
    "industry-insights": "Industry Insights",
  };
  return categoryMap[categoryId];
};

// Helper function to check if a news item matches the selected category
export const matchesCategory = (
  itemCategory: string,
  selectedCategory: NewsCategory
): boolean => {
  if (selectedCategory === "all") return true;

  const categoryMap: Record<NewsCategory, string> = {
    all: "All",
    "press-releases": "Press Releases",
    "company-milestones": "Company Milestones",
    "corporate-events": "Corporate Events",
    "industry-insights": "Industry Insights",
  };

  return itemCategory === categoryMap[selectedCategory];
};
