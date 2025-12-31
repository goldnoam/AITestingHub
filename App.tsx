
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { DetailedModal } from './components/DetailedModal';
import { AgentModal } from './components/AgentModal';
import { InfographicSummary } from './components/InfographicSummary';
import { TOOLS } from './data';
import { FilterState, Tool } from './types';
import { LayoutGrid, AlertCircle, Linkedin, Sparkles, Bot, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    pricing: 'All',
    selectedTags: [],
  });
  const [detailsTool, setDetailsTool] = useState<Tool | null>(null);
  const [agentTool, setAgentTool] = useState<Tool | null>(null);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const searchLower = filters.search.toLowerCase();
      
      const matchesSearch = 
        !filters.search ||
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.agentStrategy.toLowerCase().includes(searchLower) ||
        tool.frameworks.some(fw => fw.toLowerCase().includes(searchLower)) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesCategory = filters.category === 'All' || tool.category === filters.category;
      
      const matchesPricing = 
        filters.pricing === 'All' || 
        (filters.pricing === 'Free/OS' && tool.isOpenSource) ||
        (filters.pricing === 'Paid' && tool.isPaid);

      const matchesTags = 
        filters.selectedTags.length === 0 || 
        filters.selectedTags.every(tag => 
          tool.tags.includes(tag) || tool.frameworks.includes(tag)
        );

      return matchesSearch && matchesCategory && matchesPricing && matchesTags;
    });
  }, [filters]);

  const handleRelatedToolClick = (tool: Tool) => {
    setDetailsTool(tool);
  };

  const handleOpenAgent = (tool: Tool) => {
    setAgentTool(tool);
  };

  return (
    <div className="min-h-screen pb-20 bg-[#fafafa]">
      <Header />
      
      <div className="pt-12">
        <InfographicSummary />
      </div>

      <FilterBar 
        filters={filters} 
        onFilterChange={setFilters} 
      />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200">
              <LayoutGrid size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tool Explorer</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${filteredTools.length > 0 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  {filteredTools.length} Resources Found
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase border border-blue-100">
               <Sparkles size={14} /> AI Testing Directory
            </div>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onViewDetails={setDetailsTool}
                onOpenAgent={handleOpenAgent}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-200 shadow-sm">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="bg-slate-50 p-8 rounded-full mb-6">
                <AlertCircle size={56} className="text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Zero tools found</h3>
              <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed">
                No tools match all your specific filter criteria. Try removing some tags or choosing a broader category.
              </p>
              <button 
                onClick={() => setFilters({ search: '', category: 'All', pricing: 'All', selectedTags: [] })}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
              >
                Reset All Parameters
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-t border-slate-200 pt-16">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
                <Bot size={24} />
             </div>
             <div>
                <h4 className="font-black text-slate-900 text-sm">Tester Tools Hub</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version 2.0 - Active Reference</p>
             </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest opacity-60">
              (C) Noam Gold AI 2025
            </p>
            <a 
              href="mailto:goldnoamai@gmail.com" 
              className="flex items-center gap-1.5 text-blue-600 text-[10px] font-black hover:underline tracking-widest"
            >
              <Mail size={12} /> SEND FEEDBACK: goldnoamai@gmail.com
            </a>
          </div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/noamgold/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-blue-600 transition-all hover:-translate-y-1 shadow-sm">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>

      <DetailedModal 
        tool={detailsTool} 
        onClose={() => setDetailsTool(null)} 
        onRelatedToolClick={handleRelatedToolClick}
      />

      <AgentModal 
        tool={agentTool}
        onClose={() => setAgentTool(null)}
      />
    </div>
  );
};

export default App;