"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth state on mount
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

