import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobsData {
  jobs: Job[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  departments: string[];
  locations: string[];
  jobTypes: string[];
}

export interface SubmitApplicationData {
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  resume: File;
}

export interface CreateJobData {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship";
  description: string;
}

export interface UpdateJobData {
  title?: string;
  department?: string;
  location?: string;
  type?: "Full-time" | "Part-time" | "Internship";
  description?: string;
  isActive?: boolean;
}

export interface CareersPageConfig {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  buttonText?: string;
  buttonHref?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const jobsApi = {
  getJobs: async (params?: {
    search?: string;
    location?: string;
    department?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<JobsData> => {
    const response = await axiosPublicClient.get("/jobs", { params });
    return response.data;
  },

  getJobById: async (id: number): Promise<Job> => {
    const response = await axiosPublicClient.get(`/jobs/${id}`);
    return response.data;
  },

  getJobFilters: async (): Promise<{
    departments: string[];
    locations: string[];
    jobTypes: string[];
  }> => {
    const response = await axiosPublicClient.get("/jobs/filters");
    return response.data;
  },

  getPageConfig: async (): Promise<CareersPageConfig> => {
    const response = await axiosPublicClient.get("/jobs/page/config");
    return response.data;
  },

  submitApplication: async (
    jobId: number,
    data: SubmitApplicationData
  ): Promise<{ id: number; message: string }> => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    if (data.coverLetter) {
      formData.append("coverLetter", data.coverLetter);
    }
    formData.append("resume", data.resume);

    const response = await axiosPublicClient.post(
      `/jobs/${jobId}/apply`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // Admin API functions
  createJob: async (data: CreateJobData): Promise<Job> => {
    const response = await axiosProtectedClient.post("/jobs", data);
    return response.data;
  },

  updateJob: async (
    id: number,
    data: UpdateJobData
  ): Promise<Job> => {
    const response = await axiosProtectedClient.patch(`/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id: number): Promise<Job> => {
    const response = await axiosProtectedClient.delete(`/jobs/${id}`);
    return response.data;
  },
};

export interface JobApplication {
  id: number;
  jobId: number;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  job?: {
    title: string;
    department: string;
    location: string;
  };
}

export interface UpdateApplicationStatusData {
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
}

export const applicationsApi = {
  getAllApplications: async (): Promise<JobApplication[]> => {
    const response = await axiosProtectedClient.get('/jobs/applications/all');
    return response.data;
  },

  getJobApplications: async (jobId: number): Promise<JobApplication[]> => {
    const response = await axiosProtectedClient.get(`/jobs/${jobId}/applications`);
    return response.data;
  },

  updateApplicationStatus: async (
    id: number,
    data: UpdateApplicationStatusData
  ): Promise<JobApplication> => {
    const response = await axiosProtectedClient.patch(
      `/jobs/applications/${id}/status`,
      data
    );
    return response.data;
  },

  deleteApplication: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/jobs/applications/${id}`);
    return response.data;
  },

  downloadResume: async (applicationId: number): Promise<Blob> => {
    const response = await axiosProtectedClient.get(
      `/jobs/applications/${applicationId}/resume`,
      { responseType: 'blob' }
    );
    return response.data;
  },
};
