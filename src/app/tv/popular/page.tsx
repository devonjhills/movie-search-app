"use client";

import { CategoryPage } from "@/components/category/category-page";
import { usePopularTVShows } from "@/lib/hooks/api-hooks";
import { usePaginatedData } from "@/hooks/usePaginatedData";

export default function PopularTVShowsPage() {
  const { currentPage, handlePageChange } = usePaginatedData();
  const { tvShows, isLoading, isError, totalPages, totalResults } =
    usePopularTVShows(currentPage);

  return (
    <CategoryPage
      title="Popular TV Shows"
      description="Discover the most popular TV shows trending right now. These are the series everyone's binge-watching."
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
