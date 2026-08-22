import React, { useState } from 'react';
import { CountryData } from '../../types';
import { CountryMiniMap } from './CountryMiniMap';
import {
  X,
  Plane,
  Scale,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CountryPanelProps {
  country: CountryData;
  onClose: () => void;
  onViewFromVietnam: (country: CountryData) => void;
  onCompareWithAnother: (country: CountryData) => void;
  isFlightArcActive?: boolean;
}

type SectionKey = 'nature' | 'culture' | 'food' | 'funfacts';

export const CountryPanel: React.FC<CountryPanelProps> = ({
  country,
  onClose,
  onViewFromVietnam,
  onCompareWithAnother,
  isFlightArcActive = false
}) => {
  // Accordion open section (defaults to nature or none)
  const [openSection, setOpenSection] = useState<SectionKey | null>('nature');
  const isVietnam = country.id === 'vietnam';

  const toggleSection = (section: SectionKey) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  return (
    <div
      id="country-detail-panel"
      className="absolute top-16 right-3 sm:right-5 bottom-20 w-[calc(100%-24px)] sm:w-[360px] md:w-[380px] bg-slate-950/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl shadow-2xl shadow-slate-950/90 flex flex-col z-30 overflow-hidden text-slate-100 animate-in fade-in slide-in-from-right-6 duration-300 pointer-events-auto"
    >
      {/* Header Area */}
      <div className="relative p-5 pb-4 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/40">
        {/* Close Button */}
        <button
          id="btn-close-country-panel"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-full transition-colors"
          title="Đóng thẻ khám phá"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flag & Country Title */}
        <div className="flex items-start gap-3.5 pr-8">
          <span className="text-4xl sm:text-5xl filter drop-shadow-md select-none">
            {country.flag}
          </span>
          <div className="space-y-0.5">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {country.nameVi}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">
                {country.nameEn}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 rounded-full">
                {country.continent}
              </span>
            </div>
          </div>
        </div>

        {/* Description Tagline */}
        {country.shortDescription && (
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
            "{country.shortDescription}"
          </p>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
        {/* 1. THREE BIG IMPORTANT METRICS (Thủ đô, Dân số, Vị trí) */}
        <div className="grid grid-cols-3 gap-2">
          {/* Thủ đô */}
          <div className="p-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl flex flex-col items-center text-center justify-center space-y-1">
            <span className="text-lg">🏙️</span>
            <span className="font-bold text-white text-xs sm:text-sm truncate w-full">
              {country.capital}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Thủ đô</span>
          </div>

          {/* Dân số */}
          <div className="p-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl flex flex-col items-center text-center justify-center space-y-1">
            <span className="text-lg">👥</span>
            <span className="font-bold text-white text-xs sm:text-sm truncate w-full">
              {country.population}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Dân số</span>
          </div>

          {/* Vị trí */}
          <div className="p-3 bg-slate-900/80 border border-slate-800/80 rounded-2xl flex flex-col items-center text-center justify-center space-y-1">
            <span className="text-lg">🌏</span>
            <span className="font-bold text-white text-xs sm:text-sm truncate w-full">
              {country.continent}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Vị trí</span>
          </div>
        </div>

        {/* 2. MINI 2D COUNTRY MAP SHAPE */}
        <CountryMiniMap
          countryId={country.id}
          countryNameVi={country.nameVi}
        />

        {/* 3. DEEP DISCOVERY SECTION CARDS */}
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Khám phá sâu hơn
          </div>

          {/* Card: 🏔 Thiên nhiên */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors">
            <button
              onClick={() => toggleSection('nature')}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🏔️</span>
                <span className="text-sm font-bold text-slate-100">Thiên nhiên & Cảnh quan</span>
              </div>
              {openSection === 'nature' ? (
                <ChevronUp className="w-4 h-4 text-cyan-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSection === 'nature' && (
              <div className="p-3.5 pt-0 space-y-2 border-t border-slate-800/50">
                <div className="space-y-2 pt-2">
                  {country.natureHighlights?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                      <span className="text-cyan-400 text-xs mt-1">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                  {country.climate && country.climate !== 'Đang cập nhật' && (
                    <div className="mt-2 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-amber-300/90 leading-relaxed">
                      <span className="font-semibold text-amber-400">Khí hậu:</span> {country.climate}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Card: 🎎 Văn hóa */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors">
            <button
              onClick={() => toggleSection('culture')}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🎎</span>
                <span className="text-sm font-bold text-slate-100">Văn hóa & Lễ hội</span>
              </div>
              {openSection === 'culture' ? (
                <ChevronUp className="w-4 h-4 text-rose-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSection === 'culture' && (
              <div className="p-3.5 pt-0 space-y-2 border-t border-slate-800/50">
                <div className="space-y-2 pt-2">
                  {country.cultureHighlights?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                      <span className="text-rose-400 text-xs mt-1">🌸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                  {country.language && country.language !== 'Đang cập nhật' && (
                    <div className="mt-2 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-rose-300/90">
                      <span className="font-semibold text-rose-400">Ngôn ngữ:</span> {country.language}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Card: 🍱 Ẩm thực */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors">
            <button
              onClick={() => toggleSection('food')}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🍱</span>
                <span className="text-sm font-bold text-slate-100">Ẩm thực đặc sắc</span>
              </div>
              {openSection === 'food' ? (
                <ChevronUp className="w-4 h-4 text-amber-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSection === 'food' && (
              <div className="p-3.5 pt-0 space-y-2 border-t border-slate-800/50">
                <div className="space-y-2 pt-2">
                  {country.foodHighlights?.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                      <span className="text-amber-400 text-xs mt-1">🍲</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card: ⭐ Điều thú vị */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors">
            <button
              onClick={() => toggleSection('funfacts')}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">⭐</span>
                <span className="text-sm font-bold text-slate-100">Điều thú vị em có biết?</span>
              </div>
              {openSection === 'funfacts' ? (
                <ChevronUp className="w-4 h-4 text-yellow-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openSection === 'funfacts' && (
              <div className="p-3.5 pt-0 space-y-2 border-t border-slate-800/50">
                <div className="space-y-2 pt-2">
                  {country.funFacts?.slice(0, 3).map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-yellow-100/90 leading-relaxed">
                      <span className="text-yellow-400 text-xs mt-1">💡</span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Primary Actions */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center gap-2.5">
        {!isVietnam ? (
          <button
            id="btn-view-from-vietnam"
            onClick={() => onViewFromVietnam(country)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold transition-all shadow-lg ${
              isFlightArcActive
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white ring-2 ring-red-400/60'
                : 'bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-100 hover:text-white'
            }`}
          >
            <Plane className="w-4 h-4 text-amber-300" />
            <span>{isFlightArcActive ? 'Đang xem từ Việt Nam' : 'Xem từ Việt Nam 🇻🇳'}</span>
          </button>
        ) : (
          <div className="flex-1 py-2.5 px-3 bg-red-950/60 border border-red-500/40 rounded-2xl text-center text-xs font-bold text-yellow-300">
            🇻🇳 Đất nước Việt Nam thân yêu!
          </div>
        )}

        <button
          id="btn-compare-country"
          onClick={() => onCompareWithAnother(country)}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-sm font-bold text-slate-100 transition-colors shadow-md"
          title="So sánh quốc gia này với quốc gia khác"
        >
          <Scale className="w-4 h-4 text-cyan-400" />
          <span>So sánh</span>
        </button>
      </div>
    </div>
  );
};
