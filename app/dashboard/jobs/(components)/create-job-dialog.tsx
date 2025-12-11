"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobForm } from "./job-form";
import type { CreateJobData, UpdateJobData } from "@/api/jobs";

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateJobData | UpdateJobData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateJobDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateJobDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
          <DialogDescription>
            Add a new job posting to the careers page. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <JobForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

