'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ZipSearchFormProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export function ZipSearchForm({ variant = 'hero', className }: ZipSearchFormProps) {
  const t = useTranslations('hero');
  const router = useRouter();
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate ZIP code
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zipCode)) {
      setError(t('invalidZip'));
      return;
    }

    router.push(`/search?zip=${zipCode}`);
  };

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div
        className={cn(
          'flex gap-2',
          isHero ? 'flex-col sm:flex-row' : 'flex-row'
        )}
      >
        <div className="relative flex-1">
          <MapPin
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground',
              isHero ? 'h-5 w-5' : 'h-4 w-4'
            )}
            aria-hidden="true"
          />
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            placeholder={t('searchPlaceholder')}
            className={cn(
              'pl-10 bg-white border-border',
              isHero ? 'h-14 text-lg' : 'h-10',
              error && 'border-destructive focus-visible:ring-destructive'
            )}
            aria-label={t('searchPlaceholder')}
            aria-invalid={!!error}
            aria-describedby={error ? 'zip-error' : undefined}
          />
        </div>
        <Button
          type="submit"
          size={isHero ? 'lg' : 'default'}
          className={cn(
            'gap-2 bg-[#C8102E] hover:bg-[#a00d25] text-white',
            isHero && 'h-14 text-lg px-8'
          )}
        >
          <Search className={isHero ? 'h-5 w-5' : 'h-4 w-4'} aria-hidden="true" />
          {t('searchButton')}
        </Button>
      </div>
      {error && (
        <p id="zip-error" className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
