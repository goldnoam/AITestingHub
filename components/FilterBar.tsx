
import React, { useState, useMemo } from 'react';
import { Search, X, ChevronDown, Filter, RotateCcw, Download, Copy } from 'lucide-react';
import { ToolCategory, FilterState, Tool } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  filteredTools: Tool[];
  settings: any;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, filteredTools, settings }) => {
  const categories = ['All', ...Object.values(ToolCategory)];
  const [showExportTip, setShowExportTip] = useState(false);

  const clearAll = () => {
    onFilterChange({
      search: '',
      category: 'All',
      pricing: 'All',
      selectedTags: [],
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredTools, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'ai-tools-export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const text = e.dataTransfer.getData('text');
    if (text) {
      onFilterChange({ ...filters, search: text });
    }
  };

  // Simple autocomplete based on tool names
  const suggestions = useMemo(() => {
    if (!filters.search || filters.search.length < 2) return [];
    return filteredTools
      .map(t => t.name)
      .filter(name => name.toLowerCase().includes(filters.search.toLowerCase()))
      .slice(0, 5);
  }, [filters.search, filteredTools]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'All') count++;
    if (filters.pricing !== 'All') count++;
    count += filters.selectedTags.length;
    return count;
  }, [filters]);

  const isDark = settings.theme === 'dark';

  return (
    <div className={`border-y sticky top-0 z-30 shadow-sm transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`} role="search">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full group" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-600 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-500'}`} size={20} aria-hidden="true" />
              <label htmlFor="search-input" className="sr-only">Search Tools</label>
              <input 
                id="search-input"
                type="text" 
                placeholder="Search or Drop text here..."
                className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border transition-all text-sm font-medium focus:ring-4 outline-none ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-white focus:bg-slate-900 focus:ring-blue-600/50' 
                    : 'bg-slate-50 border-slate-200 focus:bg-white focus:ring-blue-500/50'
                }`}
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                autoComplete="off"
              />
              {filters.search && (
                <button 
                  onClick={() => onFilterChange({ ...filters, search: '' })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-all focus:ring-2 focus:ring-blue-500 outline-none"
                  aria-label="Clear Search"
                >
                  <X size={14} />
                </button>
              )}
              
              {suggestions.length > 0 && (
                <div className={`absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-2xl overflow-hidden z-40 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  {suggestions.map(s => (
                    <button key={s} onClick={() => onFilterChange({...filters, search: s})} className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors focus:bg-blue-600 focus:text-white outline-none ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
              <div className="relative flex-grow lg:flex-grow-0 min-w-[160px]">
                <label htmlFor="category-select" className="sr-only">Filter by Category</label>
                <select 
                  id="category-select"
                  className={`w-full lg:w-[220px] appearance-none px-4 py-3.5 pr-10 rounded-2xl border text-sm font-bold cursor-pointer focus:outline-none focus:ring-4 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white ring-blue-600/50' : 'bg-slate-50 border-slate-200 ring-blue-500/50'
                  }`}
                  value={filters.category}
                  onChange={(e) => onFilterChange({ ...filters, category: e.target.value as any })}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} aria-hidden="true" />
              </div>

              <button 
                onClick={handleExport}
                onMouseEnter={() => setShowExportTip(true)}
                onMouseLeave={() => setShowExportTip(false)}
                className={`p-3.5 rounded-2xl border transition-all relative focus:ring-4 outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white ring-blue-600/50' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-blue-600 ring-blue-500/50'}`}
                aria-label="Export Results as JSON"
              >
                <Download size={20} aria-hidden="true" />
                {showExportTip && <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap">Export JSON</span>}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-5 py-3.5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg active:scale-95 group focus:ring-4 focus:ring-red-500/50 outline-none"
                >
                  <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" aria-hidden="true" />
                  Clear ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
