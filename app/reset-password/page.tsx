import { Suspense } from "react";
import ResetPasswordFormSection from "./(sections)/reset-password-form-section";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em] mb-2">
            Reset Password
          </h1>
          <p className="text-[#8c755f] dark:text-white/70 text-sm font-normal leading-normal">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center py-8 text-[#8c755f] dark:text-white/70">
              Loading...
            </div>
          }
        >
          <ResetPasswordFormSection />
        </Suspense>
      </div>
    </div>
  );
}
