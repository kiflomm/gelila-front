"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MilestoneForm } from "./milestone-form";
import type { MilestoneItem, CreateMilestoneData, UpdateMilestoneData } from "@/api/milestones";

interface EditMilestoneDialogProps {
  milestone: MilestoneItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateMilestoneData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditMilestoneDialog({
  milestone,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditMilestoneDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Milestone</DialogTitle>
          <DialogDescription>
            Update the milestone information. All fields are optional.
          </DialogDescription>
        </DialogHeader>
        <MilestoneForm
          milestone={milestone}
          onSubmit={onSubmit as (data: CreateMilestoneData | UpdateMilestoneData) => Promise<void>}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

