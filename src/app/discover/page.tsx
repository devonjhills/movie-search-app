"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Discover() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/search");
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to Browse...</p>
      </div>
    </div>
  );
}
