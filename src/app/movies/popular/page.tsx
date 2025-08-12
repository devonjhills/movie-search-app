"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryPage } from "@/components/category/category-page";
import { usePopularMovies } from "@/lib/hooks/api-hooks";

export default function PopularMoviesPage() {
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
    usePopularMovies(currentPage);

  return (
    <CategoryPage
      title="Popular Movies"
      description="Discover the most popular movies trending right now. These are the films everyone's talking about."
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
