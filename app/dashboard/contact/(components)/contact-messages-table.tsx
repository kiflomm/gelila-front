"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Eye, Trash2, MessageSquare, Mail, Phone, Calendar, MoreVertical } from "lucide-react";
import type { ContactMessage } from "@/api/contact";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContactMessagesTableProps {
  messages: ContactMessage[];
  isLoading: boolean;
  onView: (message: ContactMessage) => void;
  onDelete: (message: ContactMessage) => void;
}

export function ContactMessagesTable({
  messages,
  isLoading,
  onView,
  onDelete,
}: ContactMessagesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredMessages = messages.filter((msg) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(query) ||
      (msg.email && msg.email.toLowerCase().includes(query)) ||
      msg.phone.toLowerCase().includes(query) ||
      msg.subject.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full max-w-md rounded-2xl" />
        <div className="hidden md:block rounded-2xl bg-muted/20 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
        <div className="md:hidden space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-muted/30 flex items-center justify-center mb-4 sm:mb-6">
          <MessageSquare className="size-8 sm:size-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">No messages found</h3>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Contact messages will appear here once visitors submit the contact form.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 min-w-0 max-w-full overflow-x-hidden">
      {/* Search */}
      <div className="relative w-full min-w-0">
        <Input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 sm:pl-10 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-background border-border min-w-0 text-sm sm:text-base"
        />
        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-muted-foreground shrink-0" />
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3 sm:space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-xl sm:rounded-2xl bg-muted/20 p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-sm min-w-0"
          >
            <div className="space-y-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg truncate">{msg.name}</h3>
              <p className="text-xs sm:text-sm font-medium text-foreground truncate">{msg.subject}</p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm min-w-0">
              {msg.email && (
                <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                  <Mail className="size-3.5 sm:size-4 shrink-0" />
                  <span className="truncate">{msg.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                <Phone className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{msg.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                <Calendar className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{formatDate(msg.createdAt)}</span>
              </div>
              <div className="pt-2 border-t border-border min-w-0">
                <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3">
                  {msg.message}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(msg)}
                className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
              >
                View Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(msg)}
                className="h-8 sm:h-9 w-9 sm:w-10 p-0 text-destructive hover:text-destructive"
                title="Delete"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/Tablet Table */}
      <div className="hidden md:block rounded-lg bg-muted/20 p-1 backdrop-blur-sm min-w-0 w-full max-w-full overflow-hidden">
        <Table className="min-w-[800px] lg:min-w-[900px] xl:min-w-full">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold min-w-[120px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Name</TableHead>
              <TableHead className="font-semibold min-w-[180px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Contact</TableHead>
              <TableHead className="font-semibold min-w-[200px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Subject</TableHead>
              <TableHead className="font-semibold min-w-[250px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Message</TableHead>
              <TableHead className="font-semibold min-w-[120px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Date</TableHead>
              <TableHead className="font-semibold text-right min-w-[60px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((msg) => (
              <TableRow
                key={msg.id}
                className="border-border hover:bg-muted/40 transition-colors"
              >
                <TableCell className="font-medium min-w-0 px-2 py-1.5">
                  <div className="truncate text-xs">{msg.name}</div>
                </TableCell>
                <TableCell className="min-w-0 px-2 py-1.5">
                  <div className="space-y-0.5">
                    {msg.email && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                        <Mail className="size-2.5 shrink-0" />
                        <span className="truncate">{msg.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                      <Phone className="size-2.5 shrink-0" />
                      <span className="truncate">{msg.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-0 px-2 py-1.5">
                  <div className="truncate text-xs font-medium">{msg.subject}</div>
                </TableCell>
                <TableCell className="min-w-0 px-2 py-1.5">
                  <div className="truncate text-[11px] text-muted-foreground line-clamp-2">
                    {msg.message}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground min-w-0 px-2 py-1.5">
                  <div className="truncate text-[11px]">{formatDate(msg.createdAt)}</div>
                </TableCell>
                <TableCell className="text-right min-w-0 px-2 py-1.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        <MoreVertical className="size-3.5" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(msg)}>
                        <Eye className="size-4 mr-2" />
                        View Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(msg)}
                        variant="destructive"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMessages.length === 0 && searchQuery && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            No messages found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}

