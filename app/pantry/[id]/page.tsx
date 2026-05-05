import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { PantryDetail } from '@/components/pantry-detail';
import { pantries } from '@/lib/data/pantries';
import type { Metadata } from 'next';

interface PantryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PantryPageProps): Promise<Metadata> {
  const { id } = await params;
  const pantry = pantries.find(p => p.id === id);
  
  if (!pantry) {
    return {
      title: 'Pantry Not Found | Durham Food Help',
    };
  }

  return {
    title: `${pantry.name_en} | Durham Food Help`,
    description: `Find food assistance at ${pantry.name_en} located at ${pantry.address}, ${pantry.city}, NC. ${pantry.eligibility_en}`,
    openGraph: {
      title: `${pantry.name_en} | Durham Food Help`,
      description: `Find food assistance at ${pantry.name_en} in Durham, NC.`,
    },
  };
}

export async function generateStaticParams() {
  return pantries.map((pantry) => ({
    id: pantry.id,
  }));
}

export default async function PantryPage({ params }: PantryPageProps) {
  const { id } = await params;
  const locale = await getLocale();
  
  const pantry = pantries.find(p => p.id === id);
  
  if (!pantry || !pantry.active) {
    notFound();
  }

  return <PantryDetail pantry={pantry} locale={locale} />;
}
