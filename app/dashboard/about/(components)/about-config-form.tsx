"use client";

import { useForm, useFieldArray, type FieldArrayPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, X } from "lucide-react";
import * as z from "zod";
import type { AboutConfig, UpdateAboutConfigData } from "@/api/about";
import { PageHeadingImageUpload } from "./page-heading-image-upload";
import { StoryImageUpload } from "./story-image-upload";

const aboutConfigSchema = z.object({
  pageHeadingTitle: z.string().min(3).max(200),
  pageHeadingDescription: z.string().min(10).max(1000),
  pageHeadingImages: z.array(z.instanceof(File)).optional(),
  pageHeadingImageUrls: z.array(z.string()).optional(),
  pageHeadingImageAlts: z.array(z.string()).optional(),
  storyBadge: z.string().min(2).max(50),
  storyTitle: z.string().min(3).max(200),
  storyContent: z.string().min(50),
  storyImages: z.array(z.instanceof(File)).optional(),
  storyImageUrls: z.array(z.string()).optional(),
  storyImageAlts: z.array(z.string()).optional(),
  statSectorsValue: z.string().min(1).max(20),
  statSectorsLabel: z.string().min(1).max(50),
  statEmployeesValue: z.string().min(1).max(20),
  statEmployeesLabel: z.string().min(1).max(50),
  statYearsValue: z.string().min(1).max(20),
  statYearsLabel: z.string().min(1).max(50),
  visionTitle: z.string().min(1).max(100),
  visionStatements: z.array(z.string().min(1).max(500)).min(1),
  missionTitle: z.string().min(1).max(100),
  missionStatements: z.array(z.string().min(1).max(500)).min(1),
});

type AboutConfigFormData = z.infer<typeof aboutConfigSchema>;

interface AboutConfigFormProps {
  aboutConfig: AboutConfig | null;
  onSubmit: (data: UpdateAboutConfigData) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isSubmitting: boolean;
}

