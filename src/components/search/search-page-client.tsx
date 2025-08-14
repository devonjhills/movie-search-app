"use client";

import { useSearchParams } from "next/navigation";
import { BrowsePage } from "@/components/search/browse-page";

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return <BrowsePage initialQuery={initialQuery} />;
}
