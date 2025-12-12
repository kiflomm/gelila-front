"use client";

import { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImportImageUploadProps {
  control: Control<any>;
  currentImageUrl?: string | null;
  currentImageAlt?: string | null;
}

export function ImportImageUpload({
  control,
  currentImageUrl,
  currentImageAlt,
}: ImportImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanImageUrl}`;
  };

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <div className="space-y-2">
            {(preview || currentImageUrl) && (
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border">
                <Image
                  src={preview || getImageUrl(currentImageUrl || "")}
                  alt={currentImageAlt || "Import preview"}
                  fill
                  className="object-cover"
                  unoptimized={preview?.startsWith('blob:') || currentImageUrl?.startsWith('http') || currentImageUrl?.startsWith('/uploads')}
                />
                {preview && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setPreview(null);
                      onChange(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <Input
              {...field}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                  onChange(file);
                }
              }}
            />
            <p className="text-sm text-muted-foreground">
              Upload an image for this import item (optional). Max size: 10MB
            </p>
          </div>
        )}
      />
      <Controller
        name="imageAlt"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input
              id="imageAlt"
              {...field}
              placeholder="Descriptive alt text for the image"
            />
          </div>
        )}
      />
    </div>
  );
}

