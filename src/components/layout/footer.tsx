import Link from 'next/link';
import { FilmIcon } from '@heroicons/react/24/solid';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FilmIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">What To Watch?</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover your next favorite movie or TV show with our comprehensive database powered by TMDB.
            </p>
          </div>

          {/* Movies */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Movies</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Popular Movies
              </Link>
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Top Rated
              </Link>
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Now Playing
              </Link>
            </div>
          </div>

          {/* TV Shows */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">TV Shows</h3>
            <div className="space-y-2">
              <Link href="/tv" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Popular Shows
              </Link>
              <Link href="/tv" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Top Rated
              </Link>
              <Link href="/tv" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                On The Air
              </Link>
            </div>
          </div>

          {/* Discover */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Discover</h3>
            <div className="space-y-2">
              <Link href="/discover" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse by Genre
              </Link>
              <Link href="/discover" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Trending
              </Link>
              <Link href="/search" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Advanced Search
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 What To Watch? All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Powered by</span>
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              The Movie Database (TMDB)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}