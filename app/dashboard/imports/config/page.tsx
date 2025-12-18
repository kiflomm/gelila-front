"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageConfigForm } from "./(components)/page-config-form";
import { CommitmentsSection } from "./(components)/commitments-section";
import { usePageConfig, useUpdatePageConfig } from "@/hooks/use-imports";
import { type UpdatePageConfigData } from "@/api/imports";

export default function PageConfigPage() {
  const [isEditing, setIsEditing] = useState(false);

  const { data: pageConfig, isLoading } = usePageConfig();
  const updateMutation = useUpdatePageConfig();

  const handleUpdate = async (data: UpdatePageConfigData) => {
    await updateMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Page configuration updated successfully!");
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error("Failed to update page configuration", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-96 w-full bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard/imports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Imports
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Imports Page Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure the main imports page hero section and commitments
          </p>
        </div>
      </div>

      <PageConfigForm
        pageConfig={pageConfig ?? null}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isSubmitting={updateMutation.isPending}
      />

      {pageConfig && (
        <CommitmentsSection
          pageConfigId={pageConfig.id}
          commitments={pageConfig.commitments}
        />
      )}
    </div>
  );
}

