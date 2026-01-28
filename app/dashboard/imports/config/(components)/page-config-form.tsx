"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { type ImportPageConfig, type UpdatePageConfigData } from "@/api/imports";
import { HeroImageUpload } from "./hero-image-upload";
import { Edit2 } from "lucide-react";
import Image from "@/components/ui/image";

const pageConfigSchema = z.object({
  heroTitle: z.string().min(3).max(200).optional(),
  heroSubtitle: z.string().min(10).max(500).optional(),
  heroImages: z.array(z.instanceof(File)).optional(),
  heroImageAlts: z.array(z.string()).optional(),
  commitmentTitle: z.string().min(3).max(200).optional(),
  commitmentDescription: z.string().min(50).max(2000).optional(),
});

type PageConfigFormData = z.infer<typeof pageConfigSchema>;

interface PageConfigFormProps {
  pageConfig: ImportPageConfig | null;
  onSubmit: (data: UpdatePageConfigData) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isSubmitting?: boolean;
}

export function PageConfigForm({
  pageConfig,
  onSubmit,
  onCancel,
  isEditing,
  setIsEditing,
  isSubmitting = false,
}: PageConfigFormProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PageConfigFormData>({
    resolver: zodResolver(pageConfigSchema),
    defaultValues: pageConfig
      ? {
          heroTitle: pageConfig.heroTitle,
          heroSubtitle: pageConfig.heroSubtitle,
          heroImageAlts: pageConfig.heroImages?.map((img) => img.alt) || [],
          commitmentTitle: pageConfig.commitmentTitle,
          commitmentDescription: pageConfig.commitmentDescription,
        }
      : {
          heroImageAlts: [],
        },
  });

  const onSubmitForm = async (data: PageConfigFormData) => {
    const submitData: UpdatePageConfigData = {
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroImages: data.heroImages,
      heroImageAlts: data.heroImageAlts,
      commitmentTitle: data.commitmentTitle,
      commitmentDescription: data.commitmentDescription,
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
            <p className="text-lg font-medium">{pageConfig?.heroTitle || "Not set"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Hero Subtitle</Label>
            <p className="text-muted-foreground">{pageConfig?.heroSubtitle || "Not set"}</p>
          </div>
          {pageConfig?.heroImages && pageConfig.heroImages.length > 0 && (
            <div>
              <Label className="text-muted-foreground">Hero Images ({pageConfig.heroImages.length})</Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl">
                {pageConfig.heroImages.map((img, index) => {
                  const imageUrl = img.url.startsWith('http')
                    ? img.url
                    : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}${img.url}`;
                  return (
                    <div key={index} className="relative h-32 rounded-md overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={img.alt || `Hero image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
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
        <div className="pt-4 border-t">
          <h3 className="text-xl font-semibold mb-4">Commitment Section</h3>
          <div className="space-y-2">
            <div>
              <Label className="text-muted-foreground">Commitment Title</Label>
              <p className="text-lg font-medium">{pageConfig?.commitmentTitle || "Not set"}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Commitment Description</Label>
              <p className="text-muted-foreground">{pageConfig?.commitmentDescription || "Not set"}</p>
            </div>
          </div>
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
            placeholder="e.g., Global Sourcing, Guaranteed Quality"
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
            placeholder="e.g., Your trusted partner in importing premium goods worldwide."
            rows={3}
          />
          {errors.heroSubtitle && (
            <p className="text-sm text-destructive">{errors.heroSubtitle.message}</p>
          )}
        </div>

        <HeroImageUpload
          control={control}
          currentImages={pageConfig?.heroImages || null}
        />
      </div>

      <div className="rounded-2xl bg-muted/20 p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Commitment Section</h2>
        
        <div className="space-y-2">
          <Label htmlFor="commitmentTitle">Commitment Title</Label>
          <Input
            id="commitmentTitle"
            {...register("commitmentTitle")}
            placeholder="e.g., Our Commitment to Global Sourcing Excellence"
          />
          {errors.commitmentTitle && (
            <p className="text-sm text-destructive">{errors.commitmentTitle.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="commitmentDescription">Commitment Description</Label>
          <Textarea
            id="commitmentDescription"
            {...register("commitmentDescription")}
            placeholder="Describe your commitment..."
            rows={6}
          />
          {errors.commitmentDescription && (
            <p className="text-sm text-destructive">{errors.commitmentDescription.message}</p>
          )}
        </div>
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

