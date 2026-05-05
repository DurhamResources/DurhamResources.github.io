import { HeroSection } from '@/components/hero-section';
import { FeaturedPantries } from '@/components/featured-pantries';
import { QuickResources } from '@/components/quick-resources';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPantries />
      <QuickResources />
    </>
  );
}
