"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryPage } from "@/components/category/category-page";
import { usePopularTVShows } from "@/lib/hooks/api-hooks";

export default function PopularTVShowsPage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam, 10) : 1,
  );

  // Update page when URL changes
  useEffect(() => {
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (page !== currentPage && page > 0) {
      setCurrentPage(page);
    }
  }, [pageParam, currentPage]);

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
      onPageChange={setCurrentPage}
      breadcrumbParent="TV Shows"
      breadcrumbParentHref="/tv"
    />
  );
}
