import React, { useState, useRef, useEffect } from 'react';
import { LayerConfig } from '../../types';
import {
  Layers,
  Tag,
  Square,
  Compass,
  Globe2,
  Mountain,
  Waves,
  Sun,
  Trees,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LayerControlsProps {
  layers: LayerConfig;
  setLayers: React.Dispatch<React.SetStateAction<LayerConfig>>;
}

export const LayerControls: React.FC<LayerControlsProps> = ({ layers, setLayers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (key: keyof LayerConfig) => {
    setLayers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const layerSections = [
    {
      title: 'Bản đồ',
      items: [
        { key: 'countryLabels' as keyof LayerConfig, labelVi: 'Tên quốc gia', icon: <Tag className="w-3.5 h-3.5" />, color: 'text-sky-400' },
        { key: 'countryBorders' as keyof LayerConfig, labelVi: 'Ranh giới', icon: <Square className="w-3.5 h-3.5" />, color: 'text-indigo-400' }
      ]
    },
    {
      title: 'Đường địa lí',
      items: [
        { key: 'equator' as keyof LayerConfig, labelVi: 'Đường Xích đạo (0°)', icon: <Compass className="w-3.5 h-3.5" />, color: 'text-amber-400' },
        { key: 'primeMeridian' as keyof LayerConfig, labelVi: 'Kinh tuyến gốc 0°', icon: <Compass className="w-3.5 h-3.5" />, color: 'text-emerald-400' },
        { key: 'tropics' as keyof LayerConfig, labelVi: 'Chí tuyến Bắc / Nam', icon: <Globe2 className="w-3.5 h-3.5" />, color: 'text-cyan-400' },
        { key: 'graticules' as keyof LayerConfig, labelVi: 'Lưới kinh – vĩ tuyến', icon: <Globe2 className="w-3.5 h-3.5" />, color: 'text-sky-300' }
      ]
    },
    {
      title: 'Thiên nhiên',
      items: [
        { key: 'mountains' as keyof LayerConfig, labelVi: 'Núi cao', icon: <Mountain className="w-3.5 h-3.5" />, color: 'text-amber-500' },
        { key: 'rivers' as keyof LayerConfig, labelVi: 'Sông lớn', icon: <Waves className="w-3.5 h-3.5" />, color: 'text-cyan-400' },
        { key: 'deserts' as keyof LayerConfig, labelVi: 'Sa mạc', icon: <Sun className="w-3.5 h-3.5" />, color: 'text-yellow-400' },
        { key: 'forests' as keyof LayerConfig, labelVi: 'Rừng nhiệt đới', icon: <Trees className="w-3.5 h-3.5" />, color: 'text-emerald-400' },
        { key: 'volcanoes' as keyof LayerConfig, labelVi: 'Núi lửa', icon: <Flame className="w-3.5 h-3.5" />, color: 'text-rose-500' },
        { key: 'oceans' as keyof LayerConfig, labelVi: 'Đại dương', icon: <Waves className="w-3.5 h-3.5" />, color: 'text-blue-400' }
      ]
    }
  ];

  return (
    <div ref={panelRef} id="layer-controls-panel" className="absolute top-20 left-4 z-20 pointer-events-auto">
      {/* Floating Button */}
      <button
        id="btn-toggle-layers"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-950/85 hover:bg-slate-900 text-slate-100 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl transition-all duration-200"
        title="Bật / tắt các lớp thông tin địa lí"
      >
        <Layers className="w-4 h-4 text-cyan-400" />
        <span className="text-xs sm:text-sm font-bold">Lớp bản đồ</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {/* Categorized Dropdown List */}
      {isOpen && (
        <div
          id="layer-controls-dropdown"
          className="mt-2 p-3 w-64 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700"
        >
          {layerSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-cyan-400/90 px-2 py-0.5">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const active = layers[item.key];
                  return (
                    <button
                      key={item.key}
                      id={`layer-toggle-${item.key}`}
                      onClick={() => toggleLayer(item.key)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-slate-800/90 text-white border border-cyan-500/40 shadow-sm shadow-cyan-950/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={item.color}>{item.icon}</span>
                        <span>{item.labelVi}</span>
                      </div>
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-colors ${
                          active ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {active && <span className="text-[9px] font-black leading-none">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
