"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function BackgroundProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if current page should have venetian blinds background
    const isPersonDetailPage = pathname.startsWith("/person/");
    const isTVSeasonPage = pathname.match(/^\/tv\/[^/]+\/season\/[^/]+/);
    const isMovieDetailPage = pathname.startsWith("/movie/");
    const isTVShowDetailPage = pathname.startsWith("/tv/") && !isTVSeasonPage;

    // Apply venetian blinds class for person pages, TV season pages, and non-detail pages
    const shouldHaveVenetianBlinds =
      isPersonDetailPage ||
      isTVSeasonPage ||
      (!isMovieDetailPage && !isTVShowDetailPage);

    if (shouldHaveVenetianBlinds) {
      document.body.classList.add("venetian-blinds");
    } else {
      document.body.classList.remove("venetian-blinds");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("venetian-blinds");
    };
  }, [pathname]);

  return null;
}
