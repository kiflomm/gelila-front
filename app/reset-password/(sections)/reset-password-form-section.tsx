"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Validate passwords match
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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

  return (
    <section>
      <div className="p-6 bg-white dark:bg-black/20 border border-primary/20 rounded-xl shadow-sm">
        {token && (
          <div className="mb-4 p-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-lg">
            <p className="text-xs text-[#8c755f] dark:text-white/70">
              Reset token detected: {token.substring(0, 20)}...
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="Enter your new password"
              minLength={8}
            />
            <p className="text-xs text-[#8c755f] dark:text-white/70 mt-1">
              Must be at least 8 characters long
            </p>
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
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary ${
                passwordError
                  ? "border-destructive focus:border-destructive"
                  : ""
              }`}
              placeholder="Confirm your new password"
            />
            {passwordError && (
              <p className="text-xs text-destructive mt-1">{passwordError}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !!passwordError}
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
