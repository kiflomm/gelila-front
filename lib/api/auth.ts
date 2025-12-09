import { axiosClient } from "@/lib/axios-client";

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
  timestamp: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export const authApi = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<ApiResponse> {
    const response = await axiosClient.post<ApiResponse>("/auth/forgot-password", {
      email,
    });
    return response.data;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    const response = await axiosClient.post<ApiResponse>("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<ApiResponse> {
    const response = await axiosClient.post<ApiResponse>("/auth/logout");
    return response.data;
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>("/auth/refresh");
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ProfileResponse> {
    const response = await axiosClient.get<ProfileResponse>("/auth/profile");
    return response.data;
  },
};

