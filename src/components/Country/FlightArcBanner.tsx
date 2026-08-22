import React from 'react';
import { FlightArcData } from '../../types';
import { Plane, Clock, Navigation, X } from 'lucide-react';
import { formatNumberVi } from '../../utils/geoUtils';

interface FlightArcBannerProps {
  flightArc: FlightArcData | null;
  onClose: () => void;
}

export const FlightArcBanner: React.FC<FlightArcBannerProps> = ({ flightArc, onClose }) => {
  if (!flightArc) return null;

  return (
    <div
      id="flight-arc-banner"
      className="absolute top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="p-4 bg-slate-900/95 backdrop-blur-xl border border-red-500/50 rounded-3xl shadow-2xl shadow-red-950/50 text-white flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-600/30 border border-red-500/50 rounded-xl text-red-400">
              <Plane className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <span className="text-xs text-red-300 font-semibold uppercase tracking-wider">Hành trình bay từ Việt Nam</span>
              <div className="flex items-center gap-2 text-sm font-bold">
                <span>{flightArc.fromName}</span>
                <span className="text-red-400">✈➔</span>
                <span>{flightArc.toName}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            title="Đóng hành trình bay"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
          {/* Distance */}
          <div className="flex items-center gap-2.5 p-2.5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 block">Khoảng cách đường thẳng</span>
              <span className="text-sm font-black text-cyan-300">
                ~{formatNumberVi(flightArc.distanceKm)} km
              </span>
            </div>
          </div>

          {/* Flight Time */}
          <div className="flex items-center gap-2.5 p-2.5 bg-slate-800/60 rounded-2xl border border-slate-700/50">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block">Thời gian bay ước tính</span>
              <span className="text-sm font-black text-amber-300">
                ~{flightArc.flightHours} giờ
              </span>
            </div>
          </div>
        </div>

        {/* Footnote disclaimer */}
        <p className="text-[10px] text-slate-400 leading-tight italic px-1">
          * Ước tính theo tốc độ máy bay khoảng 850 km/h, không phải thời gian của một chuyến bay thực tế.
        </p>
      </div>
    </div>
  );
};
