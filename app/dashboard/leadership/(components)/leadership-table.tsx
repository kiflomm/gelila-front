"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LeadershipTableMobile } from "./leadership-table-mobile";
import { LeadershipTableDesktop } from "./leadership-table-desktop";
import type { LeadershipItem } from "@/api/leadership";

interface LeadershipTableProps {
  leadership: LeadershipItem[];
  isLoading: boolean;
  onEdit: (leadership: LeadershipItem) => void;
  onDelete: (leadership: LeadershipItem) => void;
}

export function LeadershipTable({
  leadership,
  isLoading,
  onEdit,
  onDelete,
}: LeadershipTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeadership = leadership.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.fullName.toLowerCase().includes(query) ||
      item.officialTitle.toLowerCase().includes(query) ||
      item.bio.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-14 bg-muted/30 rounded-2xl animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted/30 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (leadership.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <Users className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No leadership persons found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first leadership person!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          placeholder="Search by name, title, or bio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-20 h-14 rounded-2xl bg-muted/30 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-muted/50 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {filteredLeadership.length} result{filteredLeadership.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <LeadershipTableMobile
          leadership={filteredLeadership}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <LeadershipTableDesktop
          leadership={filteredLeadership}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

