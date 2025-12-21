"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface PageHeadingImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  imageAlt: string;
  setImageAlt: (alt: string) => void;
  image: File | null;
  setImage: (file: File | null) => void;
  currentImageUrl?: string | null;
}

export function PageHeadingImageUpload({
  imageUrl,
  setImageUrl,
  imageAlt,
  setImageAlt,
  image,
  setImage,
  currentImageUrl,
}: PageHeadingImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getDisplayImageUrl = () => {
    if (preview) return preview;
    if (currentImageUrl) {
      if (currentImageUrl.startsWith("http")) return currentImageUrl;
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const baseUrl = apiBaseUrl.replace("/api/v1", "");
      return `${baseUrl}${currentImageUrl}`;
    }
    return null;
  };

  const displayImageUrl = getDisplayImageUrl();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Page Heading Image</Label>
        <p className="text-sm text-muted-foreground">
          Upload a new image or provide an external URL
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
        {image && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{image.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Or External URL */}
      <div className="space-y-2">
        <Label htmlFor="pageHeadingImageUrl">Or use external URL</Label>
        <Input
          id="pageHeadingImageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          type="url"
        />
      </div>

      {/* Alt Text */}
      <div className="space-y-2">
        <Label htmlFor="pageHeadingImageAlt">Image Alt Text</Label>
        <Input
          id="pageHeadingImageAlt"
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          placeholder="Description of the image for accessibility"
        />
      </div>

      {/* Image Preview */}
      {displayImageUrl && (
        <div className="space-y-2">
          <Label>Current Image</Label>
          <div className="relative rounded-md overflow-hidden border max-w-2xl">
            <img
              src={displayImageUrl}
              alt={imageAlt || "Page heading preview"}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

