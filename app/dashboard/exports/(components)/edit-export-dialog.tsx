"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExportForm } from "./export-form";
import type { Export, UpdateExportData } from "@/api/exports";

interface EditExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exportItem: Export | null;
  onSubmit: (data: UpdateExportData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditExportDialog({
  open,
  onOpenChange,
  exportItem,
  onSubmit,
  isSubmitting = false,
}: EditExportDialogProps) {
  if (!exportItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Export</DialogTitle>
          <DialogDescription>
            Update the export item details. All changes will be reflected on the public site.
          </DialogDescription>
        </DialogHeader>
        <ExportForm
          exportItem={exportItem}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

