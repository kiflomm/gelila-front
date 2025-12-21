import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { homepageApi, type HomepageConfig, type UpdateHomepageConfigData } from "@/api/homepage";

export function useHomepageConfig() {
  return useQuery({
    queryKey: ["homepage", "config"],
    queryFn: () => homepageApi.getHomepageConfig(),
  });
}

// Admin hooks
export function useHomepageConfigForAdmin() {
  return useQuery({
    queryKey: ["homepage", "admin", "config"],
    queryFn: () => homepageApi.getHomepageConfigForAdmin(),
  });
}

export function useUpdateHomepageConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateHomepageConfigData) =>
      homepageApi.updateHomepageConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homepage"] });
    },
  });
}

