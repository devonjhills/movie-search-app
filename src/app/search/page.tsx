"use client";

import { useSearchParams } from "next/navigation";
import { BrowsePage } from "@/components/search/browse-page";

export default function Search() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return <BrowsePage initialQuery={initialQuery} />;
}
