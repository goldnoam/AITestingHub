import React, { useMemo } from 'react';
import { X, ExternalLink, Shield, Zap, Info, Terminal, BrainCircuit, Globe, Layers, Cpu, CheckCircle2, Tag, Link2, Mail, LayoutGrid, Scale } from 'lucide-react';
import { Tool } from '../types';
import { TOOLS } from '../data';

interface DetailedModalProps {
  tool: Tool | null;
  onClose: () => void;
  onRelatedToolClick?: (tool: Tool) => void;
}

export const DetailedModal: React.FC<DetailedModalProps> = ({ tool, onClose, onRelatedToolClick }) => {
  if (!tool) return null;

  const relatedTools = useMemo(() => {
    return TOOLS.filter(t => t.id !== tool.id && (
      t.category === tool.category || 
      t.tags.some(tag => tool.tags.includes(tag))
    )).slice(0, 3);
  }, [tool]);

  const comparisonTools = relatedTools.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className={`p-8 ${tool.isOpenSource ? 'bg-emerald-600' : 'bg-indigo-600'} text-white relative`}>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              {tool.isPaid ? <Zap size={16} /> : <Shield size={16} />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{tool.category}</span>
          </div>
          
          <h2 className="text-4xl font-black mb-4 flex items-baseline gap-3">
            {tool.name}
            {tool.version && <span className="text-sm font-bold opacity-60">v{tool.version}</span>}
          </h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-[10px] font-bold border border-white/20 flex items-center gap-1">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3">
             <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-lg"
              >
                Official Site <ExternalLink size={14} />
              </a>
          </div>
        </div>

        <div className="p-8 overflow-y-auto space-y-10">
          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Description
            </h3>
            <p className="text-slate-700 text-lg leading-relaxed font-medium">
              {tool.description}
            </p>
          </section>

          <section className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Scale size={14} className="text-blue-600" /> Peer Comparison
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 font-black text-slate-400 uppercase text-[10px] tracking-tight w-1/3">Criteria</th>
                    <th className="pb-3 font-black text-blue-600 uppercase text-[10px] tracking-tight text-center">{tool.name}</th>
                    {comparisonTools.map(ct => (
                      <th key={ct.id} className="pb-3 font-black text-slate-600 uppercase text-[10px] tracking-tight text-center">{ct.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 font-bold text-slate-900">License</td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${tool.isPaid ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {tool.isPaid ? 'PAID' : 'OSS'}
                      </span>
                    </td>
                    {comparisonTools.map(ct => (
                      <td key={ct.id} className="py-4 text-center">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${ct.isPaid ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {ct.isPaid ? 'PAID' : 'OSS'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-900">Ecosystem</td>
                    <td className="py-4 text-center text-xs text-slate-500 font-medium">{tool.frameworks.slice(0, 1).join(', ')}</td>
                    {comparisonTools.map(ct => (
                      <td key={ct.id} className="py-4 text-center text-xs text-slate-500 font-medium">{ct.frameworks.slice(0, 1).join(', ')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-900">Capabilities</td>
                    <td className="py-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {tool.tags.slice(0, 2).map(t => <span key={t} className="text-[9px] bg-white border border-slate-200 px-1 rounded text-slate-400 font-bold">{t}</span>)}
                      </div>
                    </td>
                    {comparisonTools.map(ct => (
                      <td key={ct.id} className="py-4">
                        <div className="flex flex-wrap justify-center gap-1">
                          {ct.tags.slice(0, 2).map(t => <span key={t} className="text-[9px] bg-white border border-slate-200 px-1 rounded text-slate-400 font-bold">{t}</span>)}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu size={14} /> Native Support
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.frameworks.map(fw => (
                  <div key={fw} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-sm font-bold text-slate-700">{fw}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal size={14} /> Integration
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                   <div className="p-1 bg-white rounded shadow-sm mt-0.5"><CheckCircle2 size={12} className="text-emerald-500" /></div>
                   <p className="text-sm text-slate-600 italic leading-snug">{tool.howToUse}</p>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Agentify Guide</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Enterprise Implementation Strategy</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-blue-100 text-slate-700 leading-relaxed font-medium shadow-inner">
              {tool.agentStrategy}
            </div>
          </section>

          {relatedTools.length > 0 && (
            <section>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <LayoutGrid size={14} /> Alternatives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map(rt => (
                  <button 
                    key={rt.id}
                    onClick={() => onRelatedToolClick?.(rt)}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${rt.isOpenSource ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate w-full">{rt.category}</span>
                    </div>
                    <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors text-sm mb-1">{rt.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                      {rt.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="bg-slate-900 rounded-[2rem] p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                  <Link2 size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Direct Access</h3>
                  <p className="text-slate-400 text-sm font-medium break-all">{tool.url}</p>
                </div>
              </div>
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/40"
              >
                Open Resource <ExternalLink size={18} />
              </a>
            </div>
          </section>

          <footer className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              (C) Noam Gold AI 2025
            </p>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Feedback</span>
              <a 
                href="mailto:goldnoamai@gmail.com" 
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 text-[10px] font-black hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all"
              >
                <Mail size={12} /> goldnoamai@gmail.com
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};