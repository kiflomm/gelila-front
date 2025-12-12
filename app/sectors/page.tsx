import { Suspense } from "react";
import HeroSection from "./(sections)/hero-section";
import FilterableSectorsSection from "./(sections)/filterable-sectors-section";
import { apiServer } from "@/lib/api-server";
import { SectorsStoreProvider } from "./(components)/sectors-store-provider";

function FilterableSectorsSectionSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter chips skeleton */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 mb-4 sm:mb-6 md:mb-8 overflow-x-auto w-full scrollbar-hide">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 sm:h-10 md:h-11 w-32 sm:w-40 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse shrink-0"
          />
        ))}
      </div>
      {/* Sectors skeleton */}
      <div className="space-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-6">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="w-[280px] h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse shrink-0" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SectorsPage() {
  // Fetch sectors data server-side
  const sectors = await apiServer.getSectors();

  return (
    <>
      <HeroSection />
      <div className="px-2 sm:px-4 md:px-6 lg:px-10 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <SectorsStoreProvider initialSectors={sectors}>
            <Suspense fallback={<FilterableSectorsSectionSkeleton />}>
              <FilterableSectorsSection />
            </Suspense>
          </SectorsStoreProvider>
        </div>
      </div>
    </>
  );
}
