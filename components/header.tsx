'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('header');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/search', label: t('nav.search') },
    { href: '/resources', label: t('nav.resources') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <svg
                viewBox="0 0 40 40"
                className="h-8 w-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="32" height="10" fill="#C8102E" />
                <rect x="4" y="15" width="32" height="10" fill="#F2A900" />
                <rect x="4" y="26" width="32" height="10" fill="#003087" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-lg leading-tight">{t('title')}</div>
              <div className="text-xs text-primary-foreground/80">{t('tagline')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={cn(
            'md:hidden overflow-hidden transition-all duration-200',
            mobileMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
