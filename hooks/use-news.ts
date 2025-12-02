import { useQuery } from "@tanstack/react-query";
import { newsApi, type NewsItem } from "@/lib/api/news";

export function useNews() {
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: () => newsApi.getNews(),
  });
}

export function useNewsBySlug(slug: string) {
  return useQuery<NewsItem | null>({
    queryKey: ["news", slug],
    queryFn: () => newsApi.getNewsBySlug(slug),
    enabled: !!slug,
  });
}

export function useNewsByCategory(category: string) {
  return useQuery<NewsItem[]>({
    queryKey: ["news", "category", category],
    queryFn: () => newsApi.getNewsByCategory(category),
  });
}
