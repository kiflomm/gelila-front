"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImportForm } from "./import-form";
import type { Import, UpdateImportData } from "@/api/imports";

interface EditImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importItem: Import | null;
  onSubmit: (data: UpdateImportData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditImportDialog({
  open,
  onOpenChange,
  importItem,
  onSubmit,
  isSubmitting = false,
}: EditImportDialogProps) {
  if (!importItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Import</DialogTitle>
          <DialogDescription>
            Update the import item details. All changes will be reflected on the public site.
          </DialogDescription>
        </DialogHeader>
        <ImportForm
          importItem={importItem}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

