"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeletons() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md" />
        </div>
        <Skeleton className="h-11 w-full sm:w-40 rounded-md" />
      </div>

      {/* Mobile Card Skeletons */}
      <div className="md:hidden space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-3 w-32 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="flex gap-2 pt-2 border-t border-border/50">
                <Skeleton className="h-9 flex-1 rounded-md" />
                <Skeleton className="h-9 flex-1 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="p-4">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 mb-3 pb-3 border-b border-border/50">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md ml-auto" />
          </div>
          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 py-3 border-b border-border/30 last:border-0"
            >
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="flex justify-end">
                <Skeleton className="h-7 w-7 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

