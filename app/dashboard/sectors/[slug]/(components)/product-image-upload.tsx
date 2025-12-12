"use client";

import { useState, useRef } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import * as z from "zod";
import type { Product } from "@/api/sectors";

const productSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  orderIndex: z.number().optional(),
  image: z.instanceof(File).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

function getImagePreviewUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (imageUrl.startsWith('/uploads')) {
    return `${apiBaseUrl.replace('/api/v1', '')}${imageUrl}`;
  }
  return imageUrl.startsWith('/') ? `${apiBaseUrl}${imageUrl}` : `${apiBaseUrl}/${imageUrl}`;
}

interface ProductImageUploadProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  product?: Product;
}

export function ProductImageUpload({
  control,
  errors,
  product,
}: ProductImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product ? getImagePreviewUrl(product?.imageUrl) : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(undefined);
      setImagePreview(product ? getImagePreviewUrl(product?.imageUrl) : null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent,
    onChange: (file: File | undefined) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file, onChange);
    }
  };

  const handleRemoveImage = (onChange: (file: File | undefined) => void) => {
    handleFileChange(undefined, onChange);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Image</Label>
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <div className="space-y-2">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, onChange)}
              className={cn(
                "relative border-2 border-dashed rounded-lg transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : errors.image
                  ? "border-destructive bg-destructive/5"
                  : "border-border hover:border-primary/50 bg-muted/30",
                (imagePreview || value) && "border-primary"
              )}
            >
              {imagePreview ? (
                <div className="relative p-4">
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => {
                        setImagePreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                        onChange(undefined);
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(onChange);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-lg z-20"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {/* Click overlay to upload new image */}
                    <label
                      htmlFor="product-image-upload"
                      className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 transition-opacity bg-black/50 flex items-center justify-center z-10"
                      onClick={(e) => {
                        // Don't trigger parent handlers
                        e.stopPropagation();
                      }}
                    >
                      <div className="text-white text-sm font-medium bg-primary/80 px-4 py-2 rounded">
                        Click to change image
                      </div>
                    </label>
                  </div>
                  {value instanceof File && (
                    <p className="mt-2 text-sm text-muted-foreground text-center">
                      New image: {value.name}
                    </p>
                  )}
                  {product && !value && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                      Current image (click image above or upload button to replace)
                    </p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="product-image-upload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-48 cursor-pointer transition-colors",
                    isDragging && "bg-primary/5"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <div className="mb-4 p-3 rounded-full bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="mb-2 text-sm font-medium text-foreground">
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      PNG, JPG, GIF, WEBP (MAX. 10MB)
                    </p>
                  </div>
                </label>
              )}
              <input
                {...field}
                id="product-image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                value={undefined}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileChange(file, onChange);
                  }
                }}
              />
            </div>
            {errors.image && (
              <p className="text-sm text-destructive flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4" />
                {errors.image.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

