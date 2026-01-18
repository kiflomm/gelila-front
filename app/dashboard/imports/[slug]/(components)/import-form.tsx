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
import { type Import, type UpdateImportData } from "@/api/imports";
import { ImportImageUpload } from "./import-image-upload";

const updateImportSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().optional(),
  heroDescription: z.string().min(10).max(500).optional(),
  description: z.string().min(10).optional(),
  sourceRegion: z.string().min(2).max(100).optional(),
  status: z.enum(["operational", "planned", "project"]).optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
  imageAlts: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).optional(),
  orderIndex: z.number().min(0).optional(),
});

type ImportFormData = z.infer<typeof updateImportSchema>;

interface ImportFormProps {
  importItem: Import;
  onSubmit: (data: UpdateImportData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ImportForm({ importItem, onSubmit, onCancel, isSubmitting = false }: ImportFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ImportFormData>({
    resolver: zodResolver(updateImportSchema),
    defaultValues: {
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
    },
  });

  const onSubmitForm = async (data: ImportFormData) => {
    const submitData: UpdateImportData = {
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
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input id="title" {...field} placeholder="Import title" />
            )}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sourceRegion">Source Region</Label>
          <Controller
            name="sourceRegion"
            control={control}
            render={({ field }) => (
              <Input id="sourceRegion" {...field} placeholder="e.g., Europe & Asia" />
            )}
          />
          {errors.sourceRegion && (
            <p className="text-sm text-destructive">{errors.sourceRegion.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
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
        <Label htmlFor="heroDescription">Hero Description</Label>
        <Controller
          name="heroDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              id="heroDescription"
              {...field}
              value={field.value || ""}
              placeholder="Short description for hero section..."
              rows={3}
            />
          )}
        />
        {errors.heroDescription && (
          <p className="text-sm text-destructive">{errors.heroDescription.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              {...field}
              placeholder="Full import description"
              rows={6}
            />
          )}
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

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update Import"}
        </Button>
      </div>
    </form>
  );
}

