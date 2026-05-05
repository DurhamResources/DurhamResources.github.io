import { locales, defaultLocale, type Locale } from '@/i18n/config';

export function setLocaleCookie(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
  }
}

export function getLocaleFromCookie(): Locale {
  if (typeof document === 'undefined') {
    return defaultLocale;
  }
  
  const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
  const cookieLocale = match?.[1] as Locale | undefined;
  
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }
  
  return defaultLocale;
}
