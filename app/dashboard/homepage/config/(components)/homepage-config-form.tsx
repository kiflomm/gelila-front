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
import { Edit2 } from "lucide-react";

const homepageConfigSchema = z.object({
  heroTitle: z.string().min(3).max(200).optional(),
  heroSubtitle: z.string().min(10).max(500).optional(),
  heroImages: z.array(z.instanceof(File)).optional(),
  heroImageAlts: z.array(z.string()).optional(),
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
          heroImageAlts: homepageConfig.heroImages?.map((img) => img.alt) || [],
        }
      : {
          heroImageAlts: [],
        },
  });

  const onSubmitForm = async (data: HomepageConfigFormData) => {
    const submitData: UpdateHomepageConfigData = {
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroImages: data.heroImages,
      heroImageAlts: data.heroImageAlts,
    };
    await onSubmit(submitData);
  };

  if (!isEditing) {
    return (
      <div className="rounded-2xl bg-muted/20 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Hero Section</h2>
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
        <div className="space-y-2">
          <div>
            <Label className="text-muted-foreground">Hero Title</Label>
            <p className="text-lg font-medium">{homepageConfig?.heroTitle || "Not set"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Hero Subtitle</Label>
            <p className="text-muted-foreground">{homepageConfig?.heroSubtitle || "Not set"}</p>
          </div>
          {homepageConfig?.heroImages && homepageConfig.heroImages.length > 0 && (
            <div>
              <Label className="text-muted-foreground">Hero Images ({homepageConfig.heroImages.length})</Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl">
                {homepageConfig.heroImages.map((img, index) => {
                  const imageUrl = img.url.startsWith('http')
                    ? img.url
                    : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}${img.url}`;
                  return (
                    <div key={index} className="relative rounded-md overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={img.alt || `Hero image ${index + 1}`}
                        className="w-full h-32 object-cover"
                />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="rounded-2xl bg-muted/20 p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Hero Section</h2>
        
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
          <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
          <Textarea
            id="heroSubtitle"
            {...register("heroSubtitle")}
            placeholder="e.g., A diversified industrial and service company engaged in footwear manufacturing..."
            rows={3}
          />
          {errors.heroSubtitle && (
            <p className="text-sm text-destructive">{errors.heroSubtitle.message}</p>
          )}
        </div>

        <HeroImageUpload
          control={control}
          currentImages={homepageConfig?.heroImages || null}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

