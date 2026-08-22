import React from 'react';
import { Globe2, Sparkles, MapPin, Compass, Play, Trophy, GraduationCap, X } from 'lucide-react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="intro-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-xl bg-slate-900/95 border-2 border-cyan-500/50 rounded-3xl shadow-2xl shadow-cyan-950/60 p-6 sm:p-8 text-center text-slate-100 flex flex-col items-center gap-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Globe 3D Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/50 border-2 border-cyan-300/40">
          <Globe2 className="w-9 h-9 animate-spin-slow" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            🌍 KHÁM PHÁ TRÁI ĐẤT
          </h1>
          <p className="text-sm sm:text-base font-semibold text-cyan-300">
            Xoay địa cầu – khám phá thế giới – học Địa lí thật vui!
          </p>
        </div>

        {/* Features Highlights Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left text-xs">
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl flex items-start gap-2.5">
            <span className="text-xl">🌐</span>
            <div>
              <div className="font-bold text-white">Quả địa cầu 3D</div>
              <div className="text-slate-400">Xoay, phóng to, nhấp vào quốc gia để xem chi tiết.</div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl flex items-start gap-2.5">
            <span className="text-xl">🇻🇳</span>
            <div>
              <div className="font-bold text-white">Về Việt Nam & Hành trình</div>
              <div className="text-slate-400">Xem khoảng cách và đường bay từ Việt Nam đi khắp thế giới.</div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl flex items-start gap-2.5">
            <span className="text-xl">🏔️</span>
            <div>
              <div className="font-bold text-white">Thiên nhiên & Kỳ thú</div>
              <div className="text-slate-400">Khám phá núi cao, sông dài, sa mạc, rừng và núi lửa.</div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl flex items-start gap-2.5">
            <span className="text-xl">🎮</span>
            <div>
              <div className="font-bold text-white">Thử thách trò chơi</div>
              <div className="text-slate-400">Tìm và đoán quốc gia với điểm số và huy hiệu vui nhộn.</div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          id="btn-start-exploration"
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-cyan-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>Bắt đầu khám phá</span>
        </button>
      </div>
    </div>
  );
};
