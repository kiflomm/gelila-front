"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LeadershipFormFields } from "./leadership-form-fields";
import { LeadershipImageUpload } from "./leadership-image-upload";
import {
  createLeadershipSchema,
  updateLeadershipSchema,
  type LeadershipFormData,
} from "../schemas/leadership-form.schemas";
import type { LeadershipItem, CreateLeadershipData, UpdateLeadershipData } from "@/api/leadership";

interface LeadershipFormProps {
  leadership?: LeadershipItem;
  onSubmit: (data: CreateLeadershipData | UpdateLeadershipData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function LeadershipForm({ leadership, onSubmit, onCancel, isSubmitting = false }: LeadershipFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LeadershipFormData>({
    resolver: zodResolver(leadership ? updateLeadershipSchema : createLeadershipSchema),
    defaultValues: leadership
      ? {
          fullName: leadership.fullName,
          officialTitle: leadership.officialTitle,
          bio: leadership.bio,
        }
      : {},
  });

  const onSubmitForm = async (data: LeadershipFormData) => {
    const submitData: CreateLeadershipData | UpdateLeadershipData = {
      fullName: data.fullName,
      officialTitle: data.officialTitle,
      bio: data.bio,
      // Only include photo if it's a File instance (new upload)
      // For updates, if no new photo is uploaded, don't send photo field
      photo: data.photo instanceof File ? data.photo : undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <LeadershipFormFields control={control} errors={errors} leadership={leadership} />
      <LeadershipImageUpload
        control={control}
        errors={errors}
        leadership={leadership}
        isRequired={!leadership}
      />
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : leadership ? "Update Leadership" : "Create Leadership"}
        </Button>
      </div>
    </form>
  );
}

