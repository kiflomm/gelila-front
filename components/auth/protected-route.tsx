"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      initialize().finally(() => {
        setHasInitialized(true);
      });
    }
  }, [hasInitialized, initialize]);

  useEffect(() => {
    if (hasInitialized && !isLoading && !isAuthenticated) {
      // Only redirect if we're not already on the login page
      if (pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, hasInitialized, router, pathname]);

  if (!hasInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

