"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ImportCommitment } from "@/api/imports";

interface DeleteCommitmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commitment: ImportCommitment | null;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteCommitmentDialog({
  open,
  onOpenChange,
  commitment,
  onConfirm,
  isDeleting = false,
}: DeleteCommitmentDialogProps) {
  if (!commitment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Commitment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{commitment.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

