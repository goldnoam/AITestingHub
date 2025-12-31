
import React, { useMemo } from 'react';
import { Search, Tag, X, ChevronDown, ListFilter, Cpu, Globe, Boxes, Layers, Code2, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { ToolCategory, FilterState } from '../types';
import { TOOLS } from '../data';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const categories = ['All', ...Object.values(ToolCategory)];

  // Define logical groupings for tags
  const tagGroups = useMemo(() => {
    const allTags = new Set<string>();
    TOOLS.forEach(tool => tool.tags.forEach(t => allTags.add(t)));
    TOOLS.forEach(tool => tool.frameworks.forEach(f => allTags.add(f)));

    const groups = {
      'Platforms': ['Web', 'Mobile', 'iOS', 'Android', 'Desktop', 'Cross-browser', 'Cross-device', 'API'],
      'AI Capabilities': ['AI-Native', 'AI-Enhanced', 'Self-healing', 'LLM Testing', 'RAG', 'Generative AI', 'NLP', 'Visual AI', 'Hallucination Check', 'Red-teaming', 'Evaluation'],
      'Core Technologies': ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Node.js', 'Pytest', 'LangChain'],
      'Workflow': ['CI/CD', 'Low-code', 'No-code', 'Modern', 'E2E', 'Traditional', 'Metrics']
    };

    return Object.entries(groups).map(([name, keywords]) => ({
      name,
      tags: Array.from(allTags).filter(tag => keywords.includes(tag)).sort()
    })).filter(group => group.tags.length > 0);
  }, []);

  const toggleTag = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    onFilterChange({ ...filters, selectedTags: newTags });
  };

  const clearAll = () => {
    onFilterChange({
      search: '',
      category: 'All',
      pricing: 'All',
      selectedTags: [],
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'All') count++;
    if (filters.pricing !== 'All') count++;
    count += filters.selectedTags.length;
    return count;
  }, [filters]);

  const getGroupIcon = (name: string) => {
    switch (name) {
      case 'Platforms': return <Globe size={14} />;
      case 'AI Capabilities': return <Sparkles size={14} />;
      case 'Core Technologies': return <Code2 size={14} />;
      default: return <Layers size={14} />;
    }
  };

  return (
    <div className="bg-white border-y border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col gap-6">
          {/* Main Search and Basic Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search tools, agents, frameworks (e.g., 'self-healing python')..."
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium placeholder:text-slate-400"
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              />
              {filters.search && (
                <button 
                  onClick={() => onFilterChange({ ...filters, search: '' })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-all"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
              <div className="relative flex-grow lg:flex-grow-0 min-w-[160px]">
                <select 
                  className="w-full lg:w-[220px] appearance-none px-4 py-3.5 pr-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  value={filters.category}
                  onChange={(e) => onFilterChange({ ...filters, category: e.target.value as any })}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>

              <div className="flex bg-slate-100 p-1.5 rounded-2xl shrink-0">
                {(['All', 'Free/OS', 'Paid'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => onFilterChange({ ...filters, pricing: p })}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${
                      filters.pricing === p 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-5 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-slate-200 active:scale-95 group"
                >
                  <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
                  Clear Filters ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>

          {/* Sub-Category Grouped Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-blue-600" />
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Advanced Capability Filters</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tagGroups.map(group => (
                <div key={group.name} className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 px-1 text-slate-400">
                    {getGroupIcon(group.name)}
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{group.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map(tag => {
                      const isActive = filters.selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                            isActive 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filter Indicators (Compact) */}
          {filters.selectedTags.length > 0 && (
             <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight mr-2">Selected Requirements:</span>
                {filters.selectedTags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black flex items-center gap-1.5 animate-in slide-in-from-left-2 duration-300">
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="hover:opacity-70"><X size={10} /></button>
                  </span>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
