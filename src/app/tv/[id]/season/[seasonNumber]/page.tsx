import { notFound } from "next/navigation";
import { TVSeasonDetailsPage } from "@/components/tv/tv-season-details-page";

interface SeasonPageProps {
  params: Promise<{
    id: string;
    seasonNumber: string;
  }>;
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const resolvedParams = await params;
  const tvId = parseInt(resolvedParams.id);
  const seasonNumber = parseInt(resolvedParams.seasonNumber);

  if (isNaN(tvId) || isNaN(seasonNumber)) {
    notFound();
  }

  return <TVSeasonDetailsPage tvId={tvId} seasonNumber={seasonNumber} />;
}

export async function generateMetadata({ params }: SeasonPageProps) {
  const resolvedParams = await params;
  const tvId = parseInt(resolvedParams.id);
  const seasonNumber = parseInt(resolvedParams.seasonNumber);

  return {
    title: `Season ${seasonNumber} Details`,
    description: `Episodes and details for Season ${seasonNumber}`,
  };
}
