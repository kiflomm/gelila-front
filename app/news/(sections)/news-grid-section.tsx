"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewsByCategory } from "@/hooks/use-news";
import { formatDate } from "../[slug]/utils";

interface NewsGridSectionProps {
  activeCategory: string;
}

function NewsCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Image skeleton */}
      <div className="w-full aspect-video rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      
      {/* Content skeleton */}
      <div className="flex flex-col gap-2">
        {/* Category and date */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Title - matches text-xl font-bold */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        
        {/* Description - matches text-sm */}
        <div className="space-y-1.5 mt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        {/* Read more link - matches text-sm font-bold */}
        <div className="flex items-center gap-1 mt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function NewsGridSection({
  activeCategory,
}: NewsGridSectionProps) {
  const { data: newsItems = [], isLoading } = useNewsByCategory(activeCategory);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6">
      {newsItems.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">No news found.</p>
        </div>
      ) : (
        newsItems.map((item) => {
          const categoryName = item.category?.name || "News";
          const date = item.publishedAt || item.createdAt || "";
          
          return (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="flex flex-col gap-4 group cursor-pointer"
            >
              <div className="w-full aspect-video rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 relative">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  unoptimized
                />
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
                <h3 className="text-zinc-900 dark:text-zinc-100 text-xl font-bold leading-normal group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-normal">
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
