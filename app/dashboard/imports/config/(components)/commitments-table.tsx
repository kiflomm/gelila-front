"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { type ImportCommitment } from "@/api/imports";

interface CommitmentsTableProps {
  commitments: ImportCommitment[];
  onEdit: (commitment: ImportCommitment) => void;
  onDelete: (commitment: ImportCommitment) => void;
}

export function CommitmentsTable({
  commitments,
  onEdit,
  onDelete,
}: CommitmentsTableProps) {
  if (commitments.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl bg-muted/20">
        <p className="text-muted-foreground">No commitments yet. Add your first commitment!</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-muted/20 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commitments.map((commitment) => (
            <TableRow key={commitment.id}>
              <TableCell className="font-mono text-sm">{commitment.icon}</TableCell>
              <TableCell className="font-medium">{commitment.title}</TableCell>
              <TableCell className="text-muted-foreground max-w-md truncate">
                {commitment.description}
              </TableCell>
              <TableCell>{commitment.orderIndex}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(commitment)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(commitment)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

