"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useAdminImports, useUpdateImport, useCreateImportProduct, useUpdateImportProduct, useDeleteImportProduct } from "@/hooks/use-imports";
import { type Import, type ImportProduct, type UpdateImportData, type CreateImportProductData, type UpdateImportProductData } from "@/api/imports";
import { ImportForm } from "./(components)/import-form";
import { ImportProductsTable } from "./(components)/import-products-table";
import { CreateImportProductDialog } from "./(components)/create-import-product-dialog";
import { EditImportProductDialog } from "./(components)/edit-import-product-dialog";
import { DeleteImportProductDialog } from "./(components)/delete-import-product-dialog";

export default function ImportPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const queryClient = useQueryClient();
  
  const [isEditingImport, setIsEditingImport] = useState(false);
  const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);
  const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ImportProduct | null>(null);

  // Fetch all imports
  const { data: imports, isLoading } = useAdminImports();
  const importItem = imports?.find((i) => i.slug === slug);

  // Update import mutation
  const updateImportMutation = useUpdateImport();

  // Product mutations
  const createProductMutation = useCreateImportProduct();
  const updateProductMutation = useUpdateImportProduct();
  const deleteProductMutation = useDeleteImportProduct();

  const handleUpdateImport = async (data: UpdateImportData) => {
    if (!importItem) return;
    await updateImportMutation.mutateAsync(
      { id: importItem.id, data },
      {
        onSuccess: () => {
          toast.success("Import updated successfully!");
          setIsEditingImport(false);
        },
        onError: (error: any) => {
          toast.error("Failed to update import", {
            description: error.response?.data?.message || error.message,
          });
        },
      }
    );
  };

  const handleCreateProduct = async (data: CreateImportProductData) => {
    if (!importItem) return;
    await createProductMutation.mutateAsync(
      { importId: importItem.id, data },
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

  const handleEditProduct = (product: ImportProduct) => {
    setSelectedProduct(product);
    setEditProductDialogOpen(true);
  };

  const handleUpdateProduct = async (data: UpdateImportProductData) => {
    if (!importItem || !selectedProduct) return;
    await updateProductMutation.mutateAsync(
      { importId: importItem.id, productId: selectedProduct.id, data },
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

  const handleDeleteProduct = (product: ImportProduct) => {
    setSelectedProduct(product);
    setDeleteProductDialogOpen(true);
  };

  const handleConfirmDeleteProduct = async () => {
    if (!importItem || !selectedProduct) return;
    await deleteProductMutation.mutateAsync(
      { importId: importItem.id, productId: selectedProduct.id },
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

  if (!importItem) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold mb-2">Import not found</h3>
        <p className="text-muted-foreground">
          The import with slug "{slug}" could not be found.
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
            {importItem.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage import details
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditingImport && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditingImport(true)}
              >
                Edit Import
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

      {/* Import Form or Info */}
      {isEditingImport ? (
        <div className="bg-card rounded-lg border p-6">
          <ImportForm
            importItem={importItem}
            onSubmit={handleUpdateImport}
            onCancel={() => setIsEditingImport(false)}
            isSubmitting={updateImportMutation.isPending}
          />
        </div>
      ) : (
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Import Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Title:</span> {importItem.title}
              </div>
              <div>
                <span className="font-medium">Source Region:</span> {importItem.sourceRegion}
              </div>
              <div>
                <span className="font-medium">Status:</span> {importItem.status}
              </div>
              <div>
                <span className="font-medium">Slug:</span> {importItem.slug}
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Hero Description:</span>
              <p className="text-muted-foreground mt-1">{importItem.heroDescription}</p>
            </div>
            {(importItem.imageUrls && importItem.imageUrls.length > 0) || importItem.imageUrl ? (
              <div className="mt-4">
                <span className="font-medium">
                  Images ({importItem.imageUrls?.length || (importItem.imageUrl ? 1 : 0)}):
                </span>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(importItem.imageUrls && importItem.imageUrls.length > 0
                    ? importItem.imageUrls
                    : importItem.imageUrl
                    ? [importItem.imageUrl]
                    : []
                  ).map((url: string, index: number) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border bg-muted group">
                      <img
                        src={getImageUrl(url)}
                        alt={importItem.imageAlts?.[index] || importItem.imageAlt || `${importItem.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-4">
              <span className="font-medium">Description:</span>
              <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{importItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <ImportProductsTable
          products={importItem.products || []}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      {/* Create Product Dialog */}
      <CreateImportProductDialog
        open={createProductDialogOpen}
        onOpenChange={setCreateProductDialogOpen}
        onSubmit={handleCreateProduct}
        isSubmitting={createProductMutation.isPending}
      />

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <EditImportProductDialog
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
        <DeleteImportProductDialog
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

