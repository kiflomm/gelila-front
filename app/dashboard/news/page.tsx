"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NewsStats } from "./(components)/news-stats";
import { NewsPageContent } from "./(components)/news-page-content";
import { CreateNewsDialog } from "./(components)/create-news-dialog";
import { EditNewsDialog } from "./(components)/edit-news-dialog";
import { DeleteNewsDialog } from "./(components)/delete-news-dialog";
import { newsApi, type NewsItem, type CreateNewsData, type UpdateNewsData } from "@/api/news";
import { calculateNewsStats } from "./utils/news-dashboard.utils";

export default function NewsPage() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Fetch all news for admin
  const { data: newsData, isLoading } = useQuery({
    queryKey: ["news", "admin", "all"],
    queryFn: () => newsApi.getAllNewsForAdmin(),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateNewsData) => newsApi.createNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("News article created successfully!");
      setCreateDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Failed to create news article", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNewsData }) =>
      newsApi.updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("News article updated successfully!");
      setEditDialogOpen(false);
      setSelectedNews(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update news article", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => newsApi.deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("News article deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedNews(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete news article", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleCreate = async (data: CreateNewsData | UpdateNewsData) => {
    await createMutation.mutateAsync(data as CreateNewsData);
  };

  const handleEdit = (news: NewsItem) => {
    setSelectedNews(news);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateNewsData) => {
    if (!selectedNews) return;
    await updateMutation.mutateAsync({ id: selectedNews.id, data });
  };

  const handleDelete = (news: NewsItem) => {
    setSelectedNews(news);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedNews) return;
    await deleteMutation.mutateAsync(selectedNews.id);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (!newsData) return null;
    return calculateNewsStats(newsData);
  }, [newsData]);

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            News Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize news articles for your news page
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create News Article
        </Button>
      </div>

      <NewsStats stats={stats} isLoading={isLoading} />

      <NewsPageContent
        newsData={newsData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <CreateNewsDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedNews && (
        <EditNewsDialog
          news={selectedNews}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedNews(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedNews && (
        <DeleteNewsDialog
          news={selectedNews}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

