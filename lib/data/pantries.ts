export interface PantryHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface Pantry {
  id: string;
  name_en: string;
  name_es: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  phone: string;
  website?: string;
  hours: PantryHours[];
  eligibility_en: string;
  eligibility_es: string;
  services: string[];
  languages_spoken: string[];
  walk_in: boolean;
  last_verified: string;
  active: boolean;
  neighboring_county?: boolean;
}

// Sample pantry data for Durham County
export const pantries: Pantry[] = [
  {
    id: '1',
    name_en: 'Durham Rescue Mission',
    name_es: 'Misión de Rescate de Durham',
    address: '1201 E Main St',
    city: 'Durham',
    state: 'NC',
    zip: '27701',
    latitude: 35.9908,
    longitude: -78.8867,
    phone: '(919) 688-9641',
    website: 'https://www.durhamrescuemission.org',
    hours: [
      { day: 'monday', open: '09:00', close: '17:00' },
      { day: 'tuesday', open: '09:00', close: '17:00' },
      { day: 'wednesday', open: '09:00', close: '17:00' },
      { day: 'thursday', open: '09:00', close: '17:00' },
      { day: 'friday', open: '09:00', close: '17:00' },
      { day: 'saturday', open: '09:00', close: '12:00' },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Open to all Durham County residents. No ID required.',
    eligibility_es: 'Abierto a todos los residentes del Condado de Durham. No se requiere identificación.',
    services: ['hot meals', 'food pantry', 'clothing'],
    languages_spoken: ['English', 'Spanish'],
    walk_in: true,
    last_verified: '2026-04-28',
    active: true,
  },
  {
    id: '2',
    name_en: 'Urban Ministries of Durham',
    name_es: 'Ministerios Urbanos de Durham',
    address: '410 Liberty St',
    city: 'Durham',
    state: 'NC',
    zip: '27701',
    latitude: 35.9971,
    longitude: -78.9025,
    phone: '(919) 682-0538',
    website: 'https://www.umdurham.org',
    hours: [
      { day: 'monday', open: '08:00', close: '16:00' },
      { day: 'tuesday', open: '08:00', close: '16:00' },
      { day: 'wednesday', open: '08:00', close: '16:00' },
      { day: 'thursday', open: '08:00', close: '16:00' },
      { day: 'friday', open: '08:00', close: '16:00' },
      { day: 'saturday', open: '00:00', close: '00:00', closed: true },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Durham County residents with proof of address. Food pantry visits limited to once per month.',
    eligibility_es: 'Residentes del Condado de Durham con comprobante de domicilio. Visitas a la despensa limitadas a una vez al mes.',
    services: ['food pantry', 'shelter', 'case management'],
    languages_spoken: ['English', 'Spanish'],
    walk_in: true,
    last_verified: '2026-04-25',
    active: true,
  },
  {
    id: '3',
    name_en: 'Food Bank of Central & Eastern NC - Durham Branch',
    name_es: 'Banco de Alimentos del Centro y Este de NC - Sucursal Durham',
    address: '2700 Angier Ave',
    city: 'Durham',
    state: 'NC',
    zip: '27703',
    latitude: 35.9782,
    longitude: -78.8621,
    phone: '(919) 875-0707',
    website: 'https://www.foodbankcenc.org',
    hours: [
      { day: 'monday', open: '10:00', close: '14:00' },
      { day: 'tuesday', open: '10:00', close: '14:00' },
      { day: 'wednesday', open: '10:00', close: '14:00' },
      { day: 'thursday', open: '10:00', close: '18:00' },
      { day: 'friday', open: '10:00', close: '14:00' },
      { day: 'saturday', open: '09:00', close: '13:00' },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Open to all. Bring your own bags or boxes.',
    eligibility_es: 'Abierto a todos. Traiga sus propias bolsas o cajas.',
    services: ['food pantry', 'fresh produce', 'baby food'],
    languages_spoken: ['English', 'Spanish', 'Vietnamese'],
    walk_in: true,
    last_verified: '2026-05-01',
    active: true,
  },
  {
    id: '4',
    name_en: 'St. Philip\'s Community Kitchen',
    name_es: 'Cocina Comunitaria de St. Philip\'s',
    address: '403 E Main St',
    city: 'Durham',
    state: 'NC',
    zip: '27701',
    latitude: 35.9939,
    longitude: -78.8953,
    phone: '(919) 682-5708',
    hours: [
      { day: 'monday', open: '11:30', close: '13:00' },
      { day: 'tuesday', open: '11:30', close: '13:00' },
      { day: 'wednesday', open: '11:30', close: '13:00' },
      { day: 'thursday', open: '11:30', close: '13:00' },
      { day: 'friday', open: '11:30', close: '13:00' },
      { day: 'saturday', open: '00:00', close: '00:00', closed: true },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'All are welcome. Free hot lunch served daily.',
    eligibility_es: 'Todos son bienvenidos. Almuerzo caliente gratis servido diariamente.',
    services: ['hot meals'],
    languages_spoken: ['English'],
    walk_in: true,
    last_verified: '2026-04-20',
    active: true,
  },
  {
    id: '5',
    name_en: 'Iglesia Presbiteriana Emanuel',
    name_es: 'Iglesia Presbiteriana Emanuel',
    address: '2504 N Roxboro St',
    city: 'Durham',
    state: 'NC',
    zip: '27704',
    latitude: 35.9692,
    longitude: -78.9367,
    phone: '(919) 526-3386',
    hours: [
      { day: 'monday', open: '00:00', close: '00:00', closed: true },
      { day: 'tuesday', open: '00:00', close: '00:00', closed: true },
      { day: 'wednesday', open: '14:00', close: '16:00' },
      { day: 'thursday', open: '00:00', close: '00:00', closed: true },
      { day: 'friday', open: '00:00', close: '00:00', closed: true },
      { day: 'saturday', open: '10:00', close: '12:00' },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Open to all. Spanish-speaking staff available.',
    eligibility_es: 'Abierto a todos. Personal de habla hispana disponible.',
    services: ['food pantry'],
    languages_spoken: ['Spanish', 'English'],
    walk_in: true,
    last_verified: '2026-04-15',
    active: true,
  },
  {
    id: '6',
    name_en: 'Durham Community Food Pantry',
    name_es: 'Despensa Comunitaria de Alimentos de Durham',
    address: '2020 Chapel Hill Rd #30',
    city: 'Durham',
    state: 'NC',
    zip: '27707',
    latitude: 36.0021,
    longitude: -78.8969,
    phone: '(919) 286-1964',
    hours: [
      { day: 'monday', open: '14:00', close: '18:00' },
      { day: 'tuesday', open: '14:00', close: '18:00' },
      { day: 'wednesday', open: '00:00', close: '00:00', closed: true },
      { day: 'thursday', open: '14:00', close: '18:00' },
      { day: 'friday', open: '00:00', close: '00:00', closed: true },
      { day: 'saturday', open: '00:00', close: '00:00', closed: true },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Durham residents only. Please bring proof of address.',
    eligibility_es: 'Solo residentes de Durham. Por favor traiga comprobante de domicilio.',
    services: ['food pantry', 'fresh produce'],
    languages_spoken: ['English', 'Spanish'],
    walk_in: true,
    last_verified: '2026-04-22',
    active: true,
  },
  {
    id: '8',
    name_en: 'SEEDS Community Garden & Food Pantry',
    name_es: 'Jardín Comunitario y Despensa de Alimentos SEEDS',
    address: '706 Gilbert St',
    city: 'Durham',
    state: 'NC',
    zip: '27701',
    latitude: 35.9875,
    longitude: -78.8998,
    phone: '(919) 683-1197',
    website: 'https://www.seedsnc.org',
    hours: [
      { day: 'monday', open: '00:00', close: '00:00', closed: true },
      { day: 'tuesday', open: '15:00', close: '18:00' },
      { day: 'wednesday', open: '00:00', close: '00:00', closed: true },
      { day: 'thursday', open: '15:00', close: '18:00' },
      { day: 'friday', open: '00:00', close: '00:00', closed: true },
      { day: 'saturday', open: '10:00', close: '13:00' },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Open to all. Fresh, locally-grown produce available seasonally.',
    eligibility_es: 'Abierto a todos. Productos frescos cultivados localmente disponibles por temporada.',
    services: ['food pantry', 'fresh produce', 'community garden'],
    languages_spoken: ['English', 'Spanish'],
    walk_in: true,
    last_verified: '2026-05-02',
    active: true,
  },
  {
    id: '9',
    name_en: 'Oak Grove Free Will Baptist Church Pantry',
    name_es: 'Despensa de la Iglesia Bautista Oak Grove',
    address: '3904 Fayetteville St',
    city: 'Durham',
    state: 'NC',
    zip: '27707',
    latitude: 35.9534,
    longitude: -78.8912,
    phone: '(919) 680-2927',
    hours: [
      { day: 'monday', open: '00:00', close: '00:00', closed: true },
      { day: 'tuesday', open: '00:00', close: '00:00', closed: true },
      { day: 'wednesday', open: '00:00', close: '00:00', closed: true },
      { day: 'thursday', open: '09:00', close: '12:00' },
      { day: 'friday', open: '00:00', close: '00:00', closed: true },
      { day: 'saturday', open: '09:00', close: '12:00' },
      { day: 'sunday', open: '00:00', close: '00:00', closed: true },
    ],
    eligibility_en: 'Open to all Durham County residents.',
    eligibility_es: 'Abierto a todos los residentes del Condado de Durham.',
    services: ['food pantry', 'diabetic-friendly options'],
    languages_spoken: ['English'],
    walk_in: true,
    last_verified: '2026-04-10',
    active: true,
  },
];

// Durham area ZIP codes
export const durhamZipCodes = [
  '27701', '27702', '27703', '27704', '27705', '27706', '27707', '27708', '27709', '27710',
  '27711', '27712', '27713', '27715', '27717', '27722',
];

export const neighboringZipCodes = [
  '27502', '27510', '27511', '27514', '27516', '27517', '27520', '27526', '27560', '27587', '27592',
];
