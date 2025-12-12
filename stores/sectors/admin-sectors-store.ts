import { create } from 'zustand';
import type { Sector, Product } from '@/api/sectors';

export interface AdminSectorsState {
  // State
  sectors: Sector[];
  products: Product[];
  selectedSector: Sector | null;
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSectors: (sectors: Sector[]) => void;
  setProducts: (products: Product[]) => void;
  setSelectedSector: (sector: Sector | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addSector: (sector: Sector) => void;
  updateSector: (id: number, sector: Partial<Sector>) => void;
  removeSector: (id: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  removeProduct: (id: number) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  sectors: [],
  products: [],
  selectedSector: null,
  selectedProduct: null,
  isLoading: false,
  error: null,
};

export const useAdminSectorsStore = create<AdminSectorsState>()((set) => ({
  ...initialState,

  setSectors: (sectors) => {
    set({ sectors });
  },

  setProducts: (products) => {
    set({ products });
  },

  setSelectedSector: (sector) => {
    set({ selectedSector: sector });
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  addSector: (sector) => {
    set((state) => ({
      sectors: [...state.sectors, sector],
    }));
  },

  updateSector: (id, updates) => {
    set((state) => ({
      sectors: state.sectors.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
      selectedSector:
        state.selectedSector?.id === id
          ? { ...state.selectedSector, ...updates }
          : state.selectedSector,
    }));
  },

  removeSector: (id) => {
    set((state) => ({
      sectors: state.sectors.filter((s) => s.id !== id),
      selectedSector:
        state.selectedSector?.id === id ? null : state.selectedSector,
    }));
  },

  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      selectedProduct:
        state.selectedProduct?.id === id
          ? { ...state.selectedProduct, ...updates }
          : state.selectedProduct,
    }));
  },

  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
      selectedProduct:
        state.selectedProduct?.id === id ? null : state.selectedProduct,
    }));
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set(initialState);
  },
}));

// Selectors for better performance
export const useAdminSectorsData = () => {
  return useAdminSectorsStore((state) => ({
    sectors: state.sectors,
    products: state.products,
    isLoading: state.isLoading,
    error: state.error,
  }));
};

export const useAdminSectorsActions = () => {
  const store = useAdminSectorsStore();
  return {
    setSectors: store.setSectors,
    setProducts: store.setProducts,
    setSelectedSector: store.setSelectedSector,
    setSelectedProduct: store.setSelectedProduct,
    setLoading: store.setLoading,
    setError: store.setError,
    addSector: store.addSector,
    updateSector: store.updateSector,
    removeSector: store.removeSector,
    addProduct: store.addProduct,
    updateProduct: store.updateProduct,
    removeProduct: store.removeProduct,
    clearError: store.clearError,
    reset: store.reset,
  };
};

