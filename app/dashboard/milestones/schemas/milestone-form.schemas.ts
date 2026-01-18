import * as z from "zod";

export const createMilestoneSchema = z.object({
  year: z
    .string()
    .min(1, "Year is required")
    .max(10, "Year must be less than 10 characters"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  orderIndex: z
    .number()
    .int("Order index must be an integer")
    .min(0, "Order index must be 0 or greater")
    .optional()
    .default(0),
});

export const updateMilestoneSchema = z.object({
  year: z
    .string()
    .min(1, "Year is required")
    .max(10, "Year must be less than 10 characters")
    .optional(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  orderIndex: z
    .number()
    .int("Order index must be an integer")
    .min(0, "Order index must be 0 or greater")
    .optional(),
});

export type CreateMilestoneFormData = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneFormData = z.infer<typeof updateMilestoneSchema>;
export type MilestoneFormData = CreateMilestoneFormData | UpdateMilestoneFormData;

