import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { NewsItem } from "@/stores/news/news-data";
import { calculateReadTime, getInitials } from "../utils";

interface HeroSectionProps {
  newsItem: NewsItem;
}

export default function HeroSection({ newsItem }: HeroSectionProps) {
  const readTime = calculateReadTime(newsItem.content);

  return (
    <header className="flex flex-col gap-6 mb-8">
      {/* Back Button - Mobile Only */}
      <Link
        href="/news"
        className="lg:hidden inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors text-sm font-medium w-fit group/back"
      >
        <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-1" />
        Back to News
      </Link>

      {/* Title */}
      <h1 className="text-zinc-900 dark:text-zinc-100 text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
        {newsItem.title}
      </h1>

      {/* Featured Image */}
      <div className="w-full aspect-3/2 rounded-lg overflow-hidden relative">
        <Image
          src={newsItem.imageUrl}
          alt={newsItem.imageAlt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Category, Date, Author, and Read Time - Below Image */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Category and Date - Left Side */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-primary font-semibold">
            {newsItem.category}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            {newsItem.date}
          </span>
        </div>

        {/* Author and Read Time - Right Side */}
        <div className="flex items-center gap-4">
          {/* Author */}
          <div className="flex items-center gap-2">
            {newsItem.author.avatar ? (
              <Image
                src={newsItem.author.avatar}
                alt={newsItem.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">
                  {getInitials(newsItem.author.name)}
                </span>
              </div>
            )}
            <span className="text-zinc-900 dark:text-zinc-100 text-sm font-medium">
              {newsItem.author.name}
            </span>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-sm">
            <Clock className="size-4" />
            <span>{readTime} Min read</span>
          </div>
        </div>
      </div>
    </header>
  );
}
