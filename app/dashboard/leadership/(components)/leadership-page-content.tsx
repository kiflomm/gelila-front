"use client";

import { LeadershipTable } from "./leadership-table";
import type { LeadershipItem } from "@/api/leadership";

interface LeadershipPageContentProps {
  leadershipData: LeadershipItem[] | undefined;
  isLoading: boolean;
  onEdit: (leadership: LeadershipItem) => void;
  onDelete: (leadership: LeadershipItem) => void;
}

export function LeadershipPageContent({
  leadershipData,
  isLoading,
  onEdit,
  onDelete,
}: LeadershipPageContentProps) {
  return (
    <LeadershipTable
      leadership={leadershipData || []}
      isLoading={isLoading}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

