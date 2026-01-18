"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { MilestoneFormFields } from "./milestone-form-fields";
import {
  createMilestoneSchema,
  updateMilestoneSchema,
  type MilestoneFormData,
} from "../schemas/milestone-form.schemas";
import type { MilestoneItem, CreateMilestoneData, UpdateMilestoneData } from "@/api/milestones";

interface MilestoneFormProps {
  milestone?: MilestoneItem;
  onSubmit: (data: CreateMilestoneData | UpdateMilestoneData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function MilestoneForm({ milestone, onSubmit, onCancel, isSubmitting = false }: MilestoneFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MilestoneFormData>({
    resolver: zodResolver(milestone ? updateMilestoneSchema : createMilestoneSchema),
    defaultValues: milestone
      ? {
          year: milestone.year,
          title: milestone.title,
          description: milestone.description,
          orderIndex: milestone.orderIndex,
        }
      : {
          orderIndex: 0,
        },
  });

  const onSubmitForm = async (data: MilestoneFormData) => {
    const submitData: CreateMilestoneData | UpdateMilestoneData = {
      year: data.year,
      title: data.title,
      description: data.description,
      orderIndex: data.orderIndex ?? 0,
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <MilestoneFormFields control={control} errors={errors} milestone={milestone} />
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : milestone ? "Update Milestone" : "Create Milestone"}
        </Button>
      </div>
    </form>
  );
}

