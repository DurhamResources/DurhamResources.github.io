import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Durham Food Help | Find Food Assistance Near You',
  description: 'Find food pantries, soup kitchens, and food assistance programs in Durham County, NC. Search by ZIP code to find help near you.',
  keywords: ['food pantry', 'Durham', 'food assistance', 'food bank', 'NC', 'North Carolina', 'SNAP', 'WIC'],
  authors: [{ name: 'City of Durham' }],
  openGraph: {
    title: 'Durham Food Help | Find Food Assistance Near You',
    description: 'Find food pantries, soup kitchens, and food assistance programs in Durham County, NC.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_US',
    siteName: 'Durham Food Help',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Durham Food Help | Find Food Assistance Near You',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
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
