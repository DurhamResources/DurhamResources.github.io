'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { setLocaleCookie, getLocaleFromCookie } from '@/lib/locale-cookie';

export function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const currentLocale = getLocaleFromCookie();

  const handleLocaleChange = (locale: Locale) => {
    startTransition(() => {
      setLocaleCookie(locale);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
          disabled={isPending}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {localeNames[currentLocale]} 
          </span>
          <span className="sm:hidden">
            {currentLocale.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={locale === currentLocale ? 'bg-accent' : ''}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
