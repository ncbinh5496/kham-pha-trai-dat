import React, { useState } from 'react';
import { CountryData } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { calculateDistanceKm, formatNumberVi, matchCountryData } from '../../utils/geoUtils';
import {
  Scale,
  X,
  MapPin,
  Users,
  Maximize2,
  Languages,
  SunMedium,
  Coins,
  Compass,
  ArrowRightLeft
} from 'lucide-react';

interface CountryComparisonProps {
  initialCountryA?: CountryData | null;
  onClose: () => void;
  onSelectCountryForGlobe?: (country: CountryData) => void;
}

export const CountryComparison: React.FC<CountryComparisonProps> = ({
  initialCountryA,
  onClose,
  onSelectCountryForGlobe
}) => {
  const allCountries = Object.values(COUNTRIES_DATA);
  const [countryAId, setCountryAId] = useState<string>(initialCountryA?.id || 'vietnam');
  const [countryBId, setCountryBId] = useState<string>(
    initialCountryA?.id === 'japan' ? 'vietnam' : 'japan'
  );

  const countryA = matchCountryData(countryAId) || COUNTRIES_DATA[countryAId] || COUNTRIES_DATA.vietnam;
  const countryB = matchCountryData(countryBId) || COUNTRIES_DATA[countryBId] || COUNTRIES_DATA.japan;

  const distanceKm = calculateDistanceKm(countryA.lat, countryA.lng, countryB.lat, countryB.lng);

  // Calculate relative bars (percentages)
  const maxArea = Math.max(countryA.areaNum, countryB.areaNum, 1);
  const percentAreaA = Math.max(10, Math.round((countryA.areaNum / maxArea) * 100));
  const percentAreaB = Math.max(10, Math.round((countryB.areaNum / maxArea) * 100));

  const maxPop = Math.max(countryA.populationNum, countryB.populationNum, 1);
  const percentPopA = Math.max(10, Math.round((countryA.populationNum / maxPop) * 100));
  const percentPopB = Math.max(10, Math.round((countryB.populationNum / maxPop) * 100));

  const swapCountries = () => {
    setCountryAId(countryBId);
    setCountryBId(countryAId);
  };

  return (
    <div
      id="country-comparison-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-950/80 border border-cyan-500/40 rounded-2xl text-cyan-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">So Sánh Hai Quốc Gia</h2>
              <p className="text-xs text-slate-400">Tìm hiểu điểm giống và khác nhau giữa hai đất nước</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Country Selector Dropdowns & Distance */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Country A Select */}
          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <span className="text-2xl">{countryA.flag}</span>
            <select
              value={countryAId}
              onChange={(e) => setCountryAId(e.target.value)}
              className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
            >
              {allCountries.map(c => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.nameVi} ({c.continent})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button & Distance Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={swapCountries}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-cyan-400 transition-colors"
              title="Đổi vị trí 2 nước"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
            <div className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-300 font-semibold">
              Khoảng cách: <span className="text-amber-400 font-bold">{formatNumberVi(distanceKm)} km</span>
            </div>
          </div>

          {/* Country B Select */}
          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <span className="text-2xl">{countryB.flag}</span>
            <select
              value={countryBId}
              onChange={(e) => setCountryBId(e.target.value)}
              className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
            >
              {allCountries.map(c => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.nameVi} ({c.continent})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Content (Scrollable) */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Row 1: Area Visual Comparison */}
          <div className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <Maximize2 className="w-4 h-4" />
              <span>Diện tích lãnh thổ</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Country A Area */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{countryA.nameVi}</span>
                  <span className="text-emerald-300">{countryA.area}</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentAreaA}%` }}
                  />
                </div>
              </div>

              {/* Country B Area */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{countryB.nameVi}</span>
                  <span className="text-emerald-300">{countryB.area}</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentAreaB}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Population Visual Comparison */}
          <div className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-sky-400">
              <Users className="w-4 h-4" />
              <span>Dân số</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Country A Pop */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{countryA.nameVi}</span>
                  <span className="text-sky-300">{countryA.population}</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentPopA}%` }}
                  />
                </div>
              </div>

              {/* Country B Pop */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{countryB.nameVi}</span>
                  <span className="text-sky-300">{countryB.population}</span>
                </div>
                <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentPopB}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Two Columns Grid for Detailed Facts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Column A */}
            <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
                <span className="text-2xl">{countryA.flag}</span>
                <span className="font-bold text-white text-base">{countryA.nameVi}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">🏙️ Thủ đô:</span>
                  <span className="font-bold text-white">{countryA.capital}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">🌏 Châu lục:</span>
                  <span className="font-semibold text-cyan-300">{countryA.continent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">🗣️ Ngôn ngữ chính:</span>
                  <span className="font-semibold text-slate-200">{countryA.language}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">🌤️ Khí hậu:</span>
                  <span className="text-slate-300">{countryA.climate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">💰 Tiền tệ:</span>
                  <span className="text-slate-300">{countryA.currency}</span>
                </div>
              </div>
            </div>

            {/* Column B */}
            <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
                <span className="text-2xl">{countryB.flag}</span>
                <span className="font-bold text-white text-base">{countryB.nameVi}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">🏙️ Thủ đô:</span>
                  <span className="font-bold text-white">{countryB.capital}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">🌏 Châu lục:</span>
                  <span className="font-semibold text-cyan-300">{countryB.continent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">🗣️ Ngôn ngữ chính:</span>
                  <span className="font-semibold text-slate-200">{countryB.language}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">🌤️ Khí hậu:</span>
                  <span className="text-slate-300">{countryB.climate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">💰 Tiền tệ:</span>
                  <span className="text-slate-300">{countryB.currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
