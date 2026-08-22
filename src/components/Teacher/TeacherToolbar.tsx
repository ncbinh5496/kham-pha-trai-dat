import React, { useState } from 'react';
import { CONTINENTS_DATA } from '../../data/continents';
import { TEACHER_QUICK_QUESTIONS } from '../../data/quizQuestions';
import { LayerConfig, LearningActivity, TeachingLevel } from '../../types';
import {
  GraduationCap,
  Eye,
  EyeOff,
  Square,
  Globe2,
  HelpCircle,
  RotateCcw,
  X,
  ChevronRight,
  Lightbulb,
  MapPin,
  Compass,
  Sliders
} from 'lucide-react';

interface TeacherToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  hideLabels: boolean;
  setHideLabels: (val: boolean) => void;
  borderOnlyMode: boolean;
  setBorderOnlyMode: (val: boolean) => void;
  layers: LayerConfig;
  setLayers: React.Dispatch<React.SetStateAction<LayerConfig>>;
  onHighlightContinent: (continentId: string | null) => void;
  onResetGlobe: () => void;
  onOpenCompare?: () => void;
  onOpenLearningActivity?: (activity: LearningActivity) => void;
  isPresentationMode?: boolean;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  isOpen,
  onClose,
  hideLabels,
  setHideLabels,
  borderOnlyMode,
  setBorderOnlyMode,
  layers,
  setLayers,
  onHighlightContinent,
  onResetGlobe,
  onOpenCompare: _onOpenCompare,
  onOpenLearningActivity,
  isPresentationMode = false
}) => {
  const [quickQuestionIndex, setQuickQuestionIndex] = useState<number | null>(null);
  const [isContinentsOpen, setIsContinentsOpen] = useState(false);
  const [showAnswerInPopover, setShowAnswerInPopover] = useState(false);
  const [teachingLevel, setTeachingLevel] = useState<TeachingLevel>('basic');

  if (!isOpen) return null;

  const handleNextQuickQuestion = () => {
    setShowAnswerInPopover(false);
    if (quickQuestionIndex === null) {
      setQuickQuestionIndex(0);
    } else {
      setQuickQuestionIndex((quickQuestionIndex + 1) % TEACHER_QUICK_QUESTIONS.length);
    }
  };

  // If Presentation Mode is active, render a sleek compact floating docked toolbar on the left/bottom!
  if (isPresentationMode) {
    return (
      <div
        id="teacher-presentation-floating-toolbar"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 p-2 bg-slate-950/90 backdrop-blur-2xl border border-emerald-500/40 rounded-3xl shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-left-4 duration-300"
      >
        {/* 1. 👁 Ẩn/Hiện Tên */}
        <button
          onClick={() => setHideLabels(!hideLabels)}
          className={`p-3 rounded-2xl transition-all relative group ${
            hideLabels
              ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Ẩn / Hiện tên quốc gia trên địa cầu"
        >
          {hideLabels ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          <span className="sr-only">Tên</span>
        </button>

        {/* 2. ▱ Ranh giới */}
        <button
          onClick={() => setBorderOnlyMode(!borderOnlyMode)}
          className={`p-3 rounded-2xl transition-all relative group ${
            borderOnlyMode
              ? 'bg-indigo-500 text-white ring-2 ring-indigo-400'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Chế độ chỉ xem đường ranh giới"
        >
          <Square className="w-5 h-5" />
          <span className="sr-only">Ranh giới</span>
        </button>

        {/* 3. 🔴 Xích đạo & Chí tuyến */}
        <button
          onClick={() => setLayers(prev => ({ ...prev, equator: !prev.equator, tropics: !prev.tropics }))}
          className={`p-3 rounded-2xl transition-all relative group ${
            layers.equator
              ? 'bg-rose-500 text-white ring-2 ring-rose-400'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Bật / Tắt đường Xích đạo & Chí tuyến"
        >
          <span className="w-5 h-5 flex items-center justify-center font-black text-xs">EQ</span>
          <span className="sr-only">Xích đạo</span>
        </button>

        {/* 4. 🌐 Lưới Kinh - Vĩ tuyến */}
        <button
          onClick={() => setLayers(prev => ({ ...prev, graticules: !prev.graticules }))}
          className={`p-3 rounded-2xl transition-all relative group ${
            layers.graticules
              ? 'bg-sky-500 text-slate-950 ring-2 ring-sky-400'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Bật / Tắt lưới kinh - vĩ tuyến"
        >
          <Globe2 className="w-5 h-5" />
          <span className="sr-only">Lưới</span>
        </button>

        {/* 5. 📍 Đánh dấu / Châu lục */}
        <div className="relative">
          <button
            onClick={() => setIsContinentsOpen(!isContinentsOpen)}
            className={`p-3 rounded-2xl transition-all ${
              isContinentsOpen
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Đánh dấu châu lục nhanh"
          >
            <MapPin className="w-5 h-5" />
          </button>

          {isContinentsOpen && (
            <div className="absolute left-full ml-3 top-0 w-44 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-2 space-y-1">
              <div className="text-[10px] font-black text-emerald-400 uppercase px-2 py-1">
                Chọn châu lục
              </div>
              {Object.values(CONTINENTS_DATA).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onHighlightContinent(c.id);
                    setIsContinentsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 hover:bg-slate-800 rounded-xl text-xs text-left text-slate-200"
                >
                  <span>{c.icon}</span>
                  <span>{c.nameVi}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6. ❓ Câu hỏi nhanh */}
        <button
          onClick={handleNextQuickQuestion}
          className={`p-3 rounded-2xl transition-all ${
            quickQuestionIndex !== null
              ? 'bg-amber-500 text-slate-950'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Câu hỏi nhanh cho học sinh"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* 7. ↺ Reset */}
        <button
          onClick={onResetGlobe}
          className="p-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-2xl transition-colors"
          title="Đặt lại toàn bộ trạng thái"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Question Popover in presentation mode */}
        {quickQuestionIndex !== null && (
          <div className="fixed bottom-20 left-4 max-w-sm p-4 bg-slate-950/95 backdrop-blur-2xl border-2 border-amber-500/60 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Câu hỏi nhanh #{quickQuestionIndex + 1}
              </span>
              <button
                onClick={() => setQuickQuestionIndex(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-bold text-white mb-2">
              {TEACHER_QUICK_QUESTIONS[quickQuestionIndex].question}
            </p>
            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={() => setShowAnswerInPopover(!showAnswerInPopover)}
                className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold"
              >
                {showAnswerInPopover ? 'Ẩn đáp án' : '👁 Hiện đáp án'}
              </button>
            </div>
            {showAnswerInPopover && (
              <div className="text-xs text-slate-200 bg-slate-900/90 p-2.5 rounded-xl border border-emerald-500/40">
                <span className="text-emerald-400 font-semibold">Đáp án:</span>{' '}
                {TEACHER_QUICK_QUESTIONS[quickQuestionIndex].answer}
              </div>
            )}
            <button
              onClick={handleNextQuickQuestion}
              className="mt-3 w-full py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
            >
              Câu hỏi tiếp theo ➔
            </button>
          </div>
        )}
      </div>
    );
  }

  // Regular Teacher Mode Panel
  return (
    <div
      id="teacher-toolbar-panel"
      className="absolute top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="bg-slate-950/95 backdrop-blur-2xl border-2 border-emerald-500/60 rounded-3xl shadow-2xl shadow-emerald-950/60 p-5 text-slate-100 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600/30 border border-emerald-500/50 rounded-2xl text-emerald-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Bảng Điều Khiển Giảng Dạy Địa Lí</h3>
                <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded-full">
                  Tiểu học Lớp 4 - 5
                </span>
              </div>
              <span className="text-xs text-slate-400">Thiết bị số hỗ trợ giáo viên tổ chức hoạt động học tập tương tác</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teaching Level Filter */}
        <div className="flex items-center justify-between p-2.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-emerald-400" />
            Mức độ bài giảng:
          </span>
          <div className="flex gap-1.5">
            {(['basic', 'medium', 'advanced'] as TeachingLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setTeachingLevel(lvl)}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  teachingLevel === lvl
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl === 'basic' ? 'Lớp 4 (Cơ bản)' : lvl === 'medium' ? 'Lớp 5 (Chuẩn)' : 'Mở rộng'}
              </button>
            ))}
          </div>
        </div>

        {/* Pedagogical Topic Quick Starters */}
        <div>
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            ⚡ Hoạt Động Giảng Dạy Trọng Tâm
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => onOpenLearningActivity && onOpenLearningActivity('vietnam_neighbors')}
              className="p-3 rounded-2xl border border-red-500/30 bg-red-950/30 hover:bg-red-950/60 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🇻🇳</span>
                <span className="font-bold text-xs text-white group-hover:text-red-300">Việt Nam & Láng Giềng</span>
              </div>
              <p className="text-xs text-slate-300/90">3 nước giáp biên & Đông Nam Á</p>
            </button>

            <button
              onClick={() => onOpenLearningActivity && onOpenLearningActivity('direction_finding')}
              className="p-3 rounded-2xl border border-sky-500/30 bg-sky-950/30 hover:bg-sky-950/60 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-5 h-5 text-sky-400" />
                <span className="font-bold text-xs text-white group-hover:text-sky-300">Phương Hướng Bản Đồ</span>
              </div>
              <p className="text-xs text-slate-300/90">4 hướng chính & góc so với VN</p>
            </button>

            <button
              onClick={() => onOpenLearningActivity && onOpenLearningActivity('hemispheres_equator')}
              className="p-3 rounded-2xl border border-amber-500/30 bg-amber-950/30 hover:bg-amber-950/60 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <Globe2 className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-xs text-white group-hover:text-amber-300">Bắc & Nam Bán Cầu</span>
              </div>
              <p className="text-xs text-slate-300/90">Đường Xích đạo & sự đối lập mùa</p>
            </button>
          </div>
        </div>

        {/* Action Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* 1. Hide/Show Country Names */}
          <button
            onClick={() => setHideLabels(!hideLabels)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
              hideLabels
                ? 'bg-amber-950/70 border-amber-500/60 text-amber-300 ring-1 ring-amber-400'
                : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-200'
            }`}
          >
            {hideLabels ? <EyeOff className="w-5 h-5 mb-1.5 text-amber-400" /> : <Eye className="w-5 h-5 mb-1.5 text-cyan-400" />}
            <span className="text-xs font-bold">{hideLabels ? 'Đang Ẩn Tên' : 'Ẩn Tên Quốc Gia'}</span>
            <span className="text-xs text-slate-400">Để học sinh tự đoán</span>
          </button>

          {/* 2. Border-Only Mode */}
          <button
            onClick={() => setBorderOnlyMode(!borderOnlyMode)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
              borderOnlyMode
                ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-300 ring-1 ring-indigo-400'
                : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-200'
            }`}
          >
            <Square className="w-5 h-5 mb-1.5 text-indigo-400" />
            <span className="text-xs font-bold">{borderOnlyMode ? 'Bản Đồ Câm' : 'Bật Bản Đồ Câm'}</span>
            <span className="text-xs text-slate-400">Chỉ hiển thị ranh giới</span>
          </button>

          {/* 3. Lưới Kinh - Vĩ tuyến */}
          <button
            onClick={() => setLayers(prev => ({ ...prev, graticules: !prev.graticules }))}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
              layers.graticules
                ? 'bg-sky-950/70 border-sky-500/60 text-sky-300 ring-1 ring-sky-400'
                : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-200'
            }`}
          >
            <Globe2 className="w-5 h-5 mb-1.5 text-sky-400" />
            <span className="text-xs font-bold">{layers.graticules ? 'Tắt Lưới Tọa Độ' : 'Bật Lưới Tọa Độ'}</span>
            <span className="text-xs text-slate-400">Kinh – vĩ tuyến</span>
          </button>

          {/* 4. Reset Globe State */}
          <button
            onClick={onResetGlobe}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 text-center transition-all"
          >
            <RotateCcw className="w-5 h-5 mb-1.5 text-rose-400" />
            <span className="text-xs font-bold">Đặt Lại Toàn Bộ</span>
            <span className="text-xs text-slate-400">Về vị trí Việt Nam</span>
          </button>
        </div>

        {/* Quick Question Section */}
        <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Ngân hàng câu hỏi tương tác nhanh</span>
              <span className="text-[11px] text-slate-400">
                {quickQuestionIndex === null
                  ? 'Bấm để gọi một câu hỏi ngẫu nhiên đố cả lớp'
                  : `Câu hỏi ${quickQuestionIndex + 1}/${TEACHER_QUICK_QUESTIONS.length}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleNextQuickQuestion}
            className="flex items-center gap-1.5 py-2 px-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{quickQuestionIndex === null ? 'Đặt câu hỏi ngay' : 'Đổi câu hỏi khác'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Display Current Quick Question if selected */}
        {quickQuestionIndex !== null && (
          <div className="p-4 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-2xl space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                💡 {TEACHER_QUICK_QUESTIONS[quickQuestionIndex].category}
              </span>
              <button
                onClick={() => setShowAnswerInPopover(!showAnswerInPopover)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold text-amber-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAnswerInPopover ? 'Ẩn đáp án' : '👁 Hiện đáp án'}</span>
              </button>
            </div>

            <p className="text-sm font-bold text-white">
              {TEACHER_QUICK_QUESTIONS[quickQuestionIndex].question}
            </p>

            {showAnswerInPopover && (
              <div className="text-xs text-slate-200 bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/40">
                <span className="text-emerald-400 font-semibold">Đáp án giáo viên:</span>{' '}
                {TEACHER_QUICK_QUESTIONS[quickQuestionIndex].answer}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

