"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, MoreHorizontal, Tag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { newsApi, type NewsCategory, type CreateCategoryData, type UpdateCategoryData } from "@/api/news";
import { useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-news";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  slug: z.string().optional(),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoriesSection() {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);

  const { data: categories = [], isLoading } = useAdminCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    formState: { errors: errorsCreate },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const handleCreate = async (data: CategoryFormData) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Category created successfully!");
      setCreateDialogOpen(false);
      resetCreate();
    } catch (error: any) {
      toast.error("Failed to create category", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleEdit = (category: NewsCategory) => {
    setSelectedCategory(category);
    resetEdit({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!selectedCategory) return;
    try {
      await updateMutation.mutateAsync({ id: selectedCategory.id, data });
      toast.success("Category updated successfully!");
      setEditDialogOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      toast.error("Failed to update category", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleDelete = (category: NewsCategory) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteMutation.mutateAsync(selectedCategory.id);
      toast.success("Category deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      toast.error("Failed to delete category", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full max-w-md rounded-2xl" />
        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden md:block rounded-2xl bg-muted/20 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage news categories. Categories cannot be deleted if they have news articles.
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create Category
        </Button>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {categories.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                <Tag className="size-6 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">
                No categories found
              </p>
              <p className="text-sm text-muted-foreground">
                Create your first category!
              </p>
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-sm">
                      {category.name}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-2">
                    {category.slug}
                  </p>
                  {category.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(category)}
                  className="flex-1 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(category)}
                  className="flex-1 h-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                  <span className="text-xs">Name</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%]">
                  <span className="text-xs">Slug</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[40%]">
                  <span className="text-xs">Description</span>
                </TableHead>
                <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%]">
                  <span className="text-xs">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell colSpan={4} className="text-center py-16 border-0">
                    <p className="text-muted-foreground">No categories found. Create your first category!</p>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow
                    key={category.id}
                    className="border-0 hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium py-3 overflow-hidden">
                      <Badge variant="secondary" className="text-xs">
                        {category.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono py-3 overflow-hidden">
                      <span className="truncate block">{category.slug}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground py-3 overflow-hidden">
                      <span className="truncate block">{category.description || "-"}</span>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      {/* Desktop: Show dropdown */}
                      <div className="hidden md:flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 hover:bg-muted"
                            >
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(category)}
                              className="cursor-pointer"
                            >
                              <Edit className="size-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(category)}
                              variant="destructive"
                              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                              <Trash2 className="size-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Add a new news category. Slug will be auto-generated from name if not provided.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitCreate(handleCreate)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                {...registerCreate("name")}
                placeholder="e.g., Press Releases"
                aria-invalid={errorsCreate.name ? "true" : "false"}
              />
              {errorsCreate.name && (
                <p className="text-sm text-destructive">{errorsCreate.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (optional)</Label>
              <Input
                id="slug"
                {...registerCreate("slug")}
                placeholder="Auto-generated from name if not provided"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                {...registerCreate("description")}
                placeholder="Category description"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {selectedCategory && (
        <Dialog
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedCategory(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update the category details. All fields are optional except name.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEdit(handleUpdate)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-name"
                  {...registerEdit("name")}
                  aria-invalid={errorsEdit.name ? "true" : "false"}
                />
                {errorsEdit.name && (
                  <p className="text-sm text-destructive">{errorsEdit.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug (optional)</Label>
                <Input id="edit-slug" {...registerEdit("slug")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (optional)</Label>
                <Textarea
                  id="edit-description"
                  {...registerEdit("description")}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditDialogOpen(false);
                    setSelectedCategory(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Updating..." : "Update Category"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {selectedCategory && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete the category "{selectedCategory.name}". This action will fail if any news articles are using this category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete Category"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

