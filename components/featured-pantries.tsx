'use client';

import { useTranslations } from 'next-intl';
import { Clock, MapPin, Phone, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { pantries } from '@/lib/data/pantries';
import { isPantryOpen, formatTime, getTodayHours, getNextOpenTime } from '@/lib/pantry-utils';

export function FeaturedPantries() {
  const t = useTranslations('pantry');
  const tCommon = useTranslations('common');
  const tDays = useTranslations('days');
  const tHome = useTranslations('home');
  const tServices = useTranslations('services');
  
  // Get first 3 active pantries
  const featuredPantries = pantries.filter(p => p.active).slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{tHome('featuredTitle')}</h2>
          <p className="text-muted-foreground">{tHome('featuredSubtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPantries.map((pantry) => {
            const isOpen = isPantryOpen(pantry.hours);
            const todayHours = getTodayHours(pantry.hours);
            const nextOpen = !isOpen ? getNextOpenTime(pantry.hours) : null;

            return (
              <Card key={pantry.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{pantry.name_en}</CardTitle>
                    <Badge
                      variant={isOpen ? 'default' : 'secondary'}
                      className={isOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}
                    >
                      {isOpen ? t('open') : t('closed')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{pantry.address}, {pantry.city}, {pantry.state} {pantry.zip}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <a href={`tel:${pantry.phone}`} className="hover:text-primary">
                      {pantry.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div>
                      {isOpen && todayHours && !todayHours.closed ? (
                        <span className="text-success">
                          {t('closesAt', { time: formatTime(todayHours.close) })}
                        </span>
                      ) : nextOpen ? (
                        <span className="text-muted-foreground">
                          {t('opensAt', { 
                            time: `${nextOpen.day === 'today' ? tCommon('today') : nextOpen.day === 'tomorrow' ? tCommon('tomorrow') : tDays(nextOpen.day as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')} ${formatTime(nextOpen.time)}`
                          })}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{t('closed')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {pantry.services.slice(0, 3).map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {tServices(service as keyof IntlMessages['services'])}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/pantry/${pantry.id}`} className="block pt-2">
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-muted">
                      {tCommon('learnMore')}
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/search">
            <Button size="lg" className="gap-2">
              {tHome('viewAllPantries')}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
