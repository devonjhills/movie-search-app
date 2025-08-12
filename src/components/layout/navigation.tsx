"use client";

import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/components/providers/auth-provider";
import {
  MoonIcon,
  SunIcon,
  ExitIcon,
  PersonIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center text-foreground hover:no-underline"
            >
              <Image
                src="/logo.png"
                alt="FilmFatale"
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              <NextLink
                href="/"
                className="nav-link inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Movies
              </NextLink>
              <NextLink
                href="/tv"
                className="nav-link inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                TV Shows
              </NextLink>
              <NextLink
                href="/search"
                className="nav-link inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Browse
              </NextLink>
              {user && (
                <NextLink
                  href="/library"
                  className="nav-link inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  My Library
                </NextLink>
              )}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Auth Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-12 w-12 p-0 rounded-lg"
                >
                  <div className="relative">
                    <PersonIcon className="h-7 w-7" />
                    {user && (
                      <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary border border-background" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuLabel className="text-xs text-foreground/60">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/library")}
                      className="flex items-center"
                    >
                      <BookmarkIcon className="h-4 w-4 mr-2" />
                      <span>My Library</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="flex items-center"
                    >
                      <ExitIcon className="h-4 w-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem
                    onClick={() => router.push("/signin")}
                    className="flex items-center"
                  >
                    <PersonIcon className="h-4 w-4 mr-2" />
                    <span>Sign In</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="lg"
              className="h-12 w-12 p-0 rounded-lg"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                // Show a neutral icon during SSR to prevent hydration mismatch
                <div className="h-7 w-7" />
              ) : theme === "dark" ? (
                <SunIcon className="h-7 w-7 stroke-2" />
              ) : (
                <MoonIcon className="h-7 w-7 stroke-2" />
              )}
            </Button>
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
            href="/search"
            variant="nav"
            className="px-3 py-2 text-sm font-semibold"
          >
            Browse
          </Link>
          {user && (
            <Link
              href="/library"
              variant="nav"
              className="px-3 py-2 text-sm font-semibold"
            >
              My Library
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
