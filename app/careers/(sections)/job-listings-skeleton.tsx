import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function JobListingsSkeleton() {
  return (
    <section id="job-listings" className="py-16 md:py-24">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 px-2 sm:px-4 md:px-6">
          {/* Section Header */}
          <Skeleton className="h-9 w-64 mx-auto" />

          {/* Filters Skeleton */}
          <div className="border rounded-xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input Skeleton */}
            <div className="w-full md:grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#6C757D] dark:text-[#F8F9FA]/60 opacity-50" />
                <Skeleton className="w-full h-12 rounded-lg" />
              </div>
            </div>

            {/* Filter Dropdowns Skeleton */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
              <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
              <Skeleton className="h-12 w-full sm:w-32 rounded-lg" />
            </div>

            {/* Reset Button Skeleton */}
            <Skeleton className="h-12 w-full md:w-20 rounded-lg" />
          </div>

          {/* Job Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col gap-4"
              >
                {/* Title */}
                <Skeleton className="h-7 w-3/4" />
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 grow">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Button */}
                <Skeleton className="h-10 w-full rounded-lg mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

