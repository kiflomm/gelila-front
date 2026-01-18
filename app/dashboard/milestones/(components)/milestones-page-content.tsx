"use client";

import { MilestonesTable } from "./milestones-table";
import type { MilestoneItem } from "@/api/milestones";

interface MilestonesPageContentProps {
  milestonesData: MilestoneItem[] | undefined;
  isLoading: boolean;
  onEdit: (milestone: MilestoneItem) => void;
  onDelete: (milestone: MilestoneItem) => void;
}

export function MilestonesPageContent({
  milestonesData,
  isLoading,
  onEdit,
  onDelete,
}: MilestonesPageContentProps) {
  return (
    <MilestonesTable
      milestones={milestonesData || []}
      isLoading={isLoading}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

