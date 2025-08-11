"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { useWatchlist } from "@/lib/hooks/use-watchlist";
import { WatchlistGrid } from "@/components/watchlist/watchlist-grid";
import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function WatchlistPage() {
  const { user } = useAuth();
  const { watchlist, total, isLoading, error } = useWatchlist();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookmarkIcon className="h-16 w-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Sign in to view your watchlist</h1>
          <p className="text-muted-foreground">
            Create an account to save your favorite movies and TV shows.
          </p>
          <Link href="/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">
            Error loading watchlist
          </h1>
          <p className="text-muted-foreground">
            There was an error loading your watchlist. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-muted-foreground">
              {total === 0
                ? "No items in your watchlist yet"
                : `${total} item${total !== 1 ? "s" : ""} in your watchlist`}
            </p>
          </div>
          <BookmarkIcon className="h-8 w-8 text-primary" />
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-16">
            <BookmarkIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Start adding movies and TV shows to keep track of what you want to
              watch.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Discover Movies & TV Shows
            </Button>
          </div>
        ) : (
          <WatchlistGrid items={watchlist} />
        )}
      </div>
    </div>
  );
}
