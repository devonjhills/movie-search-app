'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/components/providers/auth-provider';
import { MagnifyingGlassIcon, MoonIcon, SunIcon, ArrowRightStartOnRectangleIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { FilmIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <FilmIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">What To Watch?</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
            >
              TV Shows
            </Link>
            <Link
              href="/discover"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Discover
            </Link>
            {user && (
              <Link
                href="/watchlist"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
              >
                Watchlist
              </Link>
            )}
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search movies, TV shows, people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-64 rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm",
                    "placeholder:text-muted-foreground cursor-text",
                    "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                    "hover:border-ring/50 transition-all duration-200"
                  )}
                />
              </div>
            </form>

            {/* Auth and Theme Toggle */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:block text-sm text-foreground/80 mr-2">
                  {user.email}
                </span>
                <Link
                  href="/watchlist"
                  className={cn(
                    "rounded-lg p-2 text-foreground/80 transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-ring/20",
                    "cursor-pointer active:scale-95"
                  )}
                  title="My Watchlist"
                >
                  <BookmarkIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className={cn(
                    "rounded-lg p-2 text-foreground/80 transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-ring/20",
                    "cursor-pointer active:scale-95"
                  )}
                  title="Sign Out"
                >
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 hover:scale-105 hover:shadow-md transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-ring/20",
                  "cursor-pointer active:scale-95"
                )}
              >
                Sign In
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className={cn(
                "rounded-lg p-2 text-foreground/80 transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-ring/20",
                "cursor-pointer active:scale-95"
              )}
              aria-label="Toggle theme"
            >
              {!mounted ? (
                // Show a neutral icon during SSR to prevent hydration mismatch
                <div className="h-5 w-5" />
              ) : theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-6 pb-4">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
          >
            TV Shows
          </Link>
          <Link
            href="/discover"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Discover
          </Link>
          {user && (
            <Link
              href="/watchlist"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Watchlist
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}