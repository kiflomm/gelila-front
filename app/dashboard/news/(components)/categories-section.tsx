"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAdminCategories } from "@/hooks/use-news";
import { CategorySkeletons } from "./category-skeletons";
import { CategoriesTable } from "./categories-table";
import { CategoryDialogs } from "./category-dialogs";
import { categorySchema, type CategoryFormData } from "./category-form";
import type { NewsCategory } from "@/api/news";

export function CategoriesSection() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);

  const { data: categories = [], isLoading } = useAdminCategories();

  const {
    reset: resetEdit,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const handleEdit = (category: NewsCategory) => {
    setSelectedCategory(category);
    resetEdit({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (category: NewsCategory) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <CategorySkeletons />;
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

      <CategoriesTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryDialogs
        createDialogOpen={createDialogOpen}
        editDialogOpen={editDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        selectedCategory={selectedCategory}
        onCreateDialogChange={setCreateDialogOpen}
        onEditDialogChange={setEditDialogOpen}
        onDeleteDialogChange={setDeleteDialogOpen}
        onCategorySelect={setSelectedCategory}
        onEditFormReset={(category) => {
          resetEdit({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
          });
        }}
      />
    </div>
  );
}

