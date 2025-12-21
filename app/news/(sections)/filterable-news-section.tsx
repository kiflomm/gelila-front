"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useNews } from "@/hooks/use-news";
import FilterChipsSection from "./filter-chips-section";
import NewsGridSection from "./news-grid-section";
import PaginationSection from "./pagination-section";

export default function FilterableNewsSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize state from URL params
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // Update URL when filters change
  const updateURL = (updates: { category?: string; page?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.category !== undefined) {
      if (updates.category === "all") {
        params.delete("category");
      } else {
        params.set("category", updates.category);
      }
    }
    
    if (updates.page !== undefined) {
      if (updates.page === 1) {
        params.delete("page");
      } else {
        params.set("page", updates.page.toString());
      }
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/news";
    router.push(newUrl, { scroll: false });
  };

  // Sync state with URL params when they change
  useEffect(() => {
    const category = searchParams.get("category") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to page 1 when category changes
    updateURL({ category, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page });
    // Scroll to top of news section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch news data once to get pagination info
  const { data: newsData } = useNews({
    category: activeCategory === "all" ? undefined : activeCategory,
    page: currentPage,
    limit: 5,
  });

  const totalPages = newsData?.pagination?.totalPages || 1;

  return (
    <>
      <FilterChipsSection
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
      />
      <NewsGridSection 
        activeCategory={activeCategory === "all" ? undefined : activeCategory}
        currentPage={currentPage}
      />
      {totalPages > 1 && (
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          activeCategory={activeCategory === "all" ? undefined : activeCategory}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
