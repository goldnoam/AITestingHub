
import React, { useState } from 'react';
import { ExternalLink, Shield, Zap, ChevronRight, BrainCircuit, Copy, Check, Eye, Code2, Globe, Boxes, Tag } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onAgentify: (tool: Tool) => void;
  onViewDetails: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onAgentify, onViewDetails }) => {
  const [copied, setCopied] = useState(false);

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTagIcon = (fw: string) => {
    const f = fw.toLowerCase();
    if (f.includes('api') || f.includes('node') || f.includes('python') || f.includes('java')) return <Code2 size={10} />;
    if (f.includes('web') || f.includes('playwright') || f.includes('cypress')) return <Globe size={10} />;
    return <Boxes size={10} />;
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 sm:hover:rounded-[2.5rem] hover:border-blue-100 transition-all duration-500 ease-out flex flex-col group h-full overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-white to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-500 -z-10" />
      
      <div className="p-6 sm:p-8 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex flex-col gap-1.5 w-full sm:w-auto">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 tracking-tight break-words">
              {tool.name}
              {tool.version && <span className="ml-2 text-[10px] font-bold text-slate-400">({tool.version})</span>}
            </h3>
            <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{tool.category}</span>
          </div>
          
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto flex-wrap">
            <div className="flex gap-1.5">
              {tool.isOpenSource && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-50 text-emerald-700 text-[8px] sm:text-[9px] font-black rounded-lg border border-emerald-100 uppercase tracking-tight shadow-sm shrink-0">
                  OSS
                </span>
              )}
              {tool.isPaid && (
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-indigo-50 text-indigo-700 text-[8px] sm:text-[9px] font-black rounded-lg border border-indigo-100 uppercase tracking-tight shadow-sm shrink-0">
                  PAID
                </span>
              )}
            </div>
            {tool.agentStrategy && (
              <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black text-blue-600 bg-blue-50/80 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-blue-100 uppercase tracking-tight shadow-sm animate-pulse-slow shrink-0">
                <BrainCircuit size={10} className="text-blue-500" /> Agent-Ready
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed line-clamp-3 sm:line-clamp-2 font-medium">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
          {tool.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 bg-slate-50 text-slate-500 text-[9px] sm:text-[10px] font-bold rounded-lg border border-slate-100 uppercase transition-all group-hover:bg-white group-hover:border-blue-100 group-hover:text-blue-600">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {tool.frameworks.slice(0, 3).map(fw => (
            <span key={fw} className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-100/50 text-slate-600 text-[9px] sm:text-[10px] rounded-lg font-bold border border-slate-100 transition-all duration-300 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700">
              {getTagIcon(fw)}
              {fw}
            </span>
          ))}
          {tool.frameworks.length > 3 && (
            <span className="px-1.5 py-1 text-slate-400 text-[9px] sm:text-[10px] font-bold flex items-center">+{tool.frameworks.length - 3}</span>
          )}
        </div>

        <button 
          onClick={() => onViewDetails(tool)}
          className="group/btn flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-black text-slate-900 hover:text-blue-600 transition-all py-2"
        >
          <div className="bg-slate-100 group-hover/btn:bg-blue-600 group-hover/btn:text-white p-1.5 rounded-lg transition-all shadow-sm">
            <Eye size={12} className="text-slate-500 group-hover/btn:text-white sm:w-[14px] sm:h-[14px]" />
          </div>
          <span className="tracking-tight">Technical Specification</span>
          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 text-blue-600 sm:w-[16px] sm:h-[16px]" />
        </button>
      </div>

      <div className="p-6 sm:p-8 pt-0 mt-auto flex flex-col gap-3 sm:gap-4">
        <button 
          onClick={() => onAgentify(tool)}
          className="w-full bg-slate-900 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 hover:bg-blue-600 transition-all duration-300 active:scale-[0.97] shadow-lg sm:shadow-xl shadow-slate-200 group-hover:shadow-blue-200"
        >
          <BrainCircuit size={16} className="text-blue-400 group-hover:text-white transition-colors sm:w-[18px] sm:h-[18px]" />
          Build AI Agent
        </button>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-grow text-center bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-white hover:border-blue-200 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black flex items-center justify-center gap-1.5 sm:gap-2 border border-slate-100 transition-all shadow-sm"
          >
            Visit Hub <ExternalLink size={12} />
          </a>
          <button 
            onClick={copyUrl}
            className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 shadow-sm flex items-center justify-center ${
              copied 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 scale-105' 
                : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-white hover:border-slate-200'
            }`}
            title="Copy URL"
          >
            {copied ? <Check size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </button>
        </div>
      </div>
    </div>
  );
};
