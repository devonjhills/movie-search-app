"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryPage } from "@/components/category/category-page";
import { useNowPlayingMovies } from "@/lib/hooks/api-hooks";

export default function NowPlayingMoviesPage() {
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

  const { movies, isLoading, isError, totalPages, totalResults } =
    useNowPlayingMovies(currentPage);

  return (
    <CategoryPage
      title="Now Playing Movies"
      description="Check out the latest movies currently playing in theaters near you."
      mediaType="movie"
      data={movies}
      isLoading={isLoading}
      error={isError}
      totalPages={totalPages}
      totalResults={totalResults}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
