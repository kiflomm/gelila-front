"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  getPageHref?: (page: number) => string;
  className?: string;
}

export function NewsPagination({
  currentPage,
  totalPages,
  getPageHref = (page) => `?page=${page}`,
  className,
}: NewsPaginationProps) {
  const renderPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show pages 2, 3, 4 if current page is near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show pages near the end if current page is near the end
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = renderPageNumbers();
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <Link
        href={prevPage ? getPageHref(prevPage) : "#"}
        className={cn(
          "flex size-10 items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
          !prevPage && "pointer-events-none opacity-50"
        )}
        aria-label="Previous page"
        aria-disabled={!prevPage}
      >
        <ChevronLeft className="size-5" />
      </Link>

      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-zinc-900 dark:text-zinc-100 rounded-full"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={getPageHref(page)}
            className={cn(
              "text-sm leading-normal flex size-10 items-center justify-center rounded-full transition-colors",
              isActive
                ? "font-bold tracking-[0.015em] text-white bg-primary"
                : "font-normal text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900/10 dark:hover:bg-white/10"
            )}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={nextPage ? getPageHref(nextPage) : "#"}
        className={cn(
          "flex size-10 items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
          !nextPage && "pointer-events-none opacity-50"
        )}
        aria-label="Next page"
        aria-disabled={!nextPage}
      >
        <ChevronRight className="size-5" />
      </Link>
    </div>
  );
}
