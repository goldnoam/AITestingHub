
import React, { useMemo, useState } from 'react';
import { X, ExternalLink, Shield, Zap, Info, Terminal, BrainCircuit, Cpu, CheckCircle2, Tag, Link2, Mail, LayoutGrid, Scale, Copy, Check } from 'lucide-react';
import { Tool } from '../types';
import { TOOLS } from '../data';

interface DetailedModalProps {
  tool: Tool | null;
  onClose: () => void;
  onRelatedToolClick?: (tool: Tool) => void;
  onSpeak: (text: string) => void;
  theme: 'light' | 'dark';
  t: any;
}

export const DetailedModal: React.FC<DetailedModalProps> = ({ tool, onClose, onRelatedToolClick, onSpeak, theme, t }) => {
  const [copied, setCopied] = useState(false);
  if (!tool) return null;

  const isDark = theme === 'dark';

  const relatedTools = useMemo(() => {
    return TOOLS.filter(t => t.id !== tool.id && (
      t.category === tool.category || 
      t.tags.some(tag => tool.tags.includes(tag))
    )).slice(0, 3);
  }, [tool]);

  const copyUrl = () => {
    onSpeak('Url copied');
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => { onSpeak('Closing modal'); onClose(); }} />
      
      <div className={`w-full max-w-3xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`p-8 ${tool.isOpenSource ? 'bg-emerald-600' : 'bg-indigo-600'} text-white relative`}>
          <button onClick={() => { onSpeak('Close'); onClose(); }} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{tool.category}</span>
          </div>
          
          <h2 className="text-4xl font-black mb-4 flex items-baseline gap-3">
            {tool.name}
            {tool.version && <span className="text-sm font-bold opacity-60">v{tool.version}</span>}
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 overflow-y-auto space-y-10">
          <section>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Description
            </h3>
            <p className={`text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {tool.description}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => onSpeak('Opening official site')}
              className="flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-blue-500 transition-all"
            >
              Official Website <ExternalLink size={18} />
            </a>
            <button 
              onClick={copyUrl}
              className={`flex items-center justify-center gap-3 py-4 border rounded-2xl font-black text-sm transition-all ${
                copied ? 'bg-emerald-600 border-emerald-600 text-white' : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Link</>}
            </button>
          </div>

          <section className={`rounded-[2rem] p-8 border ${isDark ? 'bg-blue-900/10 border-blue-900/30' : 'bg-blue-50 border-blue-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
                <BrainCircuit size={20} />
              </div>
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Agentify Guide</h3>
            </div>
            <div className={`p-6 rounded-2xl leading-relaxed font-medium shadow-inner ${isDark ? 'bg-slate-800/50 text-slate-300' : 'bg-white text-slate-700'}`}>
              {tool.agentStrategy}
            </div>
          </section>

          <footer className={`pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.copyright}</p>
            <a href="mailto:goldnoamai@gmail.com" className="text-blue-500 text-[10px] font-black hover:underline uppercase tracking-widest">
              {t.feedback}: goldnoamai@gmail.com
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};
