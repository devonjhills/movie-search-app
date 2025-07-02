import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MovieDetailsPage } from '@/components/movie/movie-details-page';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseInt(id);
  
  if (isNaN(movieId)) {
    return {
      title: 'Movie Not Found',
    };
  }

  try {
    // In a real app, you might want to fetch the movie data here for SEO
    // For now, we'll use a generic title
    return {
      title: `Movie Details - What To Watch?`,
      description: 'View detailed information about this movie including cast, crew, ratings, and more.',
    };
  } catch {
    return {
      title: 'Movie Not Found',
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  return <MovieDetailsPage movieId={movieId} />;
}