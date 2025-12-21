"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import type { AboutConfig, UpdateAboutConfigData } from "@/api/about";
import { PageHeadingImageUpload } from "./page-heading-image-upload";
import { StoryImageUpload } from "./story-image-upload";

const aboutConfigSchema = z.object({
  pageHeadingTitle: z.string().min(3).max(200),
  pageHeadingDescription: z.string().min(10).max(1000),
  pageHeadingImage: z.instanceof(File).optional(),
  storyBadge: z.string().min(2).max(50),
  storyTitle: z.string().min(3).max(200),
  storyContent: z.string().min(50),
  storyImage: z.instanceof(File).optional(),
  statSectorsValue: z.string().min(1).max(20),
  statSectorsLabel: z.string().min(1).max(50),
  statEmployeesValue: z.string().min(1).max(20),
  statEmployeesLabel: z.string().min(1).max(50),
  statYearsValue: z.string().min(1).max(20),
  statYearsLabel: z.string().min(1).max(50),
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
        },
  });

  const onSubmitHandler = async (data: AboutConfigFormData) => {
    await onSubmit(data);
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
          currentImageUrl={aboutConfig?.pageHeadingImageUrl}
          currentImageAlt={aboutConfig?.pageHeadingImageAlt}
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
          currentImageUrl={aboutConfig?.storyImageUrl}
          currentImageAlt={aboutConfig?.storyImageAlt}
        />
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
