"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "@/components/ui/image";
import * as z from "zod";
import type { Sector } from "@/api/sectors";

const updateSectorSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  status: z.enum(["operational", "planned", "project"]).optional(),
  location: z.string().optional(),
  heroDescription: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  image: z.instanceof(File).optional(),
  imageUrls: z.array(z.string()).optional(),
  imageAlts: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).optional(),
});

type SectorFormData = z.infer<typeof updateSectorSchema>;

interface ImageItem {
  id: string;
  file?: File;
  url?: string;
  alt: string;
  isExisting?: boolean;
}

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

interface SectorImageUploadProps {
  control: Control<SectorFormData>;
  errors: FieldErrors<SectorFormData>;
  sector: Sector;
}

export function SectorImageUpload({
  control,
  errors,
  sector,
}: SectorImageUploadProps) {
  const [images, setImages] = useState<ImageItem[]>(() => {
    // Initialize with existing images from imageUrls array
    if (sector?.imageUrls && sector.imageUrls.length > 0) {
      return sector.imageUrls.map((url, index) => ({
        id: `existing-${index}`,
        url,
        alt: sector.imageAlts?.[index] || sector.title || "",
        isExisting: true,
      }));
    }
    // Fallback to legacy single imageUrl
    if (sector?.imageUrl) {
      return [{
        id: 'existing-0',
        url: sector.imageUrl,
        alt: sector.imageAlt || sector.title || "",
        isExisting: true,
      }];
    }
    return [];
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Refs to store onChange handlers
  const imagesOnChangeRef = useRef<((files: File[] | undefined) => void) | null>(null);
  const imageUrlsOnChangeRef = useRef<((urls: string[] | undefined) => void) | null>(null);
  const imageAltsOnChangeRef = useRef<((alts: string[] | undefined) => void) | null>(null);
  const prevImagesKeyRef = useRef<string>("");

  // Sync form state when images change
  useEffect(() => {
    const currentImagesKey = JSON.stringify(images.map(img => ({ id: img.id, url: img.url, alt: img.alt })));
    
    // Only update if images actually changed
    if (prevImagesKeyRef.current !== currentImagesKey && imagesOnChangeRef.current) {
      prevImagesKeyRef.current = currentImagesKey;
      
      const files = images.filter((img) => img.file).map((img) => img.file!);
      const existingUrls = images
        .filter((img) => img.isExisting && img.url)
        .map((img) => img.url!);
      const alts = images.map((img) => img.alt);

      imagesOnChangeRef.current(files.length > 0 ? files : undefined);
      imageUrlsOnChangeRef.current?.(existingUrls.length > 0 ? existingUrls : undefined);
      imageAltsOnChangeRef.current?.(alts.length > 0 ? alts : undefined);
    }
  }, [images]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = `new-${Date.now()}-${Math.random()}`;
        newImages.push({
          id,
          file,
          alt: sector.title || "",
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAltChange = (id: string, alt: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, alt } : img))
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="images">Images</Label>
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange } }) => {
          // Store onChange handler in ref
          imagesOnChangeRef.current = onChange;
          return (
            <div className="space-y-2">
              {/* Upload area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative border-2 border-dashed rounded-lg transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : errors.images
                    ? "border-destructive bg-destructive/5"
                    : "border-border hover:border-primary/50 bg-muted/30"
                )}
              >
                <label
                  htmlFor="sector-images-upload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-32 cursor-pointer transition-colors",
                    isDragging && "bg-primary/5"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-4 pb-4 px-4">
                    <div className="mb-2 p-2 rounded-full bg-muted">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="mb-1 text-sm font-medium text-foreground">
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      PNG, JPG, GIF, WEBP (MAX. 10MB each, up to 10 images)
                    </p>
                  </div>
                </label>
                <input
                  id="sector-images-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Images grid */}
              {images.length > 0 && (
                <div className="space-y-3">
                  {images.map((image) => {
                    const previewUrl = image.file
                      ? URL.createObjectURL(image.file)
                      : image.url
                      ? getImagePreviewUrl(image.url)
                      : null;

                    return (
                      <div
                        key={image.id}
                        className={cn(
                          "relative border rounded-lg p-3 bg-muted/30 group"
                        )}
                      >
                        <div className="flex gap-3">
                          {/* Image preview */}
                          {previewUrl && (
                            <div className="relative w-32 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={previewUrl}
                                alt={image.alt || "Preview"}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          )}

                          {/* Alt text input */}
                          <div className="flex-1 space-y-1">
                            <Label className="text-xs">Alt Text</Label>
                            <Input
                              value={image.alt}
                              onChange={(e) => handleAltChange(image.id, e.target.value)}
                              placeholder="Descriptive alt text for this image"
                              className="text-sm"
                            />
                            {image.isExisting && (
                              <p className="text-xs text-muted-foreground">
                                Existing image
                              </p>
                            )}
                            {image.file && (
                              <p className="text-xs text-muted-foreground">
                                New: {image.file.name}
                              </p>
                            )}
                          </div>

                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image.id)}
                            className="p-2 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors self-start"
                            aria-label="Remove image"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Hidden controllers to store imageUrls and imageAlts */}
              <Controller
                name="imageUrls"
                control={control}
                render={({ field: { onChange } }) => {
                  imageUrlsOnChangeRef.current = onChange;
                  return <></>;
                }}
              />
              <Controller
                name="imageAlts"
                control={control}
                render={({ field: { onChange } }) => {
                  imageAltsOnChangeRef.current = onChange;
                  return <></>;
                }}
              />
            </div>
          );
        }}
      />
      {errors.images && (
        <p className="text-sm text-destructive flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4" />
          {errors.images.message}
        </p>
      )}
    </div>
  );
}
