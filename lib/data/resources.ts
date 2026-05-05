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
    phone: '(919) 560-7800',
    website: 'https://www.nutritionnc.com/',
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
    website: 'https://www.ncdhhs.gov/divisions/health-benefits-nc-medicaid',
    eligibility_en: 'Based on income, family size, and other factors. Apply through eDSS or your local DSS office.',
    eligibility_es: 'Basado en ingresos, tamaño de familia y otros factores. Solicite a través de eDSS o su oficina local del DSS.',
  },
  {
    id: 'senior-nutrition',
    name_en: 'Senior Nutrition Programs',
    name_es: 'Programas de Nutrición para Adultos Mayores',
    description_en: 'Meals on Wheels and congregate meal programs for Durham seniors aged 60 and older.',
    description_es: 'Programas de Meals on Wheels y comidas congregadas para adultos mayores de Durham de 60 años o más.',
    category: 'government',
    phone: '(919) 560-8977',
    website: 'https://www.dconc.gov/county-departments/departments-f-z/social-services/senior-services',
    eligibility_en: 'Durham County residents aged 60 and older.',
    eligibility_es: 'Residentes del Condado de Durham de 60 años o más.',
  },

  // Community Programs
  {
    id: 'community-meals',
    name_en: 'Community Meal Sites',
    name_es: 'Sitios de Comidas Comunitarias',
    description_en: 'Free hot meals served at various locations throughout Durham. No eligibility requirements - all are welcome.',
    description_es: 'Comidas calientes gratuitas servidas en varios lugares de Durham. Sin requisitos de elegibilidad - todos son bienvenidos.',
    category: 'community',
    eligibility_en: 'Open to all Durham residents.',
    eligibility_es: 'Abierto a todos los residentes de Durham.',
  },
  {
    id: 'school-meals',
    name_en: 'School Meal Programs',
    name_es: 'Programas de Comidas Escolares',
    description_en: 'Free and reduced-price breakfast and lunch for eligible Durham Public Schools students.',
    description_es: 'Desayuno y almuerzo gratuitos o a precio reducido para estudiantes elegibles de las Escuelas Públicas de Durham.',
    category: 'community',
    website: 'https://www.dpsnc.net/departments/child-nutrition',
    eligibility_en: 'DPS students based on household income. Apply through your school.',
    eligibility_es: 'Estudiantes de DPS basados en ingresos del hogar. Solicite a través de su escuela.',
  },
  {
    id: 'backpack-program',
    name_en: 'Weekend Backpack Programs',
    name_es: 'Programas de Mochilas de Fin de Semana',
    description_en: 'Food sent home with students on Fridays to ensure they have meals over the weekend.',
    description_es: 'Alimentos enviados a casa con los estudiantes los viernes para asegurar que tengan comidas durante el fin de semana.',
    category: 'community',
    eligibility_en: 'Students identified by school counselors as food insecure.',
    eligibility_es: 'Estudiantes identificados por los consejeros escolares como inseguros alimentarios.',
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
    name_en: 'Durham Crisis Line',
    name_es: 'Línea de Crisis de Durham',
    description_en: '24/7 crisis intervention and referral services for immediate food, shelter, and mental health assistance.',
    description_es: 'Intervención de crisis 24/7 y servicios de referencia para asistencia inmediata de alimentos, refugio y salud mental.',
    category: 'emergency',
    phone: '(919) 560-7100',
    eligibility_en: 'Anyone in Durham County experiencing a crisis.',
    eligibility_es: 'Cualquier persona en el Condado de Durham que esté experimentando una crisis.',
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
    name_en: 'Baby & Infant Supplies',
    name_es: 'Artículos para Bebés e Infantes',
    description_en: 'Diapers, formula, baby food, and other infant supplies available at select Durham pantries.',
    description_es: 'Pañales, fórmula, comida para bebés y otros artículos para bebés disponibles en despensas selectas de Durham.',
    category: 'specialized',
    eligibility_en: 'Families with infants and young children.',
    eligibility_es: 'Familias con bebés y niños pequeños.',
  },
  {
    id: 'pet-food',
    name_en: 'Pet Food Assistance',
    name_es: 'Asistencia de Comida para Mascotas',
    description_en: 'Pet food banks and pantries helping Durham families keep their pets fed during difficult times.',
    description_es: 'Bancos de comida para mascotas y despensas que ayudan a las familias de Durham a alimentar a sus mascotas durante tiempos difíciles.',
    category: 'specialized',
    eligibility_en: 'Pet owners experiencing financial hardship.',
    eligibility_es: 'Dueños de mascotas que experimentan dificultades financieras.',
  },
  {
    id: 'holiday-meals',
    name_en: 'Holiday Meal Programs',
    name_es: 'Programas de Comidas Navideñas',
    description_en: 'Thanksgiving and Christmas meal distribution programs for families in need.',
    description_es: 'Programas de distribución de comidas de Acción de Gracias y Navidad para familias necesitadas.',
    category: 'specialized',
    eligibility_en: 'Varies by program. Register in advance during the holiday season.',
    eligibility_es: 'Varía según el programa. Regístrese con anticipación durante la temporada navideña.',
  },
  {
    id: 'diabetic-friendly',
    name_en: 'Diabetes-Friendly Food Pantries',
    name_es: 'Despensas de Alimentos para Diabéticos',
    description_en: 'Pantries stocked with appropriate food options for people managing diabetes.',
    description_es: 'Despensas abastecidas con opciones de alimentos apropiadas para personas que manejan diabetes.',
    category: 'specialized',
    eligibility_en: 'Individuals with diabetes or dietary restrictions.',
    eligibility_es: 'Personas con diabetes o restricciones dietéticas.',
  },
];
