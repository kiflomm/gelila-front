"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExportProductForm } from "./export-product-form";
import type { CreateExportProductData } from "@/api/exports";

interface CreateExportProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateExportProductData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateExportProductDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateExportProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Add a new product to this export. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <ExportProductForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

