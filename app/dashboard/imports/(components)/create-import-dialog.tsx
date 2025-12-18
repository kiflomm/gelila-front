"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImportForm } from "./import-form";
import type { CreateImportData } from "@/api/imports";

interface CreateImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateImportData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateImportDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateImportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Import</DialogTitle>
          <DialogDescription>
            Add a new import item to the imports portfolio. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <ImportForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

