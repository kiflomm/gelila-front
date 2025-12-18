import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/api/auth";

// Safely decode a JWT and return its payload, or null on failure.
const decodeJwt = (token: string): { exp?: number } | null => {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const decoded = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    );

    return decoded;
  } catch {
    return null;
  }
};

// Derive an expiry timestamp (in ms) from a JWT access token, if possible.
const getTokenExpiry = (accessToken: string | null): number | null => {
  if (!accessToken) return null;
  const payload = decodeJwt(accessToken);
  if (!payload?.exp) return null;
  return payload.exp * 1000;
};

export interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  tokenExpiresAt: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isRehydrated: boolean; // Track if store has been rehydrated from localStorage

  // Actions
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      tokenExpiresAt: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isRehydrated: false,

      // Actions
      setUser: (user: User) => {
        set({ user });
      },

      setAccessToken: (accessToken: string) => {
        const tokenExpiresAt = getTokenExpiry(accessToken);
        set({
          accessToken,
          tokenExpiresAt,
          isAuthenticated:
            Boolean(accessToken) &&
            (tokenExpiresAt === null || Date.now() < tokenExpiresAt),
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      login: (user: User, accessToken: string) => {
        const tokenExpiresAt = getTokenExpiry(accessToken);
        const isAuthenticated =
          Boolean(accessToken) &&
          (tokenExpiresAt === null || Date.now() < tokenExpiresAt);

        set({
          user,
          accessToken,
          tokenExpiresAt,
          isAuthenticated,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          tokenExpiresAt: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Persist user data, authentication state, access token, and expiry for page refresh
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        tokenExpiresAt: state.tokenExpiresAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // Mark as rehydrated first
        state.isRehydrated = true;

        // After rehydration, clear any obviously expired tokens without redirecting.
        const now = Date.now();
        if (state.tokenExpiresAt !== null && now >= state.tokenExpiresAt) {
          state.user = null;
          state.accessToken = null;
          state.tokenExpiresAt = null;
          state.isAuthenticated = false;
          state.error = null;
          state.isLoading = false;
        }
      },
    }
  )
);

// Helper to check token validity from outside React
export const isTokenValid = (): boolean => {
  const { accessToken, tokenExpiresAt } = useAuthStore.getState();
  if (!accessToken) return false;
  if (tokenExpiresAt === null) return true;
  return Date.now() < tokenExpiresAt;
};

// Selectors for better performance
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    isRehydrated: store.isRehydrated,
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    logout: store.logout,
    setLoading: store.setLoading,
    setError: store.setError,
    clearError: store.clearError,
    setAccessToken: store.setAccessToken,
  };
};