"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Upload, X, GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import type { Export } from "@/api/exports";

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

interface ExportImageUploadProps {
  control: Control<any>;
  currentImageUrls?: string[] | null;
  currentImageAlts?: string[] | null;
}

export function ExportImageUpload({
  control,
  currentImageUrls,
  currentImageAlts,
}: ExportImageUploadProps) {
  const [images, setImages] = useState<ImageItem[]>(() => {
    if (currentImageUrls && currentImageUrls.length > 0) {
      return currentImageUrls.map((url, index) => ({
        id: `existing-${index}`,
        url,
        alt: currentImageAlts?.[index] || "",
        isExisting: true,
      }));
    }
    return [];
  });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef<((files: File[]) => void) | null>(null);
  const onUrlsChangeRef = useRef<((urls: string[]) => void) | null>(null);
  const onAltsChangeRef = useRef<((alts: string[]) => void) | null>(null);
  const prevImagesKeyRef = useRef<string>("");

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = `new-${Date.now()}-${Math.random()}`;
        newImages.push({
          id,
          file,
          alt: "",
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

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOverItem = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setImages((prev) => {
      const newImages = [...prev];
      const draggedItem = newImages[draggedIndex];
      newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, draggedItem);
      return newImages;
    });
    setDraggedIndex(index);
  };

  // Sync images to form fields
  useEffect(() => {
    const files = images.filter((img) => img.file).map((img) => img.file!);
    const urls = images.filter((img) => img.isExisting && img.url).map((img) => img.url!);
    const alts = images.map((img) => img.alt);
    const imagesKey = JSON.stringify(images.map((img) => ({ id: img.id, url: img.url, alt: img.alt })));

    // Only update if images actually changed
    if (imagesKey !== prevImagesKeyRef.current) {
      prevImagesKeyRef.current = imagesKey;
      if (onChangeRef.current) {
        onChangeRef.current(files);
      }
      if (onUrlsChangeRef.current) {
        onUrlsChangeRef.current(urls);
      }
      if (onAltsChangeRef.current) {
        onAltsChangeRef.current(alts);
      }
    }
  }, [images]);

  return (
    <div className="space-y-4">
      <Label>Images</Label>
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange } }) => {
          onChangeRef.current = onChange;
          return <></>;
        }}
      />
      <Controller
        name="imageUrls"
        control={control}
        render={({ field: { onChange } }) => {
          onUrlsChangeRef.current = onChange;
          return <></>;
        }}
      />
      <Controller
        name="imageAlts"
        control={control}
        render={({ field: { onChange } }) => {
          onAltsChangeRef.current = onChange;
          return <></>;
        }}
      />

      {/* Upload area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 bg-muted/30"
        )}
      >
        <label
          htmlFor="export-images-upload"
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
          id="export-images-upload"
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
          {images.map((image, index) => {
            const previewUrl = image.file
              ? URL.createObjectURL(image.file)
              : image.url
              ? getImagePreviewUrl(image.url)
              : null;

            return (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOverItem(e, index)}
                className={cn(
                  "relative border rounded-lg p-3 bg-muted/30 group",
                  draggedIndex === index && "opacity-50"
                )}
              >
                <div className="flex gap-3">
                  {/* Drag handle and move buttons */}
                  <div className="flex flex-col items-center gap-1 pt-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <button
                      type="button"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === images.length - 1}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Image preview */}
                  {previewUrl && (
                    <div className="relative w-32 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={previewUrl}
                        alt={image.alt || "Preview"}
                        className="w-full h-full object-cover"
                        onError={() => {
                          // Handle error
                        }}
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
    </div>
  );
}
