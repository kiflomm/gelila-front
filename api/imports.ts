import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface ImportCommitment {
  id: number;
  importPageConfigId: number;
  icon: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroImage {
  url: string;
  alt: string;
}

export interface ImportPageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: HeroImage[] | null;
  commitmentTitle: string;
  commitmentDescription: string;
  commitments: ImportCommitment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ImportsExportsPageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: HeroImage[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Import {
  id: number;
  slug: string;
  title: string;
  heroDescription: string;
  description: string;
  sourceRegion: string;
  status: 'operational' | 'planned' | 'project';
  imageUrl: string | null; // Kept for backward compatibility
  imageAlt: string | null; // Kept for backward compatibility
  imageUrls?: string[] | null; // New field for multiple image URLs
  imageAlts?: string[] | null; // New field for multiple image alt texts
  orderIndex: number;
  products?: ImportProduct[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ImportProduct {
  id: number;
  importId: number;
  name: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateImportData {
  title: string;
  slug?: string;
  heroDescription: string;
  description: string;
  sourceRegion: string;
  status: 'operational' | 'planned' | 'project';
  imageUrl?: string;
  imageAlt?: string;
  imageUrls?: string[];
  imageAlts?: string[];
  orderIndex?: number;
  images?: File[];
}

export interface UpdateImportData {
  title?: string;
  slug?: string;
  heroDescription?: string;
  description?: string;
  sourceRegion?: string;
  status?: 'operational' | 'planned' | 'project';
  imageUrl?: string;
  imageAlt?: string;
  imageUrls?: string[];
  imageAlts?: string[];
  orderIndex?: number;
  images?: File[];
}

export interface UpdatePageConfigData {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageAlts?: string[];
  commitmentTitle?: string;
  commitmentDescription?: string;
  heroImages?: File[];
}

export interface CreateCommitmentData {
  icon: string;
  title: string;
  description: string;
  orderIndex?: number;
}

export interface UpdateCommitmentData {
  icon?: string;
  title?: string;
  description?: string;
  orderIndex?: number;
}

export interface CreateImportProductData {
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export interface UpdateImportProductData {
  name?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  orderIndex?: number;
  image?: File;
}

export const importsApi = {
  getAllImports: async (): Promise<Import[]> => {
    const response = await axiosPublicClient.get("/imports");
    return response.data;
  },

  getImportBySlug: async (slug: string): Promise<Import> => {
    const response = await axiosPublicClient.get(`/imports/${slug}`);
    return response.data;
  },

  getPageConfig: async (): Promise<ImportPageConfig> => {
    const response = await axiosPublicClient.get("/imports/page/config");
    return response.data;
  },

  getImportsExportsPageConfig: async (): Promise<ImportsExportsPageConfig> => {
    const response = await axiosPublicClient.get("/imports-exports/page/config");
    return response.data;
  },

  // Admin API functions
  getAllImportsForAdmin: async (): Promise<Import[]> => {
    const response = await axiosProtectedClient.get("/imports/admin/all");
    return response.data;
  },

  createImport: async (data: CreateImportData): Promise<Import> => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }
    formData.append("heroDescription", data.heroDescription);
    formData.append("description", data.description);
    formData.append("sourceRegion", data.sourceRegion);
    formData.append("status", data.status);
    if (data.imageUrl !== undefined) {
      formData.append("imageUrl", data.imageUrl);
    }
    if (data.imageAlt !== undefined) {
      formData.append("imageAlt", data.imageAlt);
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
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", data.orderIndex.toString());
    }
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axiosProtectedClient.post("/imports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateImport: async (
    id: number,
    data: UpdateImportData
  ): Promise<Import> => {
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
    if (data.sourceRegion !== undefined) {
      formData.append("sourceRegion", data.sourceRegion);
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
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", data.orderIndex.toString());
    }
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await axiosProtectedClient.patch(`/imports/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteImport: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/imports/${id}`);
    return response.data;
  },

  getPageConfigForAdmin: async (): Promise<ImportPageConfig> => {
    const response = await axiosProtectedClient.get("/imports/admin/page/config");
    return response.data;
  },

  updatePageConfig: async (
    data: UpdatePageConfigData
  ): Promise<ImportPageConfig> => {
    const formData = new FormData();
    if (data.heroTitle !== undefined) {
      formData.append("heroTitle", data.heroTitle);
    }
    if (data.heroSubtitle !== undefined) {
      formData.append("heroSubtitle", data.heroSubtitle);
    }
    if (data.heroImageAlts !== undefined) {
      data.heroImageAlts.forEach((alt, index) => {
        formData.append(`heroImageAlts[${index}]`, alt);
      });
    }
    if (data.commitmentTitle !== undefined) {
      formData.append("commitmentTitle", data.commitmentTitle);
    }
    if (data.commitmentDescription !== undefined) {
      formData.append("commitmentDescription", data.commitmentDescription);
    }
    if (data.heroImages && data.heroImages.length > 0) {
      data.heroImages.forEach((file) => {
        formData.append("heroImages", file);
      });
    }

    const response = await axiosProtectedClient.patch("/imports/admin/page/config", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  createCommitment: async (
    data: CreateCommitmentData
  ): Promise<ImportCommitment> => {
    const response = await axiosProtectedClient.post("/imports/admin/page/config/commitments", data);
    return response.data;
  },

  updateCommitment: async (
    id: number,
    data: UpdateCommitmentData
  ): Promise<ImportCommitment> => {
    const response = await axiosProtectedClient.patch(`/imports/admin/page/config/commitments/${id}`, data);
    return response.data;
  },

  deleteCommitment: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/imports/admin/page/config/commitments/${id}`);
    return response.data;
  },

  createImportProduct: async (
    importId: number,
    data: CreateImportProductData
  ): Promise<ImportProduct> => {
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

    const response = await axiosProtectedClient.post(`/imports/${importId}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateImportProduct: async (
    importId: number,
    productId: number,
    data: UpdateImportProductData
  ): Promise<ImportProduct> => {
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

    const response = await axiosProtectedClient.patch(`/imports/${importId}/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteImportProduct: async (
    importId: number,
    productId: number
  ): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/imports/${importId}/products/${productId}`);
    return response.data;
  },
};

