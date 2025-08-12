"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ViewingHistoryItem, WatchStatus } from "@/lib/types";
import { ViewingHistoryGrid } from "@/components/library/viewing-history-grid";
import { ViewingHistoryFilters } from "@/components/library/viewing-history-filters";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function MyLibraryPage() {
  const { user, loading: isLoading } = useAuth();
  const searchParams = useSearchParams();
  const [viewingHistory, setViewingHistory] = useState<ViewingHistoryItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "plan_to_watch" as WatchStatus | "all",
    mediaType: "all" as "movie" | "tv" | "all",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Initialize filters from URL params
  useEffect(() => {
    const statusParam = searchParams?.get("status");
    const mediaTypeParam = searchParams?.get("media_type");

    if (
      statusParam &&
      ["watching", "completed", "plan_to_watch"].includes(statusParam)
    ) {
      setFilters((prev) => ({ ...prev, status: statusParam as WatchStatus }));
    }

    if (mediaTypeParam && ["movie", "tv"].includes(mediaTypeParam)) {
      setFilters((prev) => ({
        ...prev,
        mediaType: mediaTypeParam as "movie" | "tv",
      }));
    }
  }, [searchParams]);

  // Redirect if not authenticated
  if (!isLoading && !user) {
    redirect("/signin");
  }

  const fetchViewingHistory = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.status !== "all") params.append("status", filters.status);
      if (filters.mediaType !== "all")
        params.append("media_type", filters.mediaType);
      params.append("page", page.toString());
      params.append("limit", "20");

      const response = await fetch(`/api/viewing-history?${params}`);
      if (!response.ok) throw new Error("Failed to fetch viewing history");

      const data = await response.json();
      setViewingHistory(data.items);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching viewing history:", error);
      setError("Failed to load viewing history");
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.mediaType, page]);

  useEffect(() => {
    if (user) {
      fetchViewingHistory();
    }
  }, [user, filters, page, fetchViewingHistory]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            My Library
          </h1>
          <p className="text-muted-foreground">
            Manage your personal movie and TV show collection
          </p>
        </div>

        <div className="space-y-6">
          <ViewingHistoryFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {error ? (
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <button
                onClick={fetchViewingHistory}
                className="mt-2 text-primary hover:underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <ViewingHistoryGrid
              items={viewingHistory}
              loading={loading}
              onRefresh={fetchViewingHistory}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              mediaTypeFilter={filters.mediaType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
