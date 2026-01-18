import { axiosProtectedClient, axiosPublicClient } from "@/lib/axios-client";

export interface MilestoneItem {
  id: number;
  year: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMilestoneData {
  year: string;
  title: string;
  description: string;
  orderIndex?: number;
}

export interface UpdateMilestoneData {
  year?: string;
  title?: string;
  description?: string;
  orderIndex?: number;
}

export const milestonesApi = {
  // Public API functions
  getMilestones: async (): Promise<MilestoneItem[]> => {
    const response = await axiosPublicClient.get("/milestones");
    return response.data;
  },

  // Admin API functions
  getAllMilestones: async (): Promise<MilestoneItem[]> => {
    const response = await axiosProtectedClient.get("/milestones/admin/all");
    return response.data;
  },

  createMilestone: async (data: CreateMilestoneData): Promise<MilestoneItem> => {
    const response = await axiosProtectedClient.post("/milestones", data);
    return response.data;
  },

  updateMilestone: async (
    id: number,
    data: UpdateMilestoneData
  ): Promise<MilestoneItem> => {
    const response = await axiosProtectedClient.patch(`/milestones/${id}`, data);
    return response.data;
  },

  deleteMilestone: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/milestones/${id}`);
    return response.data;
  },
};

