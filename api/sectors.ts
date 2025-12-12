import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface Sector {
  id: number;
  slug: string;
  name: string;
  title: string;
  status: 'operational' | 'planned' | 'project';
  location: string;
  heroDescription?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  sectorId: number;
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSectorData {
  name: string;
  title: string;
  slug?: string;
  status: 'operational' | 'planned' | 'project';
  location: string;
  heroDescription?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  isPublished?: boolean;
  image?: File;
}

export interface UpdateSectorData {
  name?: string;
  title?: string;
  slug?: string;
  status?: 'operational' | 'planned' | 'project';
  location?: string;
  heroDescription?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  isPublished?: boolean;
  image?: File;
}

export interface CreateProductData {
  sectorId: number;
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  order?: number;
  image?: File;
}

export interface UpdateProductData {
  sectorId?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  order?: number;
  image?: File;
}

export const sectorsApi = {
  getSectors: async (): Promise<Sector[]> => {
    const response = await axiosPublicClient.get("/sectors");
    return response.data;
  },

  getSectorBySlug: async (slug: string): Promise<Sector> => {
    const response = await axiosPublicClient.get(`/sectors/${slug}`);
    return response.data;
  },

  getProductsBySectorId: async (sectorId: number): Promise<Product[]> => {
    const response = await axiosPublicClient.get(`/products/sectors/${sectorId}`);
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axiosPublicClient.get(`/products/${id}`);
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
    formData.append("title", data.title);
    if (data.slug) {
      formData.append("slug", data.slug);
    }
    formData.append("status", data.status);
    formData.append("location", data.location);
    if (data.heroDescription) {
      formData.append("heroDescription", data.heroDescription);
    }
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.imageUrl) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.isPublished !== undefined) {
      formData.append("isPublished", data.isPublished.toString());
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
    if (data.title !== undefined) {
      formData.append("title", data.title);
    }
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
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
    if (data.isPublished !== undefined) {
      formData.append("isPublished", data.isPublished.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
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

  getAllProductsForAdmin: async (): Promise<Product[]> => {
    const response = await axiosProtectedClient.get("/products/admin/all");
    return response.data;
  },

  createProduct: async (data: CreateProductData): Promise<Product> => {
    const formData = new FormData();
    formData.append("sectorId", data.sectorId.toString());
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.imageUrl) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt) {
      formData.append("imageAlt", data.imageAlt);
    }
    if (data.order !== undefined) {
      formData.append("order", data.order.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateProduct: async (
    id: number,
    data: UpdateProductData
  ): Promise<Product> => {
    const formData = new FormData();
    if (data.sectorId !== undefined) {
      formData.append("sectorId", data.sectorId.toString());
    }
    if (data.name !== undefined) {
      formData.append("name", data.name);
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
    if (data.order !== undefined) {
      formData.append("order", data.order.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.patch(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteProduct: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/products/${id}`);
    return response.data;
  },
};

