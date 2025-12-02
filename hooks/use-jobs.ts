import { useQuery } from "@tanstack/react-query";
import { jobsApi, type JobsData } from "@/lib/api/jobs";

export function useJobs() {
  return useQuery<JobsData>({
    queryKey: ["jobs"],
    queryFn: () => jobsApi.getJobs(),
  });
}

export function useJob(id: number) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
}
