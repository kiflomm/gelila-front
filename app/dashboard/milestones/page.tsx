"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MilestonesPageContent } from "./(components)/milestones-page-content";
import { CreateMilestoneDialog } from "./(components)/create-milestone-dialog";
import { EditMilestoneDialog } from "./(components)/edit-milestone-dialog";
import { DeleteMilestoneDialog } from "./(components)/delete-milestone-dialog";
import { milestonesApi, type MilestoneItem, type CreateMilestoneData, type UpdateMilestoneData } from "@/api/milestones";

export default function MilestonesPage() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);

  // Fetch all milestones for admin
  const { data: milestonesData, isLoading } = useQuery({
    queryKey: ["milestones", "admin", "all"],
    queryFn: () => milestonesApi.getAllMilestones(),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateMilestoneData) => milestonesApi.createMilestone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      toast.success("Milestone created successfully!");
      setCreateDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Failed to create milestone", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMilestoneData }) =>
      milestonesApi.updateMilestone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      toast.success("Milestone updated successfully!");
      setEditDialogOpen(false);
      setSelectedMilestone(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update milestone", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => milestonesApi.deleteMilestone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      toast.success("Milestone deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedMilestone(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete milestone", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleCreate = async (data: CreateMilestoneData | UpdateMilestoneData) => {
    await createMutation.mutateAsync(data as CreateMilestoneData);
  };

  const handleEdit = (milestone: MilestoneItem) => {
    setSelectedMilestone(milestone);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateMilestoneData) => {
    if (!selectedMilestone) return;
    await updateMutation.mutateAsync({ id: selectedMilestone.id, data });
  };

  const handleDelete = (milestone: MilestoneItem) => {
    setSelectedMilestone(milestone);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMilestone) return;
    await deleteMutation.mutateAsync(selectedMilestone.id);
  };

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Milestones Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize milestones for the Industrial Milestones & Achievements section
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create Milestone
        </Button>
      </div>

      <MilestonesPageContent
        milestonesData={milestonesData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <CreateMilestoneDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedMilestone && (
        <EditMilestoneDialog
          milestone={selectedMilestone}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedMilestone(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedMilestone && (
        <DeleteMilestoneDialog
          milestone={selectedMilestone}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

