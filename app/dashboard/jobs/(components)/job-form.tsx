"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor, getTextLength } from "@/components/ui/rich-text-editor";
import type { Job, CreateJobData, UpdateJobData } from "@/api/jobs";

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Internship"], {
    message: "Job type is required",
  }),
  description: z
    .string()
    .min(1, "Description is required")
    .refine(
      (html) => getTextLength(html) >= 50,
      "Description must be at least 50 characters (excluding HTML formatting)"
    ),
  isActive: z.boolean().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  job?: Job;
  onSubmit: (data: CreateJobData | UpdateJobData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function JobForm({ job, onSubmit, onCancel, isSubmitting = false }: JobFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: job
      ? {
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type as "Full-time" | "Part-time" | "Internship",
          description: job.description,
          isActive: job.isActive ?? true,
        }
      : {
          isActive: true,
        },
  });

  const onSubmitForm = async (data: JobFormData) => {
    // Remove isActive from create requests (it's only for updates)
    // Backend CreateJobDto doesn't accept isActive, it defaults to true
    if (!job) {
      const { isActive, ...createData } = data;
      await onSubmit(createData);
    } else {
      await onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="e.g., Senior Mechanical Engineer"
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">
            Department <span className="text-destructive">*</span>
          </Label>
          <Input
            id="department"
            {...register("department")}
            placeholder="e.g., Engineering"
            aria-invalid={errors.department ? "true" : "false"}
          />
          {errors.department && (
            <p className="text-sm text-destructive">{errors.department.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">
            Location <span className="text-destructive">*</span>
          </Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="e.g., Addis Ababa"
            aria-invalid={errors.location ? "true" : "false"}
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">
            Job Type <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Enter detailed job description..."
              error={!!errors.description}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {job && (
        <div className="flex items-center space-x-2">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="isActive"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label
            htmlFor="isActive"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Active (job will be visible on careers page)
          </Label>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : job ? "Update Job" : "Create Job"}
        </button>
      </div>
    </form>
  );
}

