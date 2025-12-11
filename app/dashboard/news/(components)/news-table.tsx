"use client";

import { useState } from "react";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NewsTableSkeleton } from "./news-table-skeleton";
import { NewsTableMobile } from "./news-table-mobile";
import { NewsTableDesktop } from "./news-table-desktop";
import type { NewsItem } from "@/api/news";

interface NewsTableProps {
  news: NewsItem[];
  isLoading: boolean;
  onEdit: (news: NewsItem) => void;
  onDelete: (news: NewsItem) => void;
}

export function NewsTable({
  news,
  isLoading,
  onEdit,
  onDelete,
}: NewsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = news.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category?.name.toLowerCase().includes(query) ||
      item.authorName.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return <NewsTableSkeleton />;
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <FileText className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No news articles found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first news article!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          placeholder="Search by title, description, category, or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-20 h-14 rounded-2xl bg-muted/30 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-muted/50 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {filteredNews.length} result{filteredNews.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <NewsTableMobile
          news={filteredNews}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <NewsTableDesktop
          news={filteredNews}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

