import { axiosClient } from "@/lib/axios-client";

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

export const newsApi = {
  getNews: async (): Promise<NewsItem[]> => {
    // In a real app: return axiosClient.get("/news").then(res => res.data);
    const newsData = await import("@/data/news.json");
    return newsData.default.newsItems || [];
  },

  getNewsBySlug: async (slug: string): Promise<NewsItem | null> => {
    // In a real app: return axiosClient.get(`/news/${slug}`).then(res => res.data);
    const newsData = await import("@/data/news.json");
    return (
      newsData.default.newsItems?.find((item) => item.slug === slug) || null
    );
  },

  getNewsByCategory: async (category: string): Promise<NewsItem[]> => {
    // In a real app: return axiosClient.get(`/news?category=${category}`).then(res => res.data);
    const newsData = await import("@/data/news.json");
    if (category === "all") {
      return newsData.default.newsItems || [];
    }
    return (
      newsData.default.newsItems?.filter(
        (item) => item.category === category
      ) || []
    );
  },
};
