"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommitmentForm } from "./commitment-form";
import type { ImportCommitment, UpdateCommitmentData } from "@/api/imports";

interface EditCommitmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commitment: ImportCommitment | null;
  onSubmit: (data: UpdateCommitmentData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditCommitmentDialog({
  open,
  onOpenChange,
  commitment,
  onSubmit,
  isSubmitting = false,
}: EditCommitmentDialogProps) {
  if (!commitment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Commitment</DialogTitle>
          <DialogDescription>
            Update the commitment details.
          </DialogDescription>
        </DialogHeader>
        <CommitmentForm
          commitment={commitment}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

