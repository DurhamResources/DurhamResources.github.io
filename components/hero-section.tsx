'use client';

import { useTranslations } from 'next-intl';
import { ZipSearchForm } from './zip-search-form';
import { MapPin, Utensils, Globe } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('hero');

  const stats = [
    { icon: MapPin, value: '40+', label: t('stats.pantries') },
    { icon: Utensils, value: '5,000+', label: t('stats.meals') },
    { icon: Globe, value: '2', label: t('stats.languages') },
  ];

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-pretty">
            {t('subtitle')}
          </p>

          {/* Search Form */}
          <div className="max-w-xl mx-auto mb-12">
            <ZipSearchForm variant="hero" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-2">
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  );
}
