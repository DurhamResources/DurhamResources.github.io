'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { List, Map as MapIcon, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { PantryMap } from './pantry-map';
import { PantryListItem } from './pantry-list-item';
import { ZipSearchForm } from './zip-search-form';
import { type Pantry } from '@/lib/data/pantries';
import { isPantryOpen } from '@/lib/pantry-utils';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  pantries: (Pantry & { distance: number })[];
  zipCode: string;
  center: { lat: number; lon: number };
  locale?: string;
}

export function SearchResults({ pantries, zipCode, center, locale = 'en' }: SearchResultsProps) {
  const t = useTranslations('search');
  const tFilters = useTranslations('search.filters');
  
  const [selectedPantryId, setSelectedPantryId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [filters, setFilters] = useState({
    openNow: false,
    walkIn: false,
  });

  const filteredPantries = useMemo(() => {
    return pantries.filter(pantry => {
      if (filters.openNow && !isPantryOpen(pantry.hours)) return false;
      if (filters.walkIn && !pantry.walk_in) return false;
      return true;
    });
  }, [pantries, filters]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Search Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <ZipSearchForm variant="compact" />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold">
                {t('title')} {zipCode}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('resultsCount', { count: filteredPantries.length })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Filters Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">{tFilters('title')}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{tFilters('title')}</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="filter-open">{tFilters('openNow')}</Label>
                      <Switch
                        id="filter-open"
                        checked={filters.openNow}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, openNow: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="filter-walkin">{tFilters('walkIn')}</Label>
                      <Switch
                        id="filter-walkin"
                        checked={filters.walkIn}
                        onCheckedChange={(checked) =>
                          setFilters(prev => ({ ...prev, walkIn: checked }))
                        }
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Toggle */}
              <div className="flex items-center border border-border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'rounded-none',
                    !showMap && 'bg-muted'
                  )}
                  onClick={() => setShowMap(false)}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'rounded-none',
                    showMap && 'bg-muted'
                  )}
                  onClick={() => setShowMap(true)}
                  aria-label="Map view"
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-6">
        {filteredPantries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-2">{t('noResults')}</p>
            <p className="text-sm text-muted-foreground">{t('noResultsSuggestion')}</p>
          </div>
        ) : (
          <div className={cn(
            'grid gap-6',
            showMap ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
          )}>
            {/* Pantry List */}
            <div className={cn(
              'space-y-4',
              showMap ? 'order-2 lg:order-1 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2' : ''
            )}>
              {filteredPantries.map((pantry) => (
                <PantryListItem
                  key={pantry.id}
                  pantry={pantry}
                  isSelected={pantry.id === selectedPantryId}
                  onSelect={() => setSelectedPantryId(pantry.id === selectedPantryId ? null : pantry.id)}
                  locale={locale}
                />
              ))}
            </div>

            {/* Map */}
            {showMap && (
              <div className="order-1 lg:order-2 h-[400px] lg:h-[calc(100vh-16rem)] lg:sticky lg:top-36">
                <PantryMap
                  pantries={filteredPantries}
                  center={center}
                  selectedPantryId={selectedPantryId ?? undefined}
                  onPantrySelect={(id) => setSelectedPantryId(id)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
