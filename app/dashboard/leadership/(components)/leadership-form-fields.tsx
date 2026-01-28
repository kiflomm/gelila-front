"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LeadershipFormFieldsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  leadership?: { fullName?: string; officialTitle?: string; bio?: string; orderIndex?: number };
}

export function LeadershipFormFields({ control, errors, leadership }: LeadershipFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Input
              id="fullName"
              {...field}
              placeholder="e.g., John Doe"
              aria-invalid={errors.fullName ? "true" : "false"}
            />
          )}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">
            {String((errors.fullName as any)?.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="officialTitle">
          Official Title <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="officialTitle"
          control={control}
          render={({ field }) => (
            <Input
              id="officialTitle"
              {...field}
              placeholder="e.g., Chief Executive Officer"
              aria-invalid={errors.officialTitle ? "true" : "false"}
            />
          )}
        />
        {errors.officialTitle && (
          <p className="text-sm text-destructive">
            {String((errors.officialTitle as any)?.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          Bio (1-2 sentences) <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <Textarea
              id="bio"
              {...field}
              placeholder="e.g., John Doe has over 20 years of experience in manufacturing and has led the company to significant growth."
              rows={3}
              aria-invalid={errors.bio ? "true" : "false"}
            />
          )}
        />
        {errors.bio && (
          <p className="text-sm text-destructive">
            {String((errors.bio as any)?.message ?? "")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderIndex">Display Order</Label>
        <Controller
          name="orderIndex"
          control={control}
          render={({ field }) => (
            <Input
              id="orderIndex"
              type="number"
              min={0}
              {...field}
              value={field.value ?? leadership?.orderIndex ?? ""}
              placeholder="0 (top of the list)"
              aria-invalid={errors.orderIndex ? "true" : "false"}
            />
          )}
        />
        {errors.orderIndex && (
          <p className="text-sm text-destructive">{errors.orderIndex.message as string}</p>
        )}
      </div>
    </>
  );
}

