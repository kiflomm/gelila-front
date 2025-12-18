"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExportForm } from "./export-form";
import type { CreateExportData, UpdateExportData } from "@/api/exports";

interface CreateExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateExportData | UpdateExportData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateExportDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateExportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Export</DialogTitle>
          <DialogDescription>
            Add a new export item to the exports portfolio. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <ExportForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

