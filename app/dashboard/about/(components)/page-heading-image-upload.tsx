"use client";

import { useState, useRef } from "react";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeadingImageUploadProps {
  control: Control<any>;
  currentImageUrl?: string | null;
  currentImageAlt?: string | null;
}

export function PageHeadingImageUpload({
  control,
  currentImageUrl,
  currentImageAlt,
}: PageHeadingImageUploadProps) {
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Page Heading Image
        </Label>
        {imagePreviewUrl && (
          <button
            type="button"
            onClick={() => {
              const onChange = (file: File | undefined) => {
                // This will be handled by the Controller
              };
              handleRemoveImage(onChange);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="text-xs text-destructive hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      <Controller
        name="pageHeadingImage"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <div className="space-y-3">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, onChange)}
              className={cn(
                "relative border-2 border-dashed rounded-xl transition-all",
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border hover:border-primary/50 bg-muted/30",
                imagePreviewUrl && "border-primary"
              )}
            >
              {imagePreviewUrl ? (
                <div className="relative p-3 sm:p-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted group shadow-sm">
                    <img
                      src={imagePreviewUrl}
                      alt={currentImageAlt || "Page heading preview"}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
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
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-lg z-20 opacity-0 group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {/* Click overlay to upload new image */}
                    <label
                      htmlFor="about-page-heading-image-upload"
                      className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 transition-opacity bg-black/60 flex items-center justify-center z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="text-white text-sm font-medium bg-primary/90 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <Upload className="mr-2 inline h-4 w-4" />
                        Change Image
                      </div>
                    </label>
                  </div>
                  {value instanceof File && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                      New image: {value.name}
                    </p>
                  )}
                  {currentImageUrl && !value && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                      Current image (hover to replace)
                    </p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="about-page-heading-image-upload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full aspect-video cursor-pointer transition-colors",
                    isDragging && "bg-primary/5"
                  )}
                >
                  <div className="flex flex-col items-center justify-center px-4">
                    <div className="mb-3 p-3 rounded-full bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground sm:h-8 sm:w-8" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-foreground sm:text-base">
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground text-center sm:text-sm">
                      PNG, JPG, GIF, WEBP (MAX. 5MB)
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground/80 text-center">
                      Recommended: 1920x1080px or higher
                    </p>
                  </div>
                </label>
              )}
              <input
                {...field}
                id="about-page-heading-image-upload"
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
    </div>
  );
}
