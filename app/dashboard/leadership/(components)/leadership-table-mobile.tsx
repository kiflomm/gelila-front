"use client";

import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { Edit, Trash2, Search, User } from "lucide-react";
import type { LeadershipItem } from "@/api/leadership";

interface LeadershipTableMobileProps {
  leadership: LeadershipItem[];
  onEdit: (leadership: LeadershipItem) => void;
  onDelete: (leadership: LeadershipItem) => void;
}

function getImageUrl(photoUrl: string | null | undefined): string {
  if (!photoUrl) return '';
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (photoUrl.startsWith('/uploads')) {
    return `${apiBaseUrl.replace('/api/v1', '')}${photoUrl}`;
  }
  return photoUrl.startsWith('/') ? `${apiBaseUrl}${photoUrl}` : `${apiBaseUrl}/${photoUrl}`;
}

export function LeadershipTableMobile({
  leadership,
  onEdit,
  onDelete,
}: LeadershipTableMobileProps) {
  if (leadership.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="size-6 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground font-medium">
            No leadership persons match your search
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
      {leadership.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
              {item.photoUrl ? (
                <Image
                  src={getImageUrl(item.photoUrl)}
                  alt={item.photoAlt || item.fullName}
                  fill
                  className="object-cover"
                  unoptimized={
                    getImageUrl(item.photoUrl).includes("localhost") ||
                    getImageUrl(item.photoUrl).includes("api.gelilamanufacturingplc.com")
                  }
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector(".photo-fallback");
                      if (fallback) (fallback as HTMLElement).style.display = "flex";
                    }
                  }}
                />
              ) : null}
              <div className={`photo-fallback absolute inset-0 flex items-center justify-center ${item.photoUrl ? 'hidden' : ''}`}>
                <User className="size-8 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base mb-1 text-foreground">
                {item.fullName}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item.officialTitle}
              </p>
              {item.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.bio}
                </p>
              )}
            </div>
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

