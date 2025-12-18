import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface Export {
  id: number;
  slug: string;
  title: string;
  heroDescription: string;
  description: string;
  destinationRegion: string;
  status: 'operational' | 'planned' | 'project';
  imageUrl: string | null;
  imageAlt: string | null;
  orderIndex: number;
  products?: ExportProduct[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ExportProduct {
  id: number;
  exportId: number;
  name: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateExportData {
  title: string;
  slug?: string;
  heroDescription: string;
  description: string;
  destinationRegion: string;
  status: 'operational' | 'planned' | 'project';
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export interface UpdateExportData {
  title?: string;
  slug?: string;
  heroDescription?: string;
  description?: string;
  destinationRegion?: string;
  status?: 'operational' | 'planned' | 'project';
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export interface CreateExportProductData {
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export interface UpdateExportProductData {
  name?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export const exportsApi = {
  getAllExports: async (): Promise<Export[]> => {
    const response = await axiosPublicClient.get("/exports");
    return response.data;
  },

  getExportBySlug: async (slug: string): Promise<Export> => {
    const response = await axiosPublicClient.get(`/exports/${slug}`);
    return response.data;
  },

  // Admin API functions
  getAllExportsForAdmin: async (): Promise<Export[]> => {
    const response = await axiosProtectedClient.get("/exports/admin/all");
    return response.data;
  },

  createExport: async (data: CreateExportData): Promise<Export> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }
    formData.append("heroDescription", data.heroDescription);
    formData.append("description", data.description);
    formData.append("destinationRegion", data.destinationRegion);
    formData.append("status", data.status);
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

    const response = await axiosProtectedClient.post("/exports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateExport: async (
    id: number,
    data: UpdateExportData
  ): Promise<Export> => {
    const formData = new FormData();
    if (data.title !== undefined) {
      formData.append("title", data.title);
    }
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }
    if (data.heroDescription !== undefined) {
      formData.append("heroDescription", data.heroDescription);
    }
    if (data.description !== undefined) {
      formData.append("description", data.description);
    }
    if (data.destinationRegion !== undefined) {
      formData.append("destinationRegion", data.destinationRegion);
    }
    if (data.status !== undefined) {
      formData.append("status", data.status);
    }
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

    const response = await axiosProtectedClient.patch(`/exports/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteExport: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/exports/${id}`);
    return response.data;
  },

  createExportProduct: async (
    exportId: number,
    data: CreateExportProductData
  ): Promise<ExportProduct> => {
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

    const response = await axiosProtectedClient.post(`/exports/${exportId}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateExportProduct: async (
    exportId: number,
    productId: number,
    data: UpdateExportProductData
  ): Promise<ExportProduct> => {
    const formData = new FormData();
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
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", data.orderIndex.toString());
    }
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axiosProtectedClient.patch(`/exports/${exportId}/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteExportProduct: async (
    exportId: number,
    productId: number
  ): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/exports/${exportId}/products/${productId}`);
    return response.data;
  },
};

