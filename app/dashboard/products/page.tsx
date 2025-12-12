"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAdminProducts, useAdminSectors, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/use-sectors";
import { useAdminSectorsData, useAdminSectorsActions } from "@/stores/sectors/admin-sectors-store";
import { ProductsTable } from "./(components)/products-table";
import { CreateProductDialog } from "./(components)/create-product-dialog";
import { EditProductDialog } from "./(components)/edit-product-dialog";
import { DeleteProductDialog } from "./(components)/delete-product-dialog";
import type { Product, CreateProductData, UpdateProductData } from "@/api/sectors";

export default function ProductsPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: productsData, isLoading } = useAdminProducts();
  const { data: sectorsData } = useAdminSectors();
  const { products: storeProducts, selectedProduct } = useAdminSectorsData();
  const { setProducts, setSelectedProduct, addProduct, updateProduct, removeProduct } = useAdminSectorsActions();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData, setProducts]);

  const handleCreate = async (data: CreateProductData) => {
    try {
      const newProduct = await createMutation.mutateAsync(data);
      addProduct(newProduct);
      toast.success("Product created successfully!");
      setCreateDialogOpen(false);
    } catch (error: any) {
      toast.error("Failed to create product", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleUpdate = async (data: UpdateProductData) => {
    if (!selectedProduct) return;
    try {
      const updatedProduct = await updateMutation.mutateAsync({ id: selectedProduct.id, data });
      updateProduct(selectedProduct.id, updatedProduct);
      toast.success("Product updated successfully!");
      setEditDialogOpen(false);
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error("Failed to update product", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteMutation.mutateAsync(selectedProduct.id);
      removeProduct(selectedProduct.id);
      toast.success("Product deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error("Failed to delete product", {
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
            Products Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize products for your sectors
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          size="lg"
          className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto"
        >
          <Plus className="size-4 mr-2" />
          Create Product
        </Button>
      </div>

      <ProductsTable
        products={storeProducts.length > 0 ? storeProducts : (productsData || [])}
        sectors={sectorsData || []}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create Dialog */}
      <CreateProductDialog
        sectors={sectorsData || []}
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
      />

      {/* Edit Dialog */}
      {selectedProduct && (
        <EditProductDialog
          product={selectedProduct}
          sectors={sectorsData || []}
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) {
              setSelectedProduct(null);
            }
          }}
          onSubmit={handleUpdate}
          isSubmitting={updateMutation.isPending}
        />
      )}

      {/* Delete Dialog */}
      {selectedProduct && (
        <DeleteProductDialog
          product={selectedProduct}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

