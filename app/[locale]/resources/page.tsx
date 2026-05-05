import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ResourcesContent } from '@/components/resources-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Additional Resources | Durham Resource Hub',
  description: 'Find SNAP enrollment, WIC, community meal programs, emergency assistance, and other food resources in Durham County, NC.',
};

interface ResourcesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('resources');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <ResourcesContent locale={locale} />
    </div>
  );
}
