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
  const seasonNumber = parseInt(resolvedParams.seasonNumber);

  if (isNaN(seasonNumber)) {
    notFound();
  }

  return (
    <TVSeasonDetailsPage
      tvId={parseInt(resolvedParams.id)}
      seasonNumber={seasonNumber}
    />
  );
}

export async function generateMetadata({ params }: SeasonPageProps) {
  const resolvedParams = await params;
  const seasonNumber = parseInt(resolvedParams.seasonNumber);

  return {
    title: `Season ${seasonNumber} Details`,
    description: `Episodes and details for Season ${seasonNumber}`,
  };
}
