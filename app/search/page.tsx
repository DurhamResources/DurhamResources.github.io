import { getLocale } from 'next-intl/server';
import { SearchResults } from '@/components/search-results';
import { pantries, durhamZipCodes, neighboringZipCodes } from '@/lib/data/pantries';
import { sortPantriesByDistance, zipCodeCoordinates } from '@/lib/pantry-utils';

interface SearchPageProps {
  searchParams: Promise<{ zip?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { zip } = await searchParams;
  const locale = await getLocale();
  
  // Default to Durham central ZIP if none provided
  const zipCode = zip || '27701';
  
  // Get coordinates for the ZIP code
  const coords = zipCodeCoordinates[zipCode] || zipCodeCoordinates['27701'];
  
  // Check if ZIP is in Durham or neighboring area
  const isValidZip = durhamZipCodes.includes(zipCode) || neighboringZipCodes.includes(zipCode);
  
  // Get and sort pantries by distance
  const activePantries = pantries.filter(p => p.active);
  const sortedPantries = sortPantriesByDistance(activePantries, coords.lat, coords.lon);
  
  // Filter to pantries within 10 miles for non-Durham ZIPs
  const filteredPantries = isValidZip 
    ? sortedPantries.filter(p => p.distance <= 15)
    : sortedPantries.filter(p => p.distance <= 10);

  return (
    <SearchResults
      pantries={filteredPantries}
      zipCode={zipCode}
      center={coords}
      locale={locale}
    />
  );
}
