"use client";

import { NewsPagination } from "@/components/ui/news-pagination";

export default function PaginationSection() {
  const currentPage = 1;
  const totalPages = 10;

  return (
    <NewsPagination
      currentPage={currentPage}
      totalPages={totalPages}
      getPageHref={(page) => `?page=${page}`}
      className="mt-12"
    />
  );
}
