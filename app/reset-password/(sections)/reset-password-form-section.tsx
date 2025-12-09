"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completePasswordReset } from "@/api/auth";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordFormSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link", {
        description: "No reset token found. Please request a new password reset.",
      });
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid reset link", {
        description: "No reset token found. Please request a new password reset.",
      });
      return;
    }

    try {
      await completePasswordReset({
        token,
        password: data.password,
      });
      setIsSubmitted(true);
      toast.success("Password reset successful!", {
        description: "Your password has been reset. You can now login.",
      });
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password. The token may be invalid or expired.";
      toast.error("Reset failed", {
        description: errorMessage,
      });
    }
  };

  if (isSubmitted) {
    return (
      <section>
        <div className="p-6 bg-white dark:bg-black/20 border border-primary/20 rounded-xl shadow-sm">
          <div className="flex flex-col gap-4 text-center">
            <div className="flex justify-center">
              <div className="size-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <svg
                  className="size-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-[#181411] dark:text-white text-lg font-bold mb-1.5">
                Password Reset Successful
              </h2>
              <p className="text-[#8c755f] dark:text-white/70 text-sm leading-relaxed">
                Your password has been successfully reset. You can now login
                with your new password.
              </p>
            </div>
            <Link href="/login">
              <Button className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! mt-2">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!token) {
    return (
      <section>
        <div className="p-6 bg-white dark:bg-black/20 border border-primary/20 rounded-xl shadow-sm">
          <div className="flex flex-col gap-4 text-center">
            <div className="flex justify-center">
              <div className="size-12 rounded-full bg-destructive/10 dark:bg-destructive/20 flex items-center justify-center">
                <svg
                  className="size-6 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-[#181411] dark:text-white text-lg font-bold mb-1.5">
                Invalid Reset Link
              </h2>
              <p className="text-[#8c755f] dark:text-white/70 text-sm leading-relaxed">
                No reset token found. Please request a new password reset link.
              </p>
            </div>
            <Link href="/forgot-password">
              <Button className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! mt-2">
                Request New Reset Link
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5"
              >
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="p-6 bg-white dark:bg-black/20 border border-primary/20 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-1.5"
            >
              New Password *
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary ${
                errors.password
                  ? "border-destructive focus:border-destructive"
                  : ""
              }`}
              placeholder="Enter your new password"
            />
            {errors.password && (
              <p className="text-xs text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
            {!errors.password && password && (
              <p className="text-xs text-[#8c755f] dark:text-white/70 mt-1">
                Must be at least 6 characters long
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-1.5"
            >
              Confirm New Password *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary ${
                errors.confirmPassword
                  ? "border-destructive focus:border-destructive"
                  : ""
              }`}
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50 mt-2"
          >
            <span className="truncate">
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </span>
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-[#8c755f] dark:text-white/70 hover:text-primary font-medium transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
