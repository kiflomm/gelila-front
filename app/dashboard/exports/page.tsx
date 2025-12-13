"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExportsTable } from "./(components)/exports-table";
import { CreateExportDialog } from "./(components)/create-export-dialog";
import { EditExportDialog } from "./(components)/edit-export-dialog";
import { DeleteExportDialog } from "./(components)/delete-export-dialog";
import { useAdminExports, useCreateExport, useUpdateExport, useDeleteExport } from "@/hooks/use-exports";
import { type Export, type CreateExportData, type UpdateExportData } from "@/api/exports";

export default function ExportsPage() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExport, setSelectedExport] = useState<Export | null>(null);

  // Fetch all exports for admin
  const { data: exports, isLoading } = useAdminExports();

  // Create mutation
  const createMutation = useCreateExport();

  // Update mutation
  const updateMutation = useUpdateExport();

  // Delete mutation
  const deleteMutation = useDeleteExport();

  const handleCreate = async (data: CreateExportData) => {
    await createMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Export created successfully!");
        setCreateDialogOpen(false);
      },
      onError: (error: any) => {
        toast.error("Failed to create export", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  const handleEdit = (exportItem: Export) => {
    setSelectedExport(exportItem);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateExportData) => {
    if (!selectedExport) return;
    await updateMutation.mutateAsync(
      { id: selectedExport.id, data },
      {
        onSuccess: () => {
          toast.success("Export updated successfully!");
          setEditDialogOpen(false);
          setSelectedExport(null);
        },
        onError: (error: any) => {
          toast.error("Failed to update export", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleDelete = (exportItem: Export) => {
    setSelectedExport(exportItem);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedExport) return;
    await deleteMutation.mutateAsync(selectedExport.id, {
      onSuccess: () => {
        toast.success("Export deleted successfully!");
        setDeleteDialogOpen(false);
        setSelectedExport(null);
      },
      onError: (error: any) => {
        toast.error("Failed to delete export", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Exports</h1>
          <p className="text-muted-foreground mt-1">
            Manage your export portfolio items
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Export
        </Button>
      </div>

      <ExportsTable
        exports={exports || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateExportDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      <EditExportDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        exportItem={selectedExport}
        onSubmit={handleUpdate}
        isSubmitting={updateMutation.isPending}
      />

      <DeleteExportDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        exportItem={selectedExport}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}

