import React, { useState, useCallback, useRef } from 'react';
import {
  CountryData,
  LayerConfig,
  AppMode,
  GameType,
  NaturalLandmark,
  WonderRecord,
  FlightArcData,
  MapViewMode,
  LearningActivity
} from './types';
import { COUNTRIES_DATA } from './data/countries';
import { createVietnamFlightArc, matchCountryData } from './utils/geoUtils';
import { useLearningMapState } from './hooks/useLearningMapState';

// Components
import { GlobeScene } from './components/Globe/GlobeScene';
import { WorldMap2D } from './components/Map/WorldMap2D';
import { LayerControls } from './components/Globe/LayerControls';
import { GlobeOverlay } from './components/Globe/GlobeOverlay';
import { Navbar } from './components/UI/Navbar';
import { MainMenu } from './components/UI/MainMenu';
import { GeoMascot } from './components/UI/GeoMascot';
import { CountryPanel } from './components/Country/CountryPanel';
import { FlightArcBanner } from './components/Country/FlightArcBanner';
import { CountryComparison } from './components/Country/CountryComparison';
import { ContinentExplorer } from './components/Continent/ContinentExplorer';
import { NatureExplorer } from './components/Nature/NatureExplorer';
import { VietnamNeighbors } from './components/Learning/VietnamNeighbors';
import { DirectionLearning } from './components/Learning/DirectionLearning';
import { HemispheresLearning } from './components/Learning/HemispheresLearning';
import { FindCountryGame } from './components/Games/FindCountryGame';
import { GuessCountryGame } from './components/Games/GuessCountryGame';
import { TeacherToolbar } from './components/Teacher/TeacherToolbar';
import { IntroModal } from './components/Intro/IntroModal';
import { Minimize2 } from 'lucide-react';

const DEFAULT_LAYERS: LayerConfig = {
  countryLabels: true,
  countryBorders: true,
  continents: false,
  oceans: false,
  equator: false,
  tropics: false,
  primeMeridian: false,
  graticules: false,
  mountains: false,
  rivers: false,
  deserts: false,
  forests: false,
  volcanoes: false,
  atmosphereGlow: true
};

