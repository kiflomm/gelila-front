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
import { type Export, type CreateExportData, type UpdateExportData } from "@/api/exports";
import { ExportImageUpload } from "./export-image-upload";

const exportSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(3).max(100).optional(),
  heroDescription: z.string().min(10, "Hero description must be at least 10 characters").max(500, "Hero description must be less than 500 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  destinationRegion: z.string().min(2, "Destination region must be at least 2 characters").max(100, "Destination region must be less than 100 characters"),
  status: z.enum(["operational", "planned", "project"]),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  orderIndex: z.number().min(0).optional(),
  image: z.instanceof(File).optional(),
});

type ExportFormData = z.infer<typeof exportSchema>;

interface ExportFormProps {
  exportItem?: Export;
  onSubmit: (data: CreateExportData | UpdateExportData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ExportForm({ exportItem, onSubmit, onCancel, isSubmitting = false }: ExportFormProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ExportFormData>({
    resolver: zodResolver(exportSchema),
    defaultValues: exportItem
      ? {
          title: exportItem.title,
          slug: exportItem.slug,
          heroDescription: exportItem.heroDescription || "",
          description: exportItem.description,
          destinationRegion: exportItem.destinationRegion,
          status: exportItem.status || "operational",
          imageUrl: exportItem.imageUrl || undefined,
          imageAlt: exportItem.imageAlt || undefined,
          orderIndex: exportItem.orderIndex,
        }
      : {
          status: "operational" as const,
          orderIndex: 0,
        },
  });

  const onSubmitForm = async (data: ExportFormData) => {
    const submitData: CreateExportData | UpdateExportData = {
      ...data,
      image: data.image instanceof File ? data.image : undefined,
      ...(!(data.image instanceof File) && exportItem ? {
        imageUrl: exportItem.imageUrl || undefined,
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
            placeholder="e.g., Shoes & Sole"
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="e.g., shoes-sole"
            aria-invalid={errors.slug ? "true" : "false"}
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destinationRegion">
          Destination Region <span className="text-destructive">*</span>
        </Label>
        <Input
          id="destinationRegion"
          {...register("destinationRegion")}
          placeholder="e.g., International Markets"
          aria-invalid={errors.destinationRegion ? "true" : "false"}
        />
        {errors.destinationRegion && (
          <p className="text-sm text-destructive">{errors.destinationRegion.message}</p>
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
          placeholder="Describe the export item..."
          rows={6}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <ExportImageUpload
        control={control}
        currentImageUrl={exportItem?.imageUrl}
        currentImageAlt={exportItem?.imageAlt}
      />

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : exportItem ? "Update Export" : "Create Export"}
        </Button>
      </div>
    </form>
  );
}

