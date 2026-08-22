import * as THREE from 'three';
import { GeoFeature } from '../../data/geoJsonData';

export const BASE_PATH = import.meta.env.BASE_URL || '/';

export const EARTH_TEXTURE_LOCAL = `${BASE_PATH}assets/earth/earth-blue-marble.jpg`;
export const EARTH_BUMP_LOCAL = `${BASE_PATH}assets/earth/earth-topology.png`;
export const SPACE_TEXTURE_LOCAL = `${BASE_PATH}assets/earth/night-sky.png`;

export const EARTH_TEXTURE_REMOTE = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
export const EARTH_BUMP_REMOTE = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
export const SPACE_TEXTURE_REMOTE = 'https://unpkg.com/three-globe/example/img/night-sky.png';

// Async helper to validate image availability
export async function checkImage(url: string): Promise<boolean> {
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
export const MAJOR_LOD_COUNTRIES = new Set([
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

// Sprite cache for marker textures
const spriteCache = new Map<string, THREE.Sprite>();

// Helper to generate crisp 2D Canvas Sprites for 3D globe labels
export function createMarkerSprite(params: {
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
  const aspect = width / height;
  const baseScale = isSelected ? 4.8 : (isVietnam ? 4.4 : (isLandmark ? 3.8 : 3.6));
  sprite.scale.set(baseScale * aspect, baseScale, 1);

  spriteCache.set(cacheKey, sprite);
  return sprite.clone();
}

// Helper to extract polygon boundary rings from a GeoJSON feature
export function extractFeaturePaths(feature: GeoFeature): Array<Array<[number, number]>> {
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
