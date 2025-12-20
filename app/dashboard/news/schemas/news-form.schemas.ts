import * as z from "zod";
import { getTextLength } from "@/components/ui/rich-text-editor";

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  slug: z.string().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .refine(
      (html) => getTextLength(html) >= 50,
      "Content must be at least 50 characters (excluding HTML formatting)"
    ),
  categoryId: z.number().min(1, "Category is required"),
  isPublished: z.boolean().optional(),
  image: z.instanceof(File, { message: "Image is required" }),
});

export const updateNewsSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  slug: z.string().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .refine(
      (html) => getTextLength(html) >= 50,
      "Content must be at least 50 characters (excluding HTML formatting)"
    )
    .optional(),
  categoryId: z.number().min(1, "Category is required").optional(),
  isPublished: z.boolean().optional(),
  image: z.instanceof(File).optional(),
});

export type CreateNewsFormData = z.infer<typeof createNewsSchema>;
export type UpdateNewsFormData = z.infer<typeof updateNewsSchema>;
export type NewsFormData = CreateNewsFormData | UpdateNewsFormData;




