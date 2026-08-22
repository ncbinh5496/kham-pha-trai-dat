import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FIND_COUNTRY_QUESTIONS } from '../../data/quizQuestions';
import { COUNTRIES_DATA } from '../../data/countries';
import { resolveCountryKey, matchCountryData, normalizeGeoString } from '../../utils/geoUtils';
import { CountryData, DifficultyLevel, QuizQuestion } from '../../types';
import {
  Gamepad2,
  Trophy,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

interface FindCountryGameProps {
  onClose: () => void;
  onTargetCountrySelected: (country: CountryData) => void;
  currentClickedCountryId: string | null;
}

export const FindCountryGame: React.FC<FindCountryGameProps> = ({
  onClose,
  onTargetCountrySelected,
  currentClickedCountryId
}) => {
  const [level, setLevel] = useState<DifficultyLevel>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong'>('playing');

  const filteredQuestions = FIND_COUNTRY_QUESTIONS.filter(q => q.level === level);
  const currentQuestion: QuizQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];
  const targetCountry = currentQuestion ? (matchCountryData(currentQuestion.targetCountryId) || COUNTRIES_DATA[currentQuestion.targetCountryId]) : null;

  // Listen to globe clicks
  useEffect(() => {
    if (!currentClickedCountryId || !currentQuestion || gameState === 'correct') return;

    const clickedKey = resolveCountryKey(currentClickedCountryId) || currentClickedCountryId;
    const targetKey = resolveCountryKey(currentQuestion.targetCountryId) || currentQuestion.targetCountryId;

    const isMatch =
      currentClickedCountryId === currentQuestion.targetCountryId ||
      clickedKey === targetKey ||
      normalizeGeoString(currentClickedCountryId) === normalizeGeoString(currentQuestion.targetCountryId) ||
      (targetCountry && normalizeGeoString(currentClickedCountryId) === normalizeGeoString(targetCountry.nameVi)) ||
      (targetCountry && normalizeGeoString(currentClickedCountryId) === normalizeGeoString(targetCountry.nameEn));

    if (isMatch) {
      // Correct!
      setGameState('correct');
      setScore(prev => prev + 10);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
      if (targetCountry) {
        onTargetCountrySelected(targetCountry);
      }
    } else {
      // Incorrect
      setGameState('wrong');
      setShowHint(true);
    }
  }, [currentClickedCountryId, currentQuestion, gameState, onTargetCountrySelected, targetCountry]);

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setGameState('playing');
    setShowHint(false);
  };

  const handleResetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
    setShowHint(false);
  };

  if (!currentQuestion) return null;

  return (
    <div
      id="find-country-game-modal"
      className="absolute top-16 left-4 z-30 w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-indigo-500/50 rounded-3xl shadow-2xl p-5 text-slate-100 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-indigo-400">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Thử Thách: Tìm Quốc Gia</h3>
            <span className="text-[11px] text-indigo-300">Xoay quả địa cầu và nhấp chuột vào đúng quốc gia!</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Difficulty Level Tabs & Score */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl);
                setCurrentIndex(0);
                setGameState('playing');
                setShowHint(false);
              }}
              className={`py-1 px-2.5 rounded-lg text-xs font-bold transition-all ${
                level === lvl
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl === 'easy' ? 'Dễ' : lvl === 'medium' ? 'Vừa' : 'Khó'}
            </button>
          ))}
        </div>

        {/* Score Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 font-bold text-xs">
          <Trophy className="w-3.5 h-3.5" />
          <span>Điểm: {score}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl space-y-3">
        <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
          Câu hỏi {currentIndex + 1} / {filteredQuestions.length}
        </div>
        <p className="text-sm font-bold text-white leading-relaxed">
          {currentQuestion.questionText}
        </p>

        {/* Clues */}
        <div className="space-y-1.5 pt-1">
          {currentQuestion.clues.map((clue, idx) => (
            <div key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
              <span className="text-cyan-400">✦</span>
              <span>{clue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback States */}
      {gameState === 'correct' && (
        <div className="mt-3 p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-xs text-emerald-200 flex items-start gap-2.5 animate-in zoom-in-95 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-white text-sm">{currentQuestion.correctFeedback}</div>
            <div className="text-emerald-300 mt-1">
              Bạn nhận được +10 điểm! Nhấn "Câu tiếp theo" để tiếp tục nhé.
            </div>
          </div>
        </div>
      )}

      {gameState === 'wrong' && (
        <div className="mt-3 p-3.5 bg-rose-950/60 border border-rose-500/50 rounded-2xl text-xs text-rose-200 flex items-start gap-2.5 animate-in zoom-in-95 duration-200">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-white">Chưa chính xác rồi em ơi!</div>
            <div className="text-rose-300 mt-0.5">
              Đừng lo lắng, hãy nhìn lại gợi ý và xoay quả địa cầu thử lại nào!
            </div>
          </div>
        </div>
      )}

      {/* Hint Accordion */}
      {showHint && (
        <div className="mt-2.5 p-3 bg-amber-950/40 border border-yellow-500/30 rounded-2xl text-xs text-yellow-100 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <span>{currentQuestion.hint}</span>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-4 flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/30 hover:bg-amber-950/60 border border-amber-500/30 rounded-xl transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
        </button>

        {gameState === 'correct' ? (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-1.5 py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/40 transition-all scale-105"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleResetGame}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi lại</span>
          </button>
        )}
      </div>
    </div>
  );
};
