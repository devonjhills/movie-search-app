"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryPage } from "@/components/category/category-page";
import { useTopRatedTVShows } from "@/lib/hooks/api-hooks";

export default function TopRatedTVShowsPage() {
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
      onPageChange={setCurrentPage}
    />
  );
}
