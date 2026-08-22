import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Globe, { GlobeInstance } from 'globe.gl';
import * as THREE from 'three';
import {
  CountryData,
  LayerConfig,
  NaturalLandmark,
  WonderRecord,
  FlightArcData,
  MapFocusRequest
} from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { CONTINENTS_DATA } from '../../data/continents';
import { NATURAL_LANDMARKS } from '../../data/nature';
import { GeoJSONData, GeoFeature, FALLBACK_GEOJSON } from '../../data/geoJsonData';
import { getGeoJSON } from '../../services/geoData';
import {
  VIETNAM_COORDINATES,
  matchCountryData,
  createDynamicCountryFromFeature
} from '../../utils/geoUtils';

interface GlobeSceneProps {
  selectedCountry: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  hoveredCountry: CountryData | null;
  setHoveredCountry: (country: CountryData | null) => void;
  layers: LayerConfig;
  activeContinent: string | null;
  activeLandmark: NaturalLandmark | null;
  onSelectLandmark: (landmark: NaturalLandmark | null) => void;
  activeWonder: WonderRecord | null;
  flightArc: FlightArcData | null;
  isTeacherMode?: boolean;
  borderOnlyMode?: boolean;
  hideLabels?: boolean;
  onGlobeCountryClick?: (countryId: string, countryObj?: CountryData) => void;
  highlightedCountryIds?: string[];
  targetCountryId?: string | null;
  mapFocusRequest?: MapFocusRequest | null;
}

// Global cached ThreeJS sprites to avoid regenerating canvas textures on every frame
const spriteCache = new Map<string, THREE.Sprite>();

// Texture path definitions with BASE_URL support & remote fallback
const BASE_PATH = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const EARTH_TEXTURE_LOCAL = `${BASE_PATH}assets/earth/earth-blue-marble.jpg`;
const EARTH_BUMP_LOCAL = `${BASE_PATH}assets/earth/earth-topology.png`;
const SPACE_TEXTURE_LOCAL = `${BASE_PATH}assets/earth/night-sky.png`;

const EARTH_TEXTURE_REMOTE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const EARTH_BUMP_REMOTE = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
const SPACE_TEXTURE_REMOTE = 'https://unpkg.com/three-globe/example/img/night-sky.png';

// Async helper to validate image availability
async function checkImage(url: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => {
      console.warn(`[Globe] Không thể tải texture: ${url}`);
      resolve(false);
    };
    img.src = url;
  });
}

// Major countries shown in Far zoom LOD (Level of Detail)
const MAJOR_LOD_COUNTRIES = new Set([
  'vietnam',
  'china',
  'russia',
  'usa',
  'brazil',
  'australia',
  'india',
  'egypt',
  'japan',
  'canada',
  'france',
  'germany',
  'uk',
  'south_africa',
  'indonesia',
  'argentina',
  'italy',
  'mexico',
  'saudi_arabia',
  'korea_south'
]);

