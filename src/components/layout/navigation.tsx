"use client";

import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/components/providers/auth-provider";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  ExitIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";

export function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
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
      setSearchQuery("");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-foreground hover:no-underline"
          >
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="CineScope"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold text-foreground">
                CineScope
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NextLink
              href="/"
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Movies
            </NextLink>
            <NextLink
              href="/tv"
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              TV Shows
            </NextLink>
            <NextLink
              href="/discover"
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Discover
            </NextLink>
            {user && (
              <NextLink
                href="/watchlist"
                className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Watchlist
              </NextLink>
            )}
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                <Input
                  type="text"
                  placeholder="Search movies, TV shows, people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 lg:w-80 pl-9 pr-3 bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/50 focus:border-primary transition-all duration-200 text-sm placeholder:text-muted-foreground/80"
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
                  className="rounded-lg p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 interactive"
                  title="My Watchlist"
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 interactive"
                  title="Sign Out"
                >
                  <ExitIcon className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm" className="px-3 py-1.5 text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 interactive"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                // Show a neutral icon during SSR to prevent hydration mismatch
                <div className="h-5 w-5" />
              ) : theme === "dark" ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-6 pb-4">
          <Link
            href="/"
            variant="nav"
            className="px-3 py-2 text-sm font-semibold"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            variant="nav"
            className="px-3 py-2 text-sm font-semibold"
          >
            TV Shows
          </Link>
          <Link
            href="/discover"
            variant="nav"
            className="px-3 py-2 text-sm font-semibold"
          >
            Discover
          </Link>
          {user && (
            <Link
              href="/watchlist"
              variant="nav"
              className="px-3 py-2 text-sm font-semibold"
            >
              Watchlist
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
