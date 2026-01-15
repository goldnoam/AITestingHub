
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Info, BrainCircuit, Copy, Check, Scale, Plus, Trash2, Search } from 'lucide-react';
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

export const DetailedModal: React.FC<DetailedModalProps> = ({ tool, onClose, onSpeak, theme, t }) => {
  const [copied, setCopied] = useState(false);
  const [compareList, setCompareList] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tool) {
      modalRef.current?.focus();
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [tool, onClose]);

  // Reset comparison when main tool changes
  useEffect(() => {
    setCompareList([]);
  }, [tool]);

  if (!tool) return null;

  const isDark = theme === 'dark';

  const copyUrl = () => {
    onSpeak('Url copied');
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const availableToCompare = useMemo(() => {
    return TOOLS.filter(t => 
      t.id !== tool.id && 
      !compareList.find(c => c.id === t.id) &&
      (searchQuery ? t.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    ).slice(0, 5);
  }, [tool, compareList, searchQuery]);

  const addToCompare = (otherTool: Tool) => {
    if (compareList.length < 2) {
      setCompareList([...compareList, otherTool]);
      onSpeak(`Comparing ${tool.name} with ${otherTool.name}`);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(t => t.id !== id));
  };

  const comparisonTools = [tool, ...compareList];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => { onSpeak('Closing modal'); onClose(); }} aria-hidden="true" />
      
      <div 
        ref={modalRef}
        tabIndex={-1}
        className={`w-full max-w-5xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border outline-none ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        <div className={`p-8 ${tool.isOpenSource ? 'bg-emerald-600' : 'bg-indigo-600'} text-white relative`}>
          <button 
            onClick={() => { onSpeak('Close'); onClose(); }} 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors focus:ring-2 focus:ring-white outline-none"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{tool.category}</span>
          </div>
          
          <h2 id="modal-title" className="text-4xl font-black mb-4 flex items-baseline gap-3">
            {tool.name}
            {tool.version && <span className="text-sm font-bold opacity-60">v{tool.version}</span>}
          </h2>
        </div>

        <div className="p-8 overflow-y-auto space-y-10">
          {/* Comparison Controls */}
          <section className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                  <Scale size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Compare Tools</h3>
                  <p className="text-[10px] text-slate-500 font-bold">ADD UP TO 2 TOOLS FOR SIDE-BY-SIDE COMPARISON</p>
                </div>
              </div>
              
              {compareList.length < 2 && (
                <div className="relative flex-grow max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search tools to compare..." 
                    className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:ring-2 outline-none ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-2xl z-50 overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                      {availableToCompare.map(at => (
                        <button 
                          key={at.id} 
                          onClick={() => { addToCompare(at); setSearchQuery(''); }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-blue-600 hover:text-white flex items-center justify-between ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                        >
                          {at.name} <Plus size={12} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Comparison Grid */}
            <div className={`grid gap-4 ${comparisonTools.length === 1 ? 'grid-cols-1' : comparisonTools.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {comparisonTools.map((t, idx) => (
                <div key={t.id} className={`p-5 rounded-2xl border relative flex flex-col transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} ${idx === 0 ? 'ring-2 ring-blue-500/50' : ''}`}>
                  {idx > 0 && (
                    <button 
                      onClick={() => removeFromCompare(t.id)} 
                      className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors shadow-lg"
                      aria-label="Remove from comparison"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  <div className="mb-4">
                    <span className="text-[9px] font-black uppercase text-blue-500 tracking-tighter mb-1 block">
                      {idx === 0 ? 'MAIN TOOL' : `COMPARE ${idx}`}
                    </span>
                    <h4 className="font-black text-sm truncate">{t.name}</h4>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    <div>
                      <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Pricing</span>
                      <div className={`text-[10px] font-black py-1 px-2 rounded-lg inline-block ${t.isPaid ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {t.isPaid ? 'PAID' : 'FREE / OS'}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Frameworks</span>
                      <div className="flex flex-wrap gap-1">
                        {t.frameworks.slice(0, 3).map(f => (
                          <span key={f} className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Category</span>
                      <p className="text-[9px] font-medium leading-tight text-slate-400">{t.category}</p>
                    </div>
                  </div>
                  
                  <a 
                    href={t.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 text-[10px] font-black text-blue-500 flex items-center gap-1 hover:underline"
                  >
                    Site <ExternalLink size={10} />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} aria-hidden="true" /> Detailed Description
            </h3>
            <p className={`text-lg leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {tool.description}
            </p>
          </section>

          <section className={`rounded-[2rem] p-8 border ${isDark ? 'bg-blue-900/10 border-blue-900/30' : 'bg-blue-50 border-blue-100'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
                <BrainCircuit size={20} aria-hidden="true" />
              </div>
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Agentify Guide</h3>
            </div>
            <div className={`p-6 rounded-2xl leading-relaxed font-medium shadow-inner ${isDark ? 'bg-slate-800/50 text-slate-300' : 'bg-white text-slate-700'}`}>
              {tool.agentStrategy}
            </div>
          </section>

          <footer className={`pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.copyright}</p>
            <div className="flex gap-4">
              <button 
                onClick={copyUrl}
                className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  copied ? 'bg-emerald-600 border-emerald-600 text-white' : 'text-blue-500 hover:bg-blue-500/10 border-blue-500/30'
                }`}
              >
                {copied ? <><Check size={12}/> Link Copied</> : <><Copy size={12}/> Copy Link</>}
              </button>
              <a href="mailto:goldnoamai@gmail.com" className="text-blue-500 text-[10px] font-black hover:underline uppercase tracking-widest flex items-center px-4 py-2 border border-transparent">
                {t.feedback}
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
