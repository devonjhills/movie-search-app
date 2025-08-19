"use client";

import { CategoryPage } from "@/components/category/category-page";
import { useOnTheAirTVShows } from "@/lib/hooks/api-hooks";
import { usePaginatedData } from "@/hooks/usePaginatedData";

export default function OnTheAirTVShowsPage() {
  const { currentPage, handlePageChange } = usePaginatedData();
  const { tvShows, isLoading, isError, totalPages, totalResults } =
    useOnTheAirTVShows(currentPage);

  return (
    <CategoryPage
      title="On The Air TV Shows"
      description="Watch TV shows currently airing new episodes. Stay up-to-date with the latest releases and ongoing series."
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
