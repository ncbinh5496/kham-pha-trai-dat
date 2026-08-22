export interface CountryData {
  id: string;
  code: string;
  nameVi: string;
  nameEn: string;
  flag: string;
  capital: string;
  continent: string;
  continentId: 'asia' | 'europe' | 'africa' | 'north_america' | 'south_america' | 'oceania' | 'antarctica';
  population: string;
  populationNum: number; // in millions
  area: string;
  areaNum: number; // in thousand sq km
  language: string;
  climate: string;
  currency: string;
  shortDescription: string;
  lat: number;
  lng: number;
  altitude?: number;
  relativeDirectionFromVietnam?: string; // Pedagogical direction e.g. 'Phía Bắc', 'Phía Tây'
  isVietnamNeighbor?: boolean; // Direct land border (China, Laos, Cambodia)
  neighborBorderDetail?: string; // e.g. "Có chung đường biên giới dài 2.169 km phía Tây với Việt Nam"
  isSoutheastAsia?: boolean;
  natureHighlights: string[];
  cultureHighlights: string[];
  foodHighlights: string[];
  funFacts: string[];
  landmarks: {
    name: string;
    description: string;
    icon?: string;
  }[];
  color?: string;
}

export type MapViewMode = '3d_globe' | '2d_map';

export type LearningActivity =
  | 'vietnam_neighbors'
  | 'direction_finding'
  | 'direction_learning'
  | 'hemispheres'
  | 'hemispheres_equator'
  | 'find_vietnam'
  | 'find_neighbor'
  | 'prime_meridian';

export type TeachingLevel = 'basic' | 'medium' | 'advanced'; // Cơ bản | Trung bình | Nâng cao

export type DirectionQuizMode = '4_cardinal' | '8_ordinal';

export interface DirectionQuizQuestion {
  id: string;
  prompt: string;
  targetDirection: 'N' | 'S' | 'E' | 'W' | 'NE' | 'SE' | 'SW' | 'NW';
  targetDirectionVi: string;
  arrow: string;
  targetCountryId?: string;
  options: {
    id: string;
    nameVi: string;
    flag?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface ContinentData {
  id: 'asia' | 'europe' | 'africa' | 'north_america' | 'south_america' | 'oceania' | 'antarctica';
  nameVi: string;
  nameEn: string;
  icon: string;
  lat: number;
  lng: number;
  altitude: number;
  area: string;
  population: string;
  countryCount: number;
  description: string;
  highlights: string[];
  representativeCountries: string[]; // country IDs
  color: string;
}

export type LandmarkCategory = 'mountain' | 'river' | 'desert' | 'forest' | 'volcano' | 'ocean' | 'wonder';

export interface NaturalLandmark {
  id: string;
  nameVi: string;
  nameEn: string;
  category: LandmarkCategory;
  categoryNameVi: string;
  categoryIcon: string;
  countryOrRegion: string;
  lat: number;
  lng: number;
  heightOrLength?: string;
  shortDescription: string;
  funFact: string;
  tags: string[];
}

export interface WonderRecord {
  id: string;
  question: string;
  answer: string;
  location: string;
  lat: number;
  lng: number;
  category: string;
  icon: string;
  detail: string;
  funFact: string;
}

export interface FlightArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  fromName: string;
  toName: string;
  distanceKm: number;
  flightHours: number;
  color?: [string, string];
}

export interface LayerConfig {
  countryLabels: boolean;
  countryBorders: boolean;
  continents: boolean;
  oceans: boolean;
  equator: boolean;
  tropics: boolean;
  primeMeridian: boolean;
  graticules: boolean;
  mountains: boolean;
  rivers: boolean;
  deserts: boolean;
  forests: boolean;
  volcanoes: boolean;
  atmosphereGlow: boolean;
}

export type AppMode = 'explore' | 'continents' | 'nature' | 'compare' | 'games' | 'teacher';

export type GameType = 'find_country' | 'guess_country';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  targetCountryId: string;
  level: DifficultyLevel;
  questionText: string;
  clues: string[];
  options?: string[]; // 4 country IDs for multiple choice
  correctFeedback: string;
  hint: string;
}

export interface TeacherToolState {
  hideLabels: boolean;
  borderOnlyMode: boolean;
  highlightedContinent: string | null;
  highlightedCountry: string | null;
  measurementMode: boolean;
  activeQuickQuestion: string | null;
}
