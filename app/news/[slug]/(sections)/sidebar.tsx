import Link from "next/link";
import Image from "next/image";
import { getAllNews, categoryMap } from "@/stores/news/news-data";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { SidebarSection } from "./sidebar-section";

interface SidebarProps {
  currentSlug: string;
  latestPostsCount?: number;
}

const POPULAR_TAGS = [
  "indexfunds",
  "investing",
  "financialplanning",
  "passiveincome",
  "wealthbuilding",
] as const;

const SOCIAL_LINKS = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
] as const;

export default function Sidebar({
  currentSlug,
  latestPostsCount = 3,
}: SidebarProps) {
  const allNews = getAllNews();
  const latestPosts = allNews
    .filter((item) => item.slug !== currentSlug)
    .slice(0, latestPostsCount);

  const categories = Object.values(categoryMap);

  return (
    <aside className="flex flex-col gap-8">
      <SidebarSection title="Latest Post">
        <div className="flex flex-col gap-4">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="flex gap-3 group hover:opacity-80 transition-opacity"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden relative shrink-0">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h4 className="text-zinc-900 dark:text-zinc-100 text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection title="Categories">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href="/news"
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </SidebarSection>

      <SidebarSection title="Popular Tags">
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => (
            <Link
              key={tag}
              href="/news"
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
            >
              #{tag}
            </Link>
          ))}
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
