
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, Loader2, Bot, Layers, CheckCircle2 } from 'lucide-react';
import { Tool } from '../types';
import { getAgentAdvice } from '../services/gemini';

interface AgentModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ tool, onClose }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedFw, setSelectedFw] = useState('');

  useEffect(() => {
    if (tool && tool.frameworks.length > 0) {
      setSelectedFw(tool.frameworks[0]);
    }
  }, [tool]);

  const handleGenerate = async () => {
    if (!tool) return;
    setLoading(true);
    const result = await getAgentAdvice(tool.name, selectedFw);
    setAdvice(result);
    setLoading(false);
  };

  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3 text-white">
            <Bot size={24} />
            <h2 className="text-xl font-bold tracking-tight">Agentify: {tool.name}</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {!advice ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                  <Layers size={18} /> Default Strategy
                </h4>
                <p className="text-blue-700/80 text-sm leading-relaxed">
                  {tool.agentStrategy}
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Select Your Main Framework
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {tool.frameworks.map(fw => (
                    <button
                      key={fw}
                      onClick={() => setSelectedFw(fw)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedFw === fw 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'
                      }`}
                    >
                      {fw}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Sparkles size={18} className="text-yellow-400" />
                )}
                Generate AI Agent Blueprint
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="prose prose-slate max-w-none">
                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <CheckCircle2 size={20} />
                  <span className="font-bold">Agent Strategy Ready</span>
                </div>
                <div className="whitespace-pre-wrap text-slate-700 text-sm leading-loose font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {advice}
                </div>
              </div>
              
              <button
                onClick={() => setAdvice('')}
                className="text-slate-500 text-xs font-bold hover:text-blue-600 transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                ← Back to configuration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
