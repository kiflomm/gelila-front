"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import * as z from "zod";
import type { Product, CreateProductData, UpdateProductData } from "@/api/sectors";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ProductImageUpload } from "./product-image-upload";

const createProductSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  orderIndex: z.number().min(0).optional(),
  image: z.instanceof(File).optional(),
  isNewArrival: z.boolean().optional(),
});

const updateProductSchema = z.object({
  name: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(1000).optional(),
  orderIndex: z.number().min(0).optional(),
  image: z.instanceof(File).optional(),
  isNewArrival: z.boolean().optional(),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;
type UpdateProductFormData = z.infer<typeof updateProductSchema>;

interface BaseProductFormProps {
  onCancel?: () => void;
  isSubmitting?: boolean;
}

interface CreateProductFormProps extends BaseProductFormProps {
  product?: undefined;
  onSubmit: (data: CreateProductData) => Promise<void>;
}

interface EditProductFormProps extends BaseProductFormProps {
  product: Product;
  onSubmit: (data: UpdateProductData) => Promise<void>;
}

type ProductFormProps = CreateProductFormProps | EditProductFormProps;

export function ProductForm(props: ProductFormProps) {
  const { product, onCancel, isSubmitting = false } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProductFormData | UpdateProductFormData>({
    resolver: zodResolver(product ? updateProductSchema : createProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          orderIndex: product.orderIndex,
          isNewArrival: product.isNewArrival,
        }
      : {
          orderIndex: 0,
          isNewArrival: false,
        },
  });

  const onSubmitForm = async (data: CreateProductFormData | UpdateProductFormData) => {
    if (product) {
      const submitData: UpdateProductData = {
        ...(data as UpdateProductFormData),
        image: data.image instanceof File ? data.image : undefined,
        ...(data.image instanceof File
          ? {}
          : {
              imageUrl: product.imageUrl || undefined,
            }),
      };
      await (props as EditProductFormProps).onSubmit(submitData);
      return;
    }

    const submitData: CreateProductData = {
      ...(data as CreateProductFormData),
      image: data.image instanceof File ? data.image : undefined,
    };
    await (props as CreateProductFormProps).onSubmit(submitData);
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
            <Input id="name" {...field} placeholder="Product name" />
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
        <ProductImageUpload control={control} errors={errors} product={product} />
      ) : (
        <ProductImageUpload control={control} errors={errors} />
      )}

      <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
        <div className="space-y-0.5">
          <Label htmlFor="isNewArrival">Show in New Arrivals</Label>
          <p className="text-xs text-muted-foreground">
            Mark this product to appear in the homepage New Arrivals carousel.
          </p>
        </div>
        <Controller
          name="isNewArrival"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              {product?.isNewArrival && (
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                  Currently featured
                </Badge>
              )}
              <Switch
                id="isNewArrival"
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />
      </div>

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

