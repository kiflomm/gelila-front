"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExportProductForm } from "./export-product-form";
import type { ExportProduct, UpdateExportProductData } from "@/api/exports";

interface EditExportProductDialogProps {
  product: ExportProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateExportProductData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditExportProductDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditExportProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product information. All fields are optional.
          </DialogDescription>
        </DialogHeader>
        <ExportProductForm
          product={product}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

