'use client';

import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import { Link } from '@/lib/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted">
      {/* Crisis Banner */}
      <div className="bg-[#C8102E] text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <p className="text-sm font-medium">{t('crisis')}</p>
            <a 
              href="tel:211" 
              className="font-bold underline hover:no-underline"
              aria-label="Call 211 for help"
            >
              211
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* City Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">

                        <div>
            <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('findFood')}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('additionalResources')}
                </Link>
              </li>
            </ul>
          </div>
              <div>

              </div>
            </div>

          </div>


          {/* Contact & Legal */}
          {/* <div>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('accessibility')}
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </div>

      {/* City Flag Color Bar */}
      <div className="h-2 flex">
        <div className="flex-1 bg-[#C8102E]" />
        <div className="flex-1 bg-[#F2A900]" />
        <div className="flex-1 bg-[#003087]" />
      </div>

      {/* Copyright */}
      <div className="bg-[#003087] text-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="https://www.favored.digital" target="_blank" className="text-center text-sm">
            {t('copyright', { year: currentYear })}
          </Link>
        </div>
      </div>
    </footer>
  );
}
