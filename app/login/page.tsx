"use client";

import LoginFormSection from "./(sections)/login-form-section";
import { GuestRoute } from "@/components/auth/guest-route";

export default function LoginPage() {
  return (
    <GuestRoute>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
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
