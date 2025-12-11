"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor, getTextLength } from "@/components/ui/rich-text-editor";
import { Button } from "@/components/ui/button";
import { useAdminCategories } from "@/hooks/use-news";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import type { NewsItem, CreateNewsData, UpdateNewsData } from "@/api/news";

const createNewsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  slug: z.string().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .refine(
      (html) => getTextLength(html) >= 50,
      "Content must be at least 50 characters (excluding HTML formatting)"
    ),
  categoryId: z.number().min(1, "Category is required"),
  isPublished: z.boolean().optional(),
  image: z.instanceof(File, { message: "Image is required" }),
});

const updateNewsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters").optional(),
  slug: z.string().optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .refine(
      (html) => getTextLength(html) >= 50,
      "Content must be at least 50 characters (excluding HTML formatting)"
    )
    .optional(),
  categoryId: z.number().min(1, "Category is required").optional(),
  isPublished: z.boolean().optional(),
  image: z.instanceof(File).optional(),
});

type NewsFormData = z.infer<typeof createNewsSchema> | z.infer<typeof updateNewsSchema>;

interface NewsFormProps {
  news?: NewsItem;
  onSubmit: (data: CreateNewsData | UpdateNewsData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function NewsForm({ news, onSubmit, onCancel, isSubmitting = false }: NewsFormProps) {
  const { data: categories = [] } = useAdminCategories();
  const user = useAuthStore((state) => state.user);
  const [isDragging, setIsDragging] = useState(false);
  
  // Convert relative image URL to full URL for preview
  const getImagePreviewUrl = (imageUrl: string | null | undefined): string | null => {
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
  };
  
  const [imagePreview, setImagePreview] = useState<string | null>(getImagePreviewUrl(news?.imageUrl));
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate author name from logged-in user
  const authorName = user ? `${user.firstName} ${user.lastName}` : "";

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(news ? updateNewsSchema : createNewsSchema),
    defaultValues: news
      ? {
          title: news.title,
          slug: news.slug,
          content: news.content,
          categoryId: news.categoryId,
          isPublished: news.isPublished ?? false,
        }
      : {
          isPublished: false,
        },
  });

  const imageFile = watch("image");

  // Update preview when file changes
  const handleFileChange = (file: File | undefined) => {
    if (file) {
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue("image", undefined, { shouldValidate: true });
      // Reset to original image URL if editing, otherwise clear preview
      setImagePreview(getImagePreviewUrl(news?.imageUrl));
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

  const handleDrop = (e: React.DragEvent, onChange: (file: File | undefined) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
      onChange(file);
    }
  };

  const handleRemoveImage = (onChange: (file: File | undefined) => void) => {
    handleFileChange(undefined);
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmitForm = async (data: NewsFormData) => {
    const submitData: CreateNewsData | UpdateNewsData = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      categoryId: data.categoryId,
      authorName: authorName,
      isPublished: data.isPublished,
      // Only include image if it's a File instance (new upload)
      // For updates, if no new image is uploaded, don't send image field
      image: data.image instanceof File ? data.image : undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="e.g., Gelila Manufacturing Announces Q3 Production Milestones"
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (optional)</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="Auto-generated from title if not provided"
            aria-invalid={errors.slug ? "true" : "false"}
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">
          Content <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Write the full content of the news article..."
            />
          )}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">
          Category <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-sm text-destructive">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">
          Image {!news && <span className="text-destructive">*</span>}
        </Label>
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
                  (imagePreview || imageFile) && "border-primary"
                )}
              >
                {imagePreview ? (
                  <div className="relative p-4">
                    <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If image fails to load, clear the preview
                          console.error('Failed to load image:', imagePreview);
                          setImagePreview(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(onChange)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-lg z-10"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {imageFile && (
                      <p className="mt-2 text-sm text-muted-foreground text-center">
                        {imageFile.name}
                      </p>
                    )}
                    {news && !imageFile && (
                      <p className="mt-2 text-xs text-muted-foreground text-center">
                        Current image (upload a new image to replace)
                      </p>
                    )}
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
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
                  id="image-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileChange(file);
                      onChange(file);
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
              {news && !imageFile && !imagePreview && (
                <p className="text-sm text-muted-foreground">
                  Current image: {news.imageUrl} (upload a new image to replace)
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="isPublished"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isPublished"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="isPublished" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : news ? "Update News" : "Create News"}
        </Button>
      </div>
    </form>
  );
}

