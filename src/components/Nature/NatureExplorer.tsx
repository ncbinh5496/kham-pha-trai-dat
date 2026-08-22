import React, { useState } from 'react';
import { LandmarkCategory, NaturalLandmark, WonderRecord } from '../../types';
import { NATURAL_LANDMARKS, WONDERS_RECORDS } from '../../data/nature';
import {
  Mountain,
  Waves,
  Sun,
  Trees,
  Flame,
  Globe2,
  Sparkles,
  X,
  MapPin,
  HelpCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface NatureExplorerProps {
  activeLandmark: NaturalLandmark | null;
  onSelectLandmark: (landmark: NaturalLandmark | null) => void;
  activeWonder: WonderRecord | null;
  onSelectWonder: (wonder: WonderRecord | null) => void;
}

export const NatureExplorer: React.FC<NatureExplorerProps> = ({
  activeLandmark,
  onSelectLandmark,
  activeWonder,
  onSelectWonder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<LandmarkCategory | 'wonders'>('wonders');

  const categories: Array<{
    key: LandmarkCategory | 'wonders';
    label: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    { key: 'wonders', label: 'Kỳ thú Trái Đất', icon: <Sparkles className="w-4 h-4" />, color: 'text-amber-400' },
    { key: 'mountain', label: 'Núi cao', icon: <Mountain className="w-4 h-4" />, color: 'text-orange-400' },
    { key: 'river', label: 'Sông lớn', icon: <Waves className="w-4 h-4" />, color: 'text-cyan-400' },
    { key: 'desert', label: 'Sa mạc', icon: <Sun className="w-4 h-4" />, color: 'text-yellow-400' },
    { key: 'forest', label: 'Rừng rậm', icon: <Trees className="w-4 h-4" />, color: 'text-emerald-400' },
    { key: 'volcano', label: 'Núi lửa', icon: <Flame className="w-4 h-4" />, color: 'text-rose-500' },
    { key: 'ocean', label: 'Đại dương', icon: <Globe2 className="w-4 h-4" />, color: 'text-blue-400' }
  ];

  const filteredLandmarks = NATURAL_LANDMARKS.filter(item => item.category === selectedCategory);

  return (
    <div id="nature-explorer-panel" className="absolute top-16 left-4 z-20 flex flex-col gap-2 max-w-sm pointer-events-auto">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-1.5 p-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              id={`btn-nature-cat-${cat.key}`}
              onClick={() => {
                setSelectedCategory(cat.key);
                onSelectLandmark(null);
                onSelectWonder(null);
              }}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 scale-105'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <span className={cat.color}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. WONDERS / RECORDS LIST */}
      {selectedCategory === 'wonders' && !activeWonder && (
        <div className="p-3 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-3xl shadow-2xl space-y-2 max-h-[65vh] overflow-y-auto">
          <div className="flex items-center gap-2 px-1 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Khám phá những kỷ lục Trái Đất
            </span>
          </div>
          <div className="space-y-1.5">
            {WONDERS_RECORDS.map(w => (
              <button
                key={w.id}
                onClick={() => onSelectWonder(w)}
                className="w-full flex items-start gap-2.5 p-2.5 bg-slate-800/70 hover:bg-slate-700 border border-slate-700 rounded-2xl text-left transition-all text-xs font-medium text-slate-200 hover:text-white group"
              >
                <span className="text-lg">{w.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-white group-hover:text-amber-300">{w.question}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{w.answer}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. ACTIVE WONDER DETAIL MODAL CARD */}
      {activeWonder && (
        <div
          id="wonder-detail-card"
          className="p-4 bg-slate-900/95 backdrop-blur-xl border border-amber-400/60 rounded-3xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-100"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activeWonder.icon}</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Kỳ thú Trái Đất</span>
                <h3 className="text-sm font-bold text-white leading-tight">{activeWonder.question}</h3>
              </div>
            </div>
            <button
              onClick={() => onSelectWonder(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Đáp án: {activeWonder.answer}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Vị trí: {activeWonder.location}</span>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
            {activeWonder.detail}
          </p>

          <div className="p-3 bg-slate-800/40 border border-yellow-500/20 rounded-2xl text-xs text-yellow-100 flex items-start gap-2">
            <span>💡</span>
            <span>{activeWonder.funFact}</span>
          </div>
        </div>
      )}

      {/* 3. LANDMARKS CATEGORY LIST (When a natural category is chosen) */}
      {selectedCategory !== 'wonders' && !activeLandmark && (
        <div className="p-3 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl shadow-2xl space-y-2 max-h-[65vh] overflow-y-auto">
          <div className="flex items-center gap-2 px-1 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Chọn địa điểm để quan sát trên địa cầu
            </span>
          </div>
          <div className="space-y-1.5">
            {filteredLandmarks.map(item => (
              <button
                key={item.id}
                onClick={() => onSelectLandmark(item)}
                className="w-full flex items-center justify-between p-2.5 bg-slate-800/70 hover:bg-slate-700 border border-slate-700 rounded-2xl text-left transition-all text-xs font-medium text-slate-200 hover:text-white group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.categoryIcon}</span>
                  <div>
                    <div className="font-bold text-white group-hover:text-cyan-300">{item.nameVi}</div>
                    <div className="text-[10px] text-slate-400">{item.countryOrRegion}</div>
                  </div>
                </div>
                {item.heightOrLength && (
                  <span className="text-[10px] font-semibold text-amber-300 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                    {item.heightOrLength}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. ACTIVE LANDMARK DETAIL CARD */}
      {activeLandmark && (
        <div
          id="landmark-detail-card"
          className="p-4 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/60 rounded-3xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-100"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activeLandmark.categoryIcon}</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
                  {activeLandmark.categoryNameVi}
                </span>
                <h3 className="text-sm font-bold text-white leading-tight">{activeLandmark.nameVi}</h3>
              </div>
            </div>
            <button
              onClick={() => onSelectLandmark(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs p-2.5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{activeLandmark.countryOrRegion}</span>
            </div>
            {activeLandmark.heightOrLength && (
              <span className="font-bold text-amber-300">{activeLandmark.heightOrLength}</span>
            )}
          </div>

          <p className="text-xs text-slate-200 leading-relaxed bg-slate-800/50 p-3 rounded-2xl border border-slate-700/40">
            {activeLandmark.shortDescription}
          </p>

          <div className="p-3 bg-slate-800/40 border border-yellow-500/20 rounded-2xl text-xs text-yellow-100 flex items-start gap-2">
            <span>💡</span>
            <span>{activeLandmark.funFact}</span>
          </div>
        </div>
      )}
    </div>
  );
};
