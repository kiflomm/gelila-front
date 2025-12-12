"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommitmentForm } from "./commitment-form";
import type { CreateCommitmentData, UpdateCommitmentData } from "@/api/imports";

interface CreateCommitmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateCommitmentData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateCommitmentDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateCommitmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Commitment</DialogTitle>
          <DialogDescription>
            Add a new commitment item to the imports page.
          </DialogDescription>
        </DialogHeader>
        <CommitmentForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

