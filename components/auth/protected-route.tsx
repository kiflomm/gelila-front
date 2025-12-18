"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/stores/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isRehydrated } = useAuth();

  useEffect(() => {
    // Wait for store to rehydrate from localStorage
    if (isRehydrated && !isAuthenticated) {
      // Only redirect if we're not already on the login page
      if (pathname !== "/login") {
        // Redirect to login with a reason parameter so we can show
        // a friendly \"session expired\" message.
        router.push("/login?reason=session-expired");
      }
    }
  }, [isAuthenticated, isRehydrated, router, pathname]);

  // Show loading while store is rehydrating
  if (!isRehydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

