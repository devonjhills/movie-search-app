"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function BackgroundProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if current page should have film noir background
    const isPersonDetailPage = pathname.startsWith("/person/");
    const isTVSeasonPage = pathname.match(/^\/tv\/[^/]+\/season\/[^/]+/);
    const isMovieDetailPage = pathname.startsWith("/movie/");
    const isTVShowDetailPage = pathname.startsWith("/tv/") && !isTVSeasonPage;

    // Apply film noir background class for person pages, TV season pages, and non-detail pages
    const shouldHaveFilmNoirBg =
      isPersonDetailPage ||
      isTVSeasonPage ||
      (!isMovieDetailPage && !isTVShowDetailPage);

    if (shouldHaveFilmNoirBg) {
      document.body.classList.add("film-noir-bg");
    } else {
      document.body.classList.remove("film-noir-bg");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("film-noir-bg");
    };
  }, [pathname]);

  return null;
}
