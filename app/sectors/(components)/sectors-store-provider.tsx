"use client";

import { useEffect } from "react";
import { useSectorsActions } from "@/stores/sectors/sectors-store";
import type { Sector } from "@/api/sectors";

interface SectorsStoreProviderProps {
  children: React.ReactNode;
  initialSectors: Sector[];
}

export function SectorsStoreProvider({ children, initialSectors }: SectorsStoreProviderProps) {
  const { setSectors } = useSectorsActions();

  // Initialize store with server-fetched data
  useEffect(() => {
    setSectors(initialSectors);
  }, [initialSectors, setSectors]);

  return <>{children}</>;
}

