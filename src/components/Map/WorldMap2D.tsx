import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { geoNaturalEarth1, geoPath, GeoPermissibleObjects } from 'd3-geo';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info,
  Sparkles
} from 'lucide-react';
import { CountryData, LayerConfig, NaturalLandmark, WonderRecord, FlightArcData, MapFocusRequest } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { matchCountryData, VIETNAM_COORDINATES } from '../../utils/geoUtils';
import { NATURAL_LANDMARKS } from '../../data/nature';
import { getGeoJSON } from '../../services/geoData';

interface WorldMap2DProps {
  selectedCountry: CountryData | null;
  hoveredCountry: CountryData | null;
  activeContinent: string | null;
  borderOnlyMode: boolean;
  hideLabels: boolean;
  layers: LayerConfig;
  activeLandmark?: NaturalLandmark | null;
  activeWonder?: WonderRecord | null;
  flightArc?: FlightArcData | null;
  highlightedCountryIds?: string[];
  targetCountryId?: string | null;
  mapFocusRequest?: MapFocusRequest | null;
  isTeacherMode?: boolean;
  onSelectCountry: (country: CountryData) => void;
  onSelectLandmark?: (landmark: NaturalLandmark) => void;
  setHoveredCountry: (country: CountryData | null) => void;
  onMapCountryClick?: (countryId: string, countryObj?: CountryData) => void;
}

interface GeoFeature {
  type: string;
  id?: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any;
  };
}

