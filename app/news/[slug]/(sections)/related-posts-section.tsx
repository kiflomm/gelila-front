"use client";

import Link from "next/link";
import Image from "@/components/ui/image";
import { ArrowRight } from "lucide-react";
import { useNewsBySlug, useNews } from "@/hooks/use-news";
import { formatDate, getImageUrl } from "../../[slug]/utils";
import { useMemo } from "react";

interface RelatedPostsSectionProps {
  currentSlug: string;
}

export default function RelatedPostsSection({
  currentSlug,
}: RelatedPostsSectionProps) {
  const { data: currentNews } = useNewsBySlug(currentSlug);
  const categorySlug = currentNews?.category?.slug;

  const { data: categoryNewsData } = useNews({
    category: categorySlug,
    limit: 10, // Get more to filter out current item
    page: 1,
  });

  // Filter out current item and limit to 3
  const relatedPosts = useMemo(() => {
    if (!categoryNewsData?.news || !currentSlug) return [];
    
    return categoryNewsData.news
      .filter((item) => item.slug !== currentSlug)
      .slice(0, 3);
  }, [categoryNewsData, currentSlug]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 pt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mb-10">
        <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl md:text-4xl font-black mb-3 tracking-tight">
          Related Articles
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base">
          Explore more articles from the same category
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((item) => {
          const categoryName = item.category?.name || "News";
          const date = item.publishedAt || item.createdAt || "";

          return (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="flex flex-col gap-4 group cursor-pointer"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] relative shadow-md group-hover:shadow-xl border border-zinc-200 dark:border-zinc-800">
                {item.imageUrl && (
                  <Image
                    src={getImageUrl(item.imageUrl)}
                    alt={item.imageAlt || item.title}
                    fill
                    className="object-cover"
                    unoptimized={getImageUrl(item.imageUrl).includes('localhost') || getImageUrl(item.imageUrl).includes('api.gelilamanufacturingplc.com')}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2.5 py-1 bg-primary/10 dark:bg-primary/20 text-primary font-semibold rounded-full">
                    {categoryName}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                    {formatDate(date)}
                  </span>
                </div>
                <h3 className="text-zinc-900 dark:text-zinc-100 text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-normal leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="text-primary text-sm font-bold mt-1 inline-flex items-center gap-1 group/link">
                  Read More
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
