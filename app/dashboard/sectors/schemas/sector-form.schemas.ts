import * as z from "zod";

export const createSectorSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 200 characters"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  slug: z.string().optional(),
  status: z.enum(["operational", "planned", "project"]),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  heroDescription: z.string().max(500, "Hero description must be less than 500 characters").optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  isPublished: z.boolean().optional(),
  image: z.instanceof(File).optional(),
});

export const updateSectorSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 200 characters")
    .optional(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .optional(),
  slug: z.string().optional(),
  status: z.enum(["operational", "planned", "project"]).optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),
  heroDescription: z.string().max(500, "Hero description must be less than 500 characters").optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  isPublished: z.boolean().optional(),
  image: z.instanceof(File).optional(),
});

export type CreateSectorFormData = z.infer<typeof createSectorSchema>;
export type UpdateSectorFormData = z.infer<typeof updateSectorSchema>;
export type SectorFormData = CreateSectorFormData | UpdateSectorFormData;

