"use client";

import { Suspense, useEffect } from "react";
import HeroSection from "./(sections)/hero-section";
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
  useEffect(() => {
    // Check if URL has hash fragment
    const hash = window.location.hash;
    if (hash === "#news-section") {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.getElementById("news-section");
        if (element) {
          const headerHeight = 88; // Approximate header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <div id="news-section" className="scroll-mt-24">
            <Suspense fallback={<FilterableNewsSectionSkeleton />}>
              <FilterableNewsSection />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
