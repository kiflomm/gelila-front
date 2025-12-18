"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import {
  useAdminSocialMedia,
  useAdminSocialMediaSeo,
  useCreateSocialMedia,
  useUpdateSocialMedia,
  useDeleteSocialMedia,
  useUpsertSocialMediaSeo,
} from "@/hooks/use-social-media";
import type {
  SocialMediaLink,
  CreateSocialMediaData,
  UpdateSocialMediaData,
  CreateSocialMediaSeoData,
} from "@/api/social-media";
import { SocialMediaTable } from "./(components)/social-media-table";
import { CreateSocialMediaDialog } from "./(components)/create-social-media-dialog";
import { EditSocialMediaDialog } from "./(components)/edit-social-media-dialog";
import { DeleteSocialMediaDialog } from "./(components)/delete-social-media-dialog";
import { SocialMediaSeoSection } from "./(components)/social-media-seo-section";

export default function SocialMediaPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<SocialMediaLink | null>(null);

  const { data: socialMediaData, isLoading } = useAdminSocialMedia();
  const { data: seoData, isLoading: seoLoading } = useAdminSocialMediaSeo();

  const createMutation = useCreateSocialMedia();
  const updateMutation = useUpdateSocialMedia();
  const deleteMutation = useDeleteSocialMedia();
  const upsertSeoMutation = useUpsertSocialMediaSeo();

  const handleCreate = async (data: CreateSocialMediaData) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Social media link created successfully!");
      setCreateDialogOpen(false);
    } catch (error: any) {
      toast.error("Failed to create social media link", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleEdit = (socialMedia: SocialMediaLink) => {
    setSelectedSocialMedia(socialMedia);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateSocialMediaData) => {
    if (!selectedSocialMedia) return;
    try {
      await updateMutation.mutateAsync({ id: selectedSocialMedia.id, data });
      toast.success("Social media link updated successfully!");
      setEditDialogOpen(false);
      setSelectedSocialMedia(null);
    } catch (error: any) {
      toast.error("Failed to update social media link", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleDelete = (socialMedia: SocialMediaLink) => {
    setSelectedSocialMedia(socialMedia);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSocialMedia) return;
    try {
      await deleteMutation.mutateAsync(selectedSocialMedia.id);
      toast.success("Social media link deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedSocialMedia(null);
    } catch (error: any) {
      toast.error("Failed to delete social media link", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleSeoUpdate = async (data: CreateSocialMediaSeoData) => {
    try {
      await upsertSeoMutation.mutateAsync(data);
      toast.success("SEO social media link updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update SEO social media link", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="size-6 sm:size-7 md:size-8" />
            Social Media Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage social media links displayed on your website
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Add Social Media Link
        </Button>
      </div>

      {/* SEO Section */}
      <SocialMediaSeoSection
        seoData={seoData || []}
        isLoading={seoLoading}
        onUpdate={handleSeoUpdate}
        isSubmitting={upsertSeoMutation.isPending}
      />

      {/* Social Media Links Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Social Media Links</h2>
          <p className="text-sm text-muted-foreground">
            Manage the social media links displayed in the footer and sidebar
          </p>
        </div>
        <SocialMediaTable
          socialMediaData={socialMediaData || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Create Dialog */}
      <CreateSocialMediaDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedSocialMedia && (
        <EditSocialMediaDialog
          socialMedia={selectedSocialMedia}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedSocialMedia(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedSocialMedia && (
        <DeleteSocialMediaDialog
          socialMedia={selectedSocialMedia}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

