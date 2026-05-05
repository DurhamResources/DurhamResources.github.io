export interface Resource {
  id: string;
  name_en: string;
  name_es: string;
  description_en: string;
  description_es: string;
  category: 'government' | 'community' | 'emergency' | 'specialized';
  phone?: string;
  website?: string;
  eligibility_en?: string;
  eligibility_es?: string;
}

export const resources: Resource[] = [
  // Government Assistance Programs
  {
    id: 'snap',
    name_en: 'SNAP (Food Stamps)',
    name_es: 'SNAP (Cupones de Alimentos)',
    description_en: 'Supplemental Nutrition Assistance Program provides monthly benefits to help eligible low-income individuals and families buy food.',
    description_es: 'El Programa de Asistencia Nutricional Suplementaria proporciona beneficios mensuales para ayudar a personas y familias elegibles de bajos ingresos a comprar alimentos.',
    category: 'government',
    phone: '(919) 560-8000',
    website: 'https://www.ncdhhs.gov/divisions/social-services/food-and-nutrition-services-food-stamps',
    eligibility_en: 'Based on household income, size, and expenses. Apply through Durham County DSS.',
    eligibility_es: 'Basado en ingresos del hogar, tamaño y gastos. Solicite a través del DSS del Condado de Durham.',
  },
  {
    id: 'wic',
    name_en: 'WIC (Women, Infants & Children)',
    name_es: 'WIC (Mujeres, Infantes y Niños)',
    description_en: 'Provides nutritious foods, nutrition education, and healthcare referrals for pregnant women, new mothers, and children under 5.',
    description_es: 'Proporciona alimentos nutritivos, educación nutricional y referencias de atención médica para mujeres embarazadas, nuevas madres y niños menores de 5 años.',
    category: 'government',
    phone: '844-601-6881',
    website: 'https://www.ncdhhs.gov/divisions/child-and-family-well-being/community-nutrition-services-section/wic/apply-wic',
    eligibility_en: 'Pregnant women, new mothers, infants, and children under 5 who meet income guidelines.',
    eligibility_es: 'Mujeres embarazadas, nuevas madres, bebés y niños menores de 5 años que cumplan con las pautas de ingresos.',
  },
  {
    id: 'medicaid',
    name_en: 'Medicaid & NC Health Choice',
    name_es: 'Medicaid y NC Health Choice',
    description_en: 'Free or low-cost health coverage for eligible adults, children, pregnant women, elderly adults, and people with disabilities.',
    description_es: 'Cobertura de salud gratuita o de bajo costo para adultos elegibles, niños, mujeres embarazadas, adultos mayores y personas con discapacidades.',
    category: 'government',
    phone: '(919) 560-8000',
    website: 'https://dconc.gov/Social-Services/Medicaid',
    eligibility_en: 'Based on income, family size, and other factors. Apply through eDSS or your local DSS office.',
    eligibility_es: 'Basado en ingresos, tamaño de familia y otros factores. Solicite a través de eDSS o su oficina local del DSS.',
  },
  {
    id: 'senior-nutrition',
    name_en: 'Senior Nutrition Programs',
    name_es: 'Programas de Nutrición para Adultos Mayores',
    description_en: 'The services of Meals on Wheels Durham may be available to any resident of Durham County who is homebound as the result of age, disability, or illness.',
    description_es: 'Los servicios de Meals on Wheels Durham pueden estar disponibles para cualquier residente del condado de Durham que se encuentre confinado en su hogar como resultado de la edad, una discapacidad o una enfermedad.',
    category: 'government',
    phone: '(919) 667-9424',
    website: 'https://www.mowdurham.org/how-apply',
    eligibility_en: 'Homebound Durham County residents.',
    eligibility_es: 'Residentes del condado de Durham confinados en sus hogares.',
  },

  // Community Programs
  {
    id: 'community-meals',
    name_en: 'Community Meal Sites',
    name_es: 'Sitios de Comidas Comunitarias',
    description_en: 'Free hot meals served at various locations throughout Durham. No eligibility requirements - all are welcome.',
    description_es: 'Comidas calientes gratuitas servidas en varios lugares de Durham. Sin requisitos de elegibilidad - todos son bienvenidos.',
    category: 'community',
    website: 'https://dconc.gov/Public-Information/Community-Food-Resources',
    eligibility_en: 'Open to all Durham residents.',
    eligibility_es: 'Abierto a todos los residentes de Durham.',
  },
  {
    id: 'summer-feeding',
    name_en: 'Summer Feeding Sites',
    name_es: 'Sitios de Alimentación de Verano',
    description_en: 'USDA Summer Food Service Program provides free meals to children 18 and under during summer months.',
    description_es: 'El Programa de Servicio de Alimentos de Verano del USDA proporciona comidas gratuitas a niños de 18 años o menos durante los meses de verano.',
    category: 'community',
    website: 'https://www.fns.usda.gov/sfsp/summer-food-service-program',
    eligibility_en: 'All children 18 and under. No registration required at open sites.',
    eligibility_es: 'Todos los niños de 18 años o menos. No se requiere registro en los sitios abiertos.',
  },

  // Emergency Assistance
  {
    id: 'durham-crisis',
    name_en: 'Durham Crisis Services',
    name_es: 'Línea de Crisis de Durham',
    description_en: 'Crisis Services provides short-term financial assistance for adults who need help to meet their essential needs.',
    description_es: 'Crisis Services proporciona asistencia financiera a corto plazo para adultos que necesitan ayuda para cubrir sus necesidades esenciales.',
    category: 'emergency',
    phone: '(919) 560-8000',
    eligibility_en: 'Eligibility varies based upon disability, need, and program criteria. Apply by phone.',
    eligibility_es: 'La elegibilidad varía según la discapacidad, la necesidad y los criterios del programa. Solicite por teléfono.',
  },
  {
    id: '211-nc',
    name_en: '211 NC',
    name_es: '211 NC',
    description_en: 'Statewide helpline connecting you to local resources for food, housing, utilities, healthcare, and more.',
    description_es: 'Línea de ayuda estatal que lo conecta con recursos locales para alimentos, vivienda, servicios públicos, atención médica y más.',
    category: 'emergency',
    phone: '211',
    website: 'https://www.nc211.org/',
    eligibility_en: 'Available to all North Carolina residents.',
    eligibility_es: 'Disponible para todos los residentes de Carolina del Norte.',
  },
  {
    id: 'food-bank-cenc',
    name_en: 'Food Bank of Central & Eastern NC',
    name_es: 'Banco de Alimentos del Centro y Este de NC',
    description_en: 'Regional food bank providing emergency food assistance and supporting local pantries across 34 counties.',
    description_es: 'Banco de alimentos regional que proporciona asistencia alimentaria de emergencia y apoya a las despensas locales en 34 condados.',
    category: 'emergency',
    phone: '(919) 875-0707',
    website: 'https://www.foodbankcenc.org/',
    eligibility_en: 'Services available through partner agencies. Find a pantry near you.',
    eligibility_es: 'Servicios disponibles a través de agencias asociadas. Encuentre una despensa cerca de usted.',
  },

  // Specialized Resources
  {
    id: 'baby-supplies',
    name_en: 'The Giving Closet',
    name_es: 'Artículos para Bebés e Infantes',
    description_en: 'A free family resource that provides essential items such as clothing, diapers, baby gear, and maternity supplies to Durham County families',
    description_es: 'Un recurso familiar gratuito que proporciona artículos esenciales —tales como ropa, pañales, artículos para bebés y suministros de maternidad— a las familias del condado de Durham.',
    category: 'specialized',
    website: 'https://welcomebaby.org/giving-closet/',
    eligibility_en: 'Families with infants and young children.',
    eligibility_es: 'Familias con bebés y niños pequeños.',
  },
  {
    id: 'pet-food',
    name_en: 'APS Pet Food Assistance Program',
    name_es: 'Asistencia de Comida para Mascotas',
    description_en: 'Pet food banks and pantries helping Durham families keep their pets fed during difficult times.',
    description_es: 'Bancos de comida para mascotas y despensas que ayudan a las familias de Durham a alimentar a sus mascotas durante tiempos difíciles.',
    category: 'specialized',
    website: 'https://www.apsofdurham.org/pet-owner-resources/assistance-for-pet-owners/',
    eligibility_en: 'Pet owners experiencing financial hardship.',
    eligibility_es: 'Dueños de mascotas que experimentan dificultades financieras.',
  },
];
