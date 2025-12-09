"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordFormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authApi.forgotPassword(data.email);
      setIsSubmitted(true);
      toast.success("Email sent!", {
        description:
          "If the email exists, a password reset link has been sent.",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send reset email. Please try again.";
      toast.error("Error", {
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
                Check Your Email
              </h2>
              <p className="text-[#8c755f] dark:text-white/70 text-sm leading-relaxed">
                We've sent password reset instructions to your email address.
                Please check your inbox and follow the instructions.
              </p>
            </div>
            <Link href="/login">
              <Button className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! mt-2">
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
              htmlFor="email"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-1.5"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary ${
                errors.email ? "border-destructive focus:border-destructive" : ""
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50 mt-2"
          >
            <span className="truncate">
              {isSubmitting ? "Sending..." : "Send Reset Instructions"}
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
