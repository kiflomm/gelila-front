import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface HeroImage {
  url: string;
  alt: string;
}

export interface HomepageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: HeroImage[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateHomepageConfigData {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageAlts?: string[];
  heroImages?: File[];
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
    if (data.heroImageAlts !== undefined) {
      data.heroImageAlts.forEach((alt, index) => {
        formData.append(`heroImageAlts[${index}]`, alt);
      });
    }
    if (data.heroImages && data.heroImages.length > 0) {
      data.heroImages.forEach((file) => {
        formData.append("heroImages", file);
      });
    }

    const response = await axiosProtectedClient.patch("/homepage/admin/config", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

