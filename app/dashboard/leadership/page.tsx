"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LeadershipPageContent } from "./(components)/leadership-page-content";
import { CreateLeadershipDialog } from "./(components)/create-leadership-dialog";
import { EditLeadershipDialog } from "./(components)/edit-leadership-dialog";
import { DeleteLeadershipDialog } from "./(components)/delete-leadership-dialog";
import { leadershipApi, type LeadershipItem, type CreateLeadershipData, type UpdateLeadershipData } from "@/api/leadership";

export default function LeadershipPage() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLeadership, setSelectedLeadership] = useState<LeadershipItem | null>(null);

  // Fetch all leadership for admin
  const { data: leadershipData, isLoading } = useQuery({
    queryKey: ["leadership", "admin", "all"],
    queryFn: () => leadershipApi.getAllLeadership(),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateLeadershipData) => leadershipApi.createLeadership(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadership"] });
      toast.success("Leadership person created successfully!");
      setCreateDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Failed to create leadership person", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLeadershipData }) =>
      leadershipApi.updateLeadership(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadership"] });
      toast.success("Leadership person updated successfully!");
      setEditDialogOpen(false);
      setSelectedLeadership(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update leadership person", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => leadershipApi.deleteLeadership(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leadership"] });
      toast.success("Leadership person deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedLeadership(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete leadership person", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleCreate = async (data: CreateLeadershipData | UpdateLeadershipData) => {
    await createMutation.mutateAsync(data as CreateLeadershipData);
  };

  const handleEdit = (leadership: LeadershipItem) => {
    setSelectedLeadership(leadership);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateLeadershipData) => {
    if (!selectedLeadership) return;
    await updateMutation.mutateAsync({ id: selectedLeadership.id, data });
  };

  const handleDelete = (leadership: LeadershipItem) => {
    setSelectedLeadership(leadership);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLeadership) return;
    await deleteMutation.mutateAsync(selectedLeadership.id);
  };

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Leadership Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize leadership persons for your leadership section
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create Leadership Person
        </Button>
      </div>

      <LeadershipPageContent
        leadershipData={leadershipData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <CreateLeadershipDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedLeadership && (
        <EditLeadershipDialog
          leadership={selectedLeadership}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedLeadership(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedLeadership && (
        <DeleteLeadershipDialog
          leadership={selectedLeadership}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

