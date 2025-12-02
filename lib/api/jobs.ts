import { axiosClient } from "@/lib/axios-client";

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface JobsData {
  jobs: Job[];
  departments: string[];
  locations: string[];
  jobTypes: string[];
}

// For now, we'll use static data but structure it as an API call
// This can be easily replaced with actual API endpoints later
export const jobsApi = {
  getJobs: async (): Promise<JobsData> => {
    // In a real app, this would be: return axiosClient.get("/jobs").then(res => res.data);
    // For now, we'll import and return the static data
    const jobsData = await import("@/data/jobs.json");
    return jobsData.default;
  },

  getJobById: async (id: number): Promise<Job | null> => {
    // In a real app: return axiosClient.get(`/jobs/${id}`).then(res => res.data);
    const jobsData = await import("@/data/jobs.json");
    return jobsData.default.jobs.find((job) => job.id === id) || null;
  },
};
