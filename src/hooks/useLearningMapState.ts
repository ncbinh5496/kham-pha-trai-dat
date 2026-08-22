import { useState, useCallback } from 'react';
import { LearningActivity, MapFocusRequest } from '../types';

export function useLearningMapState() {
  const [activeLearningActivity, setActiveLearningActivity] = useState<LearningActivity | null>(null);
  const [learningHighlightedCountryIds, setLearningHighlightedCountryIds] = useState<string[]>([]);
  const [learningTargetCountryId, setLearningTargetCountryId] = useState<string | null>(null);
  const [mapFocusRequest, setMapFocusRequest] = useState<MapFocusRequest | null>(null);

  const startLearningActivity = useCallback((activity: LearningActivity | null) => {
    setActiveLearningActivity(activity);
    if (!activity) {
      setLearningHighlightedCountryIds([]);
      setLearningTargetCountryId(null);
    }
  }, []);

  const stopLearningActivity = useCallback(() => {
    setActiveLearningActivity(null);
    setLearningHighlightedCountryIds([]);
    setLearningTargetCountryId(null);
  }, []);

  const setLearningHighlights = useCallback((countryIds: string[], targetId?: string | null) => {
    setLearningHighlightedCountryIds(countryIds);
    setLearningTargetCountryId(targetId ?? null);
  }, []);

  const focusLearningRegion = useCallback((lat: number, lng: number, altitude?: number, zoom2D?: number) => {
    setMapFocusRequest({
      lat,
      lng,
      altitude,
      zoom2D,
      timestamp: Date.now()
    });
  }, []);

  const resetLearningState = useCallback(() => {
    setActiveLearningActivity(null);
    setLearningHighlightedCountryIds([]);
    setLearningTargetCountryId(null);
  }, []);

  return {
    activeLearningActivity,
    setActiveLearningActivity,
    learningHighlightedCountryIds,
    learningTargetCountryId,
    mapFocusRequest,
    setMapFocusRequest,
    startLearningActivity,
    stopLearningActivity,
    setLearningHighlights,
    focusLearningRegion,
    resetLearningState
  };
}
