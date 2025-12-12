"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductImageUpload } from "./product-image-upload";
import {
  createProductSchema,
  updateProductSchema,
  type ProductFormData,
} from "../schemas/product-form.schemas";
import type { Product, Sector, CreateProductData, UpdateProductData } from "@/api/sectors";

interface ProductFormProps {
  product?: Product;
  sectors: Sector[];
  onSubmit: (data: CreateProductData | UpdateProductData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ProductForm({ product, sectors, onSubmit, onCancel, isSubmitting = false }: ProductFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(product ? updateProductSchema : createProductSchema),
    defaultValues: product
      ? {
          sectorId: product.sectorId,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl || "",
          imageAlt: product.imageAlt || "",
          order: product.order || 0,
        }
      : {
          order: 0,
        },
  });

  const onSubmitForm = async (data: ProductFormData) => {
    const submitData: CreateProductData | UpdateProductData = {
      sectorId: data.sectorId!,
      name: data.name!,
      description: data.description!,
      imageUrl: data.imageUrl,
      imageAlt: data.imageAlt,
      order: data.order,
      image: data.image instanceof File ? data.image : undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <div className="space-y-2">
        <Label htmlFor="sectorId">
          Sector <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="sectorId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(parseInt(value))}
            >
              <SelectTrigger id="sectorId">
                <SelectValue placeholder="Select a sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id.toString()}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.sectorId && (
          <p className="text-sm text-destructive">{errors.sectorId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              id="name"
              {...field}
              placeholder="e.g., Men's Leather Shoes"
              aria-invalid={errors.name ? "true" : "false"}
            />
          )}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              {...field}
              placeholder="Product description"
              rows={4}
              aria-invalid={errors.description ? "true" : "false"}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <Input
                id="order"
                type="number"
                {...field}
                value={field.value ?? 0}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                placeholder="0"
                aria-invalid={errors.order ? "true" : "false"}
              />
            )}
          />
          {errors.order && (
            <p className="text-sm text-destructive">{errors.order.message}</p>
          )}
        </div>
      </div>

      <ProductImageUpload
        control={control}
        errors={errors}
        product={product}
        isRequired={!product}
      />

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

