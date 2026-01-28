"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "@/components/ui/image";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github, Slack, MessageCircle, Send, Globe, Music, Twitch, Share2, Mail, Phone } from "lucide-react";
import { SidebarSection } from "./sidebar-section";
import { useNews, useCategories } from "@/hooks/use-news";
import { useSocialMedia } from "@/hooks/use-social-media";
import { formatDate, getImageUrl } from "../utils";
import type { NewsItem } from "@/api/news";

interface SidebarProps {
  currentSlug: string;
  latestPostsCount?: number;
}

// Icon mapping for social media
const iconMap: Record<string, any> = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Slack,
  MessageCircle,
  Send,
  Globe,
  Music,
  Twitch,
  Tiktok: Music,
  Telegram: Send,
  WhatsApp: MessageCircle,
  Web: Globe,
};

export default function Sidebar({
  currentSlug,
  latestPostsCount = 3,
}: SidebarProps) {
  const { data: newsData, isLoading: newsLoading } = useNews({ limit: 20 });
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: socialMediaLinks = [] } = useSocialMedia();

  // Filter to only show Facebook, Twitter, LinkedIn, Instagram (exclude YouTube)
  const SOCIAL_LINKS = socialMediaLinks
    .filter((link) => link.isActive)
    .map((link) => ({
      name: link.name,
      icon: iconMap[link.icon],
      href: link.href,
    }))
    .filter((link) => link.icon !== undefined);

  // Get latest published posts (excluding current article)
  const latestPosts = useMemo(() => {
    if (!newsData?.news) return [];
    return newsData.news
      .filter((item: NewsItem) =>
        item.slug !== currentSlug &&
        item.isPublished === true
      )
      .sort((a: NewsItem, b: NewsItem) => {
        const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
        const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, latestPostsCount);
  }, [newsData, currentSlug, latestPostsCount]);

  // Extract popular tags from news articles
  // Tags are extracted from categories (most used categories become popular tags)
  const popularTags = useMemo(() => {
    if (!newsData?.news) return [];

    // Count category usage
    const categoryCounts = new Map<string, number>();
    newsData.news.forEach((item: NewsItem) => {
      if (item.category?.slug) {
        const count = categoryCounts.get(item.category.slug) || 0;
        categoryCounts.set(item.category.slug, count + 1);
      }
    });

    // Sort by count and get top 5
    return Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([slug]) => slug);
  }, [newsData]);

  return (
    <aside className="flex flex-col gap-8">
      <SidebarSection title="Latest Post">
        <div className="flex flex-col gap-4">
          {newsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: latestPostsCount }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : latestPosts.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No recent posts</p>
          ) : (
            latestPosts.map((post: NewsItem) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="flex gap-3 group hover:opacity-80 transition-opacity"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden relative shrink-0">
                  {post.imageUrl && (
                    <Image
                      src={getImageUrl(post.imageUrl)}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      unoptimized={getImageUrl(post.imageUrl).includes('localhost') || getImageUrl(post.imageUrl).includes('api.gelilamanufacturingplc.com')}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h4 className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                    {formatDate(post.publishedAt || post.createdAt || "")}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </SidebarSection>

      <SidebarSection title="Categories">
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No categories</p>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/news?category=${category.slug}`}
                className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      </SidebarSection>

      <SidebarSection title="Popular Tags">
        <div className="flex flex-wrap gap-2">
          {newsLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"
              />
            ))
          ) : popularTags.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">No tags available</p>
          ) : (
            popularTags.map((tagSlug) => {
              const category = categories.find((cat) => cat.slug === tagSlug);
              const tagName = category?.name || tagSlug;
              return (
                <Link
                  key={tagSlug}
                  href={`/news?category=${tagSlug}`}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                >
                  {tagName}
                </Link>
              );
            })
          )}
        </div>
      </SidebarSection>

      <SidebarSection title="Social Media">
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                aria-label={social.name}
              >
                <Icon className="size-5" />
              </Link>
            );
          })}
        </div>
      </SidebarSection>
    </aside>
  );
}
