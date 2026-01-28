import { useQuery } from "@tanstack/react-query";
import { dashboardApi, type DashboardStatistics } from "@/api/dashboard";

export function useDashboardStats() {
  return useQuery<DashboardStatistics>({
    queryKey: ["dashboard", "statistics"],
    queryFn: () => dashboardApi.getDashboardStatistics(),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
}

