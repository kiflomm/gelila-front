import * as z from "zod";

export const createLeadershipSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(200, "Full name must be less than 200 characters"),
  officialTitle: z
    .string()
    .min(2, "Official title must be at least 2 characters")
    .max(200, "Official title must be less than 200 characters"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters (1-2 sentences)"),
  orderIndex: z
    .preprocess(
      (v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
      z
        .number()
        .int()
        .min(0, "Order must be at least 0"),
    )
    .optional(),
  photo: z.instanceof(File, { message: "Photo is required" }),
});

export const updateLeadershipSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(200, "Full name must be less than 200 characters")
    .optional(),
  officialTitle: z
    .string()
    .min(2, "Official title must be at least 2 characters")
    .max(200, "Official title must be less than 200 characters")
    .optional(),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters (1-2 sentences)")
    .optional(),
  orderIndex: z
    .preprocess(
      (v) => (v === "" || v === undefined || v === null ? undefined : Number(v)),
      z
        .number()
        .int()
        .min(0, "Order must be at least 0"),
    )
    .optional(),
  photo: z.instanceof(File).optional(),
});

export type CreateLeadershipFormData = z.infer<typeof createLeadershipSchema>;
export type UpdateLeadershipFormData = z.infer<typeof updateLeadershipSchema>;
export type LeadershipFormData = CreateLeadershipFormData | UpdateLeadershipFormData;

