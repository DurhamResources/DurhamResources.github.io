import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { locales, type Locale } from '@/i18n/config';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Durham Resource Hub | Find Food Assistance Near You',
  description: 'Find food pantries, soup kitchens, and food assistance programs in Durham County, NC. Search by ZIP code to find help near you.',
  keywords: ['food pantry', 'Durham', 'food assistance', 'food bank', 'NC', 'North Carolina', 'SNAP', 'WIC'],
  authors: [{ name: 'Favored Digital' }],
  icons:{
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Durham Resource Hub | Find Food Assistance Near You',
    description: 'Find food pantries, soup kitchens, and food assistance programs in Durham County, NC.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_US',
    siteName: 'Durham Resource Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Durham Resource Hub | Find Food Assistance Near You',
    description: 'Find food pantries, soup kitchens, and food assistance programs in Durham County, NC.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#003087',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
