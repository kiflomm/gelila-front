import { Suspense } from "react";
import PageHeadingSection from "./(sections)/page-heading-section";
import FilterableNewsSection from "./(sections)/filterable-news-section";

function FilterableNewsSectionSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter chips skeleton */}
      <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 md:px-6">
        <div className="flex gap-2 p-1.5 bg-zinc-900/5 dark:bg-white/5 rounded-lg overflow-x-auto w-full sm:w-auto">
          <div className="h-10 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-10 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>
      </div>
      {/* News grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full aspect-video rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <>
      <PageHeadingSection />
      <Suspense fallback={<FilterableNewsSectionSkeleton />}>
        <FilterableNewsSection />
      </Suspense>
    </>
  );
}
