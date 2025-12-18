import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  socialMediaApi,
  type SocialMediaLink,
  type SocialMediaSeo,
  type CreateSocialMediaData,
  type UpdateSocialMediaData,
  type CreateSocialMediaSeoData,
  type UpdateSocialMediaSeoData,
} from "@/api/social-media";

export function useSocialMedia() {
  return useQuery<SocialMediaLink[]>({
    queryKey: ["social-media"],
    queryFn: () => socialMediaApi.getAllSocialMedia(),
  });
}

export function useSocialMediaSeo() {
  return useQuery<SocialMediaSeo[]>({
    queryKey: ["social-media", "seo"],
    queryFn: () => socialMediaApi.getSocialMediaSeo(),
  });
}

// Admin hooks
export function useAdminSocialMedia() {
  return useQuery<SocialMediaLink[]>({
    queryKey: ["social-media", "admin", "all"],
    queryFn: () => socialMediaApi.getAllSocialMediaForAdmin(),
  });
}

export function useAdminSocialMediaSeo() {
  return useQuery<SocialMediaSeo[]>({
    queryKey: ["social-media", "admin", "seo", "all"],
    queryFn: () => socialMediaApi.getAllSocialMediaSeoForAdmin(),
  });
}

export function useCreateSocialMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSocialMediaData) => socialMediaApi.createSocialMedia(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media"] });
    },
  });
}

export function useUpdateSocialMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSocialMediaData }) =>
      socialMediaApi.updateSocialMedia(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media"] });
    },
  });
}

export function useDeleteSocialMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => socialMediaApi.deleteSocialMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media"] });
    },
  });
}

export function useUpsertSocialMediaSeo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSocialMediaSeoData) => socialMediaApi.upsertSocialMediaSeo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media", "seo"] });
    },
  });
}

export function useUpdateSocialMediaSeo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ platform, data }: { platform: string; data: UpdateSocialMediaSeoData }) =>
      socialMediaApi.updateSocialMediaSeo(platform, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-media", "seo"] });
    },
  });
}

