"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import * as z from "zod";
import type { ImportProduct, CreateImportProductData, UpdateImportProductData } from "@/api/imports";
import { ImportProductImageUpload } from "./import-product-image-upload";

const createProductSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  orderIndex: z.number().min(0).optional(),
  image: z.instanceof(File).optional(),
  imageAlt: z.string().optional(),
});

const updateProductSchema = z.object({
  name: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(1000).optional(),
  orderIndex: z.number().min(0).optional(),
  image: z.instanceof(File).optional(),
  imageAlt: z.string().optional(),
});

type ImportProductFormData = z.infer<typeof createProductSchema> | z.infer<typeof updateProductSchema>;

interface ImportProductFormProps {
  product?: ImportProduct;
  onSubmit: (data: CreateImportProductData | UpdateImportProductData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ImportProductForm({ product, onSubmit, onCancel, isSubmitting = false }: ImportProductFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ImportProductFormData>({
    resolver: zodResolver(product ? updateProductSchema : createProductSchema),
    defaultValues: product
      ? {
          name: product.name || "",
          description: product.description || "",
          orderIndex: product.orderIndex ?? 0,
          imageAlt: product.imageAlt || "",
        }
      : {
          name: "",
          description: "",
          orderIndex: 0,
          imageAlt: "",
        },
  });

  const onSubmitForm = async (data: ImportProductFormData) => {
    const submitData: CreateImportProductData | UpdateImportProductData = {
      ...data,
      // Only include image if it's a new File upload
      image: data.image instanceof File ? data.image : undefined,
      // For updates, always preserve the existing imageUrl if no new image is uploaded
      // This ensures the backend doesn't clear the image
      ...(product && !(data.image instanceof File) ? {
        imageUrl: product.imageUrl || undefined,
        imageAlt: product.imageAlt || undefined,
      } : {}),
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name {!product && <span className="text-destructive">*</span>}
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" {...field} value={field.value || ""} placeholder="Product name" />
          )}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description {!product && <span className="text-destructive">*</span>}
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              {...field}
              value={field.value || ""}
              placeholder="Product description"
              rows={4}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderIndex">Order Index</Label>
        <Controller
          name="orderIndex"
          control={control}
          render={({ field }) => (
            <Input
              id="orderIndex"
              type="number"
              {...field}
              value={field.value ?? 0}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          )}
        />
        {errors.orderIndex && (
          <p className="text-sm text-destructive">{errors.orderIndex.message}</p>
        )}
      </div>

      {product ? (
        <ImportProductImageUpload control={control} errors={errors} product={product} />
      ) : (
        <ImportProductImageUpload control={control} errors={errors} />
      )}

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

