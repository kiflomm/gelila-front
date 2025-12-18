import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface SocialMediaLink {
  id: number;
  name: string;
  label: string;
  href: string;
  icon: string;
  isActive: boolean;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SocialMediaSeo {
  id: number;
  platform: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSocialMediaData {
  name: string;
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
  orderIndex?: number;
}

export interface UpdateSocialMediaData {
  name?: string;
  label?: string;
  href?: string;
  icon?: string;
  isActive?: boolean;
  orderIndex?: number;
}

export interface CreateSocialMediaSeoData {
  platform: string;
  url: string;
}

export interface UpdateSocialMediaSeoData {
  platform?: string;
  url?: string;
}

export const socialMediaApi = {
  getAllSocialMedia: async (): Promise<SocialMediaLink[]> => {
    const response = await axiosPublicClient.get("/social-media");
    return response.data;
  },

  getSocialMediaSeo: async (): Promise<SocialMediaSeo[]> => {
    const response = await axiosPublicClient.get("/social-media/seo");
    return response.data;
  },

  // Admin API functions
  getAllSocialMediaForAdmin: async (): Promise<SocialMediaLink[]> => {
    const response = await axiosProtectedClient.get("/social-media/admin/all");
    return response.data;
  },

  getSocialMediaById: async (id: number): Promise<SocialMediaLink> => {
    const response = await axiosProtectedClient.get(`/social-media/admin/${id}`);
    return response.data;
  },

  createSocialMedia: async (data: CreateSocialMediaData): Promise<SocialMediaLink> => {
    const response = await axiosProtectedClient.post("/social-media/admin", data);
    return response.data;
  },

  updateSocialMedia: async (
    id: number,
    data: UpdateSocialMediaData
  ): Promise<SocialMediaLink> => {
    const response = await axiosProtectedClient.patch(`/social-media/admin/${id}`, data);
    return response.data;
  },

  deleteSocialMedia: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/social-media/admin/${id}`);
    return response.data;
  },

  getAllSocialMediaSeoForAdmin: async (): Promise<SocialMediaSeo[]> => {
    const response = await axiosProtectedClient.get("/social-media/admin/seo/all");
    return response.data;
  },

  upsertSocialMediaSeo: async (data: CreateSocialMediaSeoData): Promise<SocialMediaSeo> => {
    const response = await axiosProtectedClient.post("/social-media/admin/seo", data);
    return response.data;
  },

  updateSocialMediaSeo: async (
    platform: string,
    data: UpdateSocialMediaSeoData
  ): Promise<SocialMediaSeo> => {
    const response = await axiosProtectedClient.patch(`/social-media/admin/seo/${platform}`, data);
    return response.data;
  },
};

