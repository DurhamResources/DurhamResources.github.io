'use client';

import { useEffect, useRef, useState } from 'react';
import { type Pantry } from '@/lib/data/pantries';
import { isPantryOpen } from '@/lib/pantry-utils';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PantryMapProps {
  pantries: (Pantry & { distance: number })[];
  center: { lat: number; lon: number };
  selectedPantryId?: string;
  onPantrySelect?: (pantryId: string | null) => void;
}

export function PantryMap({ pantries, center, selectedPantryId, onPantrySelect }: PantryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current!, {
        center: [center.lat, center.lon],
        zoom: zoom,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
      setIsMapReady(true);

      // Add markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      pantries.forEach((pantry) => {
        const isOpen = isPantryOpen(pantry.hours);
        const isSelected = pantry.id === selectedPantryId;

        const iconHtml = `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${isOpen ? 'bg-green-600' : 'bg-red-600'} text-white shadow-lg ${isSelected ? 'scale-125 ring-2 ring-white' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([pantry.latitude, pantry.longitude], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="p-2 min-w-[200px]">
              <h3 class="font-semibold text-sm mb-1">${pantry.name_en}</h3>
              <p class="text-xs text-gray-600 mb-2">${pantry.address}</p>
              <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                  ${isOpen ? 'Open Now' : 'Closed'}
                </span>
                <span class="text-xs text-gray-500">${pantry.distance.toFixed(1)} mi</span>
              </div>
              <a href="/pantry/${pantry.id}" class="text-xs text-blue-600 hover:underline">View Details</a>
            </div>
          `);

        marker.on('click', () => {
          onPantrySelect?.(pantry.id);
        });

        markersRef.current.push(marker);
      });

      map.on('zoomend', () => {
        setZoom(map.getZoom());
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center.lat, center.lon, pantries, selectedPantryId, onPantrySelect]);

  // Handle selected pantry change
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    if (selectedPantryId) {
      const pantry = pantries.find(p => p.id === selectedPantryId);
      if (pantry) {
        mapRef.current.flyTo([pantry.latitude, pantry.longitude], 14, {
          duration: 1,
        });
      }
    }
  }, [selectedPantryId, pantries, isMapReady]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleLocate = () => {
    if (mapRef.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 14);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-border">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Custom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={handleZoomIn}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={handleZoomOut}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md"
          onClick={handleLocate}
          aria-label="Find my location"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg text-sm z-[1000]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>Open Now</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span>Closed</span>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-2">
            <MapPin className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 0;
        }
        .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
