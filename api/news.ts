import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  imageUrl: string;
  imageAlt: string;
  authorName: string;
  authorAvatar?: string | null;
  isPublished?: boolean;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsData {
  news: NewsItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateNewsData {
  title: string;
  slug?: string;
  description?: string;
  content: string;
  categoryId: number;
  imageUrl?: string;
  imageAlt?: string;
  authorName?: string;
  authorAvatar?: string;
  isPublished?: boolean;
  image?: File;
}

export interface UpdateNewsData {
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  categoryId?: number;
  imageUrl?: string;
  imageAlt?: string;
  authorName?: string;
  authorAvatar?: string;
  isPublished?: boolean;
  image?: File;
}

export interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  slug?: string;
  description?: string;
}

export interface NewsPageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  buttonText?: string;
  buttonHref?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const newsApi = {
  getNews: async (params?: {
    search?: string;
    categoryId?: number;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<NewsData> => {
    const response = await axiosPublicClient.get("/news", { params });
    return response.data;
  },

  getNewsBySlug: async (slug: string): Promise<NewsItem> => {
    const response = await axiosPublicClient.get(`/news/${slug}`);
    return response.data;
  },

  getCategories: async (): Promise<NewsCategory[]> => {
    const response = await axiosPublicClient.get("/news/categories");
    return response.data;
  },

  getPageConfig: async (): Promise<NewsPageConfig> => {
    const response = await axiosPublicClient.get("/news/page/config");
    return response.data;
  },

  // Admin API functions
  getAllNewsForAdmin: async (): Promise<NewsItem[]> => {
    const response = await axiosProtectedClient.get("/news/admin/all");
    return response.data;
  },

  createNews: async (data: CreateNewsData): Promise<NewsItem> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.slug) {
      formData.append("slug", data.slug);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId.toString());
    if (data.imageUrl) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.authorName) {
      formData.append("authorName", data.authorName);
    }
    if (data.isPublished !== undefined) {
      formData.append("isPublished", data.isPublished.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.post("/news", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateNews: async (
    id: number,
    data: UpdateNewsData
  ): Promise<NewsItem> => {
    const formData = new FormData();
    if (data.title !== undefined) {
      formData.append("title", data.title);
    }
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }
    if (data.description !== undefined) {
      formData.append("description", data.description);
    }
    if (data.content !== undefined) {
      formData.append("content", data.content);
    }
    if (data.categoryId !== undefined) {
      formData.append("categoryId", data.categoryId.toString());
    }
    if (data.imageUrl !== undefined) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt !== undefined) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.authorName !== undefined) {
      formData.append("authorName", data.authorName);
    }
    if (data.isPublished !== undefined) {
      formData.append("isPublished", data.isPublished.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.patch(`/news/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteNews: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/news/${id}`);
    return response.data;
  },

  // Category management API functions
  getAllCategoriesForAdmin: async (): Promise<NewsCategory[]> => {
    const response = await axiosProtectedClient.get("/news/categories/admin/all");
    return response.data;
  },

  createCategory: async (data: CreateCategoryData): Promise<NewsCategory> => {
    const response = await axiosProtectedClient.post("/news/categories", data);
    return response.data;
  },

  updateCategory: async (
    id: number,
    data: UpdateCategoryData
  ): Promise<NewsCategory> => {
    const response = await axiosProtectedClient.patch(`/news/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/news/categories/${id}`);
    return response.data;
  },
};
