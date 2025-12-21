"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { PageHeadingImageUpload } from "./page-heading-image-upload";
import { StoryImageUpload } from "./story-image-upload";
import type { AboutConfig, UpdateAboutConfigData } from "@/api/about";

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
  // Page Heading state
  const [pageHeadingTitle, setPageHeadingTitle] = useState(
    aboutConfig?.pageHeadingTitle || ""
  );
  const [pageHeadingDescription, setPageHeadingDescription] = useState(
    aboutConfig?.pageHeadingDescription || ""
  );
  const [pageHeadingImage, setPageHeadingImage] = useState<File | null>(null);

  // Story state
  const [storyBadge, setStoryBadge] = useState(aboutConfig?.storyBadge || "");
  const [storyTitle, setStoryTitle] = useState(aboutConfig?.storyTitle || "");
  const [storyContent, setStoryContent] = useState(
    aboutConfig?.storyContent || ""
  );
  const [storyImage, setStoryImage] = useState<File | null>(null);

  // Stats state
  const [statSectorsValue, setStatSectorsValue] = useState(
    aboutConfig?.statSectorsValue || ""
  );
  const [statSectorsLabel, setStatSectorsLabel] = useState(
    aboutConfig?.statSectorsLabel || ""
  );
  const [statEmployeesValue, setStatEmployeesValue] = useState(
    aboutConfig?.statEmployeesValue || ""
  );
  const [statEmployeesLabel, setStatEmployeesLabel] = useState(
    aboutConfig?.statEmployeesLabel || ""
  );
  const [statYearsValue, setStatYearsValue] = useState(
    aboutConfig?.statYearsValue || ""
  );
  const [statYearsLabel, setStatYearsLabel] = useState(
    aboutConfig?.statYearsLabel || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: UpdateAboutConfigData = {
      pageHeadingTitle,
      pageHeadingDescription,
      storyBadge,
      storyTitle,
      storyContent,
      statSectorsValue,
      statSectorsLabel,
      statEmployeesValue,
      statEmployeesLabel,
      statYearsValue,
      statYearsLabel,
    };

    if (pageHeadingImage) {
      data.pageHeadingImage = pageHeadingImage;
    }

    if (storyImage) {
      data.storyImage = storyImage;
    }

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Page Heading Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Page Heading Section</h3>

        <div className="space-y-2">
          <Label htmlFor="pageHeadingTitle">Title *</Label>
          <Input
            id="pageHeadingTitle"
            value={pageHeadingTitle}
            onChange={(e) => setPageHeadingTitle(e.target.value)}
            placeholder="About Gelila Manufacturing"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageHeadingDescription">Description *</Label>
          <Textarea
            id="pageHeadingDescription"
            value={pageHeadingDescription}
            onChange={(e) => setPageHeadingDescription(e.target.value)}
            placeholder="A diversified Ethiopian industrial and service company..."
            rows={4}
            required
          />
        </div>

        <PageHeadingImageUpload
          image={pageHeadingImage}
          setImage={setPageHeadingImage}
          currentImageUrl={aboutConfig?.pageHeadingImageUrl}
        />
      </div>

      {/* Story Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Story Section</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="storyBadge">Badge *</Label>
            <Input
              id="storyBadge"
              value={storyBadge}
              onChange={(e) => setStoryBadge(e.target.value)}
              placeholder="Our Journey"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storyTitle">Title *</Label>
            <Input
              id="storyTitle"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Building Ethiopia's Industrial Legacy"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storyContent">Content *</Label>
          <Textarea
            id="storyContent"
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
            placeholder="Enter story content. Use double line breaks to separate paragraphs..."
            rows={12}
            required
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Tip: Use double line breaks (press Enter twice) to create separate
            paragraphs
          </p>
        </div>

        <StoryImageUpload
          image={storyImage}
          setImage={setStoryImage}
          currentImageUrl={aboutConfig?.storyImageUrl}
        />
      </div>

      {/* Stats Section */}
      <div className="space-y-4 border-t pt-6">
        <h3 className="text-lg font-semibold">Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sectors Stat */}
          <div className="space-y-2">
            <Label htmlFor="statSectorsValue">Sectors Value *</Label>
            <Input
              id="statSectorsValue"
              value={statSectorsValue}
              onChange={(e) => setStatSectorsValue(e.target.value)}
              placeholder="5+"
              required
            />
            <Label htmlFor="statSectorsLabel">Sectors Label *</Label>
            <Input
              id="statSectorsLabel"
              value={statSectorsLabel}
              onChange={(e) => setStatSectorsLabel(e.target.value)}
              placeholder="Sectors"
              required
            />
          </div>

          {/* Employees Stat */}
          <div className="space-y-2">
            <Label htmlFor="statEmployeesValue">Employees Value *</Label>
            <Input
              id="statEmployeesValue"
              value={statEmployeesValue}
              onChange={(e) => setStatEmployeesValue(e.target.value)}
              placeholder="500+"
              required
            />
            <Label htmlFor="statEmployeesLabel">Employees Label *</Label>
            <Input
              id="statEmployeesLabel"
              value={statEmployeesLabel}
              onChange={(e) => setStatEmployeesLabel(e.target.value)}
              placeholder="Employees"
              required
            />
          </div>

          {/* Years Stat */}
          <div className="space-y-2">
            <Label htmlFor="statYearsValue">Years Value *</Label>
            <Input
              id="statYearsValue"
              value={statYearsValue}
              onChange={(e) => setStatYearsValue(e.target.value)}
              placeholder="20+"
              required
            />
            <Label htmlFor="statYearsLabel">Years Label *</Label>
            <Input
              id="statYearsLabel"
              value={statYearsLabel}
              onChange={(e) => setStatYearsLabel(e.target.value)}
              placeholder="Years"
              required
            />
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

