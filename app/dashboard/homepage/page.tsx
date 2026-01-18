"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Home } from "lucide-react";
import { HomepageConfigForm } from "./(components)/homepage-config-form";
import { useHomepageConfigForAdmin, useUpdateHomepageConfig } from "@/hooks/use-homepage";
import { type UpdateHomepageConfigData } from "@/api/homepage";

export default function HomepageConfigPage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data: homepageConfig, isLoading } = useHomepageConfigForAdmin();
  const updateMutation = useUpdateHomepageConfig();

  const handleUpdate = async (data: UpdateHomepageConfigData) => {
    await updateMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Homepage configuration updated successfully!");
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error("Failed to update homepage configuration", {
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
            Homepage Configuration
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage homepage hero section details
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit Homepage
            </Button>
          )}
        </div>
      </div>

      {/* Homepage Form or Info */}
      {isEditing ? (
        <div className="bg-card rounded-lg border p-6">
          <HomepageConfigForm
            homepageConfig={homepageConfig ?? null}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={updateMutation.isPending}
          />
        </div>
      ) : (
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Hero Section Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Hero Title:</span>
                <p className="text-muted-foreground mt-1">{homepageConfig?.heroTitle || "Not set"}</p>
              </div>
              <div>
                <span className="font-medium">Hero Images:</span>
                <p className="text-muted-foreground mt-1">
                  {homepageConfig?.heroImages && homepageConfig.heroImages.length > 0
                    ? `${homepageConfig.heroImages.length} image(s)`
                    : "Not set"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Hero Subtitle:</span>
              <p className="text-muted-foreground mt-1">{homepageConfig?.heroSubtitle || "Not set"}</p>
            </div>
            {homepageConfig?.heroImages && homepageConfig.heroImages.length > 0 && (
              <div className="mt-4">
                <span className="font-medium">Hero Images Preview:</span>
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
      )}
    </div>
  );
}
