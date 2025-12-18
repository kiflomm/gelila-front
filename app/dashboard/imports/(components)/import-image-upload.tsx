"use client";

import { useState, useRef } from "react";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(undefined);
      setPreview(null);
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

  const imagePreviewUrl = preview || (currentImageUrl ? getImageUrl(currentImageUrl) : null);

  return (
    <div className="space-y-2">
      <Label>Image</Label>
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
                  : "border-border hover:border-primary/50 bg-muted/30",
                imagePreviewUrl && "border-primary"
              )}
            >
              {imagePreviewUrl ? (
                <div className="relative p-4">
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted group">
                    <img
                      src={imagePreviewUrl}
                      alt={currentImageAlt || "Import preview"}
                      className="w-full h-full object-cover"
                      onError={() => {
                        setPreview(null);
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
                      htmlFor="import-image-upload"
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
                  {currentImageUrl && !value && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                      Current image (click image above or upload button to replace)
                    </p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="import-image-upload"
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
                id="import-image-upload"
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

