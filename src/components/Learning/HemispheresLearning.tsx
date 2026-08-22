import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe2, 
  Sun, 
  CheckCircle2, 
  X, 
  Eye, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { CountryData } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import confetti from 'canvas-confetti';

export type HemisphereAnswer = 'north' | 'south' | 'both';

interface HemispheresLearningProps {
  onSelectCountry: (country: CountryData) => void;
  onClose: () => void;
  onToggleEquatorLayer?: (enabled: boolean) => void;
}

interface PracticeItem {
  countryId: string;
  expected: HemisphereAnswer;
  reason: string;
}

export const HemispheresLearning: React.FC<HemispheresLearningProps> = ({
  onSelectCountry,
  onClose,
  onToggleEquatorLayer
}) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'practice' | 'trivia'>('concepts');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedHemisphere, setSelectedHemisphere] = useState<HemisphereAnswer | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Automatically enable Equator layer when opening Hemispheres learning
  useEffect(() => {
    if (onToggleEquatorLayer) {
      onToggleEquatorLayer(true);
    }
  }, [onToggleEquatorLayer]);

  // Verified geographical hemisphere data
  const practiceCountries: PracticeItem[] = [
    { 
      countryId: 'vietnam', 
      expected: 'north', 
      reason: 'Việt Nam nằm hoàn toàn ở Bắc bán cầu (từ khoảng 8°30\'B đến 23°23\'B), phía trên đường Xích đạo.' 
    },
    { 
      countryId: 'indonesia', 
      expected: 'both', 
      reason: 'Indonesia nằm vắt ngang đường Xích đạo (0°), có các đảo nằm ở cả Bắc bán cầu (Bắc Sumatra, Bắc Borneo, Bắc Sulawesi...) và Nam bán cầu (Java, Bali, Nam Sumatra...).' 
    },
    { 
      countryId: 'brazil', 
      expected: 'both', 
      reason: 'Phần lớn lãnh thổ Brazil nằm ở Nam bán cầu, nhưng đường Xích đạo đi qua phía Bắc đất nước (gần thành phố Macapá và cửa sông Amazon), nên thuộc cả 2 bán cầu.' 
    },
    { 
      countryId: 'australia', 
      expected: 'south', 
      reason: 'Australia nằm hoàn toàn ở Nam bán cầu, vì thế mùa hè ở đây (tháng 12 - tháng 2) ngược lại với mùa đông ở Việt Nam.' 
    },
    { 
      countryId: 'russia', 
      expected: 'north', 
      reason: 'Nga là quốc gia rộng lớn nhất thế giới, nằm hoàn toàn ở Bắc bán cầu trải dài đến tận Bắc Cực.' 
    },
    { 
      countryId: 'south_africa', 
      expected: 'south', 
      reason: 'Nam Phi nằm ở cực nam của châu lục châu Phi, thuộc hoàn toàn Nam bán cầu.' 
    },
    { 
      countryId: 'japan', 
      expected: 'north', 
      reason: 'Nhật Bản là quốc đảo nằm ở vùng ôn đới Bắc bán cầu thuộc khu vực Đông Á.' 
    }
  ];

  const currentCountryObj = COUNTRIES_DATA[practiceCountries[practiceIndex].countryId];
  const currentExpected = practiceCountries[practiceIndex].expected;

  const handleChooseHemisphere = (choice: HemisphereAnswer) => {
    setSelectedHemisphere(choice);
    const isCorrect = choice === currentExpected;
    if (isCorrect) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      } catch {}
    }
  };

  const handleViewOnMap = () => {
    if (currentCountryObj) {
      onSelectCountry(currentCountryObj);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-xl border border-sky-500/40 rounded-3xl p-5 shadow-2xl text-slate-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Globe2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Bắc Bán Cầu & Nam Bán Cầu
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Đường Xích Đạo (0°)
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Tìm hiểu đường Xích đạo và cách phân biệt các bán cầu trên Trái Đất
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
          onClick={() => setActiveTab('concepts')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'concepts'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>Kiến Thức Cốt Lõi</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('practice');
            setSelectedHemisphere(null);
            setShowAnswer(false);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'practice'
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Đố Vui Phân Loại Bán Cầu</span>
        </button>

        <button
          onClick={() => setActiveTab('trivia')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'trivia'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Mùa Trái Ngược Kỳ Thú</span>
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Tab 1: Concepts */}
        {activeTab === 'concepts' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-800/50">
                <h4 className="font-bold text-sm text-sky-300 mb-1.5 flex items-center gap-1.5">
                  🌐 Đường Xích Đạo (0° Vĩ tuyến)
                </h4>
                <p className="leading-relaxed">
                  Đường tròn lớn nhất bao quanh Trái Đất chia hành tinh thành hai nửa: <strong>Bắc bán cầu</strong> (nửa phía trên) và <strong>Nam bán cầu</strong> (nửa phía dưới).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/50">
                <h4 className="font-bold text-sm text-emerald-300 mb-1.5 flex items-center gap-1.5">
                  🇻🇳 Vị Trí Của Việt Nam
                </h4>
                <p className="leading-relaxed">
                  Việt Nam nằm hoàn toàn ở <strong>Bắc bán cầu</strong> và thuộc <strong>Bán cầu Đông</strong>, nằm trong đới khí hậu nhiệt đới gió mùa.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
              <span className="text-slate-300">
                💡 <strong>Đường màu vàng cam</strong> phát sáng trên quả địa cầu chính là <strong>Đường Xích đạo 0°</strong>.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Practice (Quiz with 3 Options) */}
        {activeTab === 'practice' && currentCountryObj && (
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Câu {practiceIndex + 1} / {practiceCountries.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleViewOnMap}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-xs font-semibold text-sky-300 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Xem trên bản đồ</span>
                </button>

                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 transition-colors"
                  title="Dành cho giáo viên: Bật/tắt đáp án ngay"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showAnswer ? 'Ẩn đáp án' : '👁 Đáp án'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-700 mb-3">
              <span className="text-3xl">{currentCountryObj.flag}</span>
              <div>
                <h4 className="font-bold text-sm text-white">
                  Đất nước {currentCountryObj.nameVi} nằm ở bán cầu nào?
                </h4>
                <p className="text-xs text-slate-400">
                  Thủ đô: {currentCountryObj.capital} • Châu lục: {currentCountryObj.continent}
                </p>
              </div>
            </div>

            {/* 3 Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleChooseHemisphere('north')}
                className={`p-2.5 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  showAnswer
                    ? currentExpected === 'north'
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                      : 'bg-slate-900/50 border-slate-700 text-slate-400'
                    : selectedHemisphere === 'north'
                    ? currentExpected === 'north'
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                      : 'bg-red-900/70 border-red-500 text-red-200'
                    : 'bg-slate-900/70 border-slate-700 hover:border-sky-500 text-slate-200'
                }`}
              >
                <span>🌍 Bắc Bán Cầu</span>
                {(showAnswer || selectedHemisphere === 'north') && currentExpected === 'north' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>

              <button
                onClick={() => handleChooseHemisphere('south')}
                className={`p-2.5 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  showAnswer
                    ? currentExpected === 'south'
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                      : 'bg-slate-900/50 border-slate-700 text-slate-400'
                    : selectedHemisphere === 'south'
                    ? currentExpected === 'south'
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                      : 'bg-red-900/70 border-red-500 text-red-200'
                    : 'bg-slate-900/70 border-slate-700 hover:border-sky-500 text-slate-200'
                }`}
              >
                <span>🌏 Nam Bán Cầu</span>
                {(showAnswer || selectedHemisphere === 'south') && currentExpected === 'south' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>

              <button
                onClick={() => handleChooseHemisphere('both')}
                className={`p-2.5 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  showAnswer
                    ? currentExpected === 'both'
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                      : 'bg-slate-900/50 border-slate-700 text-slate-400'
                    : selectedHemisphere === 'both'
                    ? currentExpected === 'both'
                      ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                      : 'bg-red-900/70 border-red-500 text-red-200'
                    : 'bg-slate-900/70 border-slate-700 hover:border-amber-500 text-slate-200'
                }`}
              >
                <span>🌐 Cả 2 Bán Cầu</span>
                {(showAnswer || selectedHemisphere === 'both') && currentExpected === 'both' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>
            </div>

            {/* Detailed Explanation */}
            {(showAnswer || selectedHemisphere !== null) && (
              <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs text-sky-200 leading-relaxed">
                💡 <strong>Giải thích địa lí:</strong> {practiceCountries[practiceIndex].reason}
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700/50">
              <button
                disabled={practiceIndex === 0}
                onClick={() => {
                  setPracticeIndex(i => Math.max(0, i - 1));
                  setSelectedHemisphere(null);
                  setShowAnswer(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-40 text-xs text-slate-300 hover:bg-slate-700"
              >
                ← Nước trước
              </button>

              <button
                onClick={() => {
                  if (practiceIndex < practiceCountries.length - 1) {
                    setPracticeIndex(i => i + 1);
                    setSelectedHemisphere(null);
                    setShowAnswer(false);
                  } else {
                    setPracticeIndex(0);
                    setSelectedHemisphere(null);
                    setShowAnswer(false);
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/30"
              >
                {practiceIndex < practiceCountries.length - 1 ? 'Nước tiếp theo →' : 'Làm lại từ đầu'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Trivia - Opposite Seasons */}
        {activeTab === 'trivia' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60 space-y-2">
              <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                Hiện Tượng Mùa Ngược Nhau Giữa Hai Bán Cầu
              </h4>
              <p className="leading-relaxed">
                Do trục Trái Đất nghiêng 23.5° khi chuyển động quanh Mặt Trời, khi <strong>Bắc bán cầu</strong> nghiêng về phía Mặt Trời (mùa hè), thì <strong>Nam bán cầu</strong> lại nghiêng ra xa (mùa đông).
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200">
                🎉 <strong>Ví dụ sinh động:</strong> Vào dịp Giáng sinh tháng 12, khi học sinh Việt Nam mặc áo ấm đón mùa đông thì trẻ em ở Australia lại vui chơi tắm biển dưới ánh nắng rực rỡ của mùa hè!
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
