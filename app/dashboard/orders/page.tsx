"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersTable } from "./(components)/orders-table";
import { OrderDetailsDialog } from "./(components)/order-details-dialog";
import { DeleteOrderDialog } from "./(components)/delete-order-dialog";
import { OrdersStats } from "./(components)/orders-stats";
import { ordersApi, type QuoteRequest } from "@/api/orders";

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<QuoteRequest | null>(null);

  // Fetch all quote requests
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["orders", "admin", "all"],
    queryFn: () => ordersApi.getAllQuoteRequests(),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => ordersApi.deleteQuoteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Quote request deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedOrder(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete quote request", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleViewDetails = (order: QuoteRequest) => {
    setSelectedOrder(order);
    setDetailsDialogOpen(true);
  };

  const handleDelete = (order: QuoteRequest) => {
    setSelectedOrder(order);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;
    await deleteMutation.mutateAsync(selectedOrder.id);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (!ordersData?.requests) return null;
    const requests = ordersData.requests;
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const reviewing = requests.filter((r) => r.status === "reviewing").length;
    const quoted = requests.filter((r) => r.status === "quoted").length;

    return {
      total,
      pending,
      reviewing,
      quoted,
    };
  }, [ordersData]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 sm:gap-6 min-w-0 overflow-x-hidden">
        {/* Header Section Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="space-y-0.5 min-w-0">
            <Skeleton className="h-7 sm:h-9 md:h-10 w-48 sm:w-64" />
            <Skeleton className="h-3 sm:h-4 w-72 max-w-full" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-muted/30 p-3 sm:p-4 backdrop-blur-sm">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-7 w-12" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Section Skeleton */}
        <div className="space-y-3 sm:space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="hidden md:block rounded-lg bg-muted/20 p-3 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="space-y-0.5 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Orders Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage and review quote requests from customers
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && <OrdersStats stats={stats} isLoading={isLoading} />}

      {/* Table Section */}
      <div className="space-y-3 sm:space-y-4">
        <OrdersTable
          orders={ordersData?.requests || []}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onDelete={handleDelete}
        />
      </div>

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        order={selectedOrder}
      />

      {/* Delete Dialog */}
      <DeleteOrderDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        order={selectedOrder}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}

