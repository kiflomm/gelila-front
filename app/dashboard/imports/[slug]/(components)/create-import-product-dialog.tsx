"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImportProductForm } from "./import-product-form";
import type { CreateImportProductData } from "@/api/imports";

interface CreateImportProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateImportProductData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateImportProductDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateImportProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Add a new product to this import. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <ImportProductForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

