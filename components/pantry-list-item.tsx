'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock, ChevronRight, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Pantry } from '@/lib/data/pantries';
import { isPantryOpen, formatTime, getTodayHours, getNextOpenTime } from '@/lib/pantry-utils';
import { cn } from '@/lib/utils';

interface PantryListItemProps {
  pantry: Pantry & { distance: number };
  isSelected?: boolean;
  onSelect?: () => void;
  locale?: string;
}

export function PantryListItem({ pantry, isSelected, onSelect, locale = 'en' }: PantryListItemProps) {
  const t = useTranslations('pantry');
  const tCommon = useTranslations('common');
  const tDays = useTranslations('days');
  
  const isOpen = isPantryOpen(pantry.hours);
  const todayHours = getTodayHours(pantry.hours);
  const nextOpen = !isOpen ? getNextOpenTime(pantry.hours) : null;
  const name = locale === 'es' ? pantry.name_es : pantry.name_en;

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200',
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight mb-1 truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {pantry.distance.toFixed(1)} {tCommon('miles')}
            </p>
          </div>
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
            <span className="line-clamp-2">
              {pantry.address}, {pantry.city}, {pantry.state} {pantry.zip}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <a 
              href={`tel:${pantry.phone}`} 
              className="hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              {pantry.phone}
            </a>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              {isOpen && todayHours && !todayHours.closed ? (
                <span className="text-success">
                  {tCommon('today')}: {formatTime(todayHours.open)} - {formatTime(todayHours.close)}
                </span>
              ) : nextOpen ? (
                <span>
                  {t('opensAt', { 
                    time: `${nextOpen.day === 'today' ? tCommon('today') : nextOpen.day === 'tomorrow' ? tCommon('tomorrow') : tDays(nextOpen.day as 'monday')} ${formatTime(nextOpen.time)}`
                  })}
                </span>
              ) : (
                <span>{t('closed')}</span>
              )}
            </div>
          </div>

          {pantry.languages_spoken.length > 1 && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{pantry.languages_spoken.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {pantry.walk_in && (
            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
              {t('walkIn')}
            </Badge>
          )}
          {pantry.services.slice(0, 2).map((service) => (
            <Badge key={service} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          {pantry.services.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{pantry.services.length - 2}
            </Badge>
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
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="outline" size="sm" className="w-full">
              {t('directions')}
            </Button>
          </a>
          <Link 
            href={`/pantry/${pantry.id}`} 
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button size="sm" className="w-full gap-1">
              {tCommon('learnMore')}
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
