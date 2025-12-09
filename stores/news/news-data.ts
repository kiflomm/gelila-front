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

/**
 * Parse date string in format "MMM DD, YYYY" to Date object
 */
function parseDate(dateString: string): Date {
  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const parts = dateString.split(" ");
  const month = months[parts[0]] ?? 0;
  const day = parseInt(parts[1].replace(",", ""), 10);
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

/**
 * Get the latest news items sorted by date (newest first)
 */
export function getLatestNews(limit: number = 3): NewsItem[] {
  return [...newsItems]
    .sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime(); // Newest first
    })
    .slice(0, limit);
}
