"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AboutConfigForm } from "./(components)/about-config-form";
import {
  useAboutConfigForAdmin,
  useUpdateAboutConfig,
} from "@/hooks/use-about";
import { type UpdateAboutConfigData } from "@/api/about";

export default function AboutConfigPage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data: aboutConfig, isLoading } = useAboutConfigForAdmin();
  const updateMutation = useUpdateAboutConfig();

  const handleUpdate = async (data: UpdateAboutConfigData) => {
    await updateMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("About page configuration updated successfully!");
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error("Failed to update about page configuration", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            About Page Configuration
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage about page content including page heading, story, and stats
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit About Page
            </Button>
          )}
        </div>
      </div>

      {/* About Form or Info */}
      {isEditing ? (
        <div className="bg-card rounded-lg border p-6">
          <AboutConfigForm
            aboutConfig={aboutConfig ?? null}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={updateMutation.isPending}
          />
        </div>
      ) : (
        <div className="bg-card rounded-lg border p-6 space-y-6">
          {/* Page Heading Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Page Heading Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Title:</span>
                <p className="text-muted-foreground mt-1">
                  {aboutConfig?.pageHeadingTitle || "Not set"}
                </p>
              </div>
              <div>
                <span className="font-medium">Image:</span>
                <p className="text-muted-foreground mt-1">
                  {aboutConfig?.pageHeadingImageUrl ? "Set" : "Not set"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="text-muted-foreground mt-1">
                {aboutConfig?.pageHeadingDescription || "Not set"}
              </p>
            </div>
            {aboutConfig?.pageHeadingImageUrl && (
              <div className="mt-4">
                <span className="font-medium">Image Preview:</span>
                <div className="mt-2 rounded-md overflow-hidden max-w-2xl">
                  <img
                    src={
                      aboutConfig.pageHeadingImageUrl.startsWith("http")
                        ? aboutConfig.pageHeadingImageUrl
                        : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${aboutConfig.pageHeadingImageUrl}`
                    }
                    alt={aboutConfig.pageHeadingImageAlt || "Page heading image"}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Story Section */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Story Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Badge:</span>
                <p className="text-muted-foreground mt-1">
                  {aboutConfig?.storyBadge || "Not set"}
                </p>
              </div>
              <div>
                <span className="font-medium">Title:</span>
                <p className="text-muted-foreground mt-1">
                  {aboutConfig?.storyTitle || "Not set"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Content:</span>
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">
                {aboutConfig?.storyContent || "Not set"}
              </p>
            </div>
            {aboutConfig?.storyImageUrl && (
              <div className="mt-4">
                <span className="font-medium">Image Preview:</span>
                <div className="mt-2 rounded-md overflow-hidden max-w-2xl">
                  <img
                    src={
                      aboutConfig.storyImageUrl.startsWith("http")
                        ? aboutConfig.storyImageUrl
                        : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "")}${aboutConfig.storyImageUrl}`
                    }
                    alt={aboutConfig.storyImageAlt || "Story image"}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border">
                <p className="text-2xl font-bold">
                  {aboutConfig?.statSectorsValue || "5+"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {aboutConfig?.statSectorsLabel || "Sectors"}
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-2xl font-bold">
                  {aboutConfig?.statEmployeesValue || "500+"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {aboutConfig?.statEmployeesLabel || "Employees"}
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-2xl font-bold">
                  {aboutConfig?.statYearsValue || "20+"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {aboutConfig?.statYearsLabel || "Years"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

