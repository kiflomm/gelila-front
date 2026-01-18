"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { MilestoneFormData } from "../schemas/milestone-form.schemas";

interface MilestoneFormFieldsProps {
  control: Control<MilestoneFormData>;
  errors: FieldErrors<MilestoneFormData>;
  milestone?: { year?: string; title?: string; description?: string; orderIndex?: number };
}

export function MilestoneFormFields({ control, errors, milestone }: MilestoneFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="year">
          Year <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Input
              id="year"
              {...field}
              placeholder="e.g., 2004"
              aria-invalid={errors.year ? "true" : "false"}
            />
          )}
        />
        {errors.year && (
          <p className="text-sm text-destructive">{errors.year.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              {...field}
              placeholder="e.g., Company Founded"
              aria-invalid={errors.title ? "true" : "false"}
            />
          )}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              {...field}
              placeholder="e.g., Gelila Manufacturing was originally founded in Adwa City..."
              rows={4}
              aria-invalid={errors.description ? "true" : "false"}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderIndex">
          Order Index (optional)
        </Label>
        <Controller
          name="orderIndex"
          control={control}
          render={({ field }) => (
            <Input
              id="orderIndex"
              type="number"
              min="0"
              {...field}
              value={field.value ?? 0}
              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : 0)}
              placeholder="0"
              aria-invalid={errors.orderIndex ? "true" : "false"}
            />
          )}
        />
        {errors.orderIndex && (
          <p className="text-sm text-destructive">{errors.orderIndex.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Lower numbers appear first. Milestones with the same order index are sorted by year.
        </p>
      </div>
    </>
  );
}

