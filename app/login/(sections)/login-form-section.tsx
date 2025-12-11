"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore, useAuthActions } from "@/stores/auth-store";
import { loginUser } from "@/api/auth";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginFormSection() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useAuthStore();
  const { login, setLoading, clearError } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      setLoading(true);
      
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      
      // Store user and access token in the store
      login(response.data.user, response.data.accessToken);
      
      toast.success("Login successful!", {
        description: "Welcome back!",
        style: {
          background: "white",
          color: "#181411",
          border: "1px solid #e5e7eb",
        },
        className: "custom-toast",
      });
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";
      toast.error("Login failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

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

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-1.5"
            >
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary pr-10 ${
                  errors.password
                    ? "border-destructive focus:border-destructive"
                    : ""
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6C757D] dark:text-white/60 hover:text-[#212529] dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
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
            disabled={isSubmitting || isLoading}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50 mt-2"
          >
            <span className="truncate">
              {isSubmitting || isLoading ? "Logging in..." : "Login"}
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}
