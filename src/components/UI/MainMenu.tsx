import React, { useState, useRef, useEffect } from 'react';
import { AppMode, GameType, LearningActivity } from '../../types';
import {
  Globe2,
  Map,
  Mountain,
  Gamepad2,
  BookOpen,
  MoreHorizontal,
  Scale,
  Sparkles,
  ChevronUp,
  Compass,
  ShieldCheck
} from 'lucide-react';

interface MainMenuProps {
  currentMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  activeGameType: GameType | null;
  setActiveGameType: (type: GameType | null) => void;
  activeLearningActivity: LearningActivity | null;
  setActiveLearningActivity: (activity: LearningActivity | null) => void;
  onOpenCompare?: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  currentMode,
  setAppMode,
  activeGameType,
  setActiveGameType,
  activeLearningActivity,
  setActiveLearningActivity,
  onOpenCompare
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreMenuOpen(false);
      }
      if (gamesRef.current && !gamesRef.current.contains(e.target as Node)) {
        setIsGamesDropdownOpen(false);
      }
      if (learningRef.current && !learningRef.current.contains(e.target as Node)) {
        setIsLearningDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      id="bottom-main-menu"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
    >
      <div className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-slate-950/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl shadow-2xl shadow-slate-950/90">
        {/* 1. KHÁM PHÁ TRÁI ĐẤT */}
        <button
          id="nav-btn-explore"
          onClick={() => {
            setAppMode('explore');
            setActiveGameType(null);
            setActiveLearningActivity(null);
            setIsMoreMenuOpen(false);
            setIsGamesDropdownOpen(false);
            setIsLearningDropdownOpen(false);
          }}
          className={`flex items-center gap-2 min-h-[44px] py-2.5 px-3 sm:px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            currentMode === 'explore' && !activeGameType && !activeLearningActivity
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Khám phá</span>
        </button>

        {/* 2. BÀI HỌC ĐỊA LÍ TIỂU HỌC */}
        <div ref={learningRef} className="relative">
          <button
            id="nav-btn-learning"
            onClick={() => {
              setIsLearningDropdownOpen(!isLearningDropdownOpen);
              setIsGamesDropdownOpen(false);
              setIsMoreMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 min-h-[44px] py-2.5 px-3 sm:px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeLearningActivity
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Bài học</span>
            <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isLearningDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Learning Activities Popover */}
          {isLearningDropdownOpen && (
            <div
              id="learning-selection-dropdown"
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-72 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-2.5 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-3 py-1">
                Chủ Đề Địa Lí Tiểu Học
              </div>

              {/* Module 1: Vietnam & Neighbors */}
              <button
                id="learning-btn-vietnam-neighbors"
                onClick={() => {
                  setActiveLearningActivity('vietnam_neighbors');
                  setActiveGameType(null);
                  setIsLearningDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                  activeLearningActivity === 'vietnam_neighbors'
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-slate-800/80 text-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-base">
                  🇻🇳
                </div>
                <div>
                  <div className="text-xs font-bold">Việt Nam & Láng Giềng</div>
                  <div className="text-[10px] text-slate-400">3 nước giáp đất liền & Đông Nam Á</div>
                </div>
              </button>

              {/* Module 2: Directions */}
              <button
                id="learning-btn-directions"
                onClick={() => {
                  setActiveLearningActivity('direction_finding');
                  setActiveGameType(null);
                  setIsLearningDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                  activeLearningActivity === 'direction_finding'
                    ? 'bg-sky-600 text-white'
                    : 'hover:bg-slate-800/80 text-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-base">
                  🧭
                </div>
                <div>
                  <div className="text-xs font-bold">Phương Hướng Trên Bản Đồ</div>
                  <div className="text-[10px] text-slate-400">4 hướng chính & so với Việt Nam</div>
                </div>
              </button>

              {/* Module 3: Hemispheres & Equator */}
              <button
                id="learning-btn-hemispheres"
                onClick={() => {
                  setActiveLearningActivity('hemispheres_equator');
                  setActiveGameType(null);
                  setIsLearningDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                  activeLearningActivity === 'hemispheres_equator'
                    ? 'bg-amber-600 text-white'
                    : 'hover:bg-slate-800/80 text-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-base">
                  🌐
                </div>
                <div>
                  <div className="text-xs font-bold">Bắc & Nam Bán Cầu</div>
                  <div className="text-[10px] text-slate-400">Đường Xích đạo & sự phân chia</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* 3. CHÂU LỤC */}
        <button
          id="nav-btn-continents"
          onClick={() => {
            setAppMode(currentMode === 'continents' ? 'explore' : 'continents');
            setActiveGameType(null);
            setActiveLearningActivity(null);
            setIsMoreMenuOpen(false);
            setIsGamesDropdownOpen(false);
            setIsLearningDropdownOpen(false);
          }}
          className={`flex items-center gap-2 min-h-[44px] py-2.5 px-3 sm:px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            currentMode === 'continents'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Map className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Châu lục</span>
        </button>

        {/* 4. THIÊN NHIÊN */}
        <button
          id="nav-btn-nature"
          onClick={() => {
            setAppMode(currentMode === 'nature' ? 'explore' : 'nature');
            setActiveGameType(null);
            setActiveLearningActivity(null);
            setIsMoreMenuOpen(false);
            setIsGamesDropdownOpen(false);
            setIsLearningDropdownOpen(false);
          }}
          className={`flex items-center gap-2 min-h-[44px] py-2.5 px-3 sm:px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            currentMode === 'nature'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Mountain className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Thiên nhiên</span>
        </button>

        {/* 5. THỬ THÁCH (Trò chơi) */}
        <div ref={gamesRef} className="relative">
          <button
            id="nav-btn-games"
            onClick={() => {
              setIsGamesDropdownOpen(!isGamesDropdownOpen);
              setIsLearningDropdownOpen(false);
              setIsMoreMenuOpen(false);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 min-h-[44px] py-2.5 px-3 sm:px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeGameType
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Thử thách</span>
            <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isGamesDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Games Selection Popover */}
          {isGamesDropdownOpen && (
            <div
              id="games-selection-dropdown"
              className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-2.5 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-400 px-3 py-1">
                Trò chơi Thám hiểm
              </div>

              {/* Game 1 */}
              <button
                id="game-btn-find-country"
                onClick={() => {
                  setActiveGameType('find_country');
                  setActiveLearningActivity(null);
                  setAppMode('explore');
                  setIsGamesDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                  activeGameType === 'find_country'
                    ? 'bg-rose-600 text-white'
                    : 'hover:bg-slate-800/80 text-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-base">
                  🎯
                </div>
                <div>
                  <div className="text-xs font-bold">Tìm Quốc Gia</div>
                  <div className="text-[10px] text-slate-400">Chỉ điểm quốc gia trên địa cầu</div>
                </div>
              </button>

              {/* Game 2 */}
              <button
                id="game-btn-guess-country"
                onClick={() => {
                  setActiveGameType('guess_country');
                  setActiveLearningActivity(null);
                  setAppMode('explore');
                  setIsGamesDropdownOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                  activeGameType === 'guess_country'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-slate-800/80 text-slate-200'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-base">
                  ❓
                </div>
                <div>
                  <div className="text-xs font-bold">Đố Vui Cờ & Thủ Đô</div>
                  <div className="text-[10px] text-slate-400">Trả lời các câu hỏi thú vị</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* 6. THÊM (More Options Popover) */}
        <div ref={moreRef} className="relative">
          <button
            id="nav-btn-more"
            onClick={() => {
              setIsMoreMenuOpen(!isMoreMenuOpen);
              setIsGamesDropdownOpen(false);
              setIsLearningDropdownOpen(false);
            }}
            className={`flex items-center justify-center min-h-[44px] w-11 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              isMoreMenuOpen || currentMode === 'compare'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Xem thêm tính năng"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* More Popover */}
          {isMoreMenuOpen && (
            <div
              id="more-options-dropdown"
              className="absolute bottom-full mb-3 right-0 w-56 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-400 px-3 py-1">
                Tiện ích bổ sung
              </div>

              {/* So sánh quốc gia */}
              <button
                onClick={() => {
                  if (onOpenCompare) onOpenCompare();
                  else setAppMode('compare');
                  setIsMoreMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 p-2.5 hover:bg-slate-800/80 rounded-2xl text-xs font-bold text-slate-200 transition-colors text-left"
              >
                <Scale className="w-4 h-4 text-purple-400" />
                <span>So sánh 2 Quốc gia</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
