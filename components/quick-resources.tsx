'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Building2, Users, AlertTriangle, Heart, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function QuickResources() {
  const t = useTranslations('resources');
  const tCommon = useTranslations('common');

  const categories = [
    {
      key: 'government',
      icon: Building2,
      color: 'bg-[#003087]',
    },
    {
      key: 'community',
      icon: Users,
      color: 'bg-[#F2A900]',
    },
    {
      key: 'emergency',
      icon: AlertTriangle,
      color: 'bg-[#C8102E]',
    },
    {
      key: 'specialized',
      icon: Heart,
      color: 'bg-success',
    },
  ] as const;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.key} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.color} text-white mb-3`}>
                  <category.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">
                  {t(`categories.${category.key}.title`)}
                </CardTitle>
                <CardDescription>
                  {t(`categories.${category.key}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/resources">
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-muted">
                    {tCommon('learnMore')}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/resources">
            <Button variant="outline" size="lg" className="gap-2">
              View All Resources
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
