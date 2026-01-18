"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageConfigForm } from "./(components)/page-config-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exportsApi, type UpdatePageConfigData } from "@/api/exports";

export default function PageConfigPage() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: pageConfig, isLoading } = useQuery({
    queryKey: ["exports-page-config"],
    queryFn: () => exportsApi.getPageConfigForAdmin(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdatePageConfigData) => exportsApi.updatePageConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports-page-config"] });
      toast.success("Page configuration updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error("Failed to update page configuration", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleUpdate = async (data: UpdatePageConfigData) => {
    await updateMutation.mutateAsync(data);
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
          <Link href="/dashboard/exports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Exports
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Exports Page Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Configure the main exports page hero section
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
    </div>
  );
}

