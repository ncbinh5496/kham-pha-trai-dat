import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  MapPin, 
  Compass, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  Layers,
  Globe2,
  X
} from 'lucide-react';
import { CountryData } from '../../types';
import { COUNTRIES_DATA } from '../../data/countries';
import { getDirectionFromVietnam } from '../../utils/geoUtils';

interface VietnamNeighborsProps {
  onSelectCountry: (country: CountryData) => void;
  onClose: () => void;
  onFocusRegion?: (lat: number, lng: number, altitude: number) => void;
}

type TabType = 'neighbors' | 'asean' | 'maritime' | 'quiz';

export const VietnamNeighbors: React.FC<VietnamNeighborsProps> = ({
  onSelectCountry,
  onClose,
  onFocusRegion
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('neighbors');
  const [quizStep, setQuizStep] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // 3 Direct land neighbors of Vietnam
  const directNeighbors = [
    {
      countryId: 'china',
      direction: 'Phía Bắc',
      borderLength: '1.449 km',
      significance: 'Đường biên giới phía Bắc giáp với các tỉnh Quảng Ninh, Lạng Sơn, Cao Bằng, Hà Giang, Lào Cai, Lai Châu, Điện Biên.',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      countryId: 'laos',
      direction: 'Phía Tây',
      borderLength: '2.169 km',
      significance: 'Đường biên giới đất liền dài nhất với Việt Nam, trải dài dọc dãy núi Trường Sơn hùng vĩ qua 10 tỉnh thành.',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      countryId: 'cambodia',
      direction: 'Phía Tây Nam',
      borderLength: '1.258 km',
      significance: 'Đường biên giới phía Tây Nam giáp các tỉnh Tây Nguyên và Tây Nam Bộ, gắn liền với dòng sông Tiền và sông Hậu.',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
    }
  ];

  // 11 ASEAN Countries
  const aseanCountries = Object.values(COUNTRIES_DATA).filter(
    (c) => c.isSoutheastAsia || ['vietnam', 'laos', 'cambodia', 'thailand', 'singapore', 'indonesia', 'malaysia', 'philippines', 'myanmar', 'brunei'].includes(c.id)
  );

  // Elementary Geography Quiz Questions
  const neighborQuiz = [
    {
      id: 'q1',
      question: 'Việt Nam có chung đường biên giới trên đất liền với những quốc gia nào?',
      options: [
        'Trung Quốc, Lào, Campuchia',
        'Thái Lan, Lào, Campuchia',
        'Trung Quốc, Myanmar, Lào',
        'Indonesia, Malaysia, Philippines'
      ],
      correctIndex: 0,
      explanation: 'Việt Nam có 3 nước láng giềng giáp đất liền: Trung Quốc (phía Bắc), Lào (phía Tây) và Campuchia (phía Tây Nam).'
    },
    {
      id: 'q2',
      question: 'Quốc gia nào có đường biên giới trên đất liền DÀI NHẤT với Việt Nam?',
      options: [
        'Trung Quốc (1.449 km)',
        'Lào (2.169 km)',
        'Campuchia (1.258 km)',
        'Thái Lan (0 km)'
      ],
      correctIndex: 1,
      explanation: 'Lào là nước có đường biên giới đất liền dài nhất với Việt Nam, dài khoảng 2.169 km dọc theo dãy Trường Sơn.'
    },
    {
      id: 'q3',
      question: 'Ở phía Đông và phía Nam, đất nước Việt Nam tiếp giáp với vùng biển nào?',
      options: [
        'Biển Đông',
        'Biển Nhật Bản',
        'Biển Đỏ',
        'Ấn Độ Dương'
      ],
      correctIndex: 0,
      explanation: 'Toàn bộ phía Đông và phía Nam của nước ta được bao bọc bởi vùng Biển Đông giàu đẹp với bờ biển dài 3.260 km.'
    },
    {
      id: 'q4',
      question: 'Nước láng giềng nào nằm ở PHÍA BẮC của Việt Nam?',
      options: [
        'Lào',
        'Trung Quốc',
        'Campuchia',
        'Thái Lan'
      ],
      correctIndex: 1,
      explanation: 'Trung Quốc là quốc gia láng giềng rộng lớn nằm ở phía Bắc của Việt Nam.'
    }
  ];

  const handleCountryClick = (cId: string) => {
    const c = COUNTRIES_DATA[cId];
    if (c) {
      onSelectCountry(c);
      if (onFocusRegion) {
        onFocusRegion(c.lat, c.lng, 1.8);
      }
    }
  };

  const handleFocusSoutheastAsia = () => {
    if (onFocusRegion) {
      onFocusRegion(15.0, 105.0, 1.9);
    }
  };

  const currentQ = neighborQuiz[quizStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-3xl bg-slate-900/95 backdrop-blur-xl border border-sky-500/40 rounded-3xl p-5 shadow-2xl text-slate-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-xl">
            🇻🇳
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Việt Nam & Các Nước Xung Quanh
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Địa lí Tiểu học
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Quan sát vị trí địa lí, ranh giới láng giềng và khu vực Đông Nam Á
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFocusSoutheastAsia}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600/50 text-xs font-medium text-sky-300 transition-colors"
            title="Đưa góc nhìn về Đông Nam Á"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Góc nhìn ĐNA</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mt-3 p-1 bg-slate-950/60 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('neighbors')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'neighbors'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>3 Nước Láng Giềng</span>
        </button>

        <button
          onClick={() => setActiveTab('asean')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'asean'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>11 Nước Đông Nam Á</span>
        </button>

        <button
          onClick={() => setActiveTab('maritime')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'maritime'
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Biển & Hải Đảo</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('quiz');
            setShowAnswer(false);
            setSelectedQuizOption(null);
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quiz'
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Đố Vui Nhanh</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4 max-h-[340px] overflow-y-auto pr-1">
        {/* Tab 1: 3 Direct Land Neighbors */}
        {activeTab === 'neighbors' && (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-sky-400 flex-shrink-0" />
              <span>
                Việt Nam có <strong>3 quốc gia láng giềng giáp biên giới đất liền</strong>. Bấm vào từng nước để tự động định vị trên bản đồ / địa cầu:
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {directNeighbors.map((item) => {
                const country = COUNTRIES_DATA[item.countryId];
                if (!country) return null;

                return (
                  <div
                    key={item.countryId}
                    onClick={() => handleCountryClick(item.countryId)}
                    className="p-3.5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/60 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{country.flag}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.direction}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                        {country.nameVi}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Thủ đô: <strong>{country.capital}</strong>
                      </p>
                      <p className="text-[11px] text-amber-300/90 font-medium mt-1">
                        📏 Biên giới: <strong>{item.borderLength}</strong>
                      </p>
                      <p className="text-[11px] text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                        {item.significance}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-sky-400 group-hover:translate-x-0.5 transition-transform">
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: 11 ASEAN Countries */}
        {activeTab === 'asean' && (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 flex items-center justify-between">
              <span>Hiệp hội các quốc gia Đông Nam Á (ASEAN) gồm <strong>11 nước thành viên</strong>:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {aseanCountries.map((c) => {
                const dirInfo = getDirectionFromVietnam(c);
                const isVN = c.id === 'vietnam';

                return (
                  <button
                    key={c.id}
                    onClick={() => handleCountryClick(c.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isVN
                        ? 'bg-red-950/40 border-red-500/50 hover:bg-red-900/50'
                        : 'bg-slate-800/60 border-slate-700/50 hover:border-sky-500/50 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.flag}</span>
                      <div>
                        <p className="font-bold text-xs text-white leading-tight">{c.nameVi}</p>
                        <p className="text-[10px] text-slate-400">{c.capital}</p>
                      </div>
                    </div>
                    {!isVN && (
                      <span className="text-[10px] text-sky-300/80 mt-1.5 flex items-center gap-1 font-medium">
                        <span>{dirInfo.arrow}</span>
                        <span className="truncate">{c.relativeDirectionFromVietnam || 'ĐNA'}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Maritime & Islands */}
        {activeTab === 'maritime' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                <h4 className="font-bold text-sm text-sky-300 mb-1.5 flex items-center gap-1.5">
                  🌊 Vùng Biển Đông Rộng Lớn
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Biển Đông bao bọc toàn bộ phía Đông và Nam nước ta, cung cấp nguồn hải sản trù phú, dầu khí và là tuyến giao thương hàng hải huyết mạch quốc tế.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                <h4 className="font-bold text-sm text-amber-300 mb-1.5 flex items-center gap-1.5">
                  🏝 Hai Quần Đảo Thiêng Liêng
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Quần đảo <strong>Hoàng Sa</strong> (thuộc TP. Đà Nẵng) và Quần đảo <strong>Trường Sa</strong> (thuộc tỉnh Khánh Hòa) là một phần máu thịt thiêng liêng không thể tách rời của Tổ quốc.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                <h4 className="font-bold text-sm text-emerald-300 mb-1.5">
                  🌅 Vịnh Bắc Bộ
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Vùng vịnh ở phía Bắc với Di sản Thiên nhiên Thế giới <strong>Vịnh Hạ Long</strong> và hàng ngàn đảo ngọc đá vôi kỳ thú.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
                <h4 className="font-bold text-sm text-purple-300 mb-1.5">
                  🏖 Vịnh Thái Lan & Đảo Phú Quốc
                </h4>
                <p className="leading-relaxed text-slate-300">
                  Nằm ở phía Tây Nam với Đảo Ngọc Phú Quốc lớn nhất Việt Nam, khí hậu ấm áp và biển lặng quanh năm.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Interactive Quick Quiz */}
        {activeTab === 'quiz' && (
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-amber-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Câu hỏi {quizStep + 1} / {neighborQuiz.length}
              </span>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 transition-colors"
                title="Dành cho giáo viên: Bật/tắt đáp án ngay"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAnswer ? 'Ẩn đáp án' : '👁 Hiện đáp án'}</span>
              </button>
            </div>

            <h4 className="font-bold text-sm text-white mb-3 leading-snug">
              {currentQ.question}
            </h4>

            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedQuizOption === opt;
                const isCorrect = idx === currentQ.correctIndex;
                let btnStyle = 'bg-slate-900/60 border-slate-700 text-slate-200 hover:border-slate-500';

                if (showAnswer) {
                  if (isCorrect) btnStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected) {
                  if (isCorrect) btnStyle = 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold';
                  else btnStyle = 'bg-red-900/60 border-red-500 text-red-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedQuizOption(opt);
                      if (isCorrect) setScore(s => s + 1);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {(showAnswer || (isSelected && isCorrect)) && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {(showAnswer || selectedQuizOption !== null) && (
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs text-sky-200">
                💡 <strong>Giải thích:</strong> {currentQ.explanation}
              </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700/50">
              <button
                disabled={quizStep === 0}
                onClick={() => {
                  setQuizStep(s => Math.max(0, s - 1));
                  setSelectedQuizOption(null);
                  setShowAnswer(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 disabled:opacity-40 text-xs text-slate-300 hover:bg-slate-700"
              >
                ← Câu trước
              </button>

              <button
                onClick={() => {
                  if (quizStep < neighborQuiz.length - 1) {
                    setQuizStep(s => s + 1);
                    setSelectedQuizOption(null);
                    setShowAnswer(false);
                  } else {
                    setQuizStep(0);
                    setSelectedQuizOption(null);
                    setShowAnswer(false);
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white shadow-md shadow-sky-500/30"
              >
                {quizStep < neighborQuiz.length - 1 ? 'Câu tiếp theo →' : 'Làm lại từ đầu'}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
