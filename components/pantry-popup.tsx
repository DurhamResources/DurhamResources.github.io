'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Pantry } from '@/lib/data/pantries';
import { isPantryOpen, formatTime, getTodayHours } from '@/lib/pantry-utils';

interface PantryPopupProps {
  pantry: Pantry & { distance: number };
}

export function PantryPopup({ pantry }: PantryPopupProps) {
  const t = useTranslations('pantry');
  const tCommon = useTranslations('common');
  
  const isOpen = isPantryOpen(pantry.hours);
  const todayHours = getTodayHours(pantry.hours);

  return (
    <div className="p-4 min-w-[280px] max-w-[320px]">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-base leading-tight">{pantry.name_en}</h3>
        <Badge
          variant={isOpen ? 'default' : 'secondary'}
          className={`shrink-0 ${isOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}
        >
          {isOpen ? t('open') : t('closed')}
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p>{pantry.address}</p>
            <p>{pantry.city}, {pantry.state} {pantry.zip}</p>
            <p className="text-xs mt-1">{pantry.distance.toFixed(1)} {tCommon('miles')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <a href={`tel:${pantry.phone}`} className="hover:text-primary">
            {pantry.phone}
          </a>
        </div>

        {todayHours && !todayHours.closed && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {tCommon('today')}: {formatTime(todayHours.open)} - {formatTime(todayHours.close)}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${pantry.address}, ${pantry.city}, ${pantry.state} ${pantry.zip}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" size="sm" className="w-full">
            {t('directions')}
          </Button>
        </a>
        <Link href={`/pantry/${pantry.id}`} className="flex-1">
          <Button size="sm" className="w-full gap-1">
            Details
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
