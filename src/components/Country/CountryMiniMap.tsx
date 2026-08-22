import React, { useMemo } from 'react';
import { FALLBACK_GEOJSON, GeoFeature } from '../../data/geoJsonData';
import { resolveCountryKey } from '../../utils/geoUtils';

interface CountryMiniMapProps {
  countryId: string;
  countryNameVi: string;
  geoData?: { features: GeoFeature[] } | null;
}

export const CountryMiniMap: React.FC<CountryMiniMapProps> = ({
  countryId,
  countryNameVi,
  geoData
}) => {
  const { pathData, viewBox, hasShape } = useMemo(() => {
    // 1. Find feature in provided geoData or fallback
    const resolvedId = resolveCountryKey(countryId) || countryId;
    const features = (geoData && geoData.features && geoData.features.length > 0)
      ? geoData.features
      : FALLBACK_GEOJSON.features;

    const feature = features.find(f => {
      const p = f.properties || {};
      const fId = (p.id || p.ISO_A3 || p.ISO_A2 || p.ADM0_A3 || p.name || '').toLowerCase();
      const code = (p.ISO_A2 || p.iso_a2 || '').toLowerCase();
      const name = (p.name || p.NAME || '').toLowerCase();

      return (
        fId === resolvedId.toLowerCase() ||
        fId === countryId.toLowerCase() ||
        code === countryId.toLowerCase() ||
        name.includes(countryId.toLowerCase()) ||
        name.includes(countryNameVi.toLowerCase())
      );
    });

    if (!feature || !feature.geometry) {
      return { pathData: '', viewBox: '0 0 100 100', hasShape: false };
    }

    const { type, coordinates } = feature.geometry;
    let polygons: number[][][][] = [];

    if (type === 'Polygon') {
      polygons = [coordinates as number[][][]];
    } else if (type === 'MultiPolygon') {
      polygons = coordinates as number[][][][];
    }

    if (polygons.length === 0) {
      return { pathData: '', viewBox: '0 0 100 100', hasShape: false };
    }

    // 2. Compute bounding box
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    polygons.forEach(poly => {
      poly.forEach(ring => {
        ring.forEach(([lng, lat]) => {
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        });
      });
    });

    if (minLng === Infinity || maxLng === -Infinity) {
      return { pathData: '', viewBox: '0 0 100 100', hasShape: false };
    }

    // Add 10% padding
    const lngSpan = Math.max(maxLng - minLng, 0.5);
    const latSpan = Math.max(maxLat - minLat, 0.5);
    const padLng = lngSpan * 0.12;
    const padLat = latSpan * 0.12;

    const bMinLng = minLng - padLng;
    const bMaxLng = maxLng + padLng;
    const bMinLat = minLat - padLat;
    const bMaxLat = maxLat + padLat;

    const width = bMaxLng - bMinLng;
    const height = bMaxLat - bMinLat;

    // 3. Convert coordinates to SVG path commands (Invert latitude so North is UP)
    const svgPaths: string[] = [];

    polygons.forEach(poly => {
      poly.forEach(ring => {
        if (!ring || ring.length < 3) return;
        const ringCmds: string[] = [];
        ring.forEach(([lng, lat], idx) => {
          // Normalize to [0, 100]
          const x = ((lng - bMinLng) / width) * 100;
          const y = ((bMaxLat - lat) / height) * 100; // Y is inverted in SVG
          const roundedX = Math.round(x * 10) / 10;
          const roundedY = Math.round(y * 10) / 10;

          if (idx === 0) {
            ringCmds.push(`M ${roundedX} ${roundedY}`);
          } else {
            ringCmds.push(`L ${roundedX} ${roundedY}`);
          }
        });
        ringCmds.push('Z');
        svgPaths.push(ringCmds.join(' '));
      });
    });

    return {
      pathData: svgPaths.join(' '),
      viewBox: '0 0 100 100',
      hasShape: svgPaths.length > 0
    };
  }, [countryId, countryNameVi, geoData]);

  if (!hasShape) {
    return null;
  }

  return (
    <div className="p-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
          <span>🗺️</span> Hình dáng trên bản đồ
        </span>
        <span className="text-[10px] text-slate-400 font-medium">Bản đồ 2D thu nhỏ</span>
      </div>

      <div className="relative w-full h-32 bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center p-2">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* 2D Country SVG shape */}
        <svg
          viewBox={viewBox}
          className="w-full h-full filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all"
        >
          <path
            d={pathData}
            fill="rgba(6, 182, 212, 0.25)"
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Compass indicator */}
        <div className="absolute bottom-1.5 right-2 text-[9px] font-bold text-cyan-400/70 flex flex-col items-center leading-none">
          <span>▲ B</span>
          <span className="text-[7px] text-slate-500 font-normal">Bắc</span>
        </div>
      </div>
    </div>
  );
};
