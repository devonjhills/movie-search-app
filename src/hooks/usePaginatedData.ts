"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationData {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handlePageChange: (page: number) => void;
}

/**
 * Hook for managing pagination state and URL synchronization
 */
export function usePaginatedData(): PaginationData {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    setCurrentPage(page);
    
    // Scroll to top of content area
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
  };
}
