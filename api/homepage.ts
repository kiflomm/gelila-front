import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface HomepageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateHomepageConfigData {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  heroImage?: File;
}

export const homepageApi = {
  getHomepageConfig: async (): Promise<HomepageConfig> => {
    const response = await axiosPublicClient.get("/homepage/config");
    return response.data;
  },

  // Admin API functions
  getHomepageConfigForAdmin: async (): Promise<HomepageConfig> => {
    const response = await axiosProtectedClient.get("/homepage/admin/config");
    return response.data;
  },

  updateHomepageConfig: async (
    data: UpdateHomepageConfigData
  ): Promise<HomepageConfig> => {
    const formData = new FormData();
    if (data.heroTitle !== undefined) {
      formData.append("heroTitle", data.heroTitle);
    }
    if (data.heroSubtitle !== undefined) {
      formData.append("heroSubtitle", data.heroSubtitle);
    }
    if (data.heroImageUrl !== undefined) {
      formData.append("heroImageUrl", data.heroImageUrl);
    }
    if (data.heroImageAlt !== undefined) {
      formData.append("heroImageAlt", data.heroImageAlt);
    }
    if (data.heroImage) {
      formData.append("heroImage", data.heroImage);
    }

    const response = await axiosProtectedClient.patch("/homepage/admin/config", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

