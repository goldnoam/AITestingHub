import React from 'react';
import { X, Bot, Layers, CheckCircle2, Info, Rocket, ShieldCheck } from 'lucide-react';
import { Tool } from '../types';

interface AgentModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
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
          <button onClick={onClose} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Info size={16} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">The Core Concept</h3>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl">
              <p className="text-slate-700 text-lg font-medium leading-relaxed italic">
                "{tool.agentStrategy}"
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-black text-slate-900">Self-Healing Logic</h4>
              <p className="text-xs text-slate-500 font-medium">Integrate with LLM selectors to automatically recover from UI changes and breakage.</p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Rocket size={20} />
              </div>
              <h4 className="font-black text-slate-900">Autonomous Triggers</h4>
              <p className="text-xs text-slate-500 font-medium">Connect to CI/CD webhooks to trigger specialized agent sub-tasks based on PR content.</p>
            </div>
          </section>

          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 bg-emerald-500 rounded-full">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <h3 className="text-xl font-black">Execution Roadmap</h3>
            </div>
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

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blueprint Version 1.2 • Verified Strategy</p>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};