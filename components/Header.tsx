
import React from 'react';
import { Bot, Cpu, Sparkles, Linkedin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white py-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Cpu size={240} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Bot size={32} />
            </div>
            <span className="text-blue-400 font-bold tracking-widest text-sm uppercase">Industry Resource</span>
          </div>
          <div className="flex gap-3">
            <a 
              href="https://www.linkedin.com/in/noamgold/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-800 hover:bg-blue-600 rounded-xl transition-all border border-slate-700 text-white/80 hover:text-white shadow-lg"
              title="Connect on LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          The AI Testers <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Tools Summary</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
          The curated directory of cutting-edge AI tools for software quality engineering. 
          Discover, automate, and agentify your testing workflow.
        </p>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-sm border border-slate-700">
            <Sparkles size={16} className="text-yellow-400" />
            <span>AI-Driven Insights</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-sm border border-slate-700">
            <Cpu size={16} className="text-blue-400" />
            <span>20+ Verified Tools</span>
          </div>
        </div>
      </div>
    </header>
  );
};
