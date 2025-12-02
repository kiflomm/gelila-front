import ForgotPasswordFormSection from "./(sections)/forgot-password-form-section";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em] mb-2">
            Forgot Password
          </h1>
          <p className="text-[#8c755f] dark:text-white/70 text-sm font-normal leading-normal">
            Enter your email address and we'll send you reset instructions
          </p>
        </div>
        <ForgotPasswordFormSection />
      </div>
    </div>
  );
}
