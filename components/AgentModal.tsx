
import React from 'react';
import { X, Bot, CheckCircle2, Info, Rocket, ShieldCheck } from 'lucide-react';
import { Tool } from '../types';

interface AgentModalProps {
  tool: Tool | null;
  onClose: () => void;
  onSpeak: (text: string) => void;
  theme: 'light' | 'dark';
}

export const AgentModal: React.FC<AgentModalProps> = ({ tool, onClose, onSpeak, theme }) => {
  if (!tool) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => { onSpeak('Close blueprint'); onClose(); }}
      />
      
      <div className={`w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 flex justify-between items-start">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 p-2.5 rounded-2xl">
              <Bot size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Agent Strategy Blueprint</h2>
              <p className="text-blue-100/70 text-sm font-bold uppercase tracking-widest">{tool.name}</p>
            </div>
          </div>
          <button onClick={() => { onSpeak('Close'); onClose(); }} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Info size={16} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">The Core Concept</h3>
            </div>
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-blue-900/10 border-blue-900/30' : 'bg-blue-50 border-blue-100'}`}>
              <p className={`text-lg font-medium leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                "{tool.agentStrategy}"
              </p>
            </div>
          </section>

          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-black mb-6">Execution Roadmap</h3>
            <ul className="space-y-4">
              {[
                { step: "01", text: "Map tool APIs to internal LLM functions." },
                { step: "02", text: "Implement a context-aware feedback loop." },
                { step: "03", text: "Deploy as a background monitoring agent." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center">
                  <span className="text-blue-400 font-black text-sm">{item.step}</span>
                  <p className="text-slate-300 text-sm font-medium">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`p-8 border-t flex justify-between items-center ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50'}`}>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Blueprint Version 1.2 • Verified</p>
          <button 
            onClick={() => { onSpeak('Acknowledged'); onClose(); }}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-500 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
