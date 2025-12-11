"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { contactApi } from "@/api/contact";
import formData from "@/data/contact-form.json";

const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number in international format (e.g., +251911234567)"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await contactApi.submitMessage({
        name: data.name,
        email: data.email || undefined,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });

      toast.success("Message sent!", {
        description: "Thank you for your message! We'll get back to you soon.",
      });

      // Reset form
      reset();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send message. Please try again.";
      toast.error("Submission failed", {
        description: errorMessage,
      });
    }
  };

  // Separate fields into two groups: first two fields (for grid) and rest
  const firstTwoFields = formData.fields.slice(0, 2);
  const remainingFields = formData.fields.slice(2);

  return (
    <section className="py-2 sm:py-3">
      <div className="p-4 sm:p-5 bg-white dark:bg-black/20 border border-primary/20 rounded-xl">
        <h2 className="text-[#181411] dark:text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          {formData.title}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {firstTwoFields.map((field) => (
              <div key={field.id}>
                <Label
                  htmlFor={field.id}
                  className="block text-xs sm:text-sm font-medium text-[#181411] dark:text-white mb-1.5"
                >
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  {...register(field.id as keyof ContactFormData)}
                  className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                  placeholder={field.placeholder}
                />
                {errors[field.id as keyof ContactFormData] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[field.id as keyof ContactFormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {remainingFields.map((field) => (
            <div key={field.id}>
              <Label
                htmlFor={field.id}
                className="block text-xs sm:text-sm font-medium text-[#181411] dark:text-white mb-1.5"
              >
                {field.label}
              </Label>
              {field.type === "textarea" ? (
                <>
                  <Textarea
                    id={field.id}
                    rows={field.rows || 6}
                    {...register(field.id as keyof ContactFormData)}
                    className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                    placeholder={field.placeholder}
                  />
                  {errors[field.id as keyof ContactFormData] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[field.id as keyof ContactFormData]?.message}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Input
                    id={field.id}
                    type={field.type}
                    {...register(field.id as keyof ContactFormData)}
                    className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                    placeholder={field.placeholder}
                  />
                  {errors[field.id as keyof ContactFormData] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[field.id as keyof ContactFormData]?.message}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50"
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
