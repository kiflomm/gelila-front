"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { CategoryForm, categorySchema, type CategoryFormData } from "./category-form";
import type { NewsCategory } from "@/api/news";
import { useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-news";

interface CategoryDialogsProps {
  createDialogOpen: boolean;
  editDialogOpen: boolean;
  deleteDialogOpen: boolean;
  selectedCategory: NewsCategory | null;
  onCreateDialogChange: (open: boolean) => void;
  onEditDialogChange: (open: boolean) => void;
  onDeleteDialogChange: (open: boolean) => void;
  onCategorySelect: (category: NewsCategory | null) => void;
  onEditFormReset?: (category: NewsCategory) => void;
}

export function CategoryDialogs({
  createDialogOpen,
  editDialogOpen,
  deleteDialogOpen,
  selectedCategory,
  onCreateDialogChange,
  onEditDialogChange,
  onDeleteDialogChange,
  onCategorySelect,
  onEditFormReset,
}: CategoryDialogsProps) {
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
      onCreateDialogChange(false);
      resetCreate();
    } catch (error: any) {
      toast.error("Failed to create category", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleUpdate = async (data: CategoryFormData) => {
    if (!selectedCategory) return;
    try {
      await updateMutation.mutateAsync({ id: selectedCategory.id, data });
      toast.success("Category updated successfully!");
      onEditDialogChange(false);
      onCategorySelect(null);
    } catch (error: any) {
      toast.error("Failed to update category", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteMutation.mutateAsync(selectedCategory.id);
      toast.success("Category deleted successfully!");
      onDeleteDialogChange(false);
      onCategorySelect(null);
    } catch (error: any) {
      toast.error("Failed to delete category", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={onCreateDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Add a new news category. Slug will be auto-generated from name if not provided.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            onSubmit={handleCreate}
            onCancel={() => onCreateDialogChange(false)}
            isSubmitting={createMutation.isPending}
            register={registerCreate}
            handleSubmit={handleSubmitCreate}
            errors={errorsCreate}
            formId="create-category"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onCreateDialogChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-category"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {selectedCategory && (
        <Dialog
          open={editDialogOpen}
          onOpenChange={(open) => {
            onEditDialogChange(open);
            if (!open) {
              onCategorySelect(null);
            } else if (onEditFormReset) {
              onEditFormReset(selectedCategory);
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
            <CategoryForm
              category={selectedCategory}
              onSubmit={handleUpdate}
              onCancel={() => {
                onEditDialogChange(false);
                onCategorySelect(null);
              }}
              isSubmitting={updateMutation.isPending}
              register={registerEdit}
              handleSubmit={handleSubmitEdit}
              errors={errorsEdit}
              formId="edit-category"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onEditDialogChange(false);
                  onCategorySelect(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-category"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {selectedCategory && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={onDeleteDialogChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete the category "{selectedCategory.name}". This action will fail if any news articles are using this category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteMutation.isPending}>
                Cancel
              </AlertDialogCancel>
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
    </>
  );
}

