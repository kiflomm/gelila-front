"use client";

import { useForm, Controller } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { SectorImageUpload } from "./sector-image-upload";
import {
  createSectorSchema,
  updateSectorSchema,
  type SectorFormData,
} from "../schemas/sector-form.schemas";
import type { Sector, CreateSectorData, UpdateSectorData } from "@/api/sectors";

interface SectorFormProps {
  sector?: Sector;
  onSubmit: (data: CreateSectorData | UpdateSectorData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function SectorForm({ sector, onSubmit, onCancel, isSubmitting = false }: SectorFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SectorFormData>({
    resolver: zodResolver(sector ? updateSectorSchema : createSectorSchema),
    defaultValues: sector
      ? {
          name: sector.name,
          title: sector.title,
          slug: sector.slug,
          status: sector.status,
          location: sector.location,
          heroDescription: sector.heroDescription || "",
          description: sector.description || "",
          imageUrl: sector.imageUrl || "",
          imageAlt: sector.imageAlt || "",
          isPublished: sector.isPublished ?? false,
        }
      : {
          status: "operational",
          isPublished: false,
        },
  });

  const onSubmitForm = async (data: SectorFormData) => {
    const submitData: CreateSectorData | UpdateSectorData = {
      name: data.name,
      title: data.title,
      slug: data.slug,
      status: data.status!,
      location: data.location!,
      heroDescription: data.heroDescription,
      description: data.description,
      imageUrl: data.imageUrl,
      imageAlt: data.imageAlt,
      isPublished: data.isPublished,
      image: data.image instanceof File ? data.image : undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                {...field}
                placeholder="e.g., Footwear & Sole Manufacturing"
                aria-invalid={errors.name ? "true" : "false"}
              />
            )}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                {...field}
                placeholder="e.g., Footwear & Sole Manufacturing"
                aria-invalid={errors.title ? "true" : "false"}
              />
            )}
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (optional)</Label>
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input
                id="slug"
                {...field}
                placeholder="Auto-generated from name if not provided"
                aria-invalid={errors.slug ? "true" : "false"}
              />
            )}
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">
            Status <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="status">
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
        <Label htmlFor="location">
          Location <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input
              id="location"
              {...field}
              placeholder="e.g., Addis Ababa"
              aria-invalid={errors.location ? "true" : "false"}
            />
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
              rows={2}
              aria-invalid={errors.heroDescription ? "true" : "false"}
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
              placeholder="Full description of the sector"
              rows={4}
              aria-invalid={errors.description ? "true" : "false"}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <SectorImageUpload
        control={control}
        errors={errors}
        sector={sector}
        isRequired={!sector}
      />

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
          Publish this sector
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : sector ? "Update Sector" : "Create Sector"}
        </Button>
      </div>
    </form>
  );
}

