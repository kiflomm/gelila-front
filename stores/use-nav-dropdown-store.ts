import { create } from "zustand";

interface NavDropdownStore {
  openDropdownId: string | null;
  setOpenDropdown: (id: string | null) => void;
  closeAll: () => void;
}

export const useNavDropdownStore = create<NavDropdownStore>((set) => ({
  openDropdownId: null,
  setOpenDropdown: (id) => set({ openDropdownId: id }),
  closeAll: () => set({ openDropdownId: null }),
}));
