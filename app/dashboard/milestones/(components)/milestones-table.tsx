"use client";

import { useState } from "react";
import { Search, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MilestonesTableMobile } from "./milestones-table-mobile";
import { MilestonesTableDesktop } from "./milestones-table-desktop";
import type { MilestoneItem } from "@/api/milestones";

interface MilestonesTableProps {
  milestones: MilestoneItem[];
  isLoading: boolean;
  onEdit: (milestone: MilestoneItem) => void;
  onDelete: (milestone: MilestoneItem) => void;
}

export function MilestonesTable({
  milestones,
  isLoading,
  onEdit,
  onDelete,
}: MilestonesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMilestones = milestones.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.year.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
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

  if (milestones.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <Trophy className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No milestones found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first milestone!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          placeholder="Search by year, title, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-20 h-14 rounded-2xl bg-muted/30 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-muted/50 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {filteredMilestones.length} result{filteredMilestones.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <MilestonesTableMobile
          milestones={filteredMilestones}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <MilestonesTableDesktop
          milestones={filteredMilestones}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

