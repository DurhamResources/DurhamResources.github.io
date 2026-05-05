'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  MapPin, Phone, Globe, Clock, ChevronLeft, 
  Navigation, Share2, Check, Info, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type Pantry } from '@/lib/data/pantries';
import { isPantryOpen, formatTime, getTodayHours, getNextOpenTime } from '@/lib/pantry-utils';

interface PantryDetailProps {
  pantry: Pantry;
  locale: string;
}

export function PantryDetail({ pantry, locale }: PantryDetailProps) {
  const t = useTranslations('pantry');
  const tCommon = useTranslations('common');
  const tDays = useTranslations('days');
  
  const isOpen = isPantryOpen(pantry.hours);
  const todayHours = getTodayHours(pantry.hours);
  const nextOpen = !isOpen ? getNextOpenTime(pantry.hours) : null;
  
  const name = locale === 'es' ? pantry.name_es : pantry.name_en;
  const eligibility = locale === 'es' ? pantry.eligibility_es : pantry.eligibility_en;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: name,
        text: `${name} - Food Pantry in Durham, NC`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <Link 
            href="/search" 
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            {tCommon('back')} to Search
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  variant={isOpen ? 'default' : 'secondary'}
                  className={`text-sm ${isOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}
                >
                  {isOpen ? t('open') : t('closed')}
                </Badge>
                {pantry.walk_in && (
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-primary-foreground">
                    {t('walkIn')}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${pantry.address}, ${pantry.city}, ${pantry.state} ${pantry.zip}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2 bg-[#C8102E] hover:bg-[#a00d25]">
                  <Navigation className="h-4 w-4" />
                  {t('directions')}
                </Button>
              </a>
              <Button variant="outline" onClick={handleShare} className="gap-2 bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                <Share2 className="h-4 w-4" />
                {t('share')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact & Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t('contact')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{tCommon('address')}</p>
                  <p className="text-muted-foreground">
                    {pantry.address}<br />
                    {pantry.city}, {pantry.state} {pantry.zip}
                  </p>
                </div>
                
                <div>
                  <p className="font-medium">{tCommon('phone')}</p>
                  <a href={`tel:${pantry.phone}`} className="text-primary hover:underline">
                    {pantry.phone}
                  </a>
                </div>
                
                {pantry.website && (
                  <div>
                    <p className="font-medium">Website</p>
                    <a 
                      href={pantry.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {t('website')}
                    </a>
                  </div>
                )}

                {/* Map Embed */}
                <div className="mt-4 rounded-lg overflow-hidden border border-border h-[250px]">
                  <iframe
                    title={`Map showing location of ${name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      `${pantry.address}, ${pantry.city}, ${pantry.state} ${pantry.zip}`
                    )}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t('hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pantry.hours.map((schedule) => {
                    const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === schedule.day;
                    return (
                      <div 
                        key={schedule.day} 
                        className={`flex justify-between py-2 px-3 rounded-md ${isToday ? 'bg-primary/10 font-medium' : ''}`}
                      >
                        <span className="capitalize">
                          {tDays(schedule.day as 'monday')}
                          {isToday && <span className="ml-2 text-xs text-primary">({tCommon('today')})</span>}
                        </span>
                        <span className={schedule.closed ? 'text-muted-foreground' : ''}>
                          {schedule.closed ? t('closed') : `${formatTime(schedule.open)} - ${formatTime(schedule.close)}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {!isOpen && nextOpen && (
                  <p className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    {t('opensAt', { 
                      time: `${nextOpen.day === 'today' ? tCommon('today') : nextOpen.day === 'tomorrow' ? tCommon('tomorrow') : tDays(nextOpen.day as 'monday')} at ${formatTime(nextOpen.time)}`
                    })}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  {t('eligibility')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{eligibility}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  {t('services')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pantry.services.map((service) => (
                    <Badge key={service} variant="secondary" className="capitalize">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {t('languagesSpoken')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pantry.languages_spoken.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Last Verified */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  {t('lastVerified', { 
                    date: new Date(pantry.last_verified).toLocaleDateString(locale === 'es' ? 'es-US' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  })}
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <a href={`tel:${pantry.phone}`} className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    {t('call')}
                  </Button>
                </a>
                {pantry.website && (
                  <a href={pantry.website} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full gap-2">
                      <Globe className="h-4 w-4" />
                      {t('website')}
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
