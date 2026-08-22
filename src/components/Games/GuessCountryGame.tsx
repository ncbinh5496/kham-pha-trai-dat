import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GUESS_COUNTRY_QUESTIONS } from '../../data/quizQuestions';
import { COUNTRIES_DATA } from '../../data/countries';
import { matchCountryData, resolveCountryKey } from '../../utils/geoUtils';
import { CountryData, QuizQuestion } from '../../types';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  X
} from 'lucide-react';

interface GuessCountryGameProps {
  onClose: () => void;
  onSelectCountry: (country: CountryData) => void;
}

export const GuessCountryGame: React.FC<GuessCountryGameProps> = ({
  onClose,
  onSelectCountry
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong'>('playing');

  const currentQuestion: QuizQuestion = GUESS_COUNTRY_QUESTIONS[currentIndex] || GUESS_COUNTRY_QUESTIONS[0];
  const targetCountry = matchCountryData(currentQuestion.targetCountryId) || COUNTRIES_DATA[currentQuestion.targetCountryId];

  const handleChooseOption = (countryId: string) => {
    setSelectedOption(countryId);

    const isMatch =
      countryId === currentQuestion.targetCountryId ||
      resolveCountryKey(countryId) === resolveCountryKey(currentQuestion.targetCountryId);

    if (isMatch) {
      setGameState('correct');
      setScore(prev => prev + 10);
      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
      if (targetCountry) {
        onSelectCountry(targetCountry);
      }
    } else {
      setGameState('wrong');
      setShowHint(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < GUESS_COUNTRY_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setSelectedOption(null);
    setGameState('playing');
    setShowHint(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setGameState('playing');
    setShowHint(false);
  };

  return (
    <div
      id="guess-country-game-modal"
      className="absolute top-16 left-4 z-30 w-full max-w-md bg-slate-900/95 backdrop-blur-xl border border-amber-500/50 rounded-3xl shadow-2xl p-5 text-slate-100 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-600/30 border border-amber-500/40 rounded-xl text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Đố Vui: Tôi Là Ai?</h3>
            <span className="text-[11px] text-amber-300">Đọc các dữ kiện và chọn quốc gia chính xác!</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress & Score */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
          Câu {currentIndex + 1} / {GUESS_COUNTRY_QUESTIONS.length}
        </span>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-300 font-bold text-xs">
          <Trophy className="w-3.5 h-3.5" />
          <span>Điểm: {score}</span>
        </div>
      </div>

      {/* Clues Card */}
      <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl space-y-2 mb-4">
        <div className="font-bold text-white text-sm mb-2">{currentQuestion.questionText}</div>
        <div className="space-y-2">
          {currentQuestion.clues.map((clue, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold">#{idx + 1}</span>
              <span>{clue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Choices Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {currentQuestion.options?.map(countryId => {
          const c = matchCountryData(countryId) || COUNTRIES_DATA[countryId];
          if (!c) return null;
          const isSelected = selectedOption === countryId;
          const isCorrect = isSelected && (countryId === currentQuestion.targetCountryId || resolveCountryKey(countryId) === resolveCountryKey(currentQuestion.targetCountryId));
          const isWrong = isSelected && !isCorrect;

          return (
            <button
              key={countryId}
              onClick={() => handleChooseOption(countryId)}
              disabled={gameState === 'correct'}
              className={`flex items-center gap-2 p-3 rounded-2xl border text-left text-xs font-bold transition-all ${
                isCorrect
                  ? 'bg-emerald-600 border-emerald-400 text-white ring-2 ring-emerald-400/50'
                  : isWrong
                  ? 'bg-rose-950 border-rose-500 text-rose-200'
                  : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              <span className="text-2xl">{c.flag}</span>
              <span className="truncate">{c.nameVi}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback States */}
      {gameState === 'correct' && (
        <div className="mb-3 p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-xs text-emerald-200 flex items-start gap-2 animate-in zoom-in-95 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white">{currentQuestion.correctFeedback}</div>
            <div className="text-[11px] text-emerald-300 mt-0.5">Địa cầu đang xoay đến quốc gia này!</div>
          </div>
        </div>
      )}

      {gameState === 'wrong' && (
        <div className="mb-3 p-3 bg-rose-950/60 border border-rose-500/50 rounded-2xl text-xs text-rose-200 flex items-start gap-2 animate-in zoom-in-95 duration-200">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white">Chưa đúng rồi!</div>
            <div className="text-[11px] text-rose-300 mt-0.5">Đọc kỹ lại các dữ kiện và thử lại lựa chọn khác nhé!</div>
          </div>
        </div>
      )}

      {/* Hint */}
      {showHint && (
        <div className="mb-3 p-3 bg-amber-950/40 border border-yellow-500/30 rounded-2xl text-xs text-yellow-100 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <span>Gợi ý: {currentQuestion.hint}</span>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/30 border border-amber-500/30 rounded-xl transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}</span>
        </button>

        {gameState === 'correct' ? (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-1.5 py-2 px-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all scale-105"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại</span>
          </button>
        )}
      </div>
    </div>
  );
};
