"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicationsTable } from "./(components)/applications-table";
import { UpdateStatusDialog } from "./(components)/update-status-dialog";
import { DeleteApplicationDialog } from "./(components)/delete-application-dialog";
import {
  applicationsApi,
  type JobApplication,
  type UpdateApplicationStatusData,
} from "@/api/jobs";

export default function ApplicationsPage() {
  const queryClient = useQueryClient();
  const [updateStatusDialogOpen, setUpdateStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  // Fetch all applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", "all"],
    queryFn: () => applicationsApi.getAllApplications(),
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateApplicationStatusData }) =>
      applicationsApi.updateApplicationStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application status updated successfully!");
      setUpdateStatusDialogOpen(false);
      setSelectedApplication(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update application status", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => applicationsApi.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedApplication(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete application", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleUpdateStatus = (application: JobApplication) => {
    setSelectedApplication(application);
    setUpdateStatusDialogOpen(true);
  };

  const handleStatusSubmit = async (
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
  ) => {
    if (!selectedApplication) return;
    await updateStatusMutation.mutateAsync({
      id: selectedApplication.id,
      data: { status },
    });
  };

  const handleDelete = (application: JobApplication) => {
    setSelectedApplication(application);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedApplication) return;
    await deleteMutation.mutateAsync(selectedApplication.id);
  };

  const handleViewResume = async (application: JobApplication) => {
    try {
      const blob = await applicationsApi.downloadResume(application.id);
      const url = window.URL.createObjectURL(blob);
      
      // Open the resume in a new tab
      window.open(url, '_blank');
      
      // Clean up the URL after a delay (file will still load in the new tab)
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
      
      toast.success("Opening resume...");
    } catch (error: any) {
      toast.error("Failed to open resume", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((app) => app.status === "pending").length;
    const reviewing = applications.filter((app) => app.status === "reviewing").length;
    const accepted = applications.filter((app) => app.status === "accepted").length;
    const rejected = applications.filter((app) => app.status === "rejected").length;

    return {
      total,
      pending,
      reviewing,
      accepted,
      rejected,
    };
  }, [applications]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 sm:gap-6 md:gap-8 min-w-0 max-w-full overflow-x-hidden">
        {/* Header Section Skeleton */}
        <div className="flex flex-col gap-2 sm:gap-4 min-w-0">
          <div className="space-y-1 min-w-0">
            <Skeleton className="h-7 sm:h-9 md:h-11 lg:h-12 w-48 sm:w-64" />
            <Skeleton className="h-3 sm:h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-w-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0 ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="space-y-1 sm:space-y-2">
                <Skeleton className="h-3 sm:h-4 w-16" />
                <Skeleton className="h-6 sm:h-8 md:h-9 w-12" />
                <Skeleton className="h-2.5 sm:h-3 w-24 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Section Skeleton */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <div className="flex items-center justify-between min-w-0">
            <div className="min-w-0">
              <Skeleton className="h-6 sm:h-7 w-40 mb-2" />
              <Skeleton className="h-3 sm:h-4 w-64 hidden sm:block" />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 min-w-0 max-w-full overflow-x-hidden">
            <Skeleton className="h-12 sm:h-14 w-full max-w-md rounded-xl sm:rounded-2xl" />
            {/* Desktop skeleton */}
            <div className="hidden md:block rounded-lg bg-muted/20 p-1 backdrop-blur-sm min-w-0 w-full max-w-full overflow-hidden">
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded" />
                ))}
              </div>
            </div>
            {/* Mobile skeleton */}
            <div className="md:hidden space-y-3 sm:space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl sm:rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6 md:gap-8 min-w-0 max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col gap-2 sm:gap-4 min-w-0">
        <div className="space-y-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Job Applications
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage and review all job applications from candidates
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats.total > 0 && (
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-w-0">
          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Total</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.total}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">All applications</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Pending</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.pending}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">Awaiting review</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Reviewing</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.reviewing}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">In review</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Accepted</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.accepted}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">Accepted candidates</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0 col-span-2 sm:col-span-1">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Rejected</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.rejected}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">Rejected applications</p>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="space-y-4 sm:space-y-6 min-w-0">
        <div className="flex items-center justify-between min-w-0">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">All Applications</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
              View and manage all job applications
            </p>
          </div>
          <Link href="/dashboard/jobs/applications/email-templates">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Manage Email Templates
            </Button>
          </Link>
        </div>

        <ApplicationsTable
          applications={applications}
          isLoading={false}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          onViewResume={handleViewResume}
        />
      </div>

      {/* Update Status Dialog */}
      {selectedApplication && (
        <UpdateStatusDialog
          application={selectedApplication}
          open={updateStatusDialogOpen}
          onOpenChange={(open) => {
            setUpdateStatusDialogOpen(open);
            if (!open) {
              setSelectedApplication(null);
            }
          }}
          onSubmit={handleStatusSubmit}
          isSubmitting={updateStatusMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedApplication && (
        <DeleteApplicationDialog
          application={selectedApplication}
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open);
            if (!open) {
              setSelectedApplication(null);
            }
          }}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

