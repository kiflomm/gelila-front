"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactMessagesTable } from "./(components)/contact-messages-table";
import { ViewMessageDialog } from "./(components)/view-message-dialog";
import { DeleteMessageDialog } from "./(components)/delete-message-dialog";
import {
  contactApi,
  type ContactMessage,
} from "@/api/contact";

export default function ContactMessagesPage() {
  const queryClient = useQueryClient();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  // Fetch all messages
  const { data: messagesData, isLoading } = useQuery({
    queryKey: ["contact-messages", "all"],
    queryFn: () => contactApi.getAllMessages(),
  });

  const messages = messagesData?.messages || [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => contactApi.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      toast.success("Message deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedMessage(null);
    },
    onError: (error: any) => {
      toast.error("Failed to delete message", {
        description: error.response?.data?.message || error.message,
      });
    },
  });

  const handleView = (message: ContactMessage) => {
    setSelectedMessage(message);
    setViewDialogOpen(true);
  };

  const handleDelete = (message: ContactMessage) => {
    setSelectedMessage(message);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMessage) return;
    await deleteMutation.mutateAsync(selectedMessage.id);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = messages.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = messages.filter((msg) => {
      const msgDate = new Date(msg.createdAt);
      msgDate.setHours(0, 0, 0, 0);
      return msgDate.getTime() === today.getTime();
    }).length;
    const thisWeek = messages.filter((msg) => {
      const msgDate = new Date(msg.createdAt);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return msgDate >= weekAgo;
    }).length;
    const thisMonth = messages.filter((msg) => {
      const msgDate = new Date(msg.createdAt);
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return msgDate >= monthAgo;
    }).length;

    return {
      total,
      today: todayCount,
      thisWeek,
      thisMonth,
    };
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 sm:gap-6 md:gap-8 min-w-0 max-w-full overflow-x-hidden">
        {/* Header Section Skeleton */}
        <div className="flex flex-col gap-2 sm:gap-4 min-w-0">
          <div className="space-y-1 min-w-0">
            <Skeleton className="h-7 sm:h-9 md:h-11 lg:h-12 w-48 sm:w-64" />
            <Skeleton className="h-3 sm:h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-4 min-w-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0"
            >
              <div className="space-y-1 sm:space-y-2">
                <Skeleton className="h-3 sm:h-4 w-16" />
                <Skeleton className="h-6 sm:h-8 md:h-9 w-12" />
                <Skeleton className="h-2.5 sm:h-3 w-24 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Section Skeleton */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <div className="flex items-center justify-between min-w-0">
            <div className="min-w-0">
              <Skeleton className="h-6 sm:h-7 w-40 mb-2" />
              <Skeleton className="h-3 sm:h-4 w-64 hidden sm:block" />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 min-w-0 max-w-full overflow-x-hidden">
            <Skeleton className="h-12 sm:h-14 w-full max-w-md rounded-xl sm:rounded-2xl" />
            {/* Desktop skeleton */}
            <div className="hidden md:block rounded-lg bg-muted/20 p-1 backdrop-blur-sm min-w-0 w-full max-w-full overflow-hidden">
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded" />
                ))}
              </div>
            </div>
            {/* Mobile skeleton */}
            <div className="md:hidden space-y-3 sm:space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl sm:rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-6 md:gap-8 min-w-0 max-w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col gap-2 sm:gap-4 min-w-0">
        <div className="space-y-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Contact Messages
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            View and manage all contact messages from visitors
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats.total > 0 && (
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-4 min-w-0">
          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Total</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.total}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">All messages</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">Today</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.today}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">Received today</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">This Week</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.thisWeek}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">Last 7 days</p>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-muted/30 p-3 sm:p-4 md:p-6 backdrop-blur-sm min-w-0">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-muted-foreground truncate">This Month</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.thisMonth}</p>
              <p className="text-[10px] xs:text-xs text-muted-foreground truncate hidden sm:block">Last 30 days</p>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="space-y-4 sm:space-y-6 min-w-0">
        <div className="flex items-center justify-between min-w-0">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">All Messages</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
              View and manage all contact messages
            </p>
          </div>
        </div>

        <ContactMessagesTable
          messages={messages}
          isLoading={false}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>

      {/* View Message Dialog */}
      {selectedMessage && (
        <ViewMessageDialog
          message={selectedMessage}
          open={viewDialogOpen}
          onOpenChange={(open) => {
            setViewDialogOpen(open);
            if (!open) {
              setSelectedMessage(null);
            }
          }}
        />
      )}

      {/* Delete Dialog */}
      {selectedMessage && (
        <DeleteMessageDialog
          message={selectedMessage}
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open);
            if (!open) {
              setSelectedMessage(null);
            }
          }}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}

