"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { ImportsTable } from "./(components)/imports-table";
import { CreateImportDialog } from "./(components)/create-import-dialog";
import { EditImportDialog } from "./(components)/edit-import-dialog";
import { DeleteImportDialog } from "./(components)/delete-import-dialog";
import { useAdminImports, useCreateImport, useUpdateImport, useDeleteImport } from "@/hooks/use-imports";
import { type Import, type CreateImportData, type UpdateImportData } from "@/api/imports";

export default function ImportsPage() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImport, setSelectedImport] = useState<Import | null>(null);

  // Fetch all imports for admin
  const { data: imports, isLoading } = useAdminImports();

  // Create mutation
  const createMutation = useCreateImport();

  // Update mutation
  const updateMutation = useUpdateImport();

  // Delete mutation
  const deleteMutation = useDeleteImport();

  const handleCreate = async (data: CreateImportData) => {
    await createMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Import created successfully!");
        setCreateDialogOpen(false);
      },
      onError: (error: any) => {
        toast.error("Failed to create import", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  const handleEdit = (importItem: Import) => {
    setSelectedImport(importItem);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateImportData) => {
    if (!selectedImport) return;
    await updateMutation.mutateAsync(
      { id: selectedImport.id, data },
      {
        onSuccess: () => {
          toast.success("Import updated successfully!");
          setEditDialogOpen(false);
          setSelectedImport(null);
        },
        onError: (error: any) => {
          toast.error("Failed to update import", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleDelete = (importItem: Import) => {
    setSelectedImport(importItem);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedImport) return;
    await deleteMutation.mutateAsync(selectedImport.id, {
      onSuccess: () => {
        toast.success("Import deleted successfully!");
        setDeleteDialogOpen(false);
        setSelectedImport(null);
      },
      onError: (error: any) => {
        toast.error("Failed to delete import", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Imports</h1>
          <p className="text-muted-foreground mt-1">
            Manage your import portfolio items
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/imports/config">
              <Settings className="mr-2 h-4 w-4" />
              Page Config
            </Link>
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Import
          </Button>
        </div>
      </div>

      <ImportsTable
        imports={imports || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateImportDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      <EditImportDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        importItem={selectedImport}
        onSubmit={handleUpdate}
        isSubmitting={updateMutation.isPending}
      />

      <DeleteImportDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        importItem={selectedImport}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}

