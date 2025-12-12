"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAdminSectors, useCreateSector, useUpdateSector, useDeleteSector } from "@/hooks/use-sectors";
import { useAdminSectorsData, useAdminSectorsActions } from "@/stores/sectors/admin-sectors-store";
import { SectorsTable } from "./(components)/sectors-table";
import { CreateSectorDialog } from "./(components)/create-sector-dialog";
import { EditSectorDialog } from "./(components)/edit-sector-dialog";
import { DeleteSectorDialog } from "./(components)/delete-sector-dialog";
import type { Sector, CreateSectorData, UpdateSectorData } from "@/api/sectors";

export default function SectorsPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: sectorsData, isLoading } = useAdminSectors();
  const { sectors: storeSectors, selectedSector } = useAdminSectorsData();
  const { setSectors, setSelectedSector, addSector, updateSector, removeSector } = useAdminSectorsActions();
  const createMutation = useCreateSector();
  const updateMutation = useUpdateSector();
  const deleteMutation = useDeleteSector();

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (sectorsData) {
      setSectors(sectorsData);
    }
  }, [sectorsData, setSectors]);

  const handleCreate = async (data: CreateSectorData) => {
    try {
      const newSector = await createMutation.mutateAsync(data);
      addSector(newSector);
      toast.success("Sector created successfully!");
      setCreateDialogOpen(false);
    } catch (error: any) {
      toast.error("Failed to create sector", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleEdit = (sector: Sector) => {
    setSelectedSector(sector);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateSectorData) => {
    if (!selectedSector) return;
    try {
      const updatedSector = await updateMutation.mutateAsync({ id: selectedSector.id, data });
      updateSector(selectedSector.id, updatedSector);
      toast.success("Sector updated successfully!");
      setEditDialogOpen(false);
      setSelectedSector(null);
    } catch (error: any) {
      toast.error("Failed to update sector", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleDelete = (sector: Sector) => {
    setSelectedSector(sector);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSector) return;
    try {
      await deleteMutation.mutateAsync(selectedSector.id);
      removeSector(selectedSector.id);
      toast.success("Sector deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedSector(null);
    } catch (error: any) {
      toast.error("Failed to delete sector", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Sectors Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize sectors for your sectors page
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create Sector
        </Button>
      </div>

      <SectorsTable
        sectors={storeSectors.length > 0 ? storeSectors : (sectorsData || [])}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <CreateSectorDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedSector && (
        <EditSectorDialog
          sector={selectedSector}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedSector(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedSector && (
        <DeleteSectorDialog
          sector={selectedSector}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

