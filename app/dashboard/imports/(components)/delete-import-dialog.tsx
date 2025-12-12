"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Import } from "@/api/imports";

interface DeleteImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importItem: Import | null;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

export function DeleteImportDialog({
  open,
  onOpenChange,
  importItem,
  onConfirm,
  isDeleting = false,
}: DeleteImportDialogProps) {
  if (!importItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Import</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{importItem.title}"? This action cannot be undone.
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

