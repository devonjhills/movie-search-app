'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';
import type { WatchProviderRegion, WatchProvider } from '@/lib/types';

interface WatchProvidersProps {
  providers?: WatchProviderRegion;
  className?: string;
}

const ProviderLogo = ({ provider, onClick }: { provider: WatchProvider; onClick?: () => void }) => (
  <div
    className={cn(
      "relative w-12 h-12 rounded-lg overflow-hidden",
      "border border-border/50 bg-card shadow-sm",
      "hover:scale-105 hover:shadow-md transition-all duration-200",
      onClick && "cursor-pointer"
    )}
    onClick={onClick}
    title={provider.provider_name}
  >
    <Image
      src={getImageUrl(provider.logo_path, 'logo', 'w92')}
      alt={provider.provider_name}
      fill
      className="object-cover"
      sizes="48px"
    />
  </div>
);

const ProviderSection = ({ 
  title, 
  providers, 
  onProviderClick 
}: { 
  title: string; 
  providers: WatchProvider[]; 
  onProviderClick?: (provider: WatchProvider) => void;
}) => (
  <div className="space-y-2">
    <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
    <div className="flex flex-wrap gap-2">
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

export function WatchProviders({ providers, className }: WatchProvidersProps) {
  if (!providers) {
    return null;
  }

  const { flatrate, buy, rent, ads, link } = providers;
  const hasProviders = flatrate?.length || buy?.length || rent?.length || ads?.length;

  if (!hasProviders) {
    return (
      <div className={cn("p-4 rounded-lg border border-border/50 bg-card/50", className)}>
        <div className="text-center text-muted-foreground">
          <p className="text-sm">No streaming information available</p>
        </div>
      </div>
    );
  }

  const handleProviderClick = (provider: WatchProvider) => {
    // Open TMDB link if available, or search for the provider
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn("space-y-4 p-4 rounded-lg border border-border/50 bg-card/50", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Where to Watch</h3>
        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View on TMDB →
          </Link>
        )}
      </div>

      <div className="space-y-4">
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

      <div className="pt-2 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Streaming data provided by{' '}
          <Link
            href="https://www.justwatch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            JustWatch
          </Link>
        </p>
      </div>
    </div>
  );
}

// Compact version for cards
export function WatchProvidersCompact({ providers, className }: WatchProvidersProps) {
  if (!providers?.flatrate?.length) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {providers.flatrate.slice(0, 3).map((provider) => (
        <div
          key={provider.provider_id}
          className="relative w-6 h-6 rounded overflow-hidden border border-border/50"
          title={provider.provider_name}
        >
          <Image
            src={getImageUrl(provider.logo_path, 'logo', 'w45')}
            alt={provider.provider_name}
            fill
            className="object-cover"
            sizes="24px"
          />
        </div>
      ))}
      {providers.flatrate.length > 3 && (
        <span className="text-xs text-muted-foreground ml-1">
          +{providers.flatrate.length - 3}
        </span>
      )}
    </div>
  );
}