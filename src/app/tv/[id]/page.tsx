import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TVDetailsPage } from "@/components/tv/tv-details-page";

interface TVPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TVPageProps): Promise<Metadata> {
  const { id } = await params;
  const tvId = parseInt(id);

  if (isNaN(tvId)) {
    return {
      title: "TV Show Not Found",
    };
  }

  try {
    // In a real app, you might want to fetch the TV show data here for SEO
    // For now, we'll use a generic title
    return {
      title: `TV Show Details - What To Watch?`,
      description:
        "View detailed information about this TV show including cast, crew, ratings, and more.",
    };
  } catch {
    return {
      title: "TV Show Not Found",
    };
  }
}

export default async function TVPage({ params }: TVPageProps) {
  const { id } = await params;
  const tvId = parseInt(id);

  if (isNaN(tvId)) {
    notFound();
  }

  return <TVDetailsPage tvId={tvId} />;
}
