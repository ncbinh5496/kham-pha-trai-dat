import React, { useState, useRef, useEffect } from 'react';
import { CountryData } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { normalizeGeoString, WORLD_COUNTRIES_CATALOG, createDynamicCountryFromFeature } from '../../utils/geoUtils';
import { Search, X, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSelectCountry: (country: CountryData) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectCountry }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allCountries = Object.values(COUNTRIES_DATA);

  // Filter autocomplete suggestions in Vietnamese and English
  const filtered = query.trim()
    ? (() => {
        const qRaw = query.trim().toLowerCase();
        const qNorm = normalizeGeoString(query);

        const primaryMatches = allCountries.filter(c => {
          const viLower = c.nameVi.toLowerCase();
          const enLower = c.nameEn.toLowerCase();
          const viNorm = normalizeGeoString(c.nameVi);
          const enNorm = normalizeGeoString(c.nameEn);
          const capNorm = normalizeGeoString(c.capital);
          const contNorm = normalizeGeoString(c.continent);

          return (
            viLower.includes(qRaw) ||
            enLower.includes(qRaw) ||
            viNorm.includes(qNorm) ||
            enNorm.includes(qNorm) ||
            capNorm.includes(qNorm) ||
            contNorm.includes(qNorm) ||
            c.code.toLowerCase() === qRaw
          );
        });

        if (primaryMatches.length < 5) {
          const catalogMatches: CountryData[] = [];
          const existingIds = new Set(primaryMatches.map(c => c.id));

          for (const [catKey, catInfo] of Object.entries(WORLD_COUNTRIES_CATALOG)) {
            if (existingIds.has(catKey)) continue;

            const viLower = catInfo.nameVi.toLowerCase();
            const enLower = catInfo.nameEn.toLowerCase();
            const viNorm = normalizeGeoString(catInfo.nameVi);
            const enNorm = normalizeGeoString(catInfo.nameEn);
            const capNorm = normalizeGeoString(catInfo.capitalVi);

            if (
              viLower.includes(qRaw) ||
              enLower.includes(qRaw) ||
              viNorm.includes(qNorm) ||
              enNorm.includes(qNorm) ||
              capNorm.includes(qNorm) ||
              catInfo.iso2.toLowerCase() === qRaw
            ) {
              catalogMatches.push(createDynamicCountryFromFeature(catKey));
              if (primaryMatches.length + catalogMatches.length >= 8) break;
            }
          }
          return [...primaryMatches, ...catalogMatches].slice(0, 10);
        }

        return primaryMatches.slice(0, 10);
      })()
    : [];

  const handleSelect = (country: CountryData) => {
    onSelectCountry(country);
    setQuery('');
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-sm sm:max-w-md pointer-events-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 pointer-events-none" />
        <input
          type="text"
          id="country-search-input"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Em muốn khám phá nơi nào?"
          className="w-full pl-10 pr-9 py-2 bg-slate-900/90 hover:bg-slate-900 text-sm text-slate-100 placeholder-slate-400/80 rounded-2xl border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none backdrop-blur-xl shadow-lg transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-1 text-slate-400 hover:text-white rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && filtered.length > 0 && (
        <div
          id="search-results-dropdown"
          className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-72 overflow-y-auto p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150"
        >
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="w-full flex items-center justify-between p-2.5 hover:bg-slate-800/80 rounded-xl transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl filter drop-shadow-sm">{item.flag}</span>
                <div>
                  <div className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {item.nameVi}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span>{item.nameEn}</span>
                    <span>•</span>
                    <span className="text-cyan-400/90">{item.continent}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">{item.capital}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
