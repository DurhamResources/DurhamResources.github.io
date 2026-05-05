import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/hero-section';
import { FeaturedPantries } from '@/components/featured-pantries';
import { QuickResources } from '@/components/quick-resources';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturedPantries />
      <QuickResources />
    </>
  );
}
