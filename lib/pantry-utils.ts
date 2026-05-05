import { type Pantry, type PantryHours } from './data/pantries';

export function isPantryOpen(hours: PantryHours[]): boolean {
  const now = new Date();
  const dayIndex = now.getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[dayIndex];
  
  const todayHours = hours.find(h => h.day === currentDay);
  if (!todayHours || todayHours.closed) return false;
  
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
  
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;
  
  return currentTime >= openTime && currentTime < closeTime;
}

export function getNextOpenTime(hours: PantryHours[]): { day: string; time: string } | null {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Check remaining hours today first
  const todayHours = hours.find(h => h.day === days[dayIndex]);
  if (todayHours && !todayHours.closed) {
    const [openHour, openMin] = todayHours.open.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    if (currentTime < openTime) {
      return { day: 'today', time: todayHours.open };
    }
  }
  
  // Check next 7 days
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (dayIndex + i) % 7;
    const nextDayHours = hours.find(h => h.day === days[nextDayIndex]);
    if (nextDayHours && !nextDayHours.closed) {
      return { 
        day: i === 1 ? 'tomorrow' : days[nextDayIndex], 
        time: nextDayHours.open 
      };
    }
  }
  
  return null;
}

export function getTodayHours(hours: PantryHours[]): PantryHours | null {
  const now = new Date();
  const dayIndex = now.getDay();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = days[dayIndex];
  
  return hours.find(h => h.day === currentDay) || null;
}

export function formatTime(time: string): string {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function sortPantriesByDistance(
  pantries: Pantry[],
  centerLat: number,
  centerLon: number
): (Pantry & { distance: number })[] {
  return pantries
    .map(pantry => ({
      ...pantry,
      distance: calculateDistance(centerLat, centerLon, pantry.latitude, pantry.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);
}

// ZIP code to approximate coordinates (Durham area)
export const zipCodeCoordinates: Record<string, { lat: number; lon: number }> = {
  '27701': { lat: 35.9940, lon: -78.8986 },
  '27702': { lat: 36.0167, lon: -78.8903 },
  '27703': { lat: 35.9616, lon: -78.8425 },
  '27704': { lat: 36.0361, lon: -78.8619 },
  '27705': { lat: 36.0256, lon: -78.9419 },
  '27706': { lat: 36.0017, lon: -78.9358 },
  '27707': { lat: 35.9508, lon: -78.9294 },
  '27708': { lat: 36.0047, lon: -78.9378 },
  '27709': { lat: 35.9082, lon: -78.8613 },
  '27710': { lat: 36.0017, lon: -78.9358 },
  '27711': { lat: 36.0361, lon: -78.8619 },
  '27712': { lat: 36.0700, lon: -78.9000 },
  '27713': { lat: 35.9100, lon: -78.9400 },
  '27715': { lat: 36.0017, lon: -78.9358 },
  '27717': { lat: 35.9940, lon: -78.8986 },
  '27722': { lat: 35.9940, lon: -78.8986 },
};
