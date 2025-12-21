"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Calendar, ShoppingCart, Building2, Package, FileText, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ordersApi, type QuoteRequest } from "@/api/orders";

interface OrderDetailsDialogProps {
  order: QuoteRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<QuoteRequest["status"] | "">("");

  // Reset selected status when dialog opens/order changes
  if (order && selectedStatus === "") {
    setSelectedStatus(order.status);
  }

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: QuoteRequest["status"] }) =>
      ordersApi.updateQuoteRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated successfully!", {
        description: "An email notification has been sent to the customer.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to update order status", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleUpdateStatus = () => {
    if (!order || !selectedStatus || selectedStatus === order.status) return;
    updateStatusMutation.mutate({ id: order.id, status: selectedStatus });
  };

  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "reviewing":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case "quoted":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      case "completed":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const isStatusChanged = selectedStatus !== order.status;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl">Quote Request #{order.id}</DialogTitle>
            <Badge className={cn("text-xs", getStatusColor(order.status))}>
              {order.status}
            </Badge>
          </div>
          <DialogDescription className="text-sm">
            Quote request from {order.fullName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Update Section */}
          <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Update Order Status</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as QuoteRequest["status"])}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleUpdateStatus}
                disabled={!isStatusChanged || updateStatusMutation.isPending}
                className="sm:w-auto"
              >
                {updateStatusMutation.isPending ? (
                  <>
                    <RefreshCw className="size-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </Button>
            </div>
            {isStatusChanged && (
              <p className="text-xs text-muted-foreground">
                An email notification will be sent to the customer upon status update.
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-[100px]">Full Name:</span>
                <span>{order.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <span className="font-medium min-w-[100px]">Email:</span>
                <a
                  href={`mailto:${order.email}`}
                  className="text-primary hover:underline"
                >
                  {order.email}
                </a>
              </div>
              {order.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-muted-foreground" />
                  <span className="font-medium min-w-[100px]">Phone:</span>
                  <a
                    href={`tel:${order.phone}`}
                    className="text-primary hover:underline"
                  >
                    {order.phone}
                  </a>
                </div>
              )}
              {order.companyName && (
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span className="font-medium min-w-[100px]">Company:</span>
                  <span>{order.companyName}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="font-medium min-w-[100px]">Date:</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Product/Service Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Product/Service Interest</h3>
            </div>
            <div className="rounded-lg bg-muted/30 p-4 text-sm">
              {order.productServiceInterest}
            </div>
          </div>

          {/* Estimated Quantity */}
          {order.estimatedQuantity && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="size-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Estimated Quantity</h3>
              </div>
              <div className="rounded-lg bg-muted/30 p-4 text-sm">
                {order.estimatedQuantity}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Additional Details</h3>
            </div>
            <div className="rounded-lg bg-muted/30 p-4 text-sm whitespace-pre-wrap">
              {order.additionalDetails}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}





