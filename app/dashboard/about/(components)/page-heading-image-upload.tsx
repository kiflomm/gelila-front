"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";
import Image from "@/components/ui/image";
import { cn } from "@/lib/utils";

interface ImageItem {
  id: string;
  file?: File;
  url?: string;
  alt: string;
  isExisting?: boolean;
}

interface PageHeadingImageUploadProps {
  control: Control<any>;
  currentImages?: Array<{ url: string; alt: string }> | null;
}

export function PageHeadingImageUpload({
  control,
  currentImages,
}: PageHeadingImageUploadProps) {
  const [images, setImages] = useState<ImageItem[]>(() => {
    if (currentImages && currentImages.length > 0) {
      return currentImages.map((img, index) => ({
        id: `existing-${index}`,
        url: img.url,
        alt: img.alt,
        isExisting: true,
      }));
    }
    return [];
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeImagesRef = useRef<((files: File[]) => void) | null>(null);
  const onChangeUrlsRef = useRef<((urls: string[]) => void) | null>(null);
  const onChangeAltsRef = useRef<((alts: string[]) => void) | null>(null);
  const prevImagesKeyRef = useRef<string>("");

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

  // Sync images state with form fields
  useEffect(() => {
    const newFiles = images.filter((img) => img.file).map((img) => img.file!);
    const newUrls = images.filter((img) => img.isExisting && img.url).map((img) => img.url!);
    const newAlts = images.map((img) => img.alt);

    const imagesKey = JSON.stringify({ files: newFiles.length, urls: newUrls.length, alts: newAlts });
    
    if (imagesKey !== prevImagesKeyRef.current) {
      prevImagesKeyRef.current = imagesKey;
      
      if (onChangeImagesRef.current) {
        onChangeImagesRef.current(newFiles);
      }
      if (onChangeUrlsRef.current && newUrls.length > 0) {
        onChangeUrlsRef.current(newUrls);
      }
      if (onChangeAltsRef.current && newAlts.length > 0) {
        onChangeAltsRef.current(newAlts);
      }
    }
  }, [images]);

  return (
    <div className="space-y-3">
      <Label htmlFor="pageHeadingImages">Page Heading Images</Label>
      <Controller
        name="pageHeadingImages"
        control={control}
        render={({ field: { onChange } }) => {
          onChangeImagesRef.current = onChange;
          return <></>;
        }}
      />
      <Controller
        name="pageHeadingImageUrls"
        control={control}
        render={({ field: { onChange } }) => {
          onChangeUrlsRef.current = onChange;
          return <></>;
        }}
      />
      <Controller
        name="pageHeadingImageAlts"
        control={control}
        render={({ field: { onChange } }) => {
          onChangeAltsRef.current = onChange;
          return <></>;
        }}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl transition-all",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 bg-muted/30"
        )}
      >
        {images.length > 0 ? (
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden bg-muted border border-border"
                >
                  <div className="relative aspect-video">
                    {image.file ? (
                      <Image
                        src={URL.createObjectURL(image.file)}
                        alt={image.alt || `Page heading image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : image.url ? (
                      <Image
                        src={getImageUrl(image.url)}
                        alt={image.alt || `Page heading image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : null}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-lg z-20 opacity-0 group-hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-2 space-y-1">
                    <Input
                      type="text"
                      placeholder="Alt text"
                      value={image.alt}
                      onChange={(e) => handleAltChange(image.id, e.target.value)}
                      className="text-xs h-8"
                    />
                  </div>
                </div>
              ))}
            </div>
            <label
              htmlFor="about-page-heading-images-upload"
              className="mt-3 flex items-center justify-center w-full py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Upload className="h-4 w-4" />
                <span>Add more images</span>
              </div>
            </label>
          </div>
        ) : (
          <label
            htmlFor="about-page-heading-images-upload"
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
                PNG, JPG, GIF, WEBP (MAX. 5MB each)
              </p>
              <p className="mt-2 text-xs text-muted-foreground/80 text-center">
                Multiple images supported
              </p>
            </div>
          </label>
        )}
        <input
          id="about-page-heading-images-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
