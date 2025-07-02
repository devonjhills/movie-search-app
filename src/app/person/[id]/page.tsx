import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PersonDetailsPage } from '@/components/person/person-details-page';

interface PersonPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const { id } = await params;
  const personId = parseInt(id);
  
  if (isNaN(personId)) {
    return {
      title: 'Person Not Found',
    };
  }

  try {
    // In a real app, you might want to fetch the person data here for SEO
    // For now, we'll use a generic title
    return {
      title: `Person Details - What To Watch?`,
      description: 'View detailed information about this person including filmography, biography, and more.',
    };
  } catch {
    return {
      title: 'Person Not Found',
    };
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { id } = await params;
  const personId = parseInt(id);

  if (isNaN(personId)) {
    notFound();
  }

  return <PersonDetailsPage personId={personId} />;
}