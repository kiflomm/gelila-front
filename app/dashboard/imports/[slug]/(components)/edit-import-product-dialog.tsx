"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImportProductForm } from "./import-product-form";
import type { ImportProduct, UpdateImportProductData } from "@/api/imports";

interface EditImportProductDialogProps {
  product: ImportProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateImportProductData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditImportProductDialog({
  product,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditImportProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product information. All fields are optional.
          </DialogDescription>
        </DialogHeader>
        <ImportProductForm
          product={product}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

