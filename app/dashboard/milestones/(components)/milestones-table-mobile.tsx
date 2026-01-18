"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search } from "lucide-react";
import type { MilestoneItem } from "@/api/milestones";

interface MilestonesTableMobileProps {
  milestones: MilestoneItem[];
  onEdit: (milestone: MilestoneItem) => void;
  onDelete: (milestone: MilestoneItem) => void;
}

export function MilestonesTableMobile({
  milestones,
  onEdit,
  onDelete,
}: MilestonesTableMobileProps) {
  if (milestones.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="size-6 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground font-medium">
            No milestones match your search
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search terms
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {milestones.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                {item.year}
              </span>
              <span className="text-xs text-muted-foreground">
                Order: {item.orderIndex}
              </span>
            </div>
            <h3 className="font-semibold text-base mb-2 text-foreground">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-3 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(item)}
              className="flex-1 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
            >
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(item)}
              className="flex-1 h-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

