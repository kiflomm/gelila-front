import { useQuery } from "@tanstack/react-query";
import { jobsApi, type JobsData } from "@/api/jobs";
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
  });
}

export function useJob(id: number) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
}
