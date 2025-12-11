/**
 * Utility functions for news dashboard
 */

/**
 * Calculate statistics from news data
 */
export function calculateNewsStats(newsData: Array<{ isPublished?: boolean; category?: { name: string } | null }>) {
  const publishedNews = newsData.filter((news) => news.isPublished === true).length;
  const totalNews = newsData.length;
  const categories = new Set(
    newsData.map((news) => news.category?.name).filter(Boolean)
  ).size;

  return {
    total: totalNews,
    published: publishedNews,
    drafts: totalNews - publishedNews,
    categories,
  };
}

