import * as z from "zod";

export const createProductSchema = z.object({
  sectorId: z.number().min(1, "Sector is required"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  order: z.number().optional(),
  image: z.union([z.instanceof(File), z.string()]).optional(),
}).refine(
  (data) => data.image instanceof File || data.imageUrl,
  {
    message: "Image is required. Please upload an image or provide an image URL.",
    path: ["image"],
  }
);

export const updateProductSchema = z.object({
  sectorId: z.number().min(1, "Sector is required").optional(),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 200 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  order: z.number().optional(),
  image: z.instanceof(File).optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type ProductFormData = CreateProductFormData | UpdateProductFormData;

