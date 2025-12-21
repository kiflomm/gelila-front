import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  aboutApi,
  type AboutConfig,
  type UpdateAboutConfigData,
} from "@/api/about";

export function useAboutConfig() {
  return useQuery({
    queryKey: ["about", "config"],
    queryFn: () => aboutApi.getAboutConfig(),
  });
}

// Admin hooks
export function useAboutConfigForAdmin() {
  return useQuery({
    queryKey: ["about", "admin", "config"],
    queryFn: () => aboutApi.getAboutConfigForAdmin(),
  });
}

export function useUpdateAboutConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateAboutConfigData) =>
      aboutApi.updateAboutConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
}

