"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { MovieGrid } from "@/components/movie/movie-grid";
import { TVGrid } from "@/components/tv/tv-grid";
import { Pagination } from "@/components/ui/pagination";
import { FormattedMovie } from "@/lib/types";
import type { TVShow } from "@/lib/types";

interface CategoryPageProps {
  title: string;
  description?: string;
  mediaType: "movie" | "tv";
  data: FormattedMovie[] | TVShow[];
  isLoading: boolean;
  error: Error | null;
  totalPages: number;
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function CategoryPage({
  title,
  description,
  mediaType,
  data,
  isLoading,
  error,
  totalPages,
  totalResults,
  currentPage,
  onPageChange,
}: CategoryPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    const search = params.toString();
    const newUrl = search ? `?${search}` : "";
    router.push(newUrl, { scroll: false });
    onPageChange(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Grid */}
        {mediaType === "movie" ? (
          <MovieGrid
            movies={data as FormattedMovie[]}
            isLoading={isLoading}
            error={error}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage={`No ${title.toLowerCase()} available.`}
          />
        ) : (
          <TVGrid
            tvShows={data as TVShow[]}
            isLoading={isLoading}
            error={error}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage={`No ${title.toLowerCase()} available.`}
          />
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={handlePageChange}
            className="pt-8"
          />
        )}
      </div>
    </div>
  );
}
