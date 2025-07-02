'use client';

import { useState } from 'react';
import { MovieGrid } from '@/components/movie/movie-grid';
import { TVGrid } from '@/components/tv/tv-grid';
import { PersonGrid } from './person-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { MultiSearchResult } from '@/lib/types';

interface SearchResultsProps {
  results: MultiSearchResult | undefined;
}

type TabType = 'all' | 'movies' | 'tv' | 'people';

export function SearchResults({ results }: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  if (!results) return null;

  const { movieResults, tvResults, peopleResults } = results;
  const totalMovies = movieResults.length;
  const totalTV = tvResults.length;
  const totalPeople = peopleResults.length;

  const tabs = [
    { id: 'all' as const, label: 'All', count: totalMovies + totalTV + totalPeople },
    { id: 'movies' as const, label: 'Movies', count: totalMovies },
    { id: 'tv' as const, label: 'TV Shows', count: totalTV },
    { id: 'people' as const, label: 'People', count: totalPeople },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 rounded-full bg-muted px-2 py-1 text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'all' && (
          <div className="space-y-8">
            {/* Movies Section */}
            {totalMovies > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Movies</h3>
                  {totalMovies > 6 && (
                    <button
                      onClick={() => setActiveTab('movies')}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View all {totalMovies} movies
                    </button>
                  )}
                </div>
                <MovieGrid
                  movies={movieResults.slice(0, 6)}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                />
              </section>
            )}

            {/* TV Shows Section */}
            {totalTV > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">TV Shows</h3>
                  {totalTV > 6 && (
                    <button
                      onClick={() => setActiveTab('tv')}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View all {totalTV} TV shows
                    </button>
                  )}
                </div>
                <TVGrid
                  tvShows={tvResults.slice(0, 6)}
                  cardSize="md"
                  showYear={true}
                  showRating={true}
                />
              </section>
            )}

            {/* People Section */}
            {totalPeople > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">People</h3>
                  {totalPeople > 6 && (
                    <button
                      onClick={() => setActiveTab('people')}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View all {totalPeople} people
                    </button>
                  )}
                </div>
                <PersonGrid
                  people={peopleResults.slice(0, 6)}
                />
              </section>
            )}
          </div>
        )}

        {activeTab === 'movies' && (
          <MovieGrid
            movies={movieResults}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage="No movies found for this search."
          />
        )}

        {activeTab === 'tv' && (
          <TVGrid
            tvShows={tvResults}
            cardSize="md"
            showYear={true}
            showRating={true}
            emptyMessage="No TV shows found for this search."
          />
        )}

        {activeTab === 'people' && (
          <PersonGrid
            people={peopleResults}
            emptyMessage="No people found for this search."
          />
        )}
      </div>
    </div>
  );
}