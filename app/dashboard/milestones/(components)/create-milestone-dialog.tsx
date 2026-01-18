"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MilestoneForm } from "./milestone-form";
import type { CreateMilestoneData, UpdateMilestoneData } from "@/api/milestones";

interface CreateMilestoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateMilestoneData | UpdateMilestoneData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateMilestoneDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateMilestoneDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Milestone</DialogTitle>
          <DialogDescription>
            Add a new milestone to the Industrial Milestones & Achievements section. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <MilestoneForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

