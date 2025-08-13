"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface BackNavigationProps {
  fallbackHref?: string;
  fallbackLabel?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  overlay?: boolean;
}

export function BackNavigation({
  fallbackHref = "/",
  fallbackLabel = "Home", // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
  variant = "ghost",
  size = "default",
  overlay = false,
}: BackNavigationProps) {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's browser history to go back to
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      // Fallback to provided href
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      variant={overlay ? "outline" : variant}
      size={size}
      onClick={handleBack}
      className={cn(
        "gap-2",
        overlay &&
          "bg-black/20 backdrop-blur-sm border-white/10 text-white hover:bg-black/30 hover:text-white",
        className,
      )}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="hidden sm:inline">Back</span>
    </Button>
  );
}
