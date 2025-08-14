"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { WatchProviderRegion, WatchProvider } from "@/lib/types";

interface WatchProvidersProps {
  providers?: WatchProviderRegion;
  className?: string;
}

const ProviderLogo = ({
  provider,
  onClick,
}: {
  provider: WatchProvider;
  onClick?: () => void;
}) => (
  <div
    className={cn(
      "relative w-16 h-16 rounded-2xl overflow-hidden",
      "bg-white dark:bg-gray-900 shadow-md",
      "hover:scale-105 hover:shadow-lg",
      "transition-all duration-300 ease-out",
      onClick && "cursor-pointer",
    )}
    onClick={onClick}
    title={provider.provider_name}
  >
    <div className="absolute inset-0 p-2">
      <Image
        src={getImageUrl(provider.logo_path, "logo", "w300")}
        alt={provider.provider_name}
        fill
        className="object-contain"
        sizes="64px"
        quality={95}
      />
    </div>
  </div>
);

const ProviderSection = ({
  title,
  providers,
  onProviderClick,
}: {
  title: string;
  providers: WatchProvider[];
  onProviderClick?: (provider: WatchProvider) => void;
}) => {
  const getTitle = (title: string) => {
    switch (title.toLowerCase()) {
      case "stream":
        return "Streaming now on";
      case "free with ads":
        return "Free with ads on";
      case "buy":
        return "Buy on";
      case "rent":
        return "Rent on";
      default:
        return `${title} on`;
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-foreground">
        {getTitle(title)}
      </h4>
      <div className="flex flex-wrap gap-4">
        {providers.map((provider) => (
          <ProviderLogo
            key={provider.provider_id}
            provider={provider}
            onClick={() => onProviderClick?.(provider)}
          />
        ))}
      </div>
    </div>
  );
};

export function WatchProviders({ providers, className }: WatchProvidersProps) {
  if (!providers) {
    return null;
  }

  const { flatrate, buy, rent, ads, link } = providers;
  const hasProviders =
    flatrate?.length || buy?.length || rent?.length || ads?.length;

  if (!hasProviders) {
    return (
      <div
        className={cn(
          "p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40",
          "border border-border/20 backdrop-blur-sm shadow-lg",
          className,
        )}
      >
        <div className="text-center text-muted-foreground">
          <p className="text-sm font-medium">
            No streaming information available
          </p>
        </div>
      </div>
    );
  }

  const handleProviderClick = () => {
    // Open TMDB link if available
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={cn(
        "space-y-6 p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40",
        "border border-border/20 backdrop-blur-sm shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">Where to Watch</h3>
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            View on TMDB →
          </Link>
        )}
      </div>

      <div className="space-y-5">
        {flatrate && flatrate.length > 0 && (
          <ProviderSection
            title="Stream"
            providers={flatrate}
            onProviderClick={handleProviderClick}
          />
        )}

        {ads && ads.length > 0 && (
          <ProviderSection
            title="Free with Ads"
            providers={ads}
            onProviderClick={handleProviderClick}
          />
        )}

        {buy && buy.length > 0 && (
          <ProviderSection
            title="Buy"
            providers={buy}
            onProviderClick={handleProviderClick}
          />
        )}

        {rent && rent.length > 0 && (
          <ProviderSection
            title="Rent"
            providers={rent}
            onProviderClick={handleProviderClick}
          />
        )}
      </div>

      <div className="pt-3 border-t border-border/20">
        <p className="text-xs text-muted-foreground/80">
          Streaming data provided by{" "}
          <Link
            href="https://www.justwatch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors font-medium underline-offset-2 hover:underline"
          >
            JustWatch
          </Link>
        </p>
      </div>
    </div>
  );
}

// Compact version for cards
export function WatchProvidersCompact({
  providers,
  className,
}: WatchProvidersProps) {
  if (!providers?.flatrate?.length) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {providers.flatrate.map((provider) => (
        <Tooltip key={provider.provider_id}>
          <TooltipTrigger asChild>
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="absolute inset-0 p-1">
                <Image
                  src={getImageUrl(provider.logo_path, "logo", "w154")}
                  alt={provider.provider_name}
                  fill
                  className="object-contain"
                  sizes="40px"
                  quality={90}
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{provider.provider_name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
