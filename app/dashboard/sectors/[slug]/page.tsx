"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useAdminSectors, useUpdateSector, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/use-sectors";
import { type Sector, type Product, type UpdateSectorData, type CreateProductData, type UpdateProductData } from "@/api/sectors";
import { SectorForm } from "./(components)/sector-form";
import { ProductsTable } from "./(components)/products-table";
import { CreateProductDialog } from "./(components)/create-product-dialog";
import { EditProductDialog } from "./(components)/edit-product-dialog";
import { DeleteProductDialog } from "./(components)/delete-product-dialog";

export default function SectorPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const queryClient = useQueryClient();
  
  const [isEditingSector, setIsEditingSector] = useState(false);
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);
  const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch all sectors
  const { data: sectors, isLoading } = useAdminSectors();
  const sector = sectors?.find((s) => s.slug === slug);

  // Update sector mutation
  const updateSectorMutation = useUpdateSector();

  // Product mutations
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleUpdateSector = async (data: UpdateSectorData) => {
    if (!sector) return;
    await updateSectorMutation.mutateAsync(
      { id: sector.id, data },
      {
        onSuccess: () => {
          toast.success("Sector updated successfully!");
          setIsEditingSector(false);
        },
        onError: (error: any) => {
          toast.error("Failed to update sector", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleCreateProduct = async (data: CreateProductData) => {
    if (!sector) return;
    await createProductMutation.mutateAsync(
      { sectorId: sector.id, data },
      {
        onSuccess: () => {
          toast.success("Product created successfully!");
          setCreateProductDialogOpen(false);
        },
        onError: (error: any) => {
          toast.error("Failed to create product", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditProductDialogOpen(true);
  };

  const handleUpdateProduct = async (data: UpdateProductData) => {
    if (!sector || !selectedProduct) return;
    await updateProductMutation.mutateAsync(
      { sectorId: sector.id, productId: selectedProduct.id, data },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          setEditProductDialogOpen(false);
          setSelectedProduct(null);
        },
        onError: (error: any) => {
          toast.error("Failed to update product", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteProductDialogOpen(true);
  };

  const handleConfirmDeleteProduct = async () => {
    if (!sector || !selectedProduct) return;
    await deleteProductMutation.mutateAsync(
      { sectorId: sector.id, productId: selectedProduct.id },
      {
        onSuccess: () => {
          toast.success("Product deleted successfully!");
          setDeleteProductDialogOpen(false);
          setSelectedProduct(null);
        },
        onError: (error: any) => {
          toast.error("Failed to delete product", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold mb-2">Sector not found</h3>
        <p className="text-muted-foreground">
          The sector with slug "{slug}" could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {sector.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage sector details and products
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditingSector && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditingSector(true)}
              >
                Edit Sector
              </Button>
              <Button
                onClick={() => setCreateProductDialogOpen(true)}
                size="lg"
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                <Plus className="size-4 mr-2" />
                Add Product
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Sector Form or Info */}
      {isEditingSector ? (
        <div className="bg-card rounded-lg border p-6">
          <SectorForm
            sector={sector}
            onSubmit={handleUpdateSector}
            onCancel={() => setIsEditingSector(false)}
            isSubmitting={updateSectorMutation.isPending}
          />
        </div>
      ) : (
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Sector Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {sector.name}
              </div>
              <div>
                <span className="font-medium">Status:</span> {sector.status}
              </div>
              <div>
                <span className="font-medium">Location:</span> {sector.location}
              </div>
              <div>
                <span className="font-medium">Slug:</span> {sector.slug}
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Hero Description:</span>
              <p className="text-muted-foreground mt-1">{sector.heroDescription}</p>
            </div>
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{sector.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <ProductsTable
          products={sector.products || []}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* Create Product Dialog */}
      <CreateProductDialog
        open={createProductDialogOpen}
        onOpenChange={setCreateProductDialogOpen}
        onSubmit={handleCreateProduct}
        isSubmitting={createProductMutation.isPending}
      />

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <EditProductDialog
          product={selectedProduct}
          open={editProductDialogOpen}
          onOpenChange={(open) => {
            setEditProductDialogOpen(open);
            if (!open) {
              setSelectedProduct(null);
            }
          }}
          onSubmit={handleUpdateProduct}
          isSubmitting={updateProductMutation.isPending}
        />
      )}

      {/* Delete Product Dialog */}
      {selectedProduct && (
        <DeleteProductDialog
          product={selectedProduct}
          open={deleteProductDialogOpen}
          onOpenChange={setDeleteProductDialogOpen}
          onConfirm={handleConfirmDeleteProduct}
          isDeleting={deleteProductMutation.isPending}
        />
      )}
    </div>
  );
}

