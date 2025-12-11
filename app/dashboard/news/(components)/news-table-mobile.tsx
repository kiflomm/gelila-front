"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/api/news";
import { formatDate } from "@/app/news/[slug]/utils";

interface NewsTableMobileProps {
  news: NewsItem[];
  onEdit: (news: NewsItem) => void;
  onDelete: (news: NewsItem) => void;
}

export function NewsTableMobile({
  news,
  onEdit,
  onDelete,
}: NewsTableMobileProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="size-6 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground font-medium">
            No news articles match your search
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
      {news.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {item.category?.name || "Uncategorized"}
                </Badge>
                <Badge
                  variant={item.isPublished ? "default" : "secondary"}
                  className={cn(
                    "gap-1.5 font-medium border-0 text-xs",
                    item.isPublished
                      ? "bg-green-500/10 text-green-700 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.isPublished ? (
                    <>
                      <CheckCircle2 className="size-3" />
                      Published
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3" />
                      Draft
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Author:</span>
              <span className="truncate">{item.authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Published:</span>
              <span className="truncate">
                {formatDate(item.publishedAt || item.createdAt || "")}
              </span>
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

