import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  X,
  Target,
  MapPin
} from 'lucide-react';
import { CountryData, DirectionQuizMode } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { VIETNAM_COORDINATES, getRelativeDirection, getDirectionFromVietnam } from '../../utils/geoUtils';
import { DIRECTION_QUESTIONS } from '../../data/learningData';
import confetti from 'canvas-confetti';

interface DirectionLearningProps {
  selectedCountry: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  onClose: () => void;
  onFocusRegion?: (lat: number, lng: number, altitude: number, zoom2D?: number) => void;
  onSetHighlightCountries?: (countryIds: string[], targetId?: string | null) => void;
}

export const DirectionLearning: React.FC<DirectionLearningProps> = ({
  selectedCountry,
  onSelectCountry,
  onClose,
  onFocusRegion,
  onSetHighlightCountries
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'rules' | 'relative' | 'quiz'>('rules');
  const [directionMode, setDirectionMode] = useState<DirectionQuizMode>('4_cardinal');
  const [quizIndex, setQuizIndex] = useState(0);
  const [userSelection, setUserSelection] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Focus and highlight when entering 'relative' tab
  useEffect(() => {
    if (activeSubTab === 'relative') {
      if (selectedCountry && selectedCountry.id !== 'vietnam') {
        onSetHighlightCountries?.(['vietnam', selectedCountry.id], selectedCountry.id);
        onFocusRegion?.((VIETNAM_COORDINATES.lat + selectedCountry.lat) / 2, (VIETNAM_COORDINATES.lng + selectedCountry.lng) / 2, 2.0, 2.2);
      } else {
        onSetHighlightCountries?.(['vietnam'], 'vietnam');
        onFocusRegion?.(VIETNAM_COORDINATES.lat, VIETNAM_COORDINATES.lng, 2.0, 2.4);
      }
    } else if (activeSubTab === 'rules') {
      onSetHighlightCountries?.(['vietnam'], 'vietnam');
    }
  }, [activeSubTab, selectedCountry, onFocusRegion, onSetHighlightCountries]);

  // Initial focus
  useEffect(() => {
    onFocusRegion?.(VIETNAM_COORDINATES.lat, VIETNAM_COORDINATES.lng, 2.0, 2.4);
  }, [onFocusRegion]);

  // Compute direction from Vietnam for currently selected country
  const relativeDirection = useMemo(() => {
    if (!selectedCountry) return null;
    return getDirectionFromVietnam(selectedCountry);
  }, [selectedCountry]);

  // Bearing calculation
  const bearingData = useMemo(() => {
    if (!selectedCountry || selectedCountry.id === 'vietnam') return null;
    return getRelativeDirection(
      VIETNAM_COORDINATES.lat,
      VIETNAM_COORDINATES.lng,
      selectedCountry.lat,
      selectedCountry.lng,
      directionMode
    );
  }, [selectedCountry, directionMode]);

  const currentQ = DIRECTION_QUESTIONS[quizIndex];

  const handleAnswerClick = (option: string) => {
    setUserSelection(option);
    if (option === currentQ.correct) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {}
    }
  };

  const handleSelectExploreCountry = (c: CountryData) => {
    onSelectCountry(c);
    onSetHighlightCountries?.(['vietnam', c.id], c.id);
    onFocusRegion?.((VIETNAM_COORDINATES.lat + c.lat) / 2, (VIETNAM_COORDINATES.lng + c.lng) / 2, 2.0, 2.2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-xl border border-sky-500/40 rounded-3xl p-5 shadow-2xl text-slate-200"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Xác Định Phương Hướng Địa Lí
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Lớp 4 - 5
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Quy tắc 4 hướng chính, 8 hướng và xác định phương hướng so với Việt Nam
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mt-3 p-1 bg-slate-950/60 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('rules')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'rules'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Quy Tắc Phương Hướng</span>
        </button>

        <button
          onClick={() => setActiveSubTab('relative')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'relative'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>So Với Việt Nam</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('quiz');
            setShowAnswer(false);
            setUserSelection(null);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'quiz'
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Luyện Tập Trắc Nghiệm</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="mt-4">
        {/* Tab 1: Rules of Directions */}
        {activeSubTab === 'rules' && (
          <div className="space-y-4">
            {/* Mode Switch: 4 vs 8 directions */}
            <div className="flex items-center justify-between bg-slate-800/60 p-2.5 rounded-2xl border border-slate-700/50 text-xs">
              <span className="font-semibold text-slate-300">Chế độ hiển thị:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setDirectionMode('4_cardinal')}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    directionMode === '4_cardinal'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  4 Hướng chính (Cơ bản)
                </button>
                <button
                  onClick={() => setDirectionMode('8_ordinal')}
                  className={`px-3 py-1 rounded-xl font-bold transition-all ${
                    directionMode === '8_ordinal'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  8 Hướng (Mở rộng)
                </button>
              </div>
            </div>

            {/* Interactive Visual Compass Rose */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-sky-500/30 bg-sky-950/20" />
                <div className="absolute inset-2 rounded-full border border-dashed border-slate-700" />

                {/* 4 Cardinal Badges */}
                <div className="absolute top-1 flex flex-col items-center">
                  <span className="font-extrabold text-xs text-red-400 bg-red-950/80 px-2 py-0.5 rounded-full border border-red-500/40 shadow">
                    BẮC (N)
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Phía Trên</span>
                </div>

                <div className="absolute bottom-1 flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-medium">Phía Dưới</span>
                  <span className="font-extrabold text-xs text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-500/40 shadow">
                    NAM (S)
                  </span>
                </div>

                <div className="absolute right-1 flex flex-col items-center">
                  <span className="font-extrabold text-xs text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 shadow">
                    ĐÔNG (E)
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Bên Phải</span>
                </div>

                <div className="absolute left-1 flex flex-col items-center">
                  <span className="font-extrabold text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 shadow">
                    TÂY (W)
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Bên Trái</span>
                </div>

                {/* 8 Ordinal Labels if enabled */}
                {directionMode === '8_ordinal' && (
                  <>
                    <span className="absolute top-6 right-6 text-[10px] font-bold text-sky-300 bg-slate-900/80 px-1 rounded">
                      Đông Bắc
                    </span>
                    <span className="absolute bottom-6 right-6 text-[10px] font-bold text-sky-300 bg-slate-900/80 px-1 rounded">
                      Đông Nam
                    </span>
                    <span className="absolute bottom-6 left-6 text-[10px] font-bold text-sky-300 bg-slate-900/80 px-1 rounded">
                      Tây Nam
                    </span>
                    <span className="absolute top-6 left-6 text-[10px] font-bold text-sky-300 bg-slate-900/80 px-1 rounded">
                      Tây Bắc
                    </span>
                  </>
                )}

                {/* Center Core */}
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-sky-400 flex items-center justify-center z-10 shadow-lg">
                  <span className="text-xs">🇻🇳</span>
                </div>
              </div>

              {/* Memory Rhyme & Rules */}
              <div className="flex-1 space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-800/50">
                  <h4 className="font-bold text-sky-300 mb-1 flex items-center gap-1.5">
                    💡 Khẩu Quyết Ghi Nhớ (SGK Địa lí):
                  </h4>
                  <ul className="space-y-1 text-slate-200 list-disc list-inside">
                    <li><strong>Trên:</strong> Hướng Bắc</li>
                    <li><strong>Dưới:</strong> Hướng Nam</li>
                    <li><strong>Phải:</strong> Hướng Đông (Mặt Trời mọc)</li>
                    <li><strong>Trái:</strong> Hướng Tây (Mặt Trời lặn)</li>
                  </ul>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  * Trên địa cầu hoặc bản đồ, các đường kinh tuyến chỉ hướng Bắc - Nam, các đường vĩ tuyến chỉ hướng Đông - Tây.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Relative Position compared to Vietnam */}
        {activeSubTab === 'relative' && (
          <div className="space-y-3">
            {selectedCountry && selectedCountry.id !== 'vietnam' ? (
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-sky-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{selectedCountry.flag}</span>
                    <div>
                      <h4 className="font-bold text-base text-white">{selectedCountry.nameVi}</h4>
                      <p className="text-xs text-slate-400">Thủ đô: {selectedCountry.capital} • {selectedCountry.continent}</p>
                    </div>
                  </div>

                  {bearingData && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold">
                      <span className="text-base">{bearingData.arrow}</span>
                      <span>{bearingData.labelVi}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200">
                  <p className="font-semibold text-amber-300 mb-1">🧭 Kết quả phân tích vị trí:</p>
                  <p className="text-sm font-bold text-sky-300">
                    {relativeDirection?.text || `${selectedCountry.nameVi} nằm về ${bearingData?.labelVi.toLowerCase()} của Việt Nam.`}
                  </p>
                  {bearingData && (
                    <p className="text-xs text-slate-400 mt-1">
                      Góc phương vị: <strong>{Math.round(bearingData.bearing)}°</strong> so với tâm lãnh thổ Việt Nam.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Chọn quốc gia khác để so sánh phương hướng:</span>
                  <button
                    onClick={() => onSelectCountry(COUNTRIES_DATA.vietnam)}
                    className="text-xs text-sky-400 hover:text-sky-300 underline"
                  >
                    Xem lại danh sách
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-dashed border-slate-700 space-y-3">
                <p className="text-xs text-slate-300 text-center font-medium">
                  👉 <strong>Bấm chọn một quốc gia</strong> trên bản đồ hoặc chọn từ các nhóm phương hướng dưới đây:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                      <span>↑ Phía Bắc</span>
                    </p>
                    {['china', 'russia', 'mongolia'].map(id => {
                      const c = COUNTRIES_DATA[id];
                      if (!c) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => handleSelectExploreCountry(c)}
                          className="w-full text-left px-2 py-1 rounded-lg bg-slate-800/70 hover:bg-sky-600/80 text-[11px] text-slate-200 transition-colors truncate flex items-center gap-1"
                        >
                          <span>{c.flag}</span>
                          <span className="truncate">{c.nameVi}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <span>← Phía Tây</span>
                    </p>
                    {['laos', 'thailand', 'myanmar', 'india'].map(id => {
                      const c = COUNTRIES_DATA[id];
                      if (!c) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => handleSelectExploreCountry(c)}
                          className="w-full text-left px-2 py-1 rounded-lg bg-slate-800/70 hover:bg-sky-600/80 text-[11px] text-slate-200 transition-colors truncate flex items-center gap-1"
                        >
                          <span>{c.flag}</span>
                          <span className="truncate">{c.nameVi}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <span>→ Phía Đông</span>
                    </p>
                    {['philippines', 'japan', 'korea_south'].map(id => {
                      const c = COUNTRIES_DATA[id];
                      if (!c) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => handleSelectExploreCountry(c)}
                          className="w-full text-left px-2 py-1 rounded-lg bg-slate-800/70 hover:bg-sky-600/80 text-[11px] text-slate-200 transition-colors truncate flex items-center gap-1"
                        >
                          <span>{c.flag}</span>
                          <span className="truncate">{c.nameVi}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <p className="text-[11px] font-bold text-sky-400 flex items-center gap-1">
                      <span>↓ Phía Nam/T.Nam</span>
                    </p>
                    {['cambodia', 'malaysia', 'singapore', 'indonesia', 'australia'].map(id => {
                      const c = COUNTRIES_DATA[id];
                      if (!c) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => handleSelectExploreCountry(c)}
                          className="w-full text-left px-2 py-1 rounded-lg bg-slate-800/70 hover:bg-sky-600/80 text-[11px] text-slate-200 transition-colors truncate flex items-center gap-1"
                        >
                          <span>{c.flag}</span>
                          <span className="truncate">{c.nameVi}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Multiple Choice Quiz */}
        {activeSubTab === 'quiz' && (
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Câu hỏi {quizIndex + 1} / {DIRECTION_QUESTIONS.length}
              </span>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 transition-colors"
                title="Dành cho giáo viên: Bật/tắt đáp án ngay"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAnswer ? 'Ẩn đáp án' : '👁 Đáp án'}</span>
              </button>
            </div>

            <h4 className="font-bold text-sm text-white mb-3 leading-snug">
              {currentQ.prompt}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userSelection === opt;
                const isCorrect = opt === currentQ.correct;
                let style = 'bg-slate-900/60 border-slate-700 text-slate-200 hover:border-slate-500';

                if (showAnswer) {
                  if (isCorrect) style = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  if (isCorrect) style = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold';
                  else style = 'bg-red-900/60 border-red-500 text-red-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerClick(opt)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {(showAnswer || (isSelected && isCorrect)) && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {(showAnswer || userSelection !== null) && (
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs text-sky-200">
                💡 <strong>Giải thích:</strong> {currentQ.explanation}
              </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700/50">
              <button
                disabled={quizIndex === 0}
                onClick={() => {
                  setQuizIndex(i => Math.max(0, i - 1));
                  setUserSelection(null);
                  setShowAnswer(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-40 text-xs text-slate-300 hover:bg-slate-700"
              >
                ← Câu trước
              </button>

              <button
                onClick={() => {
                  if (quizIndex < DIRECTION_QUESTIONS.length - 1) {
                    setQuizIndex(i => i + 1);
                    setUserSelection(null);
                    setShowAnswer(false);
                  } else {
                    setQuizIndex(0);
                    setUserSelection(null);
                    setShowAnswer(false);
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white shadow-md shadow-sky-500/30"
              >
                {quizIndex < DIRECTION_QUESTIONS.length - 1 ? 'Câu tiếp theo →' : 'Làm lại'}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
