'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SearchResults } from '@/components/search-results';
import { pantries, durhamZipCodes, neighboringZipCodes } from '@/lib/data/pantries';
import { sortPantriesByDistance, zipCodeCoordinates } from '@/lib/pantry-utils';
import { useLocale } from 'next-intl';

function SearchContent() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  
  const zip = searchParams.get('zip');
  
  const { filteredPantries, zipCode, coords } = useMemo(() => {
    const zipCode = zip || '27701';
    const coords = zipCodeCoordinates[zipCode] || zipCodeCoordinates['27701'];
    const isValidZip = durhamZipCodes.includes(zipCode) || neighboringZipCodes.includes(zipCode);
    const activePantries = pantries.filter(p => p.active);
    const sortedPantries = sortPantriesByDistance(activePantries, coords.lat, coords.lon);
    const filteredPantries = isValidZip 
      ? sortedPantries.filter(p => p.distance <= 15)
      : sortedPantries.filter(p => p.distance <= 10);

    return { filteredPantries, zipCode, coords };
  }, [zip]);

  return (
    <SearchResults
      pantries={filteredPantries}
      zipCode={zipCode}
      center={coords}
      locale={locale}
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
