"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/use-news";
import { formatDate, getImageUrl } from "@/app/news/[slug]/utils";

function NewsCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 group cursor-pointer bg-white dark:bg-black/20 rounded-xl border border-primary/10 dark:border-primary/20 overflow-hidden">
      <div className="w-full aspect-video rounded-t-xl overflow-hidden relative">
        <Skeleton className="w-full h-full rounded-t-xl" />
      </div>
      <div className="flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <Skeleton className="h-6 w-full rounded-md" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
        <Skeleton className="h-4 w-20 rounded-md mt-2" />
      </div>
    </div>
  );
}

export default function LatestNewsSection() {
  const { data: newsData, isLoading, isFetching } = useNews({
    limit: 3,
    page: 1,
  });

  // Show loading state
  if (isLoading || isFetching || !newsData) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[#181411] dark:text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-center mb-4">
            Latest News
          </h2>
          <p className="text-[#8c755f] dark:text-white/70 text-base sm:text-lg text-center max-w-2xl mx-auto">
            Stay updated with our latest company milestones, press releases, and
            industry insights.
          </p>
        </div>

        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  const latestNews = newsData?.news || [];

  // Hide entire section if no news data found
  if (latestNews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mb-12 lg:mb-16">
        <h2 className="text-[#181411] dark:text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-center mb-4">
          Latest News
        </h2>
        <p className="text-[#8c755f] dark:text-white/70 text-base sm:text-lg text-center max-w-2xl mx-auto">
          Stay updated with our latest company milestones, press releases, and
          industry insights.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {latestNews.map((item) => {
          const categoryName = item.category?.name || "News";
          const date = item.publishedAt || item.createdAt || "";

          return (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="flex flex-col gap-4 group cursor-pointer bg-white dark:bg-black/20 rounded-xl border border-primary/10 dark:border-primary/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="w-full aspect-video rounded-t-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 relative">
                {item.imageUrl && (
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    alt={item.imageAlt || item.title}
                    fill
                    className="object-cover"
                    unoptimized={getImageUrl(item.imageUrl).includes('localhost') || getImageUrl(item.imageUrl).includes('api.gelilamanufacturingplc.com')}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 p-4 sm:p-5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-primary font-semibold">
                    {categoryName}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {formatDate(date)}
                  </span>
                </div>
                <h3 className="text-zinc-900 dark:text-zinc-100 text-xl font-bold leading-normal group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-normal line-clamp-2">
                  {item.description}
                </p>
                <div className="text-primary text-sm font-bold mt-2 inline-flex items-center gap-1 group/link">
                  Read More
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All News Link */}
      <div className="mt-12 text-center">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/link"
        >
          <span>View All News</span>
          <ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
