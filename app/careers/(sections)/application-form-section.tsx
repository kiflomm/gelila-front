"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ApplicationFormSectionProps {
  jobTitle: string;
  jobId?: number;
}

export default function ApplicationFormSection({
  jobTitle,
  jobId,
}: ApplicationFormSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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
                <Link href="/careers#job-listings" className="flex items-center gap-2">
                  <ArrowLeft className="size-4" />
                  <span>Back to Job Listings</span>
                </Link>
              </Button>
            </div>

            <h2 className="text-[#212529] dark:text-[#F8F9FA] text-3xl font-bold leading-tight tracking-[-0.015em] text-center">
              Apply for {jobTitle}
            </h2>
            <div className="w-full p-8 bg-white dark:bg-[#212529]/30 border border-[#F8F9FA] dark:border-white/10 rounded-xl">
              {/* Progress Indicator */}
              <div className="mb-8">
                <p className="text-center text-sm font-bold text-primary mb-2">
                  Step {currentStep} of {totalSteps}: Personal Details
                </p>
                <div className="w-full bg-[#F8F9FA] dark:bg-background-dark rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Fields */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (currentStep < totalSteps) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              >
                <div>
                  <Label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="resume"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Upload CV/Resume
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#F8F9FA] dark:border-white/10 border-dashed rounded-lg cursor-pointer bg-[#F8F9FA] dark:bg-background-dark hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="size-8 text-[#6C757D] mb-2" />
                        <p className="mb-2 text-sm text-[#6C757D] dark:text-[#F8F9FA]/70">
                          <span className="font-semibold">Click to upload</span> or drag
                          and drop
                        </p>
                        <p className="text-xs text-[#6C757D] dark:text-[#F8F9FA]/70">
                          PDF, DOC, DOCX (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-[#6C757D] dark:text-[#F8F9FA]/80 mb-2"
                  >
                    Cover Letter (Optional)
                  </Label>
                  <Textarea
                    id="coverLetter"
                    rows={4}
                    className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    className="flex! min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!"
                  >
                    <span className="truncate">
                      {currentStep < totalSteps
                        ? `Next: Step ${currentStep + 1}`
                        : "Submit Application"}
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

