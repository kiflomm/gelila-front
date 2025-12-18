"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Export } from "@/api/exports";

interface DeleteExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exportItem: Export | null;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteExportDialog({
  open,
  onOpenChange,
  exportItem,
  onConfirm,
  isDeleting = false,
}: DeleteExportDialogProps) {
  if (!exportItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Export</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{exportItem.title}"? This action cannot be undone.
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

