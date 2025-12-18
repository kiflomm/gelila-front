"use client";

import { useSearchParams } from "next/navigation";
import LoginFormSection from "./(sections)/login-form-section";
import { GuestRoute } from "@/components/auth/guest-route";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const showSessionExpired = reason === "session-expired";

  return (
    <GuestRoute>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md space-y-4">
          {showSessionExpired && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-50">
              Your session has expired. Please log in again to continue.
            </div>
          )}
          <div className="text-center mb-2">
            <h1 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em] mb-2">
              Login to Your Account
            </h1>
            <p className="text-[#8c755f] dark:text-white/70 text-sm font-normal leading-normal">
              Access your Gelila Manufacturing PLC account
            </p>
          </div>
          <LoginFormSection />
        </div>
      </div>
    </GuestRoute>
  );
}
