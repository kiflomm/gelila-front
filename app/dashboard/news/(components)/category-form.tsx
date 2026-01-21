"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { NewsCategory } from "@/api/news";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  slug: z.string().optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: NewsCategory;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  register: ReturnType<typeof useForm<CategoryFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<CategoryFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<CategoryFormData>>["formState"]["errors"];
  formId?: string;
}

export function CategoryForm({
  category,
  onSubmit,
  onCancel,
  isSubmitting = false,
  register,
  handleSubmit,
  errors,
  formId = "category-form",
}: CategoryFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id={formId}>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-name`}>
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${formId}-name`}
          {...register("name")}
          placeholder="e.g., Press Releases"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-description`}>Description (optional)</Label>
        <Textarea
          id={`${formId}-description`}
          {...register("description")}
          placeholder="Category description"
          rows={3}
        />
      </div>
    </form>
  );
}













