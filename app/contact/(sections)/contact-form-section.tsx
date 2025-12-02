"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import formData from "@/data/contact-form.json";

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  // Separate fields into two groups: first two fields (for grid) and rest
  const firstTwoFields = formData.fields.slice(0, 2);
  const remainingFields = formData.fields.slice(2);

  return (
    <section className="py-4 sm:py-6">
      <div className="p-6 sm:p-8 bg-white dark:bg-black/20 border border-primary/20 rounded-xl">
        <h2 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          {formData.title}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {firstTwoFields.map((field) => (
              <div key={field.id}>
                <Label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
                >
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
          {remainingFields.map((field) => (
            <div key={field.id}>
              <Label
                htmlFor={field.id}
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                {field.label}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.id}
                  rows={field.rows || 6}
                  required={field.required}
                  className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  placeholder={field.placeholder}
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50"
          >
            <span className="truncate">
              {isSubmitting
                ? formData.submitButton.sendingText
                : formData.submitButton.text}
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}
