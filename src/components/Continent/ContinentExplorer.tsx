import React from 'react';
import { ContinentData, CountryData } from '../../types';
import { CONTINENTS_DATA } from '../../data/continents';
import { COUNTRIES_DATA } from '../../data/countries';
import { Flag, Sparkles, X, ChevronRight } from 'lucide-react';

interface ContinentExplorerProps {
  activeContinentId: string | null;
  onSelectContinent: (continentId: string | null) => void;
  onSelectCountry: (country: CountryData) => void;
}

export const ContinentExplorer: React.FC<ContinentExplorerProps> = ({
  activeContinentId,
  onSelectContinent,
  onSelectCountry
}) => {
  const continents = Object.values(CONTINENTS_DATA);
  const activeContinent: ContinentData | null = activeContinentId ? CONTINENTS_DATA[activeContinentId] : null;

  // Filter countries belonging to the active continent
  const continentCountries = activeContinent
    ? Object.values(COUNTRIES_DATA).filter(c => c.continentId === activeContinent.id)
    : [];

  return (
    <div id="continent-explorer-container" className="absolute top-16 left-4 z-20 flex flex-col gap-2 max-w-sm pointer-events-auto">
      {/* Horizontal / Wrapped Continent Select Pills */}
      <div className="flex flex-wrap gap-1.5 p-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl">
        {continents.map(cont => {
          const isSelected = activeContinentId === cont.id;
          return (
            <button
              key={cont.id}
              id={`btn-continent-${cont.id}`}
              onClick={() => onSelectContinent(isSelected ? null : cont.id)}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <span>{cont.icon}</span>
              <span>{cont.nameVi}</span>
            </button>
          );
        })}
      </div>

      {/* Active Continent Detail Card */}
      {activeContinent && (
        <div
          id="continent-detail-card"
          className="p-4 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-3xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 text-slate-100 max-h-[70vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{activeContinent.icon}</span>
              <div>
                <h3 className="text-base font-black text-white">{activeContinent.nameVi}</h3>
                <span className="text-[11px] text-cyan-300 font-semibold">{activeContinent.nameEn}</span>
              </div>
            </div>
            <button
              onClick={() => onSelectContinent(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Short description */}
          <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/40">
            "{activeContinent.description}"
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Số quốc gia</span>
              <span className="font-bold text-amber-400">{activeContinent.countryCount} nước</span>
            </div>
            <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Diện tích</span>
              <span className="font-bold text-emerald-400">{activeContinent.area}</span>
            </div>
            <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Dân số</span>
              <span className="font-bold text-sky-400">{activeContinent.population.split('(')[0]}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Đặc điểm nổi bật
            </span>
            <div className="space-y-1.5">
              {activeContinent.highlights.map((h, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Representative Countries to Jump */}
          {continentCountries.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Flag className="w-3.5 h-3.5" /> Khám phá các quốc gia tiêu biểu
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {continentCountries.map(country => (
                  <button
                    key={country.id}
                    onClick={() => onSelectCountry(country)}
                    className="flex items-center justify-between p-2 bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold text-left transition-colors text-slate-200 hover:text-white"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{country.flag}</span>
                      <span className="truncate">{country.nameVi}</span>
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
