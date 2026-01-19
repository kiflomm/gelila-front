import { useQuery } from "@tanstack/react-query";
import { jobsApi, type JobsData, type CareersPageConfig } from "@/api/jobs";
import { useSearchParams } from "next/navigation";

export function useJobs() {
  const searchParams = useSearchParams();
  
  const params = {
    search: searchParams.get("search") || undefined,
    location: searchParams.get("location") || undefined,
    department: searchParams.get("department") || undefined,
    type: searchParams.get("type") || undefined,
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : undefined,
    limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined,
  };

  return useQuery<JobsData>({
    queryKey: ["jobs", params],
    queryFn: () => jobsApi.getJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - jobs don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useJob(id: number) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useCareersPageConfig() {
  return useQuery<CareersPageConfig>({
    queryKey: ["careers-page-config"],
    queryFn: () => jobsApi.getPageConfig(),
    staleTime: 10 * 60 * 1000, // 10 minutes - page config rarely changes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
