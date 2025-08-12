"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryPage } from "@/components/category/category-page";
import { useOnTheAirTVShows } from "@/lib/hooks/api-hooks";

export default function OnTheAirTVShowsPage() {
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
      onPageChange={setCurrentPage}
    />
  );
}
