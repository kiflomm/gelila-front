"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobForm } from "./job-form";
import type { Job, UpdateJobData } from "@/api/jobs";

interface EditJobDialogProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateJobData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditJobDialog({
  job,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditJobDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>
            Update the job posting details. Changes will be reflected on the careers page.
          </DialogDescription>
        </DialogHeader>
        <JobForm
          job={job}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

