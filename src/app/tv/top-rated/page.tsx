"use client";

import { CategoryPage } from "@/components/category/category-page";
import { useTopRatedTVShows } from "@/lib/hooks/api-hooks";
import { usePaginatedData } from "@/hooks/usePaginatedData";

export default function TopRatedTVShowsPage() {
  const { currentPage, handlePageChange } = usePaginatedData();
  const { tvShows, isLoading, isError, totalPages, totalResults } =
    useTopRatedTVShows(currentPage);

  return (
    <CategoryPage
      title="Top Rated TV Shows"
      description="Explore the highest-rated TV shows of all time, as voted by audiences and critics worldwide."
      mediaType="tv"
      data={tvShows}
      isLoading={isLoading}
      error={isError}
      totalPages={totalPages}
      totalResults={totalResults}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      breadcrumbParent="TV Shows"
      breadcrumbParentHref="/tv"
    />
  );
}
