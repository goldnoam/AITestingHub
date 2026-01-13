
import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Eye, Code2, Globe, Boxes, Tag, BrainCircuit, ShieldCheck, Unlock } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onViewDetails: (tool: Tool) => void;
  onOpenAgent: (tool: Tool) => void;
  onSpeak: (text: string) => void;
  theme: 'light' | 'dark';
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onViewDetails, onOpenAgent, onSpeak, theme }) => {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSpeak('Link copied');
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`rounded-[2.5rem] border transition-all duration-500 ease-out flex flex-col group h-full overflow-hidden relative shadow-sm hover:shadow-2xl hover:-translate-y-2 ${
        isDark 
          ? 'bg-slate-900 border-slate-800 hover:border-blue-900/50 hover:shadow-blue-900/20' 
          : 'bg-white border-slate-200 hover:border-blue-100'
      }`}
    >
      {/* Top Badge Strip */}
      <div className="absolute top-6 left-8 flex gap-2 z-10 pointer-events-none">
        {tool.isOpenSource && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm border ${
            isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
          }`}>
            <Unlock size={10} /> Open Source
          </div>
        )}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm border ${
          tool.isPaid 
            ? isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
            : isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
        }`}>
          {tool.isPaid ? 'Paid Tier' : 'Free / OS'}
        </div>
      </div>

      <div className="p-8 pt-14 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
          <div className="flex items-center gap-4 w-full">
            <div className={`w-16 h-16 rounded-2xl p-2.5 flex items-center justify-center shrink-0 border shadow-sm transition-transform group-hover:scale-110 ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'
            }`}>
              {tool.logo ? (
                <img src={tool.logo} alt={`${tool.name} logo`} className="w-full h-full object-contain" />
              ) : (
                <Boxes size={28} className="text-blue-500" />
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <h3 className={`text-xl font-extrabold tracking-tight break-words group-hover:text-blue-500 transition-colors leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {tool.name}
              </h3>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{tool.category}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { onSpeak(`Viewing details for ${tool.name}`); onViewDetails(tool); }}
              className={`p-2.5 rounded-xl transition-all shadow-sm border ${isDark ? 'bg-slate-800 text-blue-400 border-slate-700 hover:bg-slate-700' : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'}`}
              aria-label="Quick View"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        <p className={`text-sm mb-6 leading-relaxed line-clamp-3 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.slice(0, 4).map(tag => (
            <span key={tag} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wide ${isDark ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 pt-0 mt-auto flex flex-col gap-3">
        <button 
          onClick={() => { onSpeak(`Accessing Agent Strategy for ${tool.name}`); onOpenAgent(tool); }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl active:scale-95"
        >
          <BrainCircuit size={18} />
          Agent Blueprint
        </button>
        
        <div className="flex gap-2">
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => onSpeak(`Visiting official site`)}
            className={`flex-grow text-center py-3 rounded-2xl text-[11px] font-black flex items-center justify-center gap-2 border transition-all shadow-sm ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-blue-600'
            }`}
          >
            Visit <ExternalLink size={14} />
          </a>
          <button 
            onClick={copyUrl}
            className={`p-3 rounded-2xl border transition-all shadow-sm ${
              copied 
                ? 'bg-emerald-600 border-emerald-600 text-white' 
                : isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-blue-600'
            }`}
            aria-label="Copy Link"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
