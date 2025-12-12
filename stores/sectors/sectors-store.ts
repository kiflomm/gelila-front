import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Sector, Product } from '@/api/sectors';

export interface SectorsState {
  // State
  sectors: Sector[];
  products: Product[];
  activeSectorFilter: number | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSectors: (sectors: Sector[]) => void;
  setProducts: (products: Product[]) => void;
  setActiveSectorFilter: (sectorId: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  sectors: [],
  products: [],
  activeSectorFilter: null,
  isLoading: false,
  error: null,
};

export const useSectorsStore = create<SectorsState>()(
  persist(
    (set) => ({
      ...initialState,

      setSectors: (sectors) => {
        set({ sectors });
      },

      setProducts: (products) => {
        set({ products });
      },

      setActiveSectorFilter: (sectorId) => {
        set({ activeSectorFilter: sectorId });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'sectors-storage',
      partialize: (state) => ({
        // Only persist the filter state, not the data (data comes from API)
        activeSectorFilter: state.activeSectorFilter,
      }),
    }
  )
);

// Selectors for better performance
export const useSectorsData = () => {
  const store = useSectorsStore();
  return {
    sectors: store.sectors,
    products: store.products,
    isLoading: store.isLoading,
    error: store.error,
  };
};

export const useSectorsActions = () => {
  const store = useSectorsStore();
  return {
    setSectors: store.setSectors,
    setProducts: store.setProducts,
    setActiveSectorFilter: store.setActiveSectorFilter,
    setLoading: store.setLoading,
    setError: store.setError,
    clearError: store.clearError,
    reset: store.reset,
  };
};

export const useActiveSectorFilter = () => {
  return useSectorsStore((state) => state.activeSectorFilter);
};

