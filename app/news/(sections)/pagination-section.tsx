"use client";

import { NewsPagination } from "@/components/ui/news-pagination";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  activeCategory?: string;
  onPageChange: (page: number) => void;
}

export default function PaginationSection({
  currentPage,
  totalPages,
  activeCategory,
  onPageChange,
}: PaginationSectionProps) {

  const getPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "all") {
      params.set("category", activeCategory);
    }
    if (page > 1) {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `/news?${queryString}` : "/news";
  };

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-6">
      <NewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        getPageHref={getPageHref}
        onPageChange={onPageChange}
        className="mt-8 sm:mt-10 md:mt-12"
      />
    </div>
  );
}
