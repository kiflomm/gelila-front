"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CommitmentsTable } from "./commitments-table";
import { CreateCommitmentDialog } from "./create-commitment-dialog";
import { EditCommitmentDialog } from "./edit-commitment-dialog";
import { DeleteCommitmentDialog } from "./delete-commitment-dialog";
import { useCreateCommitment, useUpdateCommitment, useDeleteCommitment } from "@/hooks/use-imports";
import { type ImportCommitment, type CreateCommitmentData, type UpdateCommitmentData } from "@/api/imports";

interface CommitmentsSectionProps {
  pageConfigId: number;
  commitments: ImportCommitment[];
}

export function CommitmentsSection({
  pageConfigId,
  commitments,
}: CommitmentsSectionProps) {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommitment, setSelectedCommitment] = useState<ImportCommitment | null>(null);

  const createMutation = useCreateCommitment();
  const updateMutation = useUpdateCommitment();
  const deleteMutation = useDeleteCommitment();

  const handleCreate = async (data: CreateCommitmentData) => {
    await createMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Commitment created successfully!");
        setCreateDialogOpen(false);
      },
      onError: (error: any) => {
        toast.error("Failed to create commitment", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  const handleEdit = (commitment: ImportCommitment) => {
    setSelectedCommitment(commitment);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateCommitmentData) => {
    if (!selectedCommitment) return;
    await updateMutation.mutateAsync(
      { id: selectedCommitment.id, data },
      {
        onSuccess: () => {
          toast.success("Commitment updated successfully!");
          setEditDialogOpen(false);
          setSelectedCommitment(null);
        },
        onError: (error: any) => {
          toast.error("Failed to update commitment", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleDelete = (commitment: ImportCommitment) => {
    setSelectedCommitment(commitment);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCommitment) return;
    await deleteMutation.mutateAsync(selectedCommitment.id, {
      onSuccess: () => {
        toast.success("Commitment deleted successfully!");
        setDeleteDialogOpen(false);
        setSelectedCommitment(null);
      },
      onError: (error: any) => {
        toast.error("Failed to delete commitment", {
          description: error.response?.data?.message || error.message,
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Commitments</h2>
          <p className="text-muted-foreground text-sm">
            Manage the commitment items displayed in the accordion section
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Commitment
        </Button>
      </div>

      <CommitmentsTable
        commitments={commitments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateCommitmentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      <EditCommitmentDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        commitment={selectedCommitment}
        onSubmit={handleUpdate}
        isSubmitting={updateMutation.isPending}
      />

      <DeleteCommitmentDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        commitment={selectedCommitment}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}

