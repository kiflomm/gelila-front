"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsData } from "@/api/news";
import { formatDate, getImageUrl } from "../[slug]/utils";

interface NewsGridSectionProps {
  activeCategory?: string;
  currentPage?: number;
  newsData?: NewsData;
  isLoading: boolean;
  isFetching: boolean;
}

function NewsCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Image skeleton */}
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900/50">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-2">
        {/* Category and date */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        
        {/* Title - matches text-xl font-bold */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-5/6 rounded-md" />
        </div>
        
        {/* Description - matches text-sm */}
        <div className="space-y-1.5 mt-1">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
        
        {/* Read more link - matches text-sm font-bold */}
        <div className="flex items-center gap-1 mt-2">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 5;

export default function NewsGridSection({
  activeCategory,
  currentPage = 1,
  newsData,
  isLoading,
  isFetching,
}: NewsGridSectionProps) {
  // Show loading state if data is loading or fetching
  if (isLoading || isFetching || !newsData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6 animate-in fade-in duration-300">
        {Array.from({ length: 5 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const items = newsData?.news || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6">
      {items.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">No news found.</p>
        </div>
      ) : (
        items.map((item) => {
          const categoryName = item.category?.name || "News";
          const date = item.publishedAt || item.createdAt || "";
          
          return (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="flex flex-col gap-4 group cursor-pointer min-w-0"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 relative">
                {item.imageUrl && (
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    unoptimized={getImageUrl(item.imageUrl).includes('localhost') || getImageUrl(item.imageUrl).includes('api.gelilamanufacturingplc.com')}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-primary font-semibold">
                    {categoryName}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {formatDate(date)}
                  </span>
                </div>
                <h3 className="text-zinc-900 dark:text-zinc-100 text-xl font-bold leading-normal group-hover:text-primary transition-colors break-words">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-normal break-words">
                  {item.description}
                </p>
                <div className="text-primary text-sm font-bold mt-2 inline-flex items-center gap-1 group/link">
                  Read More
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
