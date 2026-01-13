
import React from 'react';
import { Bot, Cpu } from 'lucide-react';

interface HeaderProps {
  t: any;
}

export const Header: React.FC<HeaderProps> = ({ t }) => {
  return (
    <header className="bg-slate-900 text-white py-12 px-6 relative overflow-hidden dark:bg-black">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Cpu size={240} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bot size={32} />
            </div>
            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase">Industry Resource</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
          {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{t.subtitle}</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
          The curated directory of cutting-edge AI tools for software quality engineering. 
          Discover, automate, and agentify your testing workflow.
        </p>
      </div>
    </header>
  );
};
