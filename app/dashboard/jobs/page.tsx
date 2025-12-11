"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { JobsTable } from "./(components)/jobs-table";
import { CreateJobDialog } from "./(components)/create-job-dialog";
import { EditJobDialog } from "./(components)/edit-job-dialog";
import { DeleteJobDialog } from "./(components)/delete-job-dialog";
import { jobsApi, type Job, type CreateJobData, type UpdateJobData } from "@/api/jobs";
import { cn } from "@/lib/utils";

export default function JobsPage() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Fetch all jobs (including inactive ones for admin)
  const { data: jobsData, isLoading } = useQuery({
    queryKey: ["jobs", "admin"],
    queryFn: async () => {
      // Fetch all jobs with max limit (100 is the maximum allowed)
      // Note: This will only show active jobs due to backend filtering
      // To see inactive jobs, we'd need an admin-specific endpoint
      const response = await jobsApi.getJobs({ limit: 100 });
      return response.jobs;
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateJobData) => jobsApi.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job created successfully!");
      setCreateDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Failed to create job", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateJobData }) =>
      jobsApi.updateJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job updated successfully!");
      setEditDialogOpen(false);
      setSelectedJob(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update job", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => jobsApi.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deactivated successfully!");
      setDeleteDialogOpen(false);
      setSelectedJob(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete job", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleCreate = async (data: CreateJobData | UpdateJobData) => {
    // For create dialog, data will always be CreateJobData (all fields required)
    await createMutation.mutateAsync(data as CreateJobData);
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateJobData) => {
    if (!selectedJob) return;
    await updateMutation.mutateAsync({ id: selectedJob.id, data });
  };

  const handleDelete = (job: Job) => {
    setSelectedJob(job);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedJob) return;
    await deleteMutation.mutateAsync(selectedJob.id);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (!jobsData) return null;
    const activeJobs = jobsData.filter((job) => job.isActive !== false).length;
    const totalJobs = jobsData.length;
    const departments = new Set(jobsData.map((job) => job.department)).size;
    const locations = new Set(jobsData.map((job) => job.location)).size;

    return {
      total: totalJobs,
      active: activeJobs,
      departments,
      locations,
    };
  }, [jobsData]);

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Jobs Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize job postings for your careers page
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create Job
        </Button>
      </div>

      {/* Stats Cards - Borderless */}
      {stats && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">All job postings</p>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
              <p className="text-3xl font-bold">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Currently visible on careers page</p>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Departments</p>
              <p className="text-3xl font-bold">{stats.departments}</p>
              <p className="text-xs text-muted-foreground">Unique departments</p>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Locations</p>
              <p className="text-3xl font-bold">{stats.locations}</p>
              <p className="text-xs text-muted-foreground">Job locations</p>
            </div>
          </div>
        </div>
      )}

      {/* Table Section - Borderless */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Job Postings</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all your job listings in one place
            </p>
          </div>
        </div>
        
        <JobsTable
          jobs={jobsData || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Create Dialog */}
      <CreateJobDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedJob && (
        <EditJobDialog
          job={selectedJob}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedJob(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedJob && (
        <DeleteJobDialog
          job={selectedJob}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

