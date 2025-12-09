import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/api/auth';


export interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
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
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isRehydrated: false,

      // Actions
      setUser: (user: User) => {
        set({ user });
      },

      setAccessToken: (accessToken: string) => {
        set({ accessToken, isAuthenticated: true });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      login: (user: User, accessToken: string) => {
        set({
          user,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
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
      name: 'auth-storage',
      partialize: (state) => ({
        // Persist user data, authentication state, and access token for page refresh
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        // Mark as rehydrated first
        if (state) {
          state.isRehydrated = true;
        }
        
        // Don't log out user if access token is expired on page refresh
        // The access token is short-lived and expires frequently
        // The axios interceptor will automatically handle token refresh when API calls are made
        // If the refresh token (in httpOnly cookies) is also expired, the interceptor will handle logout
        // This approach provides a smoother user experience
      },
    }
  )
);

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