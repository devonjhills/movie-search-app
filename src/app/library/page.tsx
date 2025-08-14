"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ViewingHistoryItem, WatchStatus } from "@/lib/types";
import { ViewingHistoryGrid } from "@/components/library/viewing-history-grid";
import { ViewingHistoryFilters } from "@/components/library/viewing-history-filters";
import { CurrentlyWatchingSection } from "@/components/library/currently-watching-section";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BackNavigation } from "@/components/ui/back-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function MyLibraryPage() {
  const { user, loading: isLoading } = useAuth();
  const searchParams = useSearchParams();
  const [viewingHistory, setViewingHistory] = useState<ViewingHistoryItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "watching" as WatchStatus | "all",
    mediaType: "all" as "movie" | "tv" | "all",
  });
  const [activeTab, setActiveTab] = useState("watching");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Initialize filters and tab from URL params
  useEffect(() => {
    const statusParam = searchParams?.get("status");
    const mediaTypeParam = searchParams?.get("media_type");
    const tabParam = searchParams?.get("tab");

    // Set initial tab based on URL param
    if (tabParam && ["watching", "all"].includes(tabParam)) {
      setActiveTab(tabParam);
      if (tabParam === "watching") {
        setFilters({ status: "watching", mediaType: "all" });
      } else {
        setFilters({ status: "all", mediaType: "all" });
      }
    } else {
      // Set filters based on URL params if no tab specified
      if (
        statusParam &&
        ["watching", "completed", "plan_to_watch"].includes(statusParam)
      ) {
        setFilters((prev) => ({ ...prev, status: statusParam as WatchStatus }));
        setActiveTab(statusParam === "watching" ? "watching" : "all");
      }

      if (mediaTypeParam && ["movie", "tv"].includes(mediaTypeParam)) {
        setFilters((prev) => ({
          ...prev,
          mediaType: mediaTypeParam as "movie" | "tv",
        }));
      }
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "watching") {
      setFilters({ status: "watching", mediaType: "all" });
    } else {
      setFilters({ status: "all", mediaType: "all" });
    }
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background venetian-blinds">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 pt-6 pb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Breadcrumb items={[{ label: "My Library", current: true }]} />
            <BackNavigation fallbackHref="/" />
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-4xl font-serif font-bold tracking-tight">
              My Library
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your viewing progress, rate movies and shows, and manage
              your personal collection
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 w-full max-w-md h-12 bg-muted/90 backdrop-blur-sm border border-border shadow-sm">
                <TabsTrigger
                  value="watching"
                  className="text-sm font-medium data-[state=active]:bg-background/95 data-[state=active]:backdrop-blur-sm"
                >
                  Currently Watching
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="text-sm font-medium data-[state=active]:bg-background/95 data-[state=active]:backdrop-blur-sm"
                >
                  All Library
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="watching" className="mt-8">
              {error ? (
                <div className="bg-destructive/20 backdrop-blur-sm border border-destructive/30 rounded-lg p-8 text-center shadow-sm">
                  <div className="space-y-3">
                    <p className="text-destructive font-medium">{error}</p>
                    <Button
                      onClick={fetchViewingHistory}
                      variant="outline"
                      size="sm"
                    >
                      Try again
                    </Button>
                  </div>
                </div>
              ) : (
                <CurrentlyWatchingSection
                  items={viewingHistory}
                  loading={loading}
                  onRefresh={fetchViewingHistory}
                />
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-8 space-y-6">
              <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-6 shadow-sm">
                <ViewingHistoryFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              </div>

              {error ? (
                <div className="bg-destructive/20 backdrop-blur-sm border border-destructive/30 rounded-lg p-8 text-center shadow-sm">
                  <div className="space-y-3">
                    <p className="text-destructive font-medium">{error}</p>
                    <Button
                      onClick={fetchViewingHistory}
                      variant="outline"
                      size="sm"
                    >
                      Try again
                    </Button>
                  </div>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
