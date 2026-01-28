import { axiosProtectedClient, axiosPublicClient } from "@/lib/axios-client";

export interface LeadershipItem {
  id: number;
  fullName: string;
  officialTitle: string;
  bio: string;
  photoUrl: string;
  photoAlt?: string | null;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeadershipData {
  fullName: string;
  officialTitle: string;
  bio: string;
  photoUrl?: string;
  photoAlt?: string;
  photo?: File;
  orderIndex?: number;
}

export interface UpdateLeadershipData {
  fullName?: string;
  officialTitle?: string;
  bio?: string;
  photoUrl?: string;
  photoAlt?: string;
  photo?: File;
  orderIndex?: number;
}

export const leadershipApi = {
  // Public API functions
  getLeadership: async (): Promise<LeadershipItem[]> => {
    const response = await axiosPublicClient.get("/leadership");
    return response.data;
  },

  // Admin API functions
  getAllLeadership: async (): Promise<LeadershipItem[]> => {
    const response = await axiosProtectedClient.get("/leadership/admin/all");
    return response.data;
  },

  createLeadership: async (data: CreateLeadershipData): Promise<LeadershipItem> => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("officialTitle", data.officialTitle);
    formData.append("bio", data.bio);
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", String(data.orderIndex));
    }
    if (data.photoUrl) {
      formData.append("photoUrl", data.photoUrl);
    }
    if (data.photoAlt) {
      formData.append("photoAlt", data.photoAlt);
    }
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const response = await axiosProtectedClient.post("/leadership", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateLeadership: async (
    id: number,
    data: UpdateLeadershipData
  ): Promise<LeadershipItem> => {
    const formData = new FormData();
    if (data.fullName !== undefined) {
      formData.append("fullName", data.fullName);
    }
    if (data.officialTitle !== undefined) {
      formData.append("officialTitle", data.officialTitle);
    }
    if (data.bio !== undefined) {
      formData.append("bio", data.bio);
    }
    if (data.orderIndex !== undefined) {
      formData.append("orderIndex", String(data.orderIndex));
    }
    if (data.photoUrl !== undefined) {
      formData.append("photoUrl", data.photoUrl);
    }
    if (data.photoAlt !== undefined) {
      formData.append("photoAlt", data.photoAlt);
    }
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    const response = await axiosProtectedClient.patch(`/leadership/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteLeadership: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/leadership/${id}`);
    return response.data;
  },

  reorderLeadership: async (
    items: { id: number; orderIndex: number }[]
  ): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.patch('/leadership/reorder', {
      items,
    });
    return response.data;
  },
};

