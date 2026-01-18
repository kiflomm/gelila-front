"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import * as z from "zod";
import { type Import, type CreateImportData } from "@/api/imports";
import { ImportImageUpload } from "./import-image-upload";

const importSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(3).max(100).optional(),
  heroDescription: z.string().min(10, "Hero description must be at least 10 characters").max(500, "Hero description must be less than 500 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  sourceRegion: z.string().min(2, "Source region must be at least 2 characters").max(100, "Source region must be less than 100 characters"),
  status: z.enum(["operational", "planned", "project"]),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
  imageAlts: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).optional(),
  orderIndex: z.number().min(0).optional(),
});

type ImportFormData = z.infer<typeof importSchema>;

interface ImportFormProps {
  importItem?: Import;
  onSubmit: (data: CreateImportData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ImportForm({ importItem, onSubmit, onCancel, isSubmitting = false }: ImportFormProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: importItem
      ? {
          title: importItem.title,
          slug: importItem.slug,
          heroDescription: importItem.heroDescription || "",
          description: importItem.description,
          sourceRegion: importItem.sourceRegion,
          status: importItem.status || "operational",
          imageUrl: importItem.imageUrl || undefined,
          imageAlt: importItem.imageAlt || undefined,
          imageUrls: importItem.imageUrls || undefined,
          imageAlts: importItem.imageAlts || undefined,
          orderIndex: importItem.orderIndex,
        }
      : {
          status: "operational" as const,
          orderIndex: 0,
        },
  });

  const onSubmitForm = async (data: ImportFormData) => {
    const submitData: CreateImportData = {
      ...data,
      images: data.images,
      imageUrls: data.imageUrls,
      imageAlts: data.imageAlts,
      // Ensure imageUrls and imageAlts are always sent if they exist
      ...(importItem && !data.images && !data.imageUrls ? {
        imageUrls: importItem.imageUrls || (importItem.imageUrl ? [importItem.imageUrl] : undefined),
        imageAlts: importItem.imageAlts || (importItem.imageAlt ? [importItem.imageAlt] : undefined),
      } : {}),
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="e.g., Industrial Machinery"
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sourceRegion">
          Source Region <span className="text-destructive">*</span>
        </Label>
        <Input
          id="sourceRegion"
          {...register("sourceRegion")}
          placeholder="e.g., European markets"
          aria-invalid={errors.sourceRegion ? "true" : "false"}
        />
        {errors.sourceRegion && (
          <p className="text-sm text-destructive">{errors.sourceRegion.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">
            Status <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || "operational"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-sm text-destructive">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="heroDescription">
          Hero Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="heroDescription"
          {...register("heroDescription")}
          placeholder="Short description for hero section..."
          rows={3}
          aria-invalid={errors.heroDescription ? "true" : "false"}
        />
        {errors.heroDescription && (
          <p className="text-sm text-destructive">{errors.heroDescription.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe the import item..."
          rows={6}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <ImportImageUpload
        control={control}
        currentImageUrls={importItem?.imageUrls || (importItem?.imageUrl ? [importItem.imageUrl] : null)}
        currentImageAlts={importItem?.imageAlts || (importItem?.imageAlt ? [importItem.imageAlt] : null)}
      />

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : importItem ? "Update Import" : "Create Import"}
        </Button>
      </div>
    </form>
  );
}

