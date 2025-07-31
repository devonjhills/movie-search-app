"use client";

// Removed unused imports
import { useSearchParams } from "next/navigation";
import { SearchPage } from "@/components/search/search-page";

export default function Search() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return <SearchPage initialQuery={initialQuery} />;
}
