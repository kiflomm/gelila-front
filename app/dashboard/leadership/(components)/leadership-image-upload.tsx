"use client";

import { useState, useRef } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "@/components/ui/image";
import type { LeadershipFormData } from "../schemas/leadership-form.schemas";

interface LeadershipImageUploadProps {
  control: Control<LeadershipFormData>;
  errors: FieldErrors<LeadershipFormData>;
  leadership?: { photoUrl?: string | null };
  isRequired?: boolean;
}

/**
 * Convert relative image URL to full URL for preview
 */
function getImagePreviewUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  // If it's already a full URL (starts with http:// or https://), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // If it's a relative path starting with /uploads, use it directly (served by backend)
  // Otherwise, prepend the API base URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (imageUrl.startsWith('/uploads')) {
    return `${apiBaseUrl.replace('/api/v1', '')}${imageUrl}`;
  }
  return imageUrl.startsWith('/') ? `${apiBaseUrl}${imageUrl}` : `${apiBaseUrl}/${imageUrl}`;
}

export function LeadershipImageUpload({
  control,
  errors,
  leadership,
  isRequired = false,
}: LeadershipImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    getImagePreviewUrl(leadership?.photoUrl)
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
      // Reset to original image URL if editing, otherwise clear preview
      setImagePreview(getImagePreviewUrl(leadership?.photoUrl));
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
      <Label htmlFor="photo">
        Photo {isRequired && <span className="text-destructive">*</span>}
      </Label>
      <Controller
        name="photo"
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
                  : errors.photo
                  ? "border-destructive bg-destructive/5"
                  : "border-border hover:border-primary/50 bg-muted/30",
                (imagePreview || value) && "border-primary"
              )}
            >
              {imagePreview ? (
                <div className="relative p-4">
                  <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
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
                      aria-label="Remove photo"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {/* Click overlay to upload new image */}
                    <label
                      htmlFor="photo-upload"
                      className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 transition-opacity bg-black/50 flex items-center justify-center z-10"
                      onClick={(e) => {
                        // Don't trigger parent handlers
                        e.stopPropagation();
                      }}
                    >
                      <div className="text-white text-sm font-medium bg-primary/80 px-4 py-2 rounded">
                        Click to change photo
                      </div>
                    </label>
                  </div>
                  {value instanceof File && (
                    <p className="mt-2 text-sm text-muted-foreground text-center">
                      New photo: {value.name}
                    </p>
                  )}
                  {leadership && !value && (
                    <p className="mt-2 text-xs text-muted-foreground text-center">
                      Current photo (click photo above or upload button to replace)
                    </p>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="photo-upload"
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
                id="photo-upload"
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
            {errors.photo && (
              <p className="text-sm text-destructive flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4" />
                {errors.photo.message}
              </p>
            )}
            {leadership && !value && !imagePreview && (
              <p className="text-sm text-muted-foreground">
                Current photo: {leadership.photoUrl} (upload a new photo to replace)
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

