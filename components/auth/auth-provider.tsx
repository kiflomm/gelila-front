"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { getUserProfile } from "@/api/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { accessToken, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // If we have an access token, verify it's still valid by fetching profile
    if (accessToken) {
      setLoading(true);
      getUserProfile()
        .then((response) => {
          // Update user data in case it changed
          setUser(response.data);
        })
        .catch(() => {
          // If profile fetch fails, token is invalid
          // The axios interceptor will handle logout
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, setUser, setLoading]);

  return <>{children}</>;
}

