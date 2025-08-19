"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function BackgroundProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if current page is a detail page
    const isDetailPage =
      pathname.startsWith("/movie/") ||
      pathname.startsWith("/tv/") ||
      pathname.startsWith("/person/");

    // Apply venetian blinds class for non-detail pages
    if (isDetailPage) {
      document.body.classList.remove("venetian-blinds");
    } else {
      document.body.classList.add("venetian-blinds");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("venetian-blinds");
    };
  }, [pathname]);

  return null;
}
