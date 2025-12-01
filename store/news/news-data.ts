import newsData from "@/data/news.json";

export interface NewsItem {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  author: {
    name: string;
    avatar?: string | null;
  };
  content: string;
}

// Map filter category IDs to news item category names
export const categoryMap: Record<string, string> = newsData.categoryMap;

// News items from JSON file
export const newsItems: NewsItem[] = newsData.newsItems;

/**
 * Get a news item by its slug
 */
export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}

/**
 * Get all news items
 */
export function getAllNews(): NewsItem[] {
  return newsItems;
}

/**
 * Get related news items (same category, excluding the current item)
 */
export function getRelatedNews(
  currentSlug: string,
  limit: number = 3
): NewsItem[] {
  const currentItem = getNewsBySlug(currentSlug);
  if (!currentItem) return [];

  return newsItems
    .filter(
      (item) =>
        item.slug !== currentSlug && item.category === currentItem.category
    )
    .slice(0, limit);
}
