import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface QuoteRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  productServiceInterest: string;
  estimatedQuantity: string | null;
  additionalDetails: string;
  status: "pending" | "reviewing" | "quoted" | "rejected" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRequestsData {
  requests: QuoteRequest[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SubmitQuoteRequestData {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  productServiceInterest: string;
  estimatedQuantity?: string;
  additionalDetails: string;
}

export const ordersApi = {
  submitQuoteRequest: async (
    data: SubmitQuoteRequestData
  ): Promise<{ id: number; message: string }> => {
    const response = await axiosPublicClient.post("/orders", data);
    return response.data;
  },

  // Admin API functions
  getAllQuoteRequests: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<QuoteRequestsData> => {
    const response = await axiosProtectedClient.get("/orders", { params });
    return response.data;
  },

  getQuoteRequestById: async (id: number): Promise<QuoteRequest> => {
    const response = await axiosProtectedClient.get(`/orders/${id}`);
    return response.data;
  },

  deleteQuoteRequest: async (id: number): Promise<{ message: string }> => {
    const response = await axiosProtectedClient.delete(`/orders/${id}`);
    return response.data;
  },
};


