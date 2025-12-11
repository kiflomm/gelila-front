import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { newsApi, type NewsItem, type NewsCategory, type CreateNewsData, type UpdateNewsData, type CreateCategoryData, type UpdateCategoryData } from "@/api/news";

export function useNews(params?: {
  search?: string;
  categoryId?: number;
  category?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => newsApi.getNews(params),
  });
}

export function useNewsBySlug(slug: string) {
  return useQuery<NewsItem>({
    queryKey: ["news", slug],
    queryFn: () => newsApi.getNewsBySlug(slug),
    enabled: !!slug,
  });
}

export function useNewsByCategory(category: string) {
  return useQuery<NewsItem[]>({
    queryKey: ["news", "category", category],
    queryFn: async () => {
      const data = await newsApi.getNews({ category: category === "all" ? undefined : category });
      return data.news;
    },
  });
}

export function useCategories() {
  return useQuery<NewsCategory[]>({
    queryKey: ["news", "categories"],
    queryFn: () => newsApi.getCategories(),
  });
}

// Admin hooks
export function useAdminNews() {
  return useQuery<NewsItem[]>({
    queryKey: ["news", "admin", "all"],
    queryFn: () => newsApi.getAllNewsForAdmin(),
  });
}

export function useAdminCategories() {
  return useQuery<NewsCategory[]>({
    queryKey: ["news", "categories", "admin", "all"],
    queryFn: () => newsApi.getAllCategoriesForAdmin(),
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateNewsData) => newsApi.createNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNewsData }) =>
      newsApi.updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => newsApi.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateCategoryData) => newsApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) =>
      newsApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => newsApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news", "categories"] });
    },
  });
}
