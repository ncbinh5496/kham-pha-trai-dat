import React from 'react';
import { RotateCcw, Compass } from 'lucide-react';
import { CountryData } from '../../types';

interface GlobeOverlayProps {
  onReturnToVietnam: () => void;
  onResetView: () => void;
  selectedCountry?: CountryData | null;
  isPresentationMode?: boolean;
}

export const GlobeOverlay: React.FC<GlobeOverlayProps> = ({
  onReturnToVietnam,
  onResetView,
  selectedCountry: _selectedCountry,
  isPresentationMode = false
}) => {
  return (
    <div
      id="globe-overlay-controls"
      className="pointer-events-none absolute inset-0 z-10 p-4 flex flex-col justify-between"
    >
      {/* Top Left: In Presentation Mode, show quick Vietnam return */}
      <div className="flex items-center gap-3">
        {isPresentationMode && (
          <button
            id="presentation-btn-return-vietnam"
            onClick={onReturnToVietnam}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950/90 hover:bg-red-950 border border-red-500/50 text-red-100 shadow-2xl backdrop-blur-xl transition-all"
            title="Xoay nhanh về Việt Nam"
          >
            <span className="text-lg">🇻🇳</span>
            <span className="text-xs font-bold">Việt Nam</span>
          </button>
        )}
      </div>

      {/* Bottom Right: Clean Camera Compass & Reset Controls */}
      <div className="flex items-end justify-end">
        <div className="pointer-events-auto flex flex-col items-center gap-1.5 p-1.5 bg-slate-950/85 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
          <button
            id="btn-reset-view"
            onClick={onResetView}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
            title="Đặt lại vị trí quả địa cầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="w-5 h-[1px] bg-slate-800" />
          <div
            className="w-8 h-8 flex items-center justify-center text-cyan-400 select-none"
            title="Phương hướng Bắc - Nam"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>
      </div>
    </div>
  );
};
