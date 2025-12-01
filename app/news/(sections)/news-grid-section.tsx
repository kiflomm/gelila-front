"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { newsItems, categoryMap } from "@/store/news/news-data";

interface NewsGridSectionProps {
  activeCategory: string;
}

export default function NewsGridSection({
  activeCategory,
}: NewsGridSectionProps) {
  // Filter news items based on active category
  const filteredItems =
    activeCategory === "all"
      ? newsItems
      : newsItems.filter(
          (item) => item.category === categoryMap[activeCategory]
        );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4 md:px-6">
      {filteredItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
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
                {item.category}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {item.date}
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
      ))}
    </div>
  );
}
