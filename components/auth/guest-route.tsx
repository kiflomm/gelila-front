"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth-store";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isRehydrated } = useAuth();

  useEffect(() => {
    // Wait for store to rehydrate from localStorage
    if (isRehydrated && isAuthenticated) {
      // Redirect authenticated users to dashboard
      router.push("/dashboard");
    }
  }, [isAuthenticated, isRehydrated, router]);

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

  // Don't render children if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}