export default function App() {
  // Map View Mode (3D Globe vs 2D World Map)
  const [mapViewMode, setMapViewMode] = useState<MapViewMode>('3d_globe');

  // Global Geographic Focus & Transient State
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [displayedPanelCountry, setDisplayedPanelCountry] = useState<CountryData | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [layers, setLayers] = useState<LayerConfig>(DEFAULT_LAYERS);
  const [currentMode, setAppMode] = useState<AppMode>('explore');
  const [activeContinentId, setActiveContinentId] = useState<string | null>(null);
  const [activeLandmark, setActiveLandmark] = useState<NaturalLandmark | null>(null);
  const [activeWonder, setActiveWonder] = useState<WonderRecord | null>(null);
  const [flightArc, setFlightArc] = useState<FlightArcData | null>(null);
  const [activeGameType, setActiveGameType] = useState<GameType | null>(null);

  // Hook-based Learning Map State
  const {
    activeLearningActivity,
    learningHighlightedCountryIds,
    learningTargetCountryId,
    mapFocusRequest,
    startLearningActivity,
    setLearningHighlights,
    focusLearningRegion,
    resetLearningState
  } = useLearningMapState();

  const [currentClickedCountryId, setCurrentClickedCountryId] = useState<string | null>(null);

  // Presentation & Teacher Mode States
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [hideLabels, setHideLabels] = useState(false);
  const [borderOnlyMode, setBorderOnlyMode] = useState(false);

  // Modals & Panels
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareInitialCountry, setCompareInitialCountry] = useState<CountryData | null>(null);
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  // Animation delay ref for CountryPanel
  const panelTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Central Transient UI Reset Helper to guarantee only 1 primary activity at any moment
  const resetTransientUI = useCallback((options?: {
    keepCountry?: boolean;
    keepContinent?: boolean;
    keepNature?: boolean;
    keepGame?: boolean;
    keepLearning?: boolean;
    keepCompare?: boolean;
  }) => {
    if (!options?.keepCountry) {
      if (panelTimerRef.current) {
        clearTimeout(panelTimerRef.current);
        panelTimerRef.current = null;
      }
      setSelectedCountry(null);
      setDisplayedPanelCountry(null);
    }
    if (!options?.keepContinent) {
      setActiveContinentId(null);
    }
    if (!options?.keepNature) {
      setActiveLandmark(null);
      setActiveWonder(null);
    }
    if (!options?.keepGame) {
      setActiveGameType(null);
      setCurrentClickedCountryId(null);
    }
    if (!options?.keepLearning) {
      resetLearningState();
    }
    if (!options?.keepCompare) {
      setIsCompareOpen(false);
    }
    setFlightArc(null);
  }, [resetLearningState]);

  // 1. Select Country Handler with smooth camera fly-to & delayed CountryPanel reveal (~950ms)
  const handleSelectCountry = useCallback((country: CountryData | null) => {
    if (panelTimerRef.current) {
      clearTimeout(panelTimerRef.current);
      panelTimerRef.current = null;
    }

    if (!country) {
      setSelectedCountry(null);
      setDisplayedPanelCountry(null);
      return;
    }

    // 1. Highlight immediately & trigger camera fly-to
    setSelectedCountry(country);
    setActiveLandmark(null);
    setActiveWonder(null);

    // 2. Schedule panel reveal near the end of 1500ms fly-to sequence (950ms delay) - ONLY if not in learning activity
    if (!activeLearningActivity) {
      panelTimerRef.current = setTimeout(() => {
        setDisplayedPanelCountry(country);
      }, 950);
    }
  }, [activeLearningActivity]);

  // Close CountryPanel cleanly
  const handleCloseCountryPanel = useCallback(() => {
    if (panelTimerRef.current) {
      clearTimeout(panelTimerRef.current);
      panelTimerRef.current = null;
    }
    setSelectedCountry(null);
    setDisplayedPanelCountry(null);
  }, []);

  // 2. Return To Vietnam Handler
  const handleReturnToVietnam = useCallback(() => {
    resetTransientUI();
    handleSelectCountry(COUNTRIES_DATA.vietnam);
  }, [handleSelectCountry, resetTransientUI]);

  // 3. Reset Globe/Map View
  const handleResetView = useCallback(() => {
    resetTransientUI();
    handleSelectCountry(COUNTRIES_DATA.vietnam);
    setLayers(DEFAULT_LAYERS);
    setHideLabels(false);
    setBorderOnlyMode(false);
    resetLearningState();
  }, [handleSelectCountry, resetTransientUI, resetLearningState]);

  // 4. View Flight Journey From Vietnam
  const handleViewFromVietnam = useCallback((targetCountry: CountryData) => {
    if (targetCountry.id === 'vietnam') return;
    const arc = createVietnamFlightArc(targetCountry);
    setFlightArc(arc);
  }, []);

  // 5. Compare Country Action
  const handleCompareCountry = useCallback((country: CountryData) => {
    resetTransientUI({ keepCompare: true, keepCountry: true });
    setCompareInitialCountry(country);
    setIsCompareOpen(true);
  }, [resetTransientUI]);

  // 6. Select Continent Handler
  const handleSelectContinent = useCallback((continentId: string | null) => {
    resetTransientUI({ keepContinent: true });
    setActiveContinentId(continentId);
    setAppMode('continents');
  }, [resetTransientUI]);

  // 7. Select Landmark Handler
  const handleSelectLandmark = useCallback((landmark: NaturalLandmark | null) => {
    resetTransientUI({ keepNature: true });
    setActiveLandmark(landmark);
    setAppMode('nature');
    if (landmark) {
      const cat = landmark.category;
      setLayers(prev => ({
        ...prev,
        mountains: cat === 'mountain' ? true : prev.mountains,
        rivers: cat === 'river' ? true : prev.rivers,
        deserts: cat === 'desert' ? true : prev.deserts,
        forests: cat === 'forest' ? true : prev.forests,
        volcanoes: cat === 'volcano' ? true : prev.volcanoes,
        oceans: cat === 'ocean' ? true : prev.oceans
      }));
    }
  }, [resetTransientUI]);

  // 8. Select Wonder Handler
  const handleSelectWonder = useCallback((wonder: WonderRecord | null) => {
    resetTransientUI({ keepNature: true });
    setActiveWonder(wonder);
    setAppMode('nature');
  }, [resetTransientUI]);

  // 9. Handle Mode switching from MainMenu
  const handleSetAppMode = useCallback((mode: AppMode) => {
    if (mode === 'continents') {
      resetTransientUI({ keepContinent: true });
      setAppMode('continents');
    } else if (mode === 'nature') {
      resetTransientUI({ keepNature: true });
      setAppMode('nature');
    } else {
      resetTransientUI({ keepCountry: true });
      setAppMode('explore');
    }
  }, [resetTransientUI]);

  // 10. Start Game (Ensures Distraction-Free environment)
  const handleStartGame = useCallback((gameType: GameType | null) => {
    if (gameType) {
      resetTransientUI({ keepGame: true });
      setActiveGameType(gameType);
      setAppMode('explore');
    } else {
      setActiveGameType(null);
      setCurrentClickedCountryId(null);
      setAppMode('explore');
    }
  }, [resetTransientUI]);

  // 11. Start Learning Activity
  const handleStartLearningActivity = useCallback((activity: LearningActivity | null) => {
    if (activity) {
      resetTransientUI({ keepLearning: true });
      startLearningActivity(activity);
    } else {
      resetLearningState();
    }
  }, [resetTransientUI, startLearningActivity, resetLearningState]);

  // 12. Handle Country Click
  const handleCountryClick = useCallback((countryId: string, countryObj?: CountryData) => {
    setCurrentClickedCountryId(countryId);
    if (activeGameType) {
      return;
    }
    const country = countryObj || matchCountryData(countryId) || COUNTRIES_DATA[countryId];
    if (country) {
      handleSelectCountry(country);
    }
  }, [activeGameType, handleSelectCountry]);

  const isPanelOpen = displayedPanelCountry !== null && !activeGameType && !activeLearningActivity;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none flex">
      {/* 1. TOP NAVBAR (Hidden during presentation mode or game mode for distraction-free immersion) */}
      {!isPresentationMode && !activeGameType && (
        <Navbar
          onSelectCountry={handleSelectCountry}
          onReturnToVietnam={handleReturnToVietnam}
          isTeacherMode={isTeacherMode}
          setIsTeacherMode={setIsTeacherMode}
          isPresentationMode={isPresentationMode}
          setIsPresentationMode={setIsPresentationMode}
          onOpenIntro={() => setIsIntroOpen(true)}
          mapViewMode={mapViewMode}
          setMapViewMode={setMapViewMode}
        />
      )}

      {/* Floating Exit Presentation Mode button */}
      {isPresentationMode && (
        <button
          id="btn-exit-presentation-mode"
          onClick={() => setIsPresentationMode(false)}
          className="fixed top-4 right-4 z-40 flex items-center gap-2 py-2 px-3.5 bg-slate-950/90 hover:bg-slate-900 border border-slate-700 text-slate-200 rounded-2xl text-xs font-bold shadow-2xl backdrop-blur-xl transition-all pointer-events-auto"
          title="Thoát chế độ Trình chiếu"
        >
          <Minimize2 className="w-4 h-4 text-cyan-400" />
          <span>Thoát Trình Chiếu</span>
        </button>
      )}

      {/* 2. MAIN 3D GLOBE OR 2D WORLD MAP VIEWPORT CONTAINER */}
      <div
        id="main-viewport-container"
        className={`relative h-full transition-all duration-500 ease-out ${
          isPanelOpen && !isPresentationMode
            ? 'w-full md:w-[calc(100%_-_380px)] lg:w-[calc(100%_-_400px)]'
            : 'w-full'
        }`}
      >
        {mapViewMode === '3d_globe' ? (
          <GlobeScene
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
            hoveredCountry={hoveredCountry}
            setHoveredCountry={setHoveredCountry}
            layers={layers}
            activeContinent={activeContinentId}
            activeLandmark={activeLandmark}
            onSelectLandmark={handleSelectLandmark}
            activeWonder={activeWonder}
            flightArc={flightArc}
            isTeacherMode={isTeacherMode}
            borderOnlyMode={borderOnlyMode}
            hideLabels={hideLabels}
            onGlobeCountryClick={handleCountryClick}
            highlightedCountryIds={learningHighlightedCountryIds}
            targetCountryId={learningTargetCountryId}
            mapFocusRequest={mapFocusRequest}
          />
        ) : (
          <WorldMap2D
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
            hoveredCountry={hoveredCountry}
            setHoveredCountry={setHoveredCountry}
            layers={layers}
            activeContinent={activeContinentId}
            activeLandmark={activeLandmark}
            onSelectLandmark={handleSelectLandmark}
            flightArc={flightArc}
            isTeacherMode={isTeacherMode}
            borderOnlyMode={borderOnlyMode}
            hideLabels={hideLabels}
            onMapCountryClick={handleCountryClick}
            highlightedCountryIds={learningHighlightedCountryIds}
            targetCountryId={learningTargetCountryId}
            mapFocusRequest={mapFocusRequest}
          />
        )}

        {/* 3. LAYER TOGGLE CONTROLS (Hidden during Presentation, Game, and Learning modes) */}
        {!isPresentationMode && !activeGameType && !activeLearningActivity && (
          <LayerControls layers={layers} setLayers={setLayers} />
        )}

        {/* 4. OVERLAY CONTROLS (Compass, Reset) */}
        <GlobeOverlay
          onReturnToVietnam={handleReturnToVietnam}
          onResetView={handleResetView}
          selectedCountry={selectedCountry}
          isPresentationMode={isPresentationMode}
        />
      </div>

      {/* 5. FLIGHT ARC JOURNEY BANNER (Hidden during game or learning) */}
      {flightArc && !activeGameType && !activeLearningActivity && (
        <FlightArcBanner flightArc={flightArc} onClose={() => setFlightArc(null)} />
      )}

      {/* 6. COUNTRY EXPLORATION CARD (Right Side, delayed entrance, hidden during game & learning activities) */}
      {displayedPanelCountry && !activeGameType && !activeLearningActivity && (
        <CountryPanel
          key={displayedPanelCountry.id}
          country={displayedPanelCountry}
          onClose={handleCloseCountryPanel}
          onViewFromVietnam={handleViewFromVietnam}
          onCompareWithAnother={handleCompareCountry}
          isFlightArcActive={flightArc !== null && flightArc.toName.includes(displayedPanelCountry.nameVi)}
        />
      )}

      {/* 7. CONTINENT EXPLORER PANEL (Hidden during game & learning activities) */}
      {currentMode === 'continents' && !activeGameType && !activeLearningActivity && (
        <ContinentExplorer
          activeContinentId={activeContinentId}
          onSelectContinent={handleSelectContinent}
          onSelectCountry={handleSelectCountry}
        />
      )}

      {/* 8. NATURE & WONDERS EXPLORER PANEL (Hidden during game & learning activities) */}
      {currentMode === 'nature' && !activeGameType && !activeLearningActivity && (
        <NatureExplorer
          activeLandmark={activeLandmark}
          onSelectLandmark={handleSelectLandmark}
          activeWonder={activeWonder}
          onSelectWonder={handleSelectWonder}
        />
      )}

      {/* 9. PRIMARY SCHOOL PEDAGOGICAL MODULES */}
      {/* 9A. Vietnam & Neighboring Countries Learning Panel */}
      {activeLearningActivity === 'vietnam_neighbors' && (
        <VietnamNeighbors
          onSelectCountry={handleSelectCountry}
          onClose={() => handleStartLearningActivity(null)}
          onFocusRegion={focusLearningRegion}
          onSetHighlightCountries={setLearningHighlights}
        />
      )}

      {/* 9B. Compass & Direction Finding Learning Panel */}
      {activeLearningActivity === 'direction_finding' && (
        <DirectionLearning
          selectedCountry={selectedCountry}
          onSelectCountry={handleSelectCountry}
          onClose={() => handleStartLearningActivity(null)}
          onFocusRegion={focusLearningRegion}
          onSetHighlightCountries={setLearningHighlights}
        />
      )}

      {/* 9C. Hemispheres & Equator Learning Panel */}
      {activeLearningActivity === 'hemispheres_equator' && (
        <HemispheresLearning
          onSelectCountry={handleSelectCountry}
          onClose={() => handleStartLearningActivity(null)}
          onToggleEquatorLayer={(enabled) => setLayers(prev => ({ ...prev, equator: enabled }))}
          onFocusRegion={focusLearningRegion}
        />
      )}

      {/* 10. GAMES: FIND COUNTRY (Distraction-Free) */}
      {activeGameType === 'find_country' && (
        <FindCountryGame
          onClose={() => handleStartGame(null)}
          onTargetCountrySelected={handleSelectCountry}
          currentClickedCountryId={currentClickedCountryId}
        />
      )}

      {/* 11. GAMES: GUESS COUNTRY (Distraction-Free) */}
      {activeGameType === 'guess_country' && (
        <GuessCountryGame
          onClose={() => handleStartGame(null)}
          onSelectCountry={handleSelectCountry}
        />
      )}

      {/* 12. TEACHER TOOLBAR (Transforms to sleek floating docked bar in Presentation mode) */}
      <TeacherToolbar
        isOpen={isTeacherMode || isPresentationMode}
        onClose={() => setIsTeacherMode(false)}
        hideLabels={hideLabels}
        setHideLabels={setHideLabels}
        borderOnlyMode={borderOnlyMode}
        setBorderOnlyMode={setBorderOnlyMode}
        layers={layers}
        setLayers={setLayers}
        onHighlightContinent={handleSelectContinent}
        onResetGlobe={handleResetView}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenLearningActivity={handleStartLearningActivity}
        isPresentationMode={isPresentationMode}
      />

      {/* 13. COUNTRY COMPARISON MODAL */}
      {(isCompareOpen || currentMode === 'compare') && !activeGameType && (
        <CountryComparison
          initialCountryA={compareInitialCountry || selectedCountry || COUNTRIES_DATA.vietnam}
          onClose={() => {
            setIsCompareOpen(false);
            if (currentMode === 'compare') setAppMode('explore');
          }}
          onSelectCountryForGlobe={handleSelectCountry}
        />
      )}

      {/* 14. GEO MASCOT GUIDE (Hidden during presentation, games, and learning activities) */}
      {!isPresentationMode && !activeGameType && !activeLearningActivity && <GeoMascot />}

      {/* 15. BOTTOM MAIN NAVIGATION MENU (Hidden during presentation, games, and learning activities) */}
      {!isPresentationMode && !activeGameType && !activeLearningActivity && (
        <MainMenu
          currentMode={currentMode}
          setAppMode={handleSetAppMode}
          activeGameType={activeGameType}
          setActiveGameType={handleStartGame}
          activeLearningActivity={activeLearningActivity}
          setActiveLearningActivity={handleStartLearningActivity}
          onOpenCompare={() => setIsCompareOpen(true)}
        />
      )}

      {/* 16. WELCOME INTRO MODAL */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
    </div>
  );
}
