import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

const MASCOT_MESSAGES = [
  'Chào em! Anh là Geo - bạn đồng hành thám hiểm Trái Đất của em nè! 🌍',
  'Thử bấm nút "🇻🇳 Việt Nam" ở góc trên để ngắm đất nước mình nhé!',
  'Em có biết nước Nga có diện tích lớn nhất hành tinh không? 🇷🇺',
  'Hãy thử bấm vào nút "Xem từ Việt Nam" để xem khoảng cách đường bay nhé! ✈️',
  'Thử chọn mục "Thiên nhiên" để xem đỉnh Everest hùng vĩ nào! 🏔️',
  'Em hãy thử chơi trò "Tìm quốc gia" để thử tài thám hiểm nhé! 🎮'
];

interface GeoMascotProps {
  onReturnToVietnam?: () => void;
  onOpenGames?: () => void;
}

export const GeoMascot: React.FC<GeoMascotProps> = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);

  // Auto rotate hint messages gently
  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MASCOT_MESSAGES.length);
    }, 16000);
    return () => clearInterval(timer);
  }, []);

  const handleNextMessage = () => {
    setMessageIndex(prev => (prev + 1) % MASCOT_MESSAGES.length);
    setIsBubbleOpen(true);
  };

  if (!isVisible) {
    return (
      <button
        id="geo-mascot-reopen-btn"
        onClick={() => {
          setIsVisible(true);
          setIsBubbleOpen(true);
        }}
        className="fixed bottom-20 left-4 z-20 w-10 h-10 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 rounded-full flex items-center justify-center text-lg shadow-xl shadow-slate-950/60 transition-transform hover:scale-110"
        title="Mở bạn hướng dẫn Geo"
      >
        🤖
      </button>
    );
  }

  return (
    <div
      id="geo-mascot-container"
      className="fixed bottom-20 left-4 z-20 flex flex-col items-start pointer-events-auto max-w-[260px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      {/* Speech Bubble */}
      {isBubbleOpen && (
        <div className="relative mb-2 p-3 bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl shadow-2xl text-xs text-slate-200 space-y-1.5 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
            <span className="text-[10px] font-black uppercase text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Geo gợi ý:
            </span>
            <button
              onClick={() => setIsBubbleOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
              title="Tắt bong bóng gợi ý"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p
            className="text-xs leading-relaxed font-medium cursor-pointer select-none"
            onClick={handleNextMessage}
          >
            {MASCOT_MESSAGES[messageIndex]}
          </p>
          <div className="flex items-center justify-between pt-0.5">
            <button
              onClick={() => setIsVisible(false)}
              className="text-[10px] text-slate-500 hover:text-slate-400"
            >
              Ẩn Geo
            </button>
            <button
              onClick={handleNextMessage}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Gợi ý khác ➔
            </button>
          </div>

          {/* Speech bubble arrow pointer */}
          <div className="absolute -bottom-1.5 left-5 w-3 h-3 bg-slate-950 border-r border-b border-cyan-500/40 transform rotate-45" />
        </div>
      )}

      {/* Mascot Avatar Icon */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleNextMessage}
          className="p-1.5 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl shadow-xl border border-cyan-500/50 transition-transform hover:scale-105 flex items-center gap-2"
          title="Nhấn vào Geo để nhận gợi ý mới"
        >
          <div className="w-7 h-7 rounded-xl bg-cyan-600/20 text-cyan-300 flex items-center justify-center text-lg">
            🤖
          </div>
          <span className="text-xs font-bold text-slate-200 pr-1">Geo</span>
        </button>

        <button
          onClick={() => setIsVisible(false)}
          className="p-1.5 text-slate-500 hover:text-slate-300 text-xs"
          title="Ẩn Geo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
