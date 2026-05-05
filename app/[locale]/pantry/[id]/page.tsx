import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PantryDetail } from '@/components/pantry-detail';
import { pantries } from '@/lib/data/pantries';
import { locales } from '@/i18n/config';
import type { Metadata } from 'next';

interface PantryPageProps {
  params: Promise<{ locale: string; id: string }>;
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

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  
  for (const locale of locales) {
    for (const pantry of pantries) {
      params.push({ locale, id: pantry.id });
    }
  }
  
  return params;
}

export default async function PantryPage({ params }: PantryPageProps) {
  const { locale, id } = await params;
  
  setRequestLocale(locale);
  
  const pantry = pantries.find(p => p.id === id);
  
  if (!pantry || !pantry.active) {
    notFound();
  }

  return <PantryDetail pantry={pantry} locale={locale} />;
}