export function AboutConfigForm({
  aboutConfig,
  onSubmit,
  onCancel,
  isSubmitting,
}: AboutConfigFormProps) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<AboutConfigFormData>({
    resolver: zodResolver(aboutConfigSchema),
    defaultValues: aboutConfig
      ? {
          pageHeadingTitle: aboutConfig.pageHeadingTitle,
          pageHeadingDescription: aboutConfig.pageHeadingDescription,
          storyBadge: aboutConfig.storyBadge,
          storyTitle: aboutConfig.storyTitle,
          storyContent: aboutConfig.storyContent,
          statSectorsValue: aboutConfig.statSectorsValue,
          statSectorsLabel: aboutConfig.statSectorsLabel,
          statEmployeesValue: aboutConfig.statEmployeesValue,
          statEmployeesLabel: aboutConfig.statEmployeesLabel,
          statYearsValue: aboutConfig.statYearsValue,
          statYearsLabel: aboutConfig.statYearsLabel,
          visionTitle: aboutConfig.visionTitle || "Vision",
          visionStatements: aboutConfig.visionStatements || [""],
          missionTitle: aboutConfig.missionTitle || "Mission",
          missionStatements: aboutConfig.missionStatements || [""],
        }
      : {
          pageHeadingTitle: "",
          pageHeadingDescription: "",
          storyBadge: "",
          storyTitle: "",
          storyContent: "",
          statSectorsValue: "",
          statSectorsLabel: "",
          statEmployeesValue: "",
          statEmployeesLabel: "",
          statYearsValue: "",
          statYearsLabel: "",
          visionTitle: "Vision",
          visionStatements: [""],
          missionTitle: "Mission",
          missionStatements: [""],
        },
  });

  const {
    fields: visionFields,
    append: appendVision,
    remove: removeVision,
  } = useFieldArray({
    control,
    name: "visionStatements" as FieldArrayPath<AboutConfigFormData>,
  });

  const {
    fields: missionFields,
    append: appendMission,
    remove: removeMission,
  } = useFieldArray({
    control,
    name: "missionStatements" as FieldArrayPath<AboutConfigFormData>,
  });

  const onSubmitHandler = async (data: AboutConfigFormData) => {
    // Ensure pageHeadingImageUrls and pageHeadingImageAlts are sent if images exist
    const pageHeadingImages = data.pageHeadingImages || [];
    const pageHeadingImageUrls = data.pageHeadingImageUrls || [];
    const pageHeadingImageAlts = data.pageHeadingImageAlts || [];
    
    // Ensure storyImageUrls and storyImageAlts are sent if images exist
    const storyImages = data.storyImages || [];
    const storyImageUrls = data.storyImageUrls || [];
    const storyImageAlts = data.storyImageAlts || [];
    
    await onSubmit({
      ...data,
      pageHeadingImages: pageHeadingImages.length > 0 ? pageHeadingImages : undefined,
      pageHeadingImageUrls: pageHeadingImageUrls.length > 0 ? pageHeadingImageUrls : undefined,
      pageHeadingImageAlts: pageHeadingImageAlts.length > 0 ? pageHeadingImageAlts : undefined,
      storyImages: storyImages.length > 0 ? storyImages : undefined,
      storyImageUrls: storyImageUrls.length > 0 ? storyImageUrls : undefined,
      storyImageAlts: storyImageAlts.length > 0 ? storyImageAlts : undefined,
      visionStatements: data.visionStatements.filter((s) => s.trim().length > 0),
      missionStatements: data.missionStatements.filter((s) => s.trim().length > 0),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
      {/* Page Heading Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Page Heading Section</h3>

        <div className="space-y-2">
          <Label htmlFor="pageHeadingTitle">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="pageHeadingTitle"
            {...register("pageHeadingTitle")}
            placeholder="About Gelila Manufacturing"
            className={errors.pageHeadingTitle ? "border-destructive" : ""}
          />
          {errors.pageHeadingTitle && (
            <p className="text-xs text-destructive">
              {errors.pageHeadingTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageHeadingDescription">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="pageHeadingDescription"
            {...register("pageHeadingDescription")}
            placeholder="A diversified Ethiopian industrial and service company..."
            rows={4}
            className={errors.pageHeadingDescription ? "border-destructive" : ""}
          />
          {errors.pageHeadingDescription && (
            <p className="text-xs text-destructive">
              {errors.pageHeadingDescription.message}
            </p>
          )}
        </div>

        <PageHeadingImageUpload
          control={control}
          currentImages={
            aboutConfig?.pageHeadingImageUrls && aboutConfig.pageHeadingImageUrls.length > 0
              ? aboutConfig.pageHeadingImageUrls.map((url, index) => ({
                  url,
                  alt: aboutConfig.pageHeadingImageAlts?.[index] || aboutConfig.pageHeadingTitle || 'Page heading image',
                }))
              : aboutConfig?.pageHeadingImageUrl
              ? [{ url: aboutConfig.pageHeadingImageUrl, alt: aboutConfig.pageHeadingImageAlt || aboutConfig.pageHeadingTitle || 'Page heading image' }]
              : null
          }
        />
      </div>

      {/* Story Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Story Section</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="storyBadge">
              Badge <span className="text-destructive">*</span>
            </Label>
            <Input
              id="storyBadge"
              {...register("storyBadge")}
              placeholder="Our Journey"
              className={errors.storyBadge ? "border-destructive" : ""}
            />
            {errors.storyBadge && (
              <p className="text-xs text-destructive">
                {errors.storyBadge.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="storyTitle">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="storyTitle"
              {...register("storyTitle")}
              placeholder="Building Ethiopia's Industrial Legacy"
              className={errors.storyTitle ? "border-destructive" : ""}
            />
            {errors.storyTitle && (
              <p className="text-xs text-destructive">
                {errors.storyTitle.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storyContent">
            Content <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="storyContent"
            {...register("storyContent")}
            placeholder="Enter story content. Use double line breaks to separate paragraphs..."
            rows={12}
            className={errors.storyContent ? "border-destructive font-mono text-sm" : "font-mono text-sm"}
          />
          {errors.storyContent && (
            <p className="text-xs text-destructive">
              {errors.storyContent.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Tip: Use double line breaks (press Enter twice) to create separate
            paragraphs
          </p>
        </div>

        <StoryImageUpload
          control={control}
          currentImages={
            aboutConfig?.storyImageUrls && aboutConfig.storyImageUrls.length > 0
              ? aboutConfig.storyImageUrls.map((url, index) => ({
                  url,
                  alt: aboutConfig.storyImageAlts?.[index] || aboutConfig.storyTitle || 'Story image',
                }))
              : aboutConfig?.storyImageUrl
              ? [{ url: aboutConfig.storyImageUrl, alt: aboutConfig.storyImageAlt || aboutConfig.storyTitle || 'Story image' }]
              : null
          }
        />
      </div>

      {/* Vision Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Vision Section</h3>

        <div className="space-y-2">
          <Label htmlFor="visionTitle">
            Vision Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="visionTitle"
            {...register("visionTitle")}
            placeholder="Vision"
            className={errors.visionTitle ? "border-destructive" : ""}
          />
          {errors.visionTitle && (
            <p className="text-xs text-destructive">
              {errors.visionTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>
            Vision Statements <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {visionFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Textarea
                  {...register(`visionStatements.${index}` as const)}
                  placeholder="Enter a vision statement..."
                  rows={2}
                  className={
                    errors.visionStatements?.[index]
                      ? "border-destructive flex-1"
                      : "flex-1"
                  }
                />
                {visionFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeVision(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.visionStatements && (
              <p className="text-xs text-destructive">
                {errors.visionStatements.message || "At least one vision statement is required"}
              </p>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendVision("")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vision Statement
            </Button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Mission Section</h3>

        <div className="space-y-2">
          <Label htmlFor="missionTitle">
            Mission Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="missionTitle"
            {...register("missionTitle")}
            placeholder="Mission"
            className={errors.missionTitle ? "border-destructive" : ""}
          />
          {errors.missionTitle && (
            <p className="text-xs text-destructive">
              {errors.missionTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>
            Mission Statements <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-2">
            {missionFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Textarea
                  {...register(`missionStatements.${index}` as const)}
                  placeholder="Enter a mission statement..."
                  rows={2}
                  className={
                    errors.missionStatements?.[index]
                      ? "border-destructive flex-1"
                      : "flex-1"
                  }
                />
                {missionFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeMission(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.missionStatements && (
              <p className="text-xs text-destructive">
                {errors.missionStatements.message || "At least one mission statement is required"}
              </p>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendMission("")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Mission Statement
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sectors Stat */}
          <div className="space-y-2">
            <Label htmlFor="statSectorsValue">
              Sectors Value <span className="text-destructive">*</span>
            </Label>
            <Input
              id="statSectorsValue"
              {...register("statSectorsValue")}
              placeholder="5+"
              className={errors.statSectorsValue ? "border-destructive" : ""}
            />
            {errors.statSectorsValue && (
              <p className="text-xs text-destructive">
                {errors.statSectorsValue.message}
              </p>
            )}
            <Label htmlFor="statSectorsLabel">
              Sectors Label <span className="text-destructive">*</span>
            </Label>
            <Input
              id="statSectorsLabel"
              {...register("statSectorsLabel")}
              placeholder="Sectors"
              className={errors.statSectorsLabel ? "border-destructive" : ""}
            />
            {errors.statSectorsLabel && (
              <p className="text-xs text-destructive">
                {errors.statSectorsLabel.message}
              </p>
            )}
          </div>

          {/* Employees Stat */}
          <div className="space-y-2">
            <Label htmlFor="statEmployeesValue">
              Employees Value <span className="text-destructive">*</span>
            </Label>
            <Input
              id="statEmployeesValue"
              {...register("statEmployeesValue")}
              placeholder="500+"
              className={errors.statEmployeesValue ? "border-destructive" : ""}
            />
            {errors.statEmployeesValue && (
              <p className="text-xs text-destructive">
                {errors.statEmployeesValue.message}
              </p>
            )}
            <Label htmlFor="statEmployeesLabel">
              Employees Label <span className="text-destructive">*</span>
            </Label>
            <Input
              id="statEmployeesLabel"
              {...register("statEmployeesLabel")}
              placeholder="Employees"
              className={errors.statEmployeesLabel ? "border-destructive" : ""}
            />
            {errors.statEmployeesLabel && (
              <p className="text-xs text-destructive">
                {errors.statEmployeesLabel.message}
              </p>
            )}
          </div>

          {/* Years Stat */}
          <div className="space-y-2">
            <Label htmlFor="statYearsValue">
              Years Value <span className="text-destructive">*</span>
            </Label>
            <Input
              id="statYearsValue"
              {...register("statYearsValue")}
              placeholder="20+"
              className={errors.statYearsValue ? "border-destructive" : ""}
            />
            {errors.statYearsValue && (
              <p className="text-xs text-destructive">
                {errors.statYearsValue.message}
              </p>
            )}
            <Label htmlFor="statYearsLabel">
              Years Label <span className="text-destructive">*</span>
            </Label>
            <Input
              id="statYearsLabel"
              {...register("statYearsLabel")}
              placeholder="Years"
              className={errors.statYearsLabel ? "border-destructive" : ""}
            />
            {errors.statYearsLabel && (
              <p className="text-xs text-destructive">
                {errors.statYearsLabel.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 justify-end border-t pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
