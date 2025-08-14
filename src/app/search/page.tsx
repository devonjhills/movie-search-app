import type { Metadata } from "next";
import { SearchPageClient } from "@/components/search/search-page-client";

export const metadata: Metadata = {
  title: "Search - FilmFatale",
  description:
    "Search for movies, TV shows, and people. Discover your next favorite entertainment with FilmFatale's comprehensive search powered by TMDB.",
  keywords:
    "search movies, search TV shows, find films, discover entertainment, movie search, TV search, film database",
};

export default function Search() {
  return <SearchPageClient />;
}