export const WorldMap2D: React.FC<WorldMap2DProps> = ({
  selectedCountry,
  hoveredCountry,
  activeContinent,
  borderOnlyMode,
  hideLabels,
  layers,
  activeLandmark,
  activeWonder: _activeWonder,
  flightArc,
  highlightedCountryIds,
  targetCountryId,
  mapFocusRequest,
  isTeacherMode: _isTeacherMode,
  onSelectCountry,
  onSelectLandmark,
  setHoveredCountry,
  onMapCountryClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 960, height: 520 });
  const [geoData, setGeoData] = useState<{ type: string; features: GeoFeature[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Transform state for pan & zoom
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const startPanRef = useRef({ x: 0, y: 0 });
  const [showPedagogyInfo, setShowPedagogyInfo] = useState(false);

  // Resize observer to fill container responsively
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Fetch GeoJSON with cached service
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getGeoJSON()
      .then((data) => {
        if (isMounted && data && data.features) {
          setGeoData(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load 2D map geojson', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Create D3 projection
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(dimensions.width / 5.8)
      .translate([dimensions.width / 2, dimensions.height / 1.9]);
  }, [dimensions]);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // Center camera on selected country or Vietnam on load
  const focusOnCoordinates = useCallback((lat: number, lng: number, zoomLevel = 2.2) => {
    const coords = projection([lng, lat]);
    if (!coords) return;
    const [cx, cy] = coords;
    const newX = dimensions.width / 2 - cx * zoomLevel;
    const newY = dimensions.height / 2 - cy * zoomLevel;
    setTransform({
      k: zoomLevel,
      x: newX,
      y: newY
    });
  }, [projection, dimensions]);

  // If selected country changes, smoothly focus
  useEffect(() => {
    if (selectedCountry) {
      focusOnCoordinates(selectedCountry.lat, selectedCountry.lng, 2.5);
    }
  }, [selectedCountry?.id, focusOnCoordinates]);

  // Handle external map focus requests (e.g. from learning modules)
  useEffect(() => {
    if (mapFocusRequest) {
      focusOnCoordinates(mapFocusRequest.lat, mapFocusRequest.lng, mapFocusRequest.zoom2D ?? 2.8);
    }
  }, [mapFocusRequest, focusOnCoordinates]);

  // Helper to match feature to CountryData
  const getCountryFromFeature = useCallback((feature: GeoFeature): CountryData | null => {
    const props = feature.properties || {};
    const nameStr = (props.NAME || props.ADMIN || props.name || props.SOVEREIGNT || props.NAME_LONG || '') as string;
    const iso2 = (props.ISO_A2 || props.iso_a2 || props.WB_A2 || '') as string;
    const iso3 = (props.ISO_A3 || props.iso_a3 || props.ADM0_A3 || props.SOV_A3 || '') as string;

    return (
      matchCountryData(nameStr) ||
      matchCountryData(iso3) ||
      (iso2 && iso2 !== '-99' ? matchCountryData(iso2) : undefined) ||
      matchCountryData(props.SOVEREIGNT) ||
      matchCountryData(props.ADMIN)
    );
  }, []);

  // Mouse pan & zoom handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    startPanRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - startPanRef.current.x,
      y: e.clientY - startPanRef.current.y
    }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.18 : 0.85;
    const newK = Math.max(0.8, Math.min( transform.k * zoomFactor, 9));
    
    // Zoom toward mouse pointer
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - transform.x) * (newK / transform.k);
    const newY = mouseY - (mouseY - transform.y) * (newK / transform.k);

    setTransform({ k: newK, x: newX, y: newY });
  };

  // Zoom buttons
  const handleZoomIn = () => {
    setTransform(prev => {
      const newK = Math.min(prev.k * 1.35, 9);
      const newX = dimensions.width / 2 - (dimensions.width / 2 - prev.x) * (newK / prev.k);
      const newY = dimensions.height / 2 - (dimensions.height / 2 - prev.y) * (newK / prev.k);
      return { k: newK, x: newX, y: newY };
    });
  };

  const handleZoomOut = () => {
    setTransform(prev => {
      const newK = Math.max(prev.k / 1.35, 0.8);
      const newX = dimensions.width / 2 - (dimensions.width / 2 - prev.x) * (newK / prev.k);
      const newY = dimensions.height / 2 - (dimensions.height / 2 - prev.y) * (newK / prev.k);
      return { k: newK, x: newX, y: newY };
    });
  };

  const handleReset = () => {
    setTransform({ k: 1, x: 0, y: 0 });
  };

  const handleFocusVietnam = () => {
    focusOnCoordinates(VIETNAM_COORDINATES.lat, VIETNAM_COORDINATES.lng, 3.2);
  };

  // Generate Graticule Lines (Kinh tuyến & Vĩ tuyến)
  const graticulePaths = useMemo(() => {
    const latLines: string[] = [];
    const lngLines: string[] = [];

    // Latitudes: -75 to 75 step 15
    for (let lat = -75; lat <= 75; lat += 15) {
      if (lat === 0) continue; // Equator handled separately
      const pts: [number, number][] = [];
      for (let lng = -180; lng <= 180; lng += 4) {
        const p = projection([lng, lat]);
        if (p) pts.push(p);
      }
      if (pts.length > 1) {
        latLines.push(`M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}`);
      }
    }

    // Longitudes: -180 to 180 step 30
    for (let lng = -180; lng <= 180; lng += 30) {
      if (lng === 0) continue; // Prime meridian handled separately
      const pts: [number, number][] = [];
      for (let lat = -80; lat <= 80; lat += 4) {
        const p = projection([lng, lat]);
        if (p) pts.push(p);
      }
      if (pts.length > 1) {
        lngLines.push(`M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}`);
      }
    }

    return { latLines, lngLines };
  }, [projection]);

  // Equator Path (0° Vĩ tuyến)
  const equatorPath = useMemo(() => {
    const pts: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += 2) {
      const p = projection([lng, 0]);
      if (p) pts.push(p);
    }
    return pts.length > 1 ? `M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}` : '';
  }, [projection]);

  // Tropic of Cancer (23.5° Bắc) & Tropic of Capricorn (23.5° Nam)
  const tropicOfCancerPath = useMemo(() => {
    const pts: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += 2) {
      const p = projection([lng, 23.436]);
      if (p) pts.push(p);
    }
    return pts.length > 1 ? `M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}` : '';
  }, [projection]);

  const tropicOfCapricornPath = useMemo(() => {
    const pts: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += 2) {
      const p = projection([lng, -23.436]);
      if (p) pts.push(p);
    }
    return pts.length > 1 ? `M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}` : '';
  }, [projection]);

  // Prime Meridian Path (0° Greenwich)
  const primeMeridianPath = useMemo(() => {
    const pts: [number, number][] = [];
    for (let lat = -85; lat <= 85; lat += 2) {
      const p = projection([0, lat]);
      if (p) pts.push(p);
    }
    return pts.length > 1 ? `M ${pts.map(p => `${p[0]},${p[1]}`).join(' L ')}` : '';
  }, [projection]);

  // Flight arc path calculation in 2D
  const flightArcSvgPath = useMemo(() => {
    if (!flightArc) return null;
    const p1 = projection([flightArc.startLng, flightArc.startLat]);
    const p2 = projection([flightArc.endLng, flightArc.endLat]);
    if (!p1 || !p2) return null;

    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dist = Math.hypot(dx, dy);
    // Arch upward
    const midX = (p1[0] + p2[0]) / 2;
    const midY = (p1[1] + p2[1]) / 2 - Math.min(dist * 0.25, 80);

    return {
      path: `M ${p1[0]} ${p1[1]} Q ${midX} ${midY} ${p2[0]} ${p2[1]}`,
      p1,
      p2,
      midX,
      midY
    };
  }, [flightArc, projection]);

  // Vietnam reference coordinates
  const vnPoint = useMemo(() => {
    return projection([VIETNAM_COORDINATES.lng, VIETNAM_COORDINATES.lat]);
  }, [projection]);

  return (
    <div
      ref={containerRef}
      id="world-map-2d-container"
      className="relative w-full h-full bg-[#0a1526] select-none overflow-hidden cursor-grab active:cursor-grabbing font-sans"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Background Subtle Starfield / Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* SVG Canvas */}
      <svg
        id="world-map-2d-svg"
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full block"
      >
        <defs>
          {/* Radial Ocean Gradient */}
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0f2b48" />
            <stop offset="100%" stopColor="#071322" />
          </radialGradient>

          {/* Glow filter for selected country */}
          <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="vietnamGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Marker gradients */}
          <linearGradient id="vnFlagGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Ocean Background Area */}
        <rect
          width={dimensions.width}
          height={dimensions.height}
          fill="url(#oceanGrad)"
        />

        {/* Main Transformed Group for Zoom & Pan */}
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}>
          
          {/* 1. Graticules (Kinh - Vĩ tuyến) */}
          {layers.graticules && (
            <g className="graticules" opacity={0.35}>
              {graticulePaths.latLines.map((d, i) => (
                <path key={`lat-${i}`} d={d} fill="none" stroke="#38bdf8" strokeWidth={0.6 / transform.k} strokeDasharray="3,3" />
              ))}
              {graticulePaths.lngLines.map((d, i) => (
                <path key={`lng-${i}`} d={d} fill="none" stroke="#38bdf8" strokeWidth={0.6 / transform.k} strokeDasharray="3,3" />
              ))}
            </g>
          )}

          {/* 2. Tropic of Cancer & Capricorn (Chí tuyến Bắc & Nam) */}
          {layers.tropics && (
            <g className="tropics">
              {tropicOfCancerPath && (
                <path
                  d={tropicOfCancerPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={1.2 / transform.k}
                  strokeDasharray="4,3"
                  opacity={0.8}
                />
              )}
              {tropicOfCapricornPath && (
                <path
                  d={tropicOfCapricornPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={1.2 / transform.k}
                  strokeDasharray="4,3"
                  opacity={0.8}
                />
              )}
            </g>
          )}

          {/* 3. Equator (Đường Xích đạo 0°) */}
          {layers.equator && equatorPath && (
            <g className="equator-layer">
              <path
                d={equatorPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={2.4 / transform.k}
                opacity={0.95}
              />
              <path
                d={equatorPath}
                fill="none"
                stroke="#fef08a"
                strokeWidth={1.0 / transform.k}
                strokeDasharray="6,4"
              />
            </g>
          )}

          {/* 4. Prime Meridian (Kinh tuyến gốc 0°) */}
          {layers.primeMeridian && primeMeridianPath && (
            <g className="prime-meridian-layer">
              <path
                d={primeMeridianPath}
                fill="none"
                stroke="#10b981"
                strokeWidth={2.0 / transform.k}
                opacity={0.9}
              />
              <path
                d={primeMeridianPath}
                fill="none"
                stroke="#a7f3d0"
                strokeWidth={0.8 / transform.k}
                strokeDasharray="5,3"
              />
            </g>
          )}

          {/* 5. Country Polygons */}
          {geoData && geoData.features && (
            <g className="countries-layer">
              {geoData.features.map((feature, index) => {
                const pathString = pathGenerator(feature as unknown as GeoPermissibleObjects);
                if (!pathString) return null;

                const country = getCountryFromFeature(feature);
                const isVietnam = country?.id === 'vietnam';
                const isSelected = selectedCountry && country && selectedCountry.id === country.id;
                const isHovered = hoveredCountry && country && hoveredCountry.id === country.id;
                const isHighlighted = country && highlightedCountryIds?.includes(country.id);
                const isTarget = country && targetCountryId === country.id;
                const isInActiveContinent = activeContinent && country && country.continentId === activeContinent;

                // Color calculation matching 3D theme
                let fillColor = '#163554';
                let strokeColor = 'rgba(255, 255, 255, 0.2)';
                let strokeWidth = 0.6 / transform.k;

                if (borderOnlyMode) {
                  fillColor = 'transparent';
                  strokeColor = '#38bdf8';
                  strokeWidth = 1.0 / transform.k;
                } else if (isVietnam) {
                  fillColor = '#dc2626';
                  strokeColor = '#fef08a';
                  strokeWidth = 1.8 / transform.k;
                } else if (isSelected) {
                  fillColor = '#0284c7';
                  strokeColor = '#38bdf8';
                  strokeWidth = 2.0 / transform.k;
                } else if (isTarget) {
                  fillColor = '#eab308';
                  strokeColor = '#ffffff';
                  strokeWidth = 2.2 / transform.k;
                } else if (isHighlighted) {
                  fillColor = '#d97706';
                  strokeColor = '#fef3c7';
                  strokeWidth = 1.6 / transform.k;
                } else if (isHovered) {
                  fillColor = '#2563eb';
                  strokeColor = '#ffffff';
                  strokeWidth = 1.6 / transform.k;
                } else if (isInActiveContinent) {
                  fillColor = '#1d4ed8';
                  strokeColor = '#93c5fd';
                  strokeWidth = 1.2 / transform.k;
                } else if (layers.continents && country) {
                  // Subtle continent colors
                  switch (country.continentId) {
                    case 'asia': fillColor = '#143c68'; break;
                    case 'europe': fillColor = '#1e3a5f'; break;
                    case 'africa': fillColor = '#2a3b4c'; break;
                    case 'north_america': fillColor = '#1b3b5a'; break;
                    case 'south_america': fillColor = '#1c4252'; break;
                    case 'oceania': fillColor = '#164360'; break;
                    case 'antarctica': fillColor = '#2d4b68'; break;
                    default: fillColor = '#163554';
                  }
                }

                return (
                  <path
                    key={`country-${feature.id || index}`}
                    d={pathString}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    className="transition-colors duration-150 cursor-pointer"
                    onMouseEnter={() => country && setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onMapCountryClick && (country?.id || feature.id)) {
                        onMapCountryClick(country?.id || String(feature.id), country || undefined);
                      }
                      if (country) onSelectCountry(country);
                    }}
                  />
                );
              })}
            </g>
          )}

          {/* 6. Relative Direction Pointer / Line from Vietnam if Country is selected */}
          {selectedCountry && selectedCountry.id !== 'vietnam' && vnPoint && (
            <g className="relative-direction-guide">
              {(() => {
                const targetPoint = projection([selectedCountry.lng, selectedCountry.lat]);
                if (!targetPoint) return null;

                return (
                  <>
                    <line
                      x1={vnPoint[0]}
                      y1={vnPoint[1]}
                      x2={targetPoint[0]}
                      y2={targetPoint[1]}
                      stroke="#f59e0b"
                      strokeWidth={1.6 / transform.k}
                      strokeDasharray="4,4"
                      opacity={0.85}
                    />
                    <circle
                      cx={targetPoint[0]}
                      cy={targetPoint[1]}
                      r={6 / transform.k}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={2 / transform.k}
                    />
                  </>
                );
              })()}
            </g>
          )}

          {/* 7. Flight Arc Layer */}
          {flightArcSvgPath && (
            <g className="flight-arc-layer pointer-events-none">
              <path
                d={flightArcSvgPath.path}
                fill="none"
                stroke="#38bdf8"
                strokeWidth={2.4 / transform.k}
                strokeDasharray="6,4"
                opacity={0.9}
              />
              <circle
                cx={flightArcSvgPath.p1[0]}
                cy={flightArcSvgPath.p1[1]}
                r={4 / transform.k}
                fill="#ef4444"
              />
              <circle
                cx={flightArcSvgPath.p2[0]}
                cy={flightArcSvgPath.p2[1]}
                r={4 / transform.k}
                fill="#06b6d4"
              />
            </g>
          )}

          {/* 8. Natural Landmarks Pins */}
          {NATURAL_LANDMARKS.map((landmark) => {
            let isVisible = false;
            if (landmark.category === 'mountain' && layers.mountains) isVisible = true;
            else if (landmark.category === 'river' && layers.rivers) isVisible = true;
            else if (landmark.category === 'desert' && layers.deserts) isVisible = true;
            else if (landmark.category === 'forest' && layers.forests) isVisible = true;
            else if (landmark.category === 'volcano' && layers.volcanoes) isVisible = true;
            else if (landmark.category === 'ocean' && layers.oceans) isVisible = true;

            if (!isVisible) return null;
            const pt = projection([landmark.lng, landmark.lat]);
            if (!pt) return null;

            const isSelected = activeLandmark?.id === landmark.id;

            return (
              <g
                key={`landmark-pin-${landmark.id}`}
                transform={`translate(${pt[0]}, ${pt[1]})`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLandmark(landmark);
                }}
              >
                <circle
                  r={(isSelected ? 7 : 4.5) / transform.k}
                  fill={isSelected ? '#ef4444' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth={1.2 / transform.k}
                />
                {transform.k > 1.8 && (
                  <text
                    y={-8 / transform.k}
                    fontSize={10 / transform.k}
                    fontWeight="bold"
                    fill="#e2e8f0"
                    textAnchor="middle"
                    className="pointer-events-none drop-shadow"
                  >
                    {landmark.categoryIcon} {landmark.nameVi}
                  </text>
                )}
              </g>
            );
          })}

          {/* 9. Vietnam Prominent Marker */}
          {vnPoint && (
            <g transform={`translate(${vnPoint[0]}, ${vnPoint[1]})`} className="pointer-events-none">
              <circle
                r={8 / transform.k}
                fill="none"
                stroke="#fef08a"
                strokeWidth={2 / transform.k}
                opacity={0.8}
              >
                <animate attributeName="r" values={`${6 / transform.k};${14 / transform.k};${6 / transform.k}`} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                r={4.5 / transform.k}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={1.2 / transform.k}
              />
              <text
                y={-9 / transform.k}
                fontSize={11 / transform.k}
                fontWeight="bold"
                fill="#fef08a"
                textAnchor="middle"
                className="drop-shadow-md"
              >
                🇻🇳 Việt Nam
              </text>
            </g>
          )}

          {/* 10. Major Country Labels (LOD by zoom) */}
          {!hideLabels && layers.countryLabels && (
            <g className="labels-layer pointer-events-none">
              {Object.values(COUNTRIES_DATA).map((c) => {
                if (c.id === 'vietnam') return null; // Handled above
                const pt = projection([c.lng, c.lat]);
                if (!pt) return null;

                // Zoom LOD visibility
                const isSelected = selectedCountry?.id === c.id;
                const isHovered = hoveredCountry?.id === c.id;
                const isTarget = targetCountryId === c.id;
                const isMajor = ['china', 'russia', 'usa', 'japan', 'india', 'australia', 'brazil', 'laos', 'cambodia', 'thailand', 'france', 'germany'].includes(c.id);

                if (!isSelected && !isHovered && !isTarget && !isMajor && transform.k < 2.0) {
                  return null;
                }

                return (
                  <text
                    key={`country-label-${c.id}`}
                    x={pt[0]}
                    y={pt[1]}
                    fontSize={Math.max(9, (isSelected ? 13 : 10.5)) / transform.k}
                    fontWeight={isSelected || isTarget ? 'bold' : '500'}
                    fill={isSelected ? '#38bdf8' : isTarget ? '#fef08a' : '#cbd5e1'}
                    textAnchor="middle"
                    className="drop-shadow transition-all"
                  >
                    {c.flag} {c.nameVi}
                  </text>
                );
              })}
            </g>
          )}

        </g>
      </svg>

      {/* Interactive Compass Rose (Góc định hướng Bản đồ) */}
      <div 
        id="map-compass-rose"
        className="absolute top-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-2xl p-2.5 shadow-xl flex flex-col items-center gap-1.5"
      >
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Compass Graphic */}
          <div className="absolute inset-0 rounded-full border border-sky-500/30 flex items-center justify-center">
            {/* North Point */}
            <div className="absolute -top-1 font-bold text-[11px] text-red-400">B</div>
            {/* South Point */}
            <div className="absolute -bottom-1 font-bold text-[11px] text-sky-400">N</div>
            {/* East Point */}
            <div className="absolute -right-1 font-bold text-[11px] text-sky-400">Đ</div>
            {/* West Point */}
            <div className="absolute -left-1 font-bold text-[11px] text-sky-400">T</div>
          </div>
          {/* Compass Needle */}
          <div className="w-1.5 h-10 bg-gradient-to-t from-sky-400 via-white to-red-500 rounded-full shadow-md" />
        </div>
        <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
          Phương hướng
        </span>
      </div>

      {/* Floating Map Controls (Zoom / Pan / Focus) */}
      <div 
        id="map-2d-controls"
        className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-2xl p-1.5 shadow-2xl"
      >
        <button
          id="btn-map-zoom-in"
          onClick={handleZoomIn}
          title="Phóng to"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-sky-400 transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        <button
          id="btn-map-zoom-out"
          onClick={handleZoomOut}
          title="Thu nhỏ"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-sky-400 transition-colors"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <button
          id="btn-map-focus-vietnam"
          onClick={handleFocusVietnam}
          title="Tập trung vào Việt Nam 🇻🇳"
          className="p-2.5 rounded-xl hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors"
        >
          <span className="text-base leading-none">🇻🇳</span>
        </button>

        <button
          id="btn-map-reset"
          onClick={handleReset}
          title="Khôi phục toàn cảnh"
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-sky-400 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="h-px bg-slate-700/60 mx-1" />

        <button
          id="btn-map-pedagogy-info"
          onClick={() => setShowPedagogyInfo(!showPedagogyInfo)}
          title="Kiến thức: Địa cầu 3D vs Bản đồ 2D"
          className={`p-2.5 rounded-xl transition-colors ${
            showPedagogyInfo ? 'bg-sky-500 text-white' : 'hover:bg-slate-800 text-slate-200 hover:text-sky-400'
          }`}
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Pedagogy Comparison Dialog for Elementary Geography (Địa cầu 3D ↔ Bản đồ 2D) */}
      <AnimatePresence>
        {showPedagogyInfo && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute top-4 left-4 z-30 max-w-sm bg-slate-900/95 backdrop-blur-xl border border-sky-500/40 rounded-2xl p-4 shadow-2xl text-slate-200"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm text-sky-400">Địa lí Tiểu học: Quả Địa Cầu & Bản Đồ</h4>
              </div>
              <button
                onClick={() => setShowPedagogyInfo(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded-md hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <p className="font-semibold text-sky-300 mb-1">🌍 Quả Địa Cầu (Mô hình 3D):</p>
                <p>Mô phỏng chân thực hình cầu của Trái Đất trong không gian, bảo toàn chuẩn xác hình dạng và vị trí tương đối của các lục địa và đại dương.</p>
              </div>

              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <p className="font-semibold text-amber-300 mb-1">🗺 Bản Đồ Thế Giới (Hình chiếu 2D):</p>
                <p>Biểu diễn toàn bộ bề mặt Trái Đất lên một mặt phẳng. Giúp học sinh quan sát bao quát tất cả các châu lục và đại dương cùng một lúc!</p>
              </div>

              <div className="p-2 rounded-xl bg-sky-950/40 border border-sky-800/50 text-[11px] text-sky-200">
                💡 <strong>Gợi ý học tập:</strong> Trên bản đồ, phía trên là <strong>Bắc</strong>, phía dưới là <strong>Nam</strong>, bên phải là <strong>Đông</strong>, bên trái là <strong>Tây</strong>.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-sky-200">Đang chuẩn bị bản đồ 2D...</span>
          </div>
        </div>
      )}

      {/* Map Projection Notice Chip */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-[11px] text-slate-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Phép chiếu: <strong>Natural Earth (Mặt phẳng phẳng)</strong> • Kéo để di chuyển • Lăn chuột để thu phóng</span>
      </div>
    </div>
  );
};
