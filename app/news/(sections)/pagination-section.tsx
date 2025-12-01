"use client";

import { NewsPagination } from "@/components/ui/news-pagination";

export default function PaginationSection() {
  const currentPage = 1;
  const totalPages = 10;

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-6">
      <NewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        getPageHref={(page) => `?page=${page}`}
        className="mt-8 sm:mt-10 md:mt-12"
      />
    </div>
  );
}
