"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { type HomepageConfig, type UpdateHomepageConfigData } from "@/api/homepage";
import { HeroImageUpload } from "./hero-image-upload";

const homepageConfigSchema = z.object({
  heroTitle: z.string().min(3).max(200).optional(),
  heroSubtitle: z.string().min(10).max(500).optional(),
  heroImageUrl: z.string().optional(),
  heroImageAlt: z.string().optional(),
  heroImage: z.instanceof(File).optional(),
});

type HomepageConfigFormData = z.infer<typeof homepageConfigSchema>;

interface HomepageConfigFormProps {
  homepageConfig: HomepageConfig | null;
  onSubmit: (data: UpdateHomepageConfigData) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isSubmitting?: boolean;
}

export function HomepageConfigForm({
  homepageConfig,
  onSubmit,
  onCancel,
  isEditing,
  setIsEditing,
  isSubmitting = false,
}: HomepageConfigFormProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<HomepageConfigFormData>({
    resolver: zodResolver(homepageConfigSchema),
    defaultValues: homepageConfig
      ? {
          heroTitle: homepageConfig.heroTitle,
          heroSubtitle: homepageConfig.heroSubtitle,
          heroImageUrl: homepageConfig.heroImageUrl || undefined,
          heroImageAlt: homepageConfig.heroImageAlt || undefined,
        }
      : {},
  });

  const onSubmitForm = async (data: HomepageConfigFormData) => {
    const submitData: UpdateHomepageConfigData = {
      ...data,
      heroImage: data.heroImage instanceof File ? data.heroImage : undefined,
      ...(!(data.heroImage instanceof File) && homepageConfig ? {
        heroImageUrl: homepageConfig.heroImageUrl || undefined,
      } : {}),
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heroTitle">Hero Title</Label>
          <Input
            id="heroTitle"
            {...register("heroTitle")}
            placeholder="e.g., Leading Ethiopian Industrial Group"
          />
          {errors.heroTitle && (
            <p className="text-sm text-destructive">{errors.heroTitle.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroImageAlt">Hero Image Alt Text</Label>
          <Input
            id="heroImageAlt"
            {...register("heroImageAlt")}
            placeholder="Descriptive alt text for accessibility"
          />
          {errors.heroImageAlt && (
            <p className="text-sm text-destructive">{errors.heroImageAlt.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
        <Textarea
          id="heroSubtitle"
          {...register("heroSubtitle")}
          placeholder="e.g., A diversified industrial and service company engaged in footwear manufacturing..."
          rows={4}
        />
        {errors.heroSubtitle && (
          <p className="text-sm text-destructive">{errors.heroSubtitle.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <HeroImageUpload
          control={control}
          currentImageUrl={homepageConfig?.heroImageUrl}
          currentImageAlt={homepageConfig?.heroImageAlt}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
