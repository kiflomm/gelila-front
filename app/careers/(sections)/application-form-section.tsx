"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { jobsApi } from "@/api/jobs";
import { cn } from "@/lib/utils";

const applicationSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number in international format (e.g., +251911234567)"),
  coverLetter: z
    .string()
    .max(5000, "Cover letter must be less than 5000 characters")
    .optional(),
  resume: z
    .instanceof(File, { message: "Please upload your CV/Resume" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB")
    .refine(
      (file) => [".pdf", ".doc", ".docx"].includes(file.name.toLowerCase().slice(file.name.lastIndexOf("."))),
      "Please upload a PDF, DOC, or DOCX file"
    ),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormSectionProps {
  jobTitle: string;
  jobId?: number;
}

export default function ApplicationFormSection({
  jobTitle,
  jobId,
}: ApplicationFormSectionProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  });

  const selectedFile = watch("resume");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("resume", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!jobId) {
      toast.error("Error", {
        description: "Job ID is missing. Please go back and try again.",
      });
      return;
    }

    try {
      await jobsApi.submitApplication(jobId, {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter || undefined,
        resume: data.resume,
      });

      toast.success("Application submitted!", {
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      // Reset form
      reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Redirect to careers page after a short delay
      setTimeout(() => {
        router.push("/careers");
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application. Please try again.";
      toast.error("Submission failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-8 items-center">
            {/* Back Button */}
            <div className="w-full flex items-center">
              <Button
                asChild
                variant="ghost"
                className="text-[#6C757D] dark:text-[#F8F9FA]/80 hover:text-primary"
              >
                <Link href="/careers#job-listings">
                  Back to Job Listings
                </Link>
              </Button>
            </div>

            <h2 className="text-[#212529] dark:text-[#F8F9FA] text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] text-center mb-6">
              Application Form
            </h2>
            <div className="w-full p-8 bg-white dark:bg-[#212529]/30 border border-[#F8F9FA] dark:border-white/10 rounded-xl">
              {/* Form Fields */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Full Name */}
                <div>
                  <Label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    type="text"
                    className={cn(
                      "w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary",
                      errors.fullName && "border-destructive focus:border-destructive focus:ring-destructive"
                    )}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    className={cn(
                      "w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary",
                      errors.email && "border-destructive focus:border-destructive focus:ring-destructive"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <Label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    type="tel"
                    placeholder="+251911234567"
                    className={cn(
                      "w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary",
                      errors.phone && "border-destructive focus:border-destructive focus:ring-destructive"
                    )}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-[#6C757D] dark:text-[#F8F9FA]/70">
                    Use international format (e.g., +251911234567)
                  </p>
                </div>

                {/* Resume Upload */}
                <div className="md:col-span-2">
                  <Label
                    htmlFor="dropzone-file"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Upload CV/Resume <span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    name="resume"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className={cn(
                              "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-[#F8F9FA] dark:bg-background-dark hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80 transition-colors",
                              selectedFile
                                ? "border-primary"
                                : errors.resume
                                ? "border-destructive"
                                : "border-[#F8F9FA] dark:border-white/10"
                            )}
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {selectedFile ? (
                                <p className="mb-2 text-sm text-primary font-semibold">
                                  {selectedFile.name}
                                </p>
                              ) : (
                                <>
                                  <p className="mb-2 text-sm text-[#6C757D] dark:text-[#F8F9FA]/70">
                                    <span className="font-semibold">Click to upload</span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-[#6C757D] dark:text-[#F8F9FA]/70">
                                    PDF, DOC, DOCX (MAX. 5MB)
                                  </p>
                                </>
                              )}
                            </div>
                            <input
                              {...field}
                              id="dropzone-file"
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        {errors.resume && (
                          <p className="mt-1.5 text-sm text-destructive">
                            {errors.resume.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Cover Letter */}
                <div className="md:col-span-2">
                  <Label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Cover Letter (Optional)
                  </Label>
                  <Textarea
                    id="coverLetter"
                    {...register("coverLetter")}
                    rows={4}
                    className={cn(
                      "w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary",
                      errors.coverLetter && "border-destructive focus:border-destructive focus:ring-destructive"
                    )}
                    placeholder="Tell us why you're interested in this position..."
                  />
                  {errors.coverLetter && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.coverLetter.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex! min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
