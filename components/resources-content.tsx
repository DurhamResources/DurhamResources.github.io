'use client';

import { useTranslations } from 'next-intl';
import { 
  Building2, Users, AlertTriangle, Heart, 
  Phone, Globe, ChevronRight, ExternalLink 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resources, type Resource } from '@/lib/data/resources';

interface ResourcesContentProps {
  locale: string;
}

const categoryConfig = {
  government: {
    icon: Building2,
    color: 'bg-[#003087]',
    borderColor: 'border-l-[#003087]',
  },
  community: {
    icon: Users,
    color: 'bg-[#F2A900]',
    borderColor: 'border-l-[#F2A900]',
  },
  emergency: {
    icon: AlertTriangle,
    color: 'bg-[#C8102E]',
    borderColor: 'border-l-[#C8102E]',
  },
  specialized: {
    icon: Heart,
    color: 'bg-success',
    borderColor: 'border-l-success',
  },
};

export function ResourcesContent({ locale }: ResourcesContentProps) {
  const t = useTranslations('resources');
  const tCommon = useTranslations('common');

  const categories = ['government', 'community', 'emergency', 'specialized'] as const;

  const getResourcesByCategory = (category: Resource['category']) => {
    return resources.filter(r => r.category === category);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-16">
        {categories.map((category) => {
          const config = categoryConfig[category];
          const categoryResources = getResourcesByCategory(category);
          const Icon = config.icon;

          return (
            <section key={category} id={category}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-lg ${config.color} text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t(`categories.${category}.title`)}</h2>
                  <p className="text-muted-foreground">{t(`categories.${category}.description`)}</p>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {categoryResources.map((resource) => {
                  const name = locale === 'es' ? resource.name_es : resource.name_en;
                  const description = locale === 'es' ? resource.description_es : resource.description_en;
                  const eligibility = locale === 'es' ? resource.eligibility_es : resource.eligibility_en;

                  return (
                    <Card 
                      key={resource.id} 
                      className={`border-l-4 ${config.borderColor} hover:shadow-lg transition-shadow`}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{name}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {eligibility && (
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-sm">
                              <span className="font-medium">
                                {locale === 'es' ? 'Elegibilidad: ' : 'Eligibility: '}
                              </span>
                              {eligibility}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {resource.phone && (
                            <a href={`tel:${resource.phone}`}>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Phone className="h-4 w-4" />
                                {resource.phone}
                              </Button>
                            </a>
                          )}
                          {resource.website && (
                            <a href={resource.website} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Globe className="h-4 w-4" />
                                {locale === 'es' ? 'Sitio Web' : 'Website'}
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Emergency Contact Banner */}
      <div className="mt-16 bg-[#C8102E] text-white rounded-lg p-8 text-center">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          {locale === 'es' ? '¿Necesita Ayuda Inmediata?' : 'Need Immediate Help?'}
        </h2>
        <p className="text-lg mb-6 text-white/90">
          {locale === 'es' 
            ? 'Llame a estas líneas de ayuda para asistencia inmediata con alimentos, refugio o crisis.'
            : 'Call these helplines for immediate assistance with food, shelter, or crisis support.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:211">
            <Button size="lg" className="bg-white text-[#C8102E] hover:bg-white/90 gap-2">
              <Phone className="h-5 w-5" />
              {locale === 'es' ? 'Llame al 211' : 'Call 211'}
            </Button>
          </a>
          <a href="tel:9195608000">
            <Button size="lg" className="bg-white text-[#C8102E] hover:bg-white/90 gap-2">
              <Phone className="h-5 w-5" />
              {locale === 'es' ? 'Línea de Crisis de Durham' : 'Durham Crisis Line'}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
