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
import { type Sector, type UpdateSectorData } from "@/api/sectors";
import { SectorImageUpload } from "./sector-image-upload";

const updateSectorSchema = z.object({
  name: z.string().min(3).max(200).optional(),
  slug: z.string().optional(),
  title: z.string().min(3).max(200).optional(),
  status: z.enum(["operational", "planned", "project"]).optional(),
  location: z.string().min(2).max(100).optional(),
  heroDescription: z.string().min(10).max(500).optional(),
  description: z.string().min(50).optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  image: z.instanceof(File).optional(),
});

type SectorFormData = z.infer<typeof updateSectorSchema>;

interface SectorFormProps {
  sector: Sector;
  onSubmit: (data: UpdateSectorData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function SectorForm({ sector, onSubmit, onCancel, isSubmitting = false }: SectorFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SectorFormData>({
    resolver: zodResolver(updateSectorSchema),
    defaultValues: {
      name: sector.name,
      slug: sector.slug,
      title: sector.title,
      status: sector.status,
      location: sector.location,
      heroDescription: sector.heroDescription,
      description: sector.description,
      imageUrl: sector.imageUrl || undefined,
      imageAlt: sector.imageAlt || undefined,
    },
  });

  const onSubmitForm = async (data: SectorFormData) => {
    const submitData: UpdateSectorData = {
      ...data,
      // Only include image if it's a new File upload
      image: data.image instanceof File ? data.image : undefined,
      // Always preserve the existing imageUrl if no new image is uploaded
      // This ensures the backend doesn't clear the image
      ...(!(data.image instanceof File) ? {
        imageUrl: sector.imageUrl || undefined,
      } : {}),
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input id="name" {...field} placeholder="Sector name" />
            )}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input id="title" {...field} placeholder="Sector title" />
            )}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input id="slug" {...field} placeholder="sector-slug" />
            )}
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
        <Label htmlFor="location">Location</Label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input id="location" {...field} placeholder="City, Country" />
          )}
        />
        {errors.location && (
          <p className="text-sm text-destructive">{errors.location.message}</p>
        )}
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
              placeholder="Short description for hero section"
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
              placeholder="Full sector description"
              rows={6}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <SectorImageUpload control={control} errors={errors} sector={sector} />

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update Sector"}
        </Button>
      </div>
    </form>
  );
}