// Helper to generate crisp 2D Canvas Sprites for 3D globe labels
function createMarkerSprite(params: {
  id: string;
  type: 'country' | 'landmark';
  nameVi: string;
  categoryIcon?: string;
  isSelected?: boolean;
  isVietnam?: boolean;
}): THREE.Sprite {
  const { id, type, nameVi, categoryIcon, isSelected, isVietnam } = params;
  const isLandmark = type === 'landmark';
  const icon = isLandmark ? (categoryIcon || '🏔️') : (isVietnam ? '⭐' : '');

  const cacheKey = `${id}-${nameVi}-${icon}-${isSelected ? '1' : '0'}-${isVietnam ? '1' : '0'}`;
  const cached = spriteCache.get(cacheKey);
  if (cached) {
    return cached.clone();
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Sprite();

  const scale = 3; // 3x Supersampling for ultra-crisp typography
  const fontSize = (isSelected ? 20 : (isVietnam ? 19 : (isLandmark ? 17 : 16))) * scale;
  const font = `bold ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.font = font;

  const text = nameVi;
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;

  const paddingX = 14 * scale;
  const paddingY = 8 * scale;
  const dotRadius = 4.5 * scale;
  const iconSize = isLandmark ? 18 * scale : (isVietnam ? 18 * scale : 0);
  const spacing = 8 * scale;

  const width = textWidth + paddingX * 2 + (isLandmark || isVietnam ? iconSize + spacing : dotRadius * 2 + spacing);
  const height = fontSize + paddingY * 2;

  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);

  ctx.font = font;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Draw Pill Background
  ctx.save();
  const radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.arc(width - radius, radius, radius, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(radius, height);
  ctx.arc(radius, radius, radius, Math.PI / 2, -Math.PI / 2);
  ctx.closePath();

  if (isSelected) {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.95)';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3 * scale;
  } else if (isVietnam) {
    ctx.fillStyle = 'rgba(185, 28, 28, 0.92)';
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.5 * scale;
  } else if (isLandmark) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
    ctx.lineWidth = 2 * scale;
  } else {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5 * scale;
  }

  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 8 * scale;
  ctx.shadowOffsetY = 2 * scale;
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  let drawX = paddingX;

  // Draw Icon or Dot
  if (isLandmark && icon) {
    ctx.save();
    ctx.font = `${fontSize - 2 * scale}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, drawX, height / 2);
    ctx.restore();
    drawX += iconSize + spacing;
  } else if (isVietnam) {
    ctx.save();
    ctx.font = `${fontSize - 2 * scale}px sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('⭐', drawX, height / 2);
    ctx.restore();
    drawX += iconSize + spacing;
  } else {
    ctx.save();
    ctx.beginPath();
    ctx.arc(drawX + dotRadius, height / 2, dotRadius, 0, Math.PI * 2);
    if (isSelected) {
      ctx.fillStyle = '#020617';
    } else {
      ctx.fillStyle = '#38bdf8';
    }
    ctx.fill();
    ctx.restore();
    drawX += dotRadius * 2 + spacing;
  }

  // Draw Vietnamese Text
  ctx.save();
  ctx.font = font;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  if (isSelected) {
    ctx.fillStyle = '#020617';
  } else if (isVietnam) {
    ctx.fillStyle = '#ffffff';
  } else if (isLandmark) {
    ctx.fillStyle = '#fef08a';
  } else {
    ctx.fillStyle = '#f8fafc';
  }
  ctx.fillText(text, drawX, height / 2);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false
  });

  const sprite = new THREE.Sprite(material);
  const aspect = (width) / (height);
  const baseScale = isSelected ? 4.8 : (isVietnam ? 4.4 : (isLandmark ? 3.8 : 3.6));
  sprite.scale.set(baseScale * aspect, baseScale, 1);

  spriteCache.set(cacheKey, sprite);
  return sprite.clone();
}

// Helper to extract polygon boundary rings from a GeoJSON feature
function extractFeaturePaths(feature: GeoFeature): Array<Array<[number, number]>> {
  if (!feature || !feature.geometry) return [];
  const { type, coordinates } = feature.geometry;
  const result: Array<Array<[number, number]>> = [];

  if (type === 'Polygon') {
    const coords = coordinates as number[][][];
    if (Array.isArray(coords)) {
      coords.forEach((ring) => {
        if (Array.isArray(ring) && ring.length > 2) {
          result.push(ring.map(([lng, lat]) => [lat, lng]));
        }
      });
    }
  } else if (type === 'MultiPolygon') {
    const coords = coordinates as number[][][][];
    if (Array.isArray(coords)) {
      coords.forEach((poly) => {
        if (Array.isArray(poly)) {
          poly.forEach((ring) => {
            if (Array.isArray(ring) && ring.length > 2) {
              result.push(ring.map(([lng, lat]) => [lat, lng]));
            }
          });
        }
      });
    }
  }
  return result;
}

export const GlobeScene: React.FC<GlobeSceneProps> = ({
  selectedCountry,
  onSelectCountry,
  hoveredCountry,
  setHoveredCountry,
  layers,
  activeContinent,
  activeLandmark,
  onSelectLandmark,
  activeWonder,
  flightArc,
  borderOnlyMode = false,
  hideLabels = false,
  onGlobeCountryClick,
  highlightedCountryIds = [],
  targetCountryId = null,
  mapFocusRequest = null
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [geoData, setGeoData] = useState<GeoJSONData>(FALLBACK_GEOJSON);
  const [isGlobeReady, setIsGlobeReady] = useState<boolean>(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredPolygon, setHoveredPolygon] = useState<GeoFeature | null>(null);
  const [currentZoomAltitude, setCurrentZoomAltitude] = useState<number>(2.1);
  const [currentPovLat, setCurrentPovLat] = useState<number>(VIETNAM_COORDINATES.lat);
  const [currentPovLng, setCurrentPovLng] = useState<number>(VIETNAM_COORDINATES.lng);

  // Synchronize latest props and state to refs to prevent stale closure inside globe.gl callbacks
  const selectedCountryRef = useRef(selectedCountry);
  selectedCountryRef.current = selectedCountry;

  const highlightedCountryIdsRef = useRef(highlightedCountryIds);
  highlightedCountryIdsRef.current = highlightedCountryIds;

  const targetCountryIdRef = useRef(targetCountryId);
  targetCountryIdRef.current = targetCountryId;

  const hoveredPolygonRef = useRef(hoveredPolygon);
  hoveredPolygonRef.current = hoveredPolygon;

  const activeContinentRef = useRef(activeContinent);
  activeContinentRef.current = activeContinent;

  const borderOnlyModeRef = useRef(borderOnlyMode);
  borderOnlyModeRef.current = borderOnlyMode;

  const layersRef = useRef(layers);
  layersRef.current = layers;

  const onSelectCountryRef = useRef(onSelectCountry);
  onSelectCountryRef.current = onSelectCountry;

  const onGlobeCountryClickRef = useRef(onGlobeCountryClick);
  onGlobeCountryClickRef.current = onGlobeCountryClick;

  const onSelectLandmarkRef = useRef(onSelectLandmark);
  onSelectLandmarkRef.current = onSelectLandmark;

  const setHoveredCountryRef = useRef(setHoveredCountry);
  setHoveredCountryRef.current = setHoveredCountry;

  // Load comprehensive world GeoJSON with cached service
  useEffect(() => {
    let isMounted = true;
    getGeoJSON().then((data) => {
      if (isMounted && data && data.features && data.features.length > 0) {
        setGeoData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  interface GlobeMarkerItem {
    id: string;
    type: 'country' | 'landmark';
    lat: number;
    lng: number;
    altitude: number;
    nameVi: string;
    nameEn?: string;
    flag?: string;
    categoryIcon?: string;
    isSelected?: boolean;
    isVietnam?: boolean;
    country?: CountryData;
    landmark?: NaturalLandmark;
  }

  // Combined markers with Level of Detail (LOD) using priority scoring system
  const markersData = useMemo<GlobeMarkerItem[]>(() => {
    const list: GlobeMarkerItem[] = [];

    // 1. Country markers & labels with Priority-Scored LOD filtering
    if (!hideLabels && layers.countryLabels) {
      // Determine max label count based on zoom level
      let maxCountryLabels = 10; // Far zoom (altitude > 1.95)
      if (currentZoomAltitude <= 1.15) {
        maxCountryLabels = 25; // Close zoom
      } else if (currentZoomAltitude <= 1.95) {
        maxCountryLabels = 16; // Medium zoom
      }

      // Score all countries
      const scoredCountries = Object.values(COUNTRIES_DATA).map(c => {
        let score = 0;
        const isSelected = selectedCountry?.id === c.id;
        const isHovered = hoveredCountry?.id === c.id;
        const isVietnam = c.id === 'vietnam';
        const isInActiveContinent = activeContinent ? c.continentId === activeContinent : false;
        const isMajor = MAJOR_LOD_COUNTRIES.has(c.id);

        if (isSelected) score += 100;
        if (isHovered) score += 90;
        if (isVietnam) score += 80;
        if (isInActiveContinent) score += 50;
        if (isMajor) score += 30;

        // Angular distance to camera center point: +20 for countries facing the camera
        const latRad1 = (c.lat * Math.PI) / 180;
        const latRad2 = (currentPovLat * Math.PI) / 180;
        const dLngRad = ((c.lng - currentPovLng) * Math.PI) / 180;
        const cosAngle = Math.sin(latRad1) * Math.sin(latRad2) + Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(dLngRad);

        if (cosAngle > 0.45) {
          score += 20;
        } else if (cosAngle > 0) {
          score += 10;
        }

        // Large area / prominent population
        if (['russia', 'china', 'usa', 'canada', 'brazil', 'australia', 'india', 'argentina', 'algeria', 'indonesia', 'france', 'germany', 'japan'].includes(c.id)) {
          score += 10;
        }

        return {
          country: c,
          score,
          isSelected,
          isHovered,
          isVietnam,
          isInActiveContinent
        };
      });

      // Sort descending by score
      scoredCountries.sort((a, b) => b.score - a.score);

      // Selected country, hovered country, and Vietnam are unconditionally preserved
      const essentialItems = scoredCountries.filter(item => item.isSelected || item.isHovered || item.isVietnam);
      const remainingItems = scoredCountries.filter(item => !item.isSelected && !item.isHovered && !item.isVietnam);

      const availableSlots = Math.max(0, maxCountryLabels - essentialItems.length);
      const visibleCountryItems = [...essentialItems, ...remainingItems.slice(0, availableSlots)];

      visibleCountryItems.forEach(({ country: c, isSelected, isVietnam }) => {
        list.push({
          id: `country-${c.id}`,
          type: 'country',
          lat: c.lat,
          lng: c.lng,
          altitude: isSelected ? 0.025 : (isVietnam ? 0.018 : 0.012),
          nameVi: c.nameVi,
          nameEn: c.nameEn,
          flag: c.flag,
          isSelected,
          isVietnam,
          country: c
        });
      });
    }

    // 2. Natural Landmarks
    NATURAL_LANDMARKS.forEach(item => {
      let isVisible = false;

      if (item.category === 'mountain' && layers.mountains) isVisible = true;
      else if (item.category === 'river' && layers.rivers) isVisible = true;
      else if (item.category === 'desert' && layers.deserts) isVisible = true;
      else if (item.category === 'forest' && layers.forests) isVisible = true;
      else if (item.category === 'volcano' && layers.volcanoes) isVisible = true;
      else if (item.category === 'ocean' && layers.oceans) isVisible = true;

      if (isVisible) {
        const isSelected = activeLandmark?.id === item.id;
        list.push({
          id: `landmark-${item.id}`,
          type: 'landmark',
          lat: item.lat,
          lng: item.lng,
          altitude: isSelected ? 0.04 : 0.02,
          nameVi: item.nameVi,
          categoryIcon: item.categoryIcon,
          isSelected,
          landmark: item
        });
      }
    });

    return list;
  }, [
    layers,
    hideLabels,
    selectedCountry,
    hoveredCountry,
    activeContinent,
    activeLandmark,
    currentZoomAltitude,
    currentPovLat,
    currentPovLng
  ]);

  // Rings data for highlight effect
  const ringsData = useMemo(() => {
    const rings: Array<{ lat: number; lng: number; maxR: number; propagationSpeed: number; repeatPeriod: number; color: string }> = [];

    // Highlight Vietnam when selected or during a flight from Vietnam
    if (selectedCountry?.id === 'vietnam' || flightArc) {
      rings.push({
        lat: VIETNAM_COORDINATES.lat,
        lng: VIETNAM_COORDINATES.lng,
        maxR: 3.5,
        propagationSpeed: 1.6,
        repeatPeriod: 1200,
        color: '#ef4444'
      });
    }

    // Highlight selected country if different from Vietnam
    if (selectedCountry && selectedCountry.id !== 'vietnam') {
      rings.push({
        lat: selectedCountry.lat,
        lng: selectedCountry.lng,
        maxR: 4.0,
        propagationSpeed: 1.8,
        repeatPeriod: 1100,
        color: '#38bdf8'
      });
    }

    // Highlight active natural landmark or wonder
    if (activeLandmark) {
      rings.push({
        lat: activeLandmark.lat,
        lng: activeLandmark.lng,
        maxR: 3.0,
        propagationSpeed: 2.0,
        repeatPeriod: 900,
        color: '#f43f5e'
      });
    } else if (activeWonder) {
      rings.push({
        lat: activeWonder.lat,
        lng: activeWonder.lng,
        maxR: 3.8,
        propagationSpeed: 2.0,
        repeatPeriod: 950,
        color: '#eab308'
      });
    }

    return rings;
  }, [selectedCountry, flightArc, activeLandmark, activeWonder]);

  // Find country data from a GeoFeature
  const getCountryFromFeature = useCallback((feature: GeoFeature): CountryData | null => {
    const props = feature.properties || {};
    const nameStr = (props.NAME || props.ADMIN || props.name || props.SOVEREIGNT || props.NAME_LONG || props.id || '') as string;
    const iso2 = (props.ISO_A2 || props.iso_a2 || props.WB_A2 || '') as string;
    const iso3 = (props.ISO_A3 || props.iso_a3 || props.ADM0_A3 || props.SOV_A3 || props.GU_A3 || props.WB_A3 || '') as string;
    const continent = (props.CONTINENT || props.continent || '') as string;

    const matched =
      matchCountryData(nameStr) ||
      matchCountryData(iso3) ||
      (iso2 && iso2 !== '-99' ? matchCountryData(iso2) : undefined) ||
      matchCountryData(props.SOVEREIGNT as string) ||
      matchCountryData(props.ADMIN as string) ||
      matchCountryData(props.NAME_LONG as string);

    if (matched) return matched;

    // Calculate approximate center from polygon coordinates
    let centerLat = 0;
    let centerLng = 0;
    try {
      if (feature.geometry && feature.geometry.coordinates) {
        const coords = feature.geometry.coordinates;
        const ring = Array.isArray(coords[0]) && Array.isArray(coords[0][0])
          ? (coords[0] as number[][])
          : (Array.isArray(coords[0]) ? (coords as unknown as number[][]) : []);
        if (ring.length > 0) {
          const sample = ring.slice(0, 10);
          const sumLng = sample.reduce((acc, pt) => acc + (pt[0] || 0), 0);
          const sumLat = sample.reduce((acc, pt) => acc + (pt[1] || 0), 0);
          centerLng = Math.round((sumLng / sample.length) * 100) / 100;
          centerLat = Math.round((sumLat / sample.length) * 100) / 100;
        }
      }
    } catch {
      // ignore
    }

    if (nameStr) {
      return createDynamicCountryFromFeature(nameStr, iso2, iso3, continent, centerLat, centerLng);
    }
    return null;
  }, []);

  // Boundary glow paths, Equator, Tropics, and Graticules
  const pathsData = useMemo(() => {
    const paths: Array<{
      coords: Array<[number, number]>;
      color: string;
      stroke: number;
      alt?: number;
      dashLength?: number;
      dashGap?: number;
      animateTime?: number;
      name?: string;
    }> = [];

    // 1. Dynamic Glowing Contour for Hovered Country
    if (hoveredPolygon) {
      const rings = extractFeaturePaths(hoveredPolygon);
      rings.forEach((ring) => {
        paths.push({
          coords: ring,
          color: 'rgba(56, 189, 248, 0.75)',
          stroke: 3.2,
          alt: 0.016,
          dashLength: 1,
          dashGap: 0,
          animateTime: 0
        });
        paths.push({
          coords: ring,
          color: '#ffffff',
          stroke: 1.4,
          alt: 0.018,
          dashLength: 1,
          dashGap: 0,
          animateTime: 0
        });
      });
    }

    // 2. Viền phát sáng cho quốc gia đang được chọn
    if (selectedCountry && (!hoveredPolygon || getCountryFromFeature(hoveredPolygon)?.id !== selectedCountry.id)) {
      const selectedFeature = geoData.features.find((f) => {
        const c = getCountryFromFeature(f);
        return c && c.id === selectedCountry.id;
      });
      if (selectedFeature) {
        const rings = extractFeaturePaths(selectedFeature);
        rings.forEach((ring) => {
          paths.push({
            coords: ring,
            color: 'rgba(14, 165, 233, 0.65)',
            stroke: 2.8,
            alt: 0.014,
            dashLength: 1,
            dashGap: 0,
            animateTime: 0
          });
          paths.push({
            coords: ring,
            color: '#38bdf8',
            stroke: 1.3,
            alt: 0.016,
            dashLength: 1,
            dashGap: 0,
            animateTime: 0
          });
        });
      }
    }

    // 3. Equator (Đường Xích đạo 0°)
    if (layers.equator) {
      const equatorCoords: Array<[number, number]> = [];
      for (let lng = -180; lng <= 180; lng += 4) {
        equatorCoords.push([0, lng]);
      }
      paths.push({
        coords: equatorCoords,
        color: '#fbbf24',
        stroke: 2.2,
        alt: 0.004,
        name: 'Đường Xích Đạo (0°)'
      });
    }

    // 4. Tropics (Chí tuyến Bắc / Nam)
    if (layers.tropics) {
      const tropicCancerCoords: Array<[number, number]> = [];
      const tropicCapCoords: Array<[number, number]> = [];
      for (let lng = -180; lng <= 180; lng += 4) {
        tropicCancerCoords.push([23.4365, lng]);
        tropicCapCoords.push([-23.4365, lng]);
      }
      paths.push({
        coords: tropicCancerCoords,
        color: '#38bdf8',
        stroke: 1.2,
        alt: 0.004,
        name: 'Chí tuyến Bắc (23.5° Bắc)'
      });
      paths.push({
        coords: tropicCapCoords,
        color: '#38bdf8',
        stroke: 1.2,
        alt: 0.004,
        name: 'Chí tuyến Nam (23.5° Nam)'
      });
    }

    // 5. Prime Meridian (Kinh tuyến gốc 0°)
    if (layers.primeMeridian) {
      const primeMeridianCoords: Array<[number, number]> = [];
      for (let lat = 90; lat >= -90; lat -= 2) {
        primeMeridianCoords.push([lat, 0]);
      }
      paths.push({
        coords: primeMeridianCoords,
        color: '#10b981',
        stroke: 2.2,
        alt: 0.004,
        name: 'Kinh tuyến gốc (0° Greenwich)'
      });
    }

    // 6. Graticules (Lưới kinh - vĩ tuyến)
    if (layers.graticules) {
      const latSteps = [-75, -60, -45, -30, -15, 15, 30, 45, 60, 75];
      latSteps.forEach((latVal) => {
        const parallelCoords: Array<[number, number]> = [];
        for (let lng = -180; lng <= 180; lng += 6) {
          parallelCoords.push([latVal, lng]);
        }
        paths.push({
          coords: parallelCoords,
          color: 'rgba(255, 255, 255, 0.22)',
          stroke: 0.8,
          alt: 0.003
        });
      });

      const lngSteps = [-150, -120, -90, -60, -30, 30, 60, 90, 120, 150, 180];
      lngSteps.forEach((lngVal) => {
        const meridianCoords: Array<[number, number]> = [];
        for (let lat = 90; lat >= -90; lat -= 4) {
          meridianCoords.push([lat, lngVal]);
        }
        paths.push({
          coords: meridianCoords,
          color: 'rgba(255, 255, 255, 0.22)',
          stroke: 0.8,
          alt: 0.003
        });
      });
    }

    return paths;
  }, [
    hoveredPolygon,
    selectedCountry,
    geoData,
    layers.equator,
    layers.tropics,
    layers.primeMeridian,
    layers.graticules,
    getCountryFromFeature
  ]);

  // Flight Arcs data
  const arcsData = useMemo(() => {
    if (!flightArc) return [];
    return [
      {
        startLat: flightArc.startLat,
        startLng: flightArc.startLng,
        endLat: flightArc.endLat,
        endLng: flightArc.endLng,
        color: flightArc.color || ['#ef4444', '#38bdf8'],
        stroke: 1.8
      }
    ];
  }, [flightArc]);

  // Initialize Globe
  useEffect(() => {
    if (!containerRef.current) return;

    const handleCountryClick = (c: CountryData) => {
      if (onGlobeCountryClickRef.current) {
        onGlobeCountryClickRef.current(c.id, c);
      } else if (onSelectCountryRef.current) {
        onSelectCountryRef.current(c);
      }
    };

    // Clean up any existing children in container before mounting
    containerRef.current.innerHTML = '';

    // Create globe instance via Globe factory function (Kapsule pattern)
    const globeFactory = Globe as unknown as (options?: object) => (element: HTMLElement) => GlobeInstance;
    const initWidth = containerRef.current.clientWidth || window.innerWidth;
    const initHeight = containerRef.current.clientHeight || window.innerHeight;

    const globe = globeFactory({
      animateIn: false,
      waitForGlobeReady: false,
      rendererConfig: { antialias: true, alpha: true }
    })(containerRef.current)
      .width(initWidth)
      .height(initHeight)
      .globeImageUrl(EARTH_TEXTURE_LOCAL)
      .bumpImageUrl(EARTH_BUMP_LOCAL)
      .backgroundImageUrl(SPACE_TEXTURE_LOCAL)
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#38bdf8')
      .atmosphereAltitude(0.15)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .polygonGeoJsonGeometry(((d: unknown) => (d as GeoFeature).geometry) as any)
      .polygonsTransitionDuration(200)
      .polygonAltitude((d: unknown) => {
        const feature = d as GeoFeature;
        const c = getCountryFromFeature(feature);
        if (targetCountryIdRef.current && c && c.id === targetCountryIdRef.current) return 0.007;
        if (highlightedCountryIdsRef.current && c && highlightedCountryIdsRef.current.includes(c.id)) return 0.005;
        if (feature === hoveredPolygonRef.current) return 0.004;
        if (c && selectedCountryRef.current && c.id === selectedCountryRef.current.id) return 0.006;
        return 0.0005;
      })
      .polygonCapColor((d: unknown) => {
        const feature = d as GeoFeature;
        const c = getCountryFromFeature(feature);

        if (borderOnlyModeRef.current) {
          return 'rgba(0, 0, 0, 0)';
        }

        if (targetCountryIdRef.current && c && c.id === targetCountryIdRef.current) {
          return 'rgba(234, 179, 8, 0.45)';
        }

        if (c && c.id === 'vietnam' && highlightedCountryIdsRef.current?.includes('vietnam')) {
          return 'rgba(239, 68, 68, 0.45)';
        }

        if (highlightedCountryIdsRef.current && c && highlightedCountryIdsRef.current.includes(c.id)) {
          return 'rgba(245, 158, 11, 0.38)';
        }

        if (feature === hoveredPolygonRef.current) {
          return 'rgba(56, 189, 248, 0.18)';
        }

        if (c && selectedCountryRef.current && c.id === selectedCountryRef.current.id) {
          return 'rgba(14, 165, 233, 0.28)';
        }

        if (activeContinentRef.current && c && c.continentId === activeContinentRef.current) {
          return 'rgba(16, 185, 129, 0.22)';
        }

        return 'rgba(0, 0, 0, 0.01)';
      })
      .polygonSideColor((d: unknown) => {
        const feature = d as GeoFeature;
        const c = getCountryFromFeature(feature);

        if (borderOnlyModeRef.current) {
          return 'rgba(0, 0, 0, 0)';
        }

        if (targetCountryIdRef.current && c && c.id === targetCountryIdRef.current) {
          return 'rgba(234, 179, 8, 0.5)';
        }

        if (c && c.id === 'vietnam' && highlightedCountryIdsRef.current?.includes('vietnam')) {
          return 'rgba(239, 68, 68, 0.5)';
        }

        if (highlightedCountryIdsRef.current && c && highlightedCountryIdsRef.current.includes(c.id)) {
          return 'rgba(245, 158, 11, 0.45)';
        }

        if (feature === hoveredPolygonRef.current) {
          return 'rgba(56, 189, 248, 0.25)';
        }
        if (c && selectedCountryRef.current && c.id === selectedCountryRef.current.id) {
          return 'rgba(14, 165, 233, 0.3)';
        }
        return 'rgba(0, 0, 0, 0)';
      })
      .polygonStrokeColor((d: unknown) => {
        const feature = d as GeoFeature;
        const c = getCountryFromFeature(feature);
        if (targetCountryIdRef.current && c && c.id === targetCountryIdRef.current) {
          return '#fde047';
        }
        if (c && c.id === 'vietnam' && highlightedCountryIdsRef.current?.includes('vietnam')) {
          return '#ef4444';
        }
        if (highlightedCountryIdsRef.current && c && highlightedCountryIdsRef.current.includes(c.id)) {
          return '#f59e0b';
        }
        if (feature === hoveredPolygonRef.current) {
          return '#38bdf8';
        }
        if (c && selectedCountryRef.current && c.id === selectedCountryRef.current.id) {
          return '#38bdf8';
        }
        return layersRef.current.countryBorders ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0)';
      })
      .onPolygonHover((polygon: object | null) => {
        const feature = polygon as GeoFeature | null;
        hoveredPolygonRef.current = feature;
        setHoveredPolygon(feature);
        if (containerRef.current) {
          containerRef.current.style.cursor = feature ? 'pointer' : 'grab';
        }
        if (feature) {
          const c = getCountryFromFeature(feature);
          if (setHoveredCountryRef.current) {
            setHoveredCountryRef.current(c);
          }
        } else {
          if (setHoveredCountryRef.current) {
            setHoveredCountryRef.current(null);
          }
        }
      })
      .onPolygonClick((polygon: object) => {
        const feature = polygon as GeoFeature;
        const c = getCountryFromFeature(feature);
        if (c) {
          handleCountryClick(c);
        }
      });

    // Arcs settings
    globe
      .arcColor('color')
      .arcStroke('stroke')
      .arcDashLength(0.4)
      .arcDashGap(0.15)
      .arcDashAnimateTime(2200)
      .arcAltitude(0.25);

    globe.labelsData([]);
    globe.htmlElementsData([]);

    // Sprites for Country labels & landmarks
    globe
      .objectsData(markersData)
      .objectLat('lat')
      .objectLng('lng')
      .objectAltitude('altitude')
      .objectFacesSurface(false)
      .objectThreeObject((d: unknown) => {
        return createMarkerSprite(d as {
          id: string;
          type: 'country' | 'landmark';
          nameVi: string;
          categoryIcon?: string;
          isSelected?: boolean;
          isVietnam?: boolean;
        });
      })
      .onObjectClick((obj: unknown) => {
        const item = obj as GlobeMarkerItem;
        if (item.type === 'country' && item.country) {
          handleCountryClick(item.country);
        } else if (item.type === 'landmark' && item.landmark && onSelectLandmarkRef.current) {
          onSelectLandmarkRef.current(item.landmark);
        }
      })
      .onObjectHover((obj: unknown) => {
        if (containerRef.current) {
          containerRef.current.style.cursor = obj ? 'pointer' : 'default';
        }
      });

    // Rings settings
    globe
      .ringColor('color')
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod');

    // Paths settings
    globe
      .pathPoints('coords')
      .pathPointLat((p: unknown) => (p as [number, number])[0])
      .pathPointLng((p: unknown) => (p as [number, number])[1])
      .pathPointAlt((d: unknown) => {
        const pathItem = d as { alt?: number };
        return pathItem.alt !== undefined ? pathItem.alt : 0.005;
      })
      .pathColor('color')
      .pathStroke('stroke')
      .pathDashLength((d: unknown) => {
        const pathItem = d as { dashLength?: number };
        return pathItem.dashLength !== undefined ? pathItem.dashLength : 1;
      })
      .pathDashGap((d: unknown) => {
        const pathItem = d as { dashGap?: number };
        return pathItem.dashGap !== undefined ? pathItem.dashGap : 0;
      })
      .pathDashAnimateTime((d: unknown) => {
        const pathItem = d as { animateTime?: number };
        return pathItem.animateTime !== undefined ? pathItem.animateTime : 0;
      });

    // Initial camera position centered near Vietnam
    globe.pointOfView(
      {
        lat: VIETNAM_COORDINATES.lat,
        lng: VIETNAM_COORDINATES.lng,
        altitude: 2.1
      },
      0
    );

    // Enable soft rotation when idle
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.minDistance = 120;
    controls.maxDistance = 600;

    // Track zoom altitude & POV for LOD labels
    let zoomDebounce: NodeJS.Timeout | null = null;
    const handleControlsChange = () => {
      if (zoomDebounce) clearTimeout(zoomDebounce);
      zoomDebounce = setTimeout(() => {
        if (globeRef.current) {
          const pov = globeRef.current.pointOfView();
          setCurrentZoomAltitude(pov.altitude);
          setCurrentPovLat(pov.lat);
          setCurrentPovLng(pov.lng);
        }
      }, 100);
    };
    controls.addEventListener('change', handleControlsChange);

    const handleControlsStart = () => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = false;
      }
    };
    controls.addEventListener('start', handleControlsStart);

    globeRef.current = globe;
    try {
      globe.scene().visible = true;
      globe.resumeAnimation();
    } catch {
      // ignore
    }
    setIsGlobeReady(true);

    // Verify textures in background and fallback to remote if local fails
    (async () => {
      const earthOk = await checkImage(EARTH_TEXTURE_LOCAL);
      if (!earthOk) {
        console.error('[Globe] Earth texture failed to load from local, switching to remote fallback');
        globe.globeImageUrl(EARTH_TEXTURE_REMOTE);
      }

      const bumpOk = await checkImage(EARTH_BUMP_LOCAL);
      if (!bumpOk) {
        console.warn('[Globe] Earth bump texture failed to load from local, checking remote fallback');
        const remoteBumpOk = await checkImage(EARTH_BUMP_REMOTE);
        if (remoteBumpOk) {
          globe.bumpImageUrl(EARTH_BUMP_REMOTE);
        } else {
          // If bump fails completely, remove bump without breaking primary globe texture
          globe.bumpImageUrl(null as unknown as string);
        }
      }

      const spaceOk = await checkImage(SPACE_TEXTURE_LOCAL);
      if (!spaceOk) {
        console.warn('[Globe] Space background failed to load from local, switching to remote fallback');
        globe.backgroundImageUrl(SPACE_TEXTURE_REMOTE);
      }
    })();

    const handleResize = () => {
      if (containerRef.current && globeRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          globeRef.current.width(clientWidth);
          globeRef.current.height(clientHeight);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    const rafId = requestAnimationFrame(handleResize);
    const initialResizeTimer = setTimeout(handleResize, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(initialResizeTimer);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleControlsStart);
      controls.removeEventListener('change', handleControlsChange);
      if (zoomDebounce) clearTimeout(zoomDebounce);
      if (globeRef.current) {
        globeRef.current._destructor?.();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update GeoData and Polygons
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady) return;
    globeRef.current.polygonsData(geoData.features);
  }, [geoData, isGlobeReady]);

  // Update Dynamic Layers
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady) return;

    globeRef.current
      .arcsData(arcsData)
      .labelsData([])
      .ringsData(ringsData)
      .pathsData(pathsData)
      .htmlElementsData([])
      .objectsData(markersData);

    globeRef.current.polygonCapColor(globeRef.current.polygonCapColor());
    globeRef.current.polygonSideColor(globeRef.current.polygonSideColor());
    globeRef.current.polygonStrokeColor(globeRef.current.polygonStrokeColor());
    globeRef.current.polygonAltitude(globeRef.current.polygonAltitude());
  }, [
    arcsData,
    markersData,
    ringsData,
    pathsData,
    selectedCountry,
    activeContinent,
    hoveredPolygon,
    borderOnlyMode,
    highlightedCountryIds,
    targetCountryId,
    layers,
    isGlobeReady
  ]);

  // Handle external map focus requests (e.g. from learning modules)
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady || !mapFocusRequest) return;

    const targetAlt = mapFocusRequest.altitude ?? 1.9;
    globeRef.current.controls().autoRotate = false;
    globeRef.current.pointOfView(
      {
        lat: mapFocusRequest.lat,
        lng: mapFocusRequest.lng,
        altitude: targetAlt
      },
      1200
    );
    setCurrentPovLat(mapFocusRequest.lat);
    setCurrentPovLng(mapFocusRequest.lng);
    setCurrentZoomAltitude(targetAlt);
  }, [mapFocusRequest, isGlobeReady]);

  // Fly to country when selected (with smooth camera sequence & altitude state sync)
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady) return;

    if (selectedCountry) {
      const targetAlt = selectedCountry.altitude || 1.75;
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        {
          lat: selectedCountry.lat,
          lng: selectedCountry.lng,
          altitude: targetAlt
        },
        1500
      );
      setCurrentPovLat(selectedCountry.lat);
      setCurrentPovLng(selectedCountry.lng);
      setCurrentZoomAltitude(targetAlt);

      // Post-fly safety sync after animation completes
      const timer = setTimeout(() => {
        if (globeRef.current) {
          const pov = globeRef.current.pointOfView();
          setCurrentZoomAltitude(pov.altitude);
          setCurrentPovLat(pov.lat);
          setCurrentPovLng(pov.lng);
        }
      }, 1550);
      return () => clearTimeout(timer);
    }
  }, [selectedCountry, isGlobeReady]);

  // Fly to landmark when selected
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady || !activeLandmark) return;

    const targetAlt = 1.6;
    globeRef.current.controls().autoRotate = false;
    globeRef.current.pointOfView(
      {
        lat: activeLandmark.lat,
        lng: activeLandmark.lng,
        altitude: targetAlt
      },
      1400
    );
    setCurrentPovLat(activeLandmark.lat);
    setCurrentPovLng(activeLandmark.lng);
    setCurrentZoomAltitude(targetAlt);
  }, [activeLandmark, isGlobeReady]);

  // Fly to continent when active
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady || !activeContinent) return;

    const cont = CONTINENTS_DATA[activeContinent];
    if (cont) {
      const targetAlt = cont.altitude || 2.3;
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        {
          lat: cont.lat,
          lng: cont.lng,
          altitude: targetAlt
        },
        1500
      );
      setCurrentPovLat(cont.lat);
      setCurrentPovLng(cont.lng);
      setCurrentZoomAltitude(targetAlt);
    }
  }, [activeContinent, isGlobeReady]);

  // Fly to wonder when active
  useEffect(() => {
    if (!globeRef.current || !isGlobeReady || !activeWonder) return;

    const targetAlt = 1.8;
    globeRef.current.controls().autoRotate = false;
    globeRef.current.pointOfView(
      {
        lat: activeWonder.lat,
        lng: activeWonder.lng,
        altitude: targetAlt
      },
      1400
    );
    setCurrentPovLat(activeWonder.lat);
    setCurrentPovLng(activeWonder.lng);
    setCurrentZoomAltitude(targetAlt);
  }, [activeWonder, isGlobeReady]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredCountry) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    } else {
      setTooltipPos(null);
    }
  };

  return (
    <div
      id="globe-container-wrapper"
      className="relative w-full h-full select-none overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"
      onMouseMove={handleMouseMove}
    >
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Scientific Minimalist Hover Tooltip */}
      {hoveredCountry && tooltipPos && (
        <div
          id="country-hover-tooltip"
          className="fixed pointer-events-none z-40 transform -translate-x-1/2 -translate-y-16 transition-all duration-75"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="flex flex-col items-center text-center px-4 py-2 bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-950/80 min-w-[100px] animate-in fade-in zoom-in-95 duration-100">
            <span className="text-2xl filter drop-shadow-md leading-none mb-1 select-none">
              {hoveredCountry.flag}
            </span>
            <span className="text-xs font-black tracking-wide text-white uppercase leading-tight">
              {hoveredCountry.nameVi}
            </span>
            <span className="text-[10px] text-cyan-300 font-semibold mt-0.5">
              {hoveredCountry.continent}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
