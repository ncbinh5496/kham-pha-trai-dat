import { FlightArcData } from '../../types';

export type ProjectionFn = (coords: [number, number]) => [number, number] | null;

/**
 * Creates an SVG path string for a latitude parallel line across longitudes
 */
export function createLatitudePath(
  projection: ProjectionFn,
  lat: number,
  step = 2,
  lngMin = -180,
  lngMax = 180
): string {
  const pts: [number, number][] = [];
  for (let lng = lngMin; lng <= lngMax; lng += step) {
    const p = projection([lng, lat]);
    if (p) pts.push(p);
  }
  return pts.length > 1 ? `M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}` : '';
}

/**
 * Creates an SVG path string for a longitude meridian line across latitudes
 */
export function createLongitudePath(
  projection: ProjectionFn,
  lng: number,
  step = 2,
  latMin = -85,
  latMax = 85
): string {
  const pts: [number, number][] = [];
  for (let lat = latMin; lat <= latMax; lat += step) {
    const p = projection([lng, lat]);
    if (p) pts.push(p);
  }
  return pts.length > 1 ? `M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}` : '';
}

/**
 * Generates graticule grid lines for 2D map
 */
export function generateGraticulePaths(projection: ProjectionFn): {
  latLines: string[];
  lngLines: string[];
} {
  const latLines: string[] = [];
  const lngLines: string[] = [];

  // Latitudes: -80 to 80 step 20 (excluding equator 0)
  for (let lat = -80; lat <= 80; lat += 20) {
    if (lat === 0) continue;
    const path = createLatitudePath(projection, lat, 3, -180, 180);
    if (path) latLines.push(path);
  }

  // Longitudes: -180 to 180 step 30 (excluding prime meridian 0)
  for (let lng = -180; lng <= 180; lng += 30) {
    if (lng === 0) continue;
    const path = createLongitudePath(projection, lng, 4, -80, 80);
    if (path) lngLines.push(path);
  }

  return { latLines, lngLines };
}

/**
 * Calculates curved flight trajectory in 2D projection
 */
export function calculateFlightArc2D(
  flightArc: FlightArcData | null,
  projection: ProjectionFn
): {
  path: string;
  p1: [number, number];
  p2: [number, number];
  midX: number;
  midY: number;
} | null {
  if (!flightArc) return null;
  const p1 = projection([flightArc.startLng, flightArc.startLat]);
  const p2 = projection([flightArc.endLng, flightArc.endLat]);
  if (!p1 || !p2) return null;

  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dist = Math.hypot(dx, dy);
  const midX = (p1[0] + p2[0]) / 2;
  const midY = (p1[1] + p2[1]) / 2 - Math.min(dist * 0.25, 80);

  return {
    path: `M ${p1[0]} ${p1[1]} Q ${midX} ${midY} ${p2[0]} ${p2[1]}`,
    p1,
    p2,
    midX,
    midY
  };
}
