import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface Product {
  id: number;
  sectorId: number;
  name: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductWithSector extends Product {
  sector: {
    id: number;
    slug: string;
    name: string;
    title: string;
  };
}

export interface Sector {
  id: number;
  slug: string;
  name: string;
  title: string;
  status: 'operational' | 'planned' | 'project';
  location: string;
  heroDescription: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  imageUrls?: string[] | null;
  imageAlts?: string[] | null;
  products: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSectorData {
  name: string;
  slug?: string;
  title: string;
  status: 'operational' | 'planned' | 'project';
  location: string;
  heroDescription: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  image?: File;
}

export interface UpdateSectorData {
  name?: string;
  slug?: string;
  title?: string;
  status?: 'operational' | 'planned' | 'project';
  location?: string;
  heroDescription?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  image?: File;
  imageUrls?: string[];
  imageAlts?: string[];
  images?: File[];
}

export interface CreateProductData {
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

import type { HeroImage } from "./types";

// Re-export for backward compatibility
export type { HeroImage };

export interface SectorsPageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: HeroImage[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export const sectorsApi = {
  getAllSectors: async (): Promise<Sector[]> => {
    const response = await axiosPublicClient.get("/sectors");
    return response.data;
  },

  getSectorBySlug: async (slug: string): Promise<Sector> => {
    const response = await axiosPublicClient.get(`/sectors/${slug}`);
    return response.data;
  },

  getPageConfig: async (): Promise<SectorsPageConfig> => {
    const response = await axiosPublicClient.get("/sectors/page/config");
    return response.data;
  },

  getNewestProducts: async (limit?: number): Promise<ProductWithSector[]> => {
    const params = limit ? { limit } : {};
    const response = await axiosPublicClient.get("/sectors/products/newest", {
      params,
    });
    return response.data;
  },

  // Admin API functions
  getAllSectorsForAdmin: async (): Promise<Sector[]> => {
    const response = await axiosProtectedClient.get("/sectors/admin/all");
    return response.data;
  },

  createSector: async (data: CreateSectorData): Promise<Sector> => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }
    formData.append("title", data.title);
    formData.append("status", data.status);
    formData.append("location", data.location);
    formData.append("heroDescription", data.heroDescription);
    formData.append("description", data.description);
    if (data.imageUrl !== undefined) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt !== undefined) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.post("/sectors", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateSector: async (
    id: number,
    data: UpdateSectorData
  ): Promise<Sector> => {
    const formData = new FormData();
    if (data.name !== undefined) {
      formData.append("name", data.name);
    }
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }
    if (data.title !== undefined) {
      formData.append("title", data.title);
    }
    if (data.status !== undefined) {
      formData.append("status", data.status);
    }
    if (data.location !== undefined) {
      formData.append("location", data.location);
    }
    if (data.heroDescription !== undefined) {
      formData.append("heroDescription", data.heroDescription);
    }
    if (data.description !== undefined) {
      formData.append("description", data.description);
    }
    if (data.imageUrl !== undefined) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt !== undefined) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.image) {
      formData.append("image", data.image);
    }
    // Multiple images support
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    if (data.imageUrls && data.imageUrls.length > 0) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }
    if (data.imageAlts && data.imageAlts.length > 0) {
      data.imageAlts.forEach((alt, index) => {
        formData.append(`imageAlts[${index}]`, alt);
      });
    }

    const response = await axiosProtectedClient.patch(`/sectors/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteSector: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/sectors/${id}`);
    return response.data;
  },

  createProduct: async (
    sectorId: number,
    data: CreateProductData
  ): Promise<Product> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.imageUrl !== undefined) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt !== undefined) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", data.orderIndex.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.post(`/sectors/${sectorId}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateProduct: async (
    sectorId: number,
    productId: number,
    data: UpdateProductData
  ): Promise<Product> => {
    const formData = new FormData();
    if (data.name !== undefined) {
      formData.append("name", data.name);
    }
    if (data.description !== undefined) {
      formData.append("description", data.description);
    }
    // Always include imageUrl if provided (to preserve existing image when no new upload)
    if (data.imageUrl !== undefined) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt !== undefined) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", data.orderIndex.toString());
    }
    // Only append image if it's a new File upload
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.patch(`/sectors/${sectorId}/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteProduct: async (
    sectorId: number,
    productId: number
  ): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/sectors/${sectorId}/products/${productId}`);
    return response.data;
  },
};

