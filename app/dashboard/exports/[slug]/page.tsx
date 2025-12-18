"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useAdminExports, useUpdateExport, useCreateExportProduct, useUpdateExportProduct, useDeleteExportProduct } from "@/hooks/use-exports";
import { type Export, type ExportProduct, type UpdateExportData, type CreateExportProductData, type UpdateExportProductData } from "@/api/exports";
import { ExportForm } from "../(components)/export-form";
import { ExportProductsTable } from "./(components)/export-products-table";
import { CreateExportProductDialog } from "./(components)/create-export-product-dialog";
import { EditExportProductDialog } from "./(components)/edit-export-product-dialog";
import { DeleteExportProductDialog } from "./(components)/delete-export-product-dialog";

export default function ExportPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const queryClient = useQueryClient();
  
  const [isEditingExport, setIsEditingExport] = useState(false);
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);
  const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ExportProduct | null>(null);

  // Fetch all exports
  const { data: exports, isLoading } = useAdminExports();
  const exportItem = exports?.find((e) => e.slug === slug);

  // Update export mutation
  const updateExportMutation = useUpdateExport();

  // Product mutations
  const createProductMutation = useCreateExportProduct();
  const updateProductMutation = useUpdateExportProduct();
  const deleteProductMutation = useDeleteExportProduct();

  const handleUpdateExport = async (data: UpdateExportData) => {
    if (!exportItem) return;
    await updateExportMutation.mutateAsync(
      { id: exportItem.id, data },
      {
        onSuccess: () => {
          toast.success("Export updated successfully!");
          setIsEditingExport(false);
        },
        onError: (error: any) => {
          toast.error("Failed to update export", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleCreateProduct = async (data: CreateExportProductData) => {
    if (!exportItem) return;
    await createProductMutation.mutateAsync(
      { exportId: exportItem.id, data },
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

  const handleEditProduct = (product: ExportProduct) => {
    setSelectedProduct(product);
    setEditProductDialogOpen(true);
  };

  const handleUpdateProduct = async (data: UpdateExportProductData) => {
    if (!exportItem || !selectedProduct) return;
    await updateProductMutation.mutateAsync(
      { exportId: exportItem.id, productId: selectedProduct.id, data },
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

  const handleDeleteProduct = (product: ExportProduct) => {
    setSelectedProduct(product);
    setDeleteProductDialogOpen(true);
  };

  const handleConfirmDeleteProduct = async () => {
    if (!exportItem || !selectedProduct) return;
    await deleteProductMutation.mutateAsync(
      { exportId: exportItem.id, productId: selectedProduct.id },
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

  if (!exportItem) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold mb-2">Export not found</h3>
        <p className="text-muted-foreground">
          The export with slug "{slug}" could not be found.
        </p>
      </div>
    );
  }

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanImageUrl}`;
  };

  return (
    <div className="flex flex-1 flex-col gap-8 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {exportItem.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage export details
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditingExport && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditingExport(true)}
              >
                Edit Export
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

      {/* Export Form or Info */}
      {isEditingExport ? (
        <div className="bg-card rounded-lg border p-6">
          <ExportForm
            exportItem={exportItem}
            onSubmit={handleUpdateExport}
            onCancel={() => setIsEditingExport(false)}
            isSubmitting={updateExportMutation.isPending}
          />
        </div>
      ) : (
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Export Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Title:</span> {exportItem.title}
              </div>
              <div>
                <span className="font-medium">Destination Region:</span> {exportItem.destinationRegion}
              </div>
              <div>
                <span className="font-medium">Status:</span> {exportItem.status}
              </div>
              <div>
                <span className="font-medium">Slug:</span> {exportItem.slug}
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Hero Description:</span>
              <p className="text-muted-foreground mt-1">{exportItem.heroDescription}</p>
            </div>
            {exportItem.imageUrl && (
              <div className="mt-4">
                <span className="font-medium">Image:</span>
                <div className="mt-2 relative w-full max-w-md h-64 rounded-lg overflow-hidden border">
                  <img
                    src={getImageUrl(exportItem.imageUrl)}
                    alt={exportItem.imageAlt || exportItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{exportItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <ExportProductsTable
          products={exportItem.products || []}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* Create Product Dialog */}
      <CreateExportProductDialog
        open={createProductDialogOpen}
        onOpenChange={setCreateProductDialogOpen}
        onSubmit={handleCreateProduct}
        isSubmitting={createProductMutation.isPending}
      />

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <EditExportProductDialog
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
        <DeleteExportProductDialog
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

