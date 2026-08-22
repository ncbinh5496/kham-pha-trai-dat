import { GeoJSONData, FALLBACK_GEOJSON } from '../data/geoJsonData';

let geoDataPromise: Promise<GeoJSONData> | null = null;
let cachedGeoData: GeoJSONData | null = null;

/**
 * Loads world countries GeoJSON data with caching.
 * Prioritizes local asset, falls back to remote, then bundled fallback.
 * Guarantees a single fetch across both 3D Globe and 2D Map.
 */
export async function loadWorldGeoData(): Promise<GeoJSONData> {
  if (cachedGeoData) {
    return cachedGeoData;
  }
  if (geoDataPromise) {
    return geoDataPromise;
  }

  geoDataPromise = (async () => {
    // 1. Try local offline asset first
    try {
      const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      const localRes = await fetch(`${baseUrl}/assets/geo/countries.geojson`);
      if (localRes.ok) {
        const data = await localRes.json();
        if (data && data.features && data.features.length > 0) {
          cachedGeoData = data;
          return data;
        }
      }
    } catch {
      // Proceed to remote fallback
    }

    // 2. Try remote fallback
    try {
      const remoteRes = await fetch(
        'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
      );
      if (remoteRes.ok) {
        const data = await remoteRes.json();
        if (data && data.features && data.features.length > 0) {
          cachedGeoData = data;
          return data;
        }
      }
    } catch (err) {
      console.warn('Fallback to bundled GeoJSON data', err);
    }

    // 3. Bundled fallback
    cachedGeoData = FALLBACK_GEOJSON;
    return FALLBACK_GEOJSON;
  })();

  return geoDataPromise;
}

export const getGeoJSON = loadWorldGeoData;
