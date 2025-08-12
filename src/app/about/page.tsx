import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.png"
                alt="FilmFatale Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-display font-bold text-glow">
              FilmFatale
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate destination for movie and TV show discovery
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">
              What is FilmFatale?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              FilmFatale is a comprehensive movie and TV show discovery platform
              designed to help you find your next favorite watch. Whether
              you&apos;re looking for the latest blockbusters, hidden gems, or
              classic films, our platform provides detailed information,
              ratings, and reviews to guide your entertainment choices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">
              Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Discover Content</h3>
                <p className="text-sm text-muted-foreground">
                  Browse popular, trending, and top-rated movies and TV shows
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Personal Watchlist</h3>
                <p className="text-sm text-muted-foreground">
                  Save movies and shows to watch later with our personal
                  watchlist feature
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Detailed Information</h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive details including cast, crew, ratings, and
                  plot summaries
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Search & Filter</h3>
                <p className="text-sm text-muted-foreground">
                  Find exactly what you&apos;re looking for with our powerful
                  search and filtering tools
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe that everyone deserves to find great entertainment that
              resonates with them. FilmFatale aims to make movie and TV show
              discovery effortless and enjoyable, helping you spend less time
              searching and more time watching what you love.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">
              Powered by TMDB
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All our movie and TV show data is sourced from{" "}
              <Link
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors underline"
              >
                The Movie Database (TMDB)
              </Link>
              , ensuring you have access to the most comprehensive and
              up-to-date entertainment information available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">
              Get Started
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ready to discover your next favorite movie or TV show? Start
              exploring our vast collection of entertainment content, create
              your personal watchlist, and never run out of great things to
              watch.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Movies
              </Link>
              <Link
                href="/tv"
                className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Browse TV Shows
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
