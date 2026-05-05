import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async () => {
  // Get locale from cookie, header, or default
  const cookieStore = await cookies();
  const headersList = await headers();
  
  let locale: Locale = defaultLocale;
  
  // Check cookie first
  const cookieLocale = cookieStore.get('locale')?.value as Locale | undefined;
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Check Accept-Language header
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(',')[0].split('-')[0] as Locale;
      if (locales.includes(preferredLocale)) {
        locale = preferredLocale;
      }
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
