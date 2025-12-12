"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import type { Sector, CreateProductData, UpdateProductData } from "@/api/sectors";

interface CreateProductDialogProps {
  sectors: Sector[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateProductData | UpdateProductData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateProductDialog({
  sectors,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new product to a sector. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          sectors={sectors}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

