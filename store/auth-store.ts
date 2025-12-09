import { create } from "zustand";
import { authApi, type User } from "@/lib/api/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getProfile: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authApi.login(email, password);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authApi.logout();
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  refreshToken: async () => {
    try {
      const response = await authApi.refreshToken();
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error: any) {
      // Refresh failed, user needs to login again
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
      throw error;
    }
  },

  getProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await authApi.getProfile();
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch profile.";
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  initialize: async () => {
    try {
      set({ isLoading: true });
      // Try to get profile to check if user is authenticated
      await get().getProfile();
    } catch (error) {
      // Not authenticated or token expired
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },
}));

