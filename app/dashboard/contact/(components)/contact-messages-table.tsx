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
      <div className="space-y-4">
        <Skeleton className="h-12 w-full max-w-md rounded-xl" />
        <div className="hidden md:block rounded-lg bg-muted/20 p-3 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
        <div className="md:hidden space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
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
    <div className="space-y-3 sm:space-y-4 min-w-0 max-w-full overflow-x-hidden">
      {/* Search */}
      <div className="relative w-full min-w-0">
        <Input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 rounded-lg bg-background border-border min-w-0 text-sm"
        />
        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground shrink-0" />
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-2">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-lg bg-card border border-border p-3 space-y-2.5 min-w-0"
          >
            <div className="space-y-0.5 min-w-0">
              <h3 className="font-semibold text-sm truncate">{msg.name}</h3>
              <p className="text-xs font-medium text-foreground truncate">{msg.subject}</p>
            </div>

            <div className="space-y-1.5 text-xs min-w-0">
              {msg.email && (
                <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <Mail className="size-3 shrink-0" />
                  <span className="truncate text-xs">{msg.email}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                <Phone className="size-3 shrink-0" />
                <span className="truncate text-xs">{msg.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                <Calendar className="size-3 shrink-0" />
                <span className="truncate text-xs">{formatDate(msg.createdAt)}</span>
              </div>
              <div className="pt-1.5 border-t border-border min-w-0">
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {msg.message}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(msg)}
                className="flex-1 text-xs h-8"
              >
                <Eye className="size-3 mr-1" />
                View
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(msg)}
                className="flex-1 text-xs h-8"
              >
                <Trash2 className="size-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-lg bg-muted/20 p-3 backdrop-blur-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[120px] h-10 text-xs font-medium">Name</TableHead>
              <TableHead className="w-[180px] h-10 text-xs font-medium">Contact</TableHead>
              <TableHead className="h-10 text-xs font-medium">Subject</TableHead>
              <TableHead className="h-10 text-xs font-medium">Message</TableHead>
              <TableHead className="w-[120px] h-10 text-xs font-medium">Date</TableHead>
              <TableHead className="w-[60px] h-10 text-right text-xs font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((msg) => (
              <TableRow
                key={msg.id}
                className="border-border/50 h-12"
              >
                <TableCell className="font-medium text-xs py-2">
                  <div className="truncate">{msg.name}</div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="space-y-0.5">
                    {msg.email && (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                        <Mail className="size-3 shrink-0" />
                        <span className="truncate max-w-[150px]">{msg.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                      <Phone className="size-3 shrink-0" />
                      <span className="truncate max-w-[150px]">{msg.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="truncate text-xs font-medium max-w-[200px]">
                    {msg.subject}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="truncate text-[11px] text-muted-foreground line-clamp-2 max-w-[250px]">
                    {msg.message}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground py-2">
                  <div className="truncate text-[11px]">{formatDate(msg.createdAt)}</div>
                </TableCell>
                <TableCell className="text-right py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MoreVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onView(msg)}>
                        <Eye className="size-4 mr-2" />
                        View Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(msg)}
                        className="text-destructive focus:text-destructive"
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
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            No messages found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}

