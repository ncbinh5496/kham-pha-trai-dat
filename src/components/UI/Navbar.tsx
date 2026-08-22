import React from 'react';
import { SearchBar } from './SearchBar';
import { CountryData, MapViewMode } from '../../types';
import { Globe2, GraduationCap, Maximize2 } from 'lucide-react';

interface NavbarProps {
  onSelectCountry: (country: CountryData) => void;
  onReturnToVietnam: () => void;
  isTeacherMode: boolean;
  setIsTeacherMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  isPresentationMode: boolean;
  setIsPresentationMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenIntro: () => void;
  mapViewMode: MapViewMode;
  setMapViewMode: (mode: MapViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCountry,
  onReturnToVietnam,
  isTeacherMode,
  setIsTeacherMode,
  isPresentationMode,
  setIsPresentationMode,
  onOpenIntro,
  mapViewMode,
  setMapViewMode
}) => {
  return (
    <header
      id="top-app-header"
      className="absolute top-0 left-0 right-0 z-20 h-16 px-4 flex items-center justify-between pointer-events-none"
    >
      {/* App Logo & Title */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        <button
          onClick={onOpenIntro}
          className="flex items-center gap-2.5 p-2 bg-slate-900/90 hover:bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-xl transition-all group"
          title="Giới thiệu Khám phá Trái Đất"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <Globe2 className="w-5 h-5" />
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-sm font-black tracking-tight text-white flex items-center gap-1">
              KHÁM PHÁ TRÁI ĐẤT
            </span>
            <span className="text-[10px] text-cyan-300 font-semibold tracking-wider">
              Địa Lí Tiểu Học 3D & 2D
            </span>
          </div>
        </button>

        {/* 🌍 3D Globe ↔ 🗺 2D Map Switch */}
        <div
          id="map-view-mode-toggle"
          className="flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-1 shadow-xl"
        >
          <button
            id="btn-switch-3d-globe"
            onClick={() => setMapViewMode('3d_globe')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mapViewMode === '3d_globe'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Chuyển sang Quả Địa Cầu 3D"
          >
            <span>🌍</span>
            <span className="hidden sm:inline">Địa cầu</span>
          </button>

          <button
            id="btn-switch-2d-map"
            onClick={() => setMapViewMode('2d_map')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mapViewMode === '2d_map'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Chuyển sang Bản Đồ Thế Giới 2D"
          >
            <span>🗺</span>
            <span className="hidden sm:inline">Bản đồ</span>
          </button>
        </div>
      </div>

      {/* Middle: Minimalist Interactive Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 flex justify-center pointer-events-auto">
        <SearchBar onSelectCountry={onSelectCountry} />
      </div>

      {/* Right: Quick Vietnam, Teacher Mode, Presentation Mode */}
      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        {/* 🇻🇳 Việt Nam */}
        <button
          id="nav-btn-return-vietnam"
          onClick={onReturnToVietnam}
          className="flex items-center gap-1.5 py-2 px-2.5 sm:px-3 bg-slate-900/90 hover:bg-red-950/80 border border-red-500/40 text-red-100 rounded-2xl font-bold text-xs shadow-xl backdrop-blur-xl transition-all"
          title="Xoay nhanh về Việt Nam"
        >
          <span className="text-base">🇻🇳</span>
          <span className="hidden md:inline">Việt Nam</span>
        </button>

        {/* 👩‍🏫 Giáo viên */}
        <button
          id="btn-toggle-teacher-mode"
          onClick={() => setIsTeacherMode(prev => !prev)}
          className={`flex items-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-2xl border font-bold text-xs shadow-xl backdrop-blur-xl transition-all ${
            isTeacherMode
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-950/60 ring-2 ring-emerald-400/50'
              : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 text-emerald-300 hover:border-emerald-500/60'
          }`}
          title="Mở thanh công cụ dành cho Giáo viên"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="hidden md:inline">Giáo viên</span>
        </button>

        {/* ⛶ Trình chiếu */}
        <button
          id="btn-toggle-presentation-mode"
          onClick={() => setIsPresentationMode(prev => !prev)}
          className={`flex items-center gap-1.5 py-2 px-2.5 sm:px-3 rounded-2xl border font-bold text-xs shadow-xl backdrop-blur-xl transition-all ${
            isPresentationMode
              ? 'bg-cyan-600 border-cyan-400 text-white shadow-cyan-950/60 ring-2 ring-cyan-400/50'
              : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 text-cyan-300 hover:border-cyan-500/60'
          }`}
          title="Bật chế độ Trình chiếu toàn màn hình"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden lg:inline">Trình chiếu</span>
        </button>
      </div>
    </header>
  );
};
