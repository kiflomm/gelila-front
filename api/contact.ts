import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface ContactMessage {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessagesData {
  messages: ContactMessage[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SubmitContactMessageData {
  name: string;
  email?: string;
  phone: string;
  subject: string;
  message: string;
}

export const contactApi = {
  submitMessage: async (
    data: SubmitContactMessageData
  ): Promise<{ id: number; message: string }> => {
    const response = await axiosPublicClient.post("/contact", data);
    return response.data;
  },

  // Admin API functions
  getAllMessages: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ContactMessagesData> => {
    const response = await axiosProtectedClient.get("/contact", { params });
    return response.data;
  },

  getMessageById: async (id: number): Promise<ContactMessage> => {
    const response = await axiosProtectedClient.get(`/contact/${id}`);
    return response.data;
  },

  deleteMessage: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/contact/${id}`);
    return response.data;
  },
};


