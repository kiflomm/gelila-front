"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Login functionality will be implemented with backend integration."
      );
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section>
      <div className="p-6 bg-white dark:bg-black/20 border border-primary/20 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              required
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-1.5"
            >
              Password *
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label
                htmlFor="remember"
                className="font-medium text-[#181411] dark:text-white cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50 mt-2"
          >
            <span className="truncate">
              {isSubmitting ? "Logging in..." : "Login"}
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}
