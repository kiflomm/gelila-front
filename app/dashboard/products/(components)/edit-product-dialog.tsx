"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import type { Product, Sector, UpdateProductData } from "@/api/sectors";

interface EditProductDialogProps {
  product: Product;
  sectors: Sector[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateProductData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditProductDialog({
  product,
  sectors,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product information. All changes will be reflected on the sectors page.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          product={product}
          sectors={sectors}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

