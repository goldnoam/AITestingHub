
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { DetailedModal } from './components/DetailedModal';
import { AgentModal } from './components/AgentModal';
import { AdBanner } from './components/AdBanner';
import { TOOLS } from './data';
import { FilterState, Tool, Language, FontSize, AppSettings } from './types';
import { LayoutGrid, AlertCircle, Linkedin, Github, Twitter, Sparkles, Bot, Mail, Sun, Moon, Type, Globe } from 'lucide-react';

const TRANSLATIONS: Record<Language, any> = {
  en: { title: "The AI Testers", subtitle: "Tools Summary", explorer: "Tool Explorer", reset: "Reset All Parameters", found: "Resources Found", feedback: "SEND FEEDBACK", copyright: "(C) Noam Gold AI 2026", skip: "Skip to main content" },
  he: { title: "כלי הבדיקה של ה-AI", subtitle: "סיכום כלים", explorer: "סייר הכלים", reset: "אפס את כל הפרמטרים", found: "משאבים נמצאו", feedback: "שלח משוב", copyright: "(C) נועם גולד AI 2026", skip: "דלג לתוכן המרכזי" },
  zh: { title: "人工智能测试员", subtitle: "工具摘要", explorer: "工具资源管理器", reset: "重置所有参数", found: "找到的资源", feedback: "发送反馈", copyright: "(C) 诺姆·戈尔德 AI 2026", skip: "跳转到主内容" },
  hi: { title: "AI टेस्टर टूल्स", subtitle: "सारांश", explorer: "टूल एक्सפורर", reset: "सभी पैरामीटर रीसेट करें", found: "संसाधन मिले", feedback: "प्रतिक्रिया भेजें", copyright: "(C) नोम गोल्ड AI 2026", skip: "मुख्य सामग्री पर जाएं" },
  de: { title: "Die AI Tester", subtitle: "Tool-Zusammenfassung", explorer: "Tool-Explorer", reset: "Alle Parameter zurücksetzen", found: "Ressourcen gefunden", feedback: "FEEDBACK SENDEN", copyright: "(C) Noam Gold AI 2026", skip: "Zum Hauptinhalt springen" },
  es: { title: "Los AI Testers", subtitle: "Resumen de Herramientas", explorer: "Explorador de Herramientas", reset: "Restablecer todos los parámetros", found: "Recursos encontrados", feedback: "ENVIAR COMENTARIOS", copyright: "(C) Noam Gold AI 2026", skip: "Saltar al contenido principal" },
  fr: { title: "Les Testeurs AI", subtitle: "Résumé des Outils", explorer: "Explorateur d'Outils", reset: "Réinitialiser tous les paramètres", found: "Ressources trouvées", feedback: "ENVOYER UN COMMENTAIRE", copyright: "(C) Noam Gold AI 2026", skip: "Aller au contenu principal" },
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('tester-hub-settings');
    try {
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse settings from localStorage", e);
    }
    return { theme: 'dark', language: 'en', fontSize: 'md' };
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    pricing: 'All',
    selectedTags: [],
  });
  
  const [detailsTool, setDetailsTool] = useState<Tool | null>(null);
  const [agentTool, setAgentTool] = useState<Tool | null>(null);

  useEffect(() => {
    localStorage.setItem('tester-hub-settings', JSON.stringify(settings));
    document.documentElement.className = settings.theme;
    document.documentElement.dir = settings.language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = settings.language;
  }, [settings]);

  const t = TRANSLATIONS[settings.language];

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search ||
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.agentStrategy.toLowerCase().includes(searchLower) ||
        tool.frameworks.some(fw => fw.toLowerCase().includes(searchLower)) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesCategory = filters.category === 'All' || tool.category === filters.category;
      const matchesPricing = filters.pricing === 'All' || 
        (filters.pricing === 'Free/OS' && tool.isOpenSource) ||
        (filters.pricing === 'Paid' && tool.isPaid);

      const matchesTags = filters.selectedTags.length === 0 || 
        filters.selectedTags.every(tag => tool.tags.includes(tag) || tool.frameworks.includes(tag));

      return matchesSearch && matchesCategory && matchesPricing && matchesTags;
    });
  }, [filters]);

  const handleSpeak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.language;
    window.speechSynthesis.speak(utterance);
  }, [settings.language]);

  const toggleTheme = () => setSettings(s => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }));
  const changeFontSize = (size: FontSize) => setSettings(s => ({ ...s, fontSize: size }));
  const changeLanguage = (lang: Language) => setSettings(s => ({ ...s, language: lang }));

  const fontClass = settings.fontSize === 'sm' ? 'text-sm' : settings.fontSize === 'lg' ? 'text-lg' : 'text-base';

  return (
    <div className={`min-h-screen pb-20 transition-all duration-300 ${fontClass} ${settings.theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-black">
        {t.skip}
      </a>

      {/* Settings Panel */}
      <nav className="fixed top-4 right-4 z-50 flex gap-2" aria-label="Settings and Language">
        <button 
          onClick={() => { handleSpeak('Toggle theme'); toggleTheme(); }} 
          className="p-2 bg-white/10 backdrop-blur rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg focus:ring-2 focus:ring-blue-500 outline-none"
          aria-label="Toggle Dark/Light Mode"
        >
          {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div className="relative group">
          <button className="p-2 bg-white/10 backdrop-blur rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg focus:ring-2 focus:ring-blue-500 outline-none" aria-label="Change Font Size">
            <Type size={20} />
          </button>
          <div className="absolute top-full right-0 mt-2 bg-slate-800 rounded-xl border border-slate-700 p-2 hidden group-hover:flex flex-col gap-1 shadow-2xl">
            {(['sm', 'md', 'lg'] as FontSize[]).map(size => (
              <button key={size} onClick={() => changeFontSize(size)} className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${settings.fontSize === size ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <button className="p-2 bg-white/10 backdrop-blur rounded-full border border-white/20 hover:bg-white/20 transition-all shadow-lg focus:ring-2 focus:ring-blue-500 outline-none" aria-label="Change Language">
            <Globe size={20} />
          </button>
          <div className="absolute top-full right-0 mt-2 bg-slate-800 rounded-xl border border-slate-700 p-2 hidden group-hover:grid grid-cols-2 gap-1 shadow-2xl min-w-[160px]">
            {(['en', 'he', 'zh', 'hi', 'de', 'es', 'fr'] as Language[]).map(lang => (
              <button key={lang} onClick={() => changeLanguage(lang)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${settings.language === lang ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>
                {lang}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <Header t={t} />
      
      <FilterBar 
        filters={filters} 
        onFilterChange={setFilters} 
        filteredTools={filteredTools}
        settings={settings}
      />

      <main id="main-content" className="max-w-6xl mx-auto px-6 py-12">
        <AdBanner slot="header-ad" className="mb-12" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-2xl shadow-sm border ${settings.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <LayoutGrid size={24} className="text-blue-500" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">{t.explorer}</h2>
              <div className="flex items-center gap-2" aria-live="polite">
                <div className={`w-2 h-2 rounded-full ${filteredTools.length > 0 ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  {filteredTools.length} {t.found}
                </span>
              </div>
            </div>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onViewDetails={setDetailsTool}
                  onOpenAgent={setAgentTool}
                  onSpeak={handleSpeak}
                  theme={settings.theme}
                />
              ))}
            </div>
            <AdBanner slot="footer-ad" className="mt-20" />
          </>
        ) : (
          <div className={`rounded-[3rem] p-20 text-center border shadow-sm ${settings.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`} role="alert">
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className={`p-8 rounded-full mb-6 ${settings.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <AlertCircle size={56} className="text-slate-600" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">Zero tools found</h3>
              <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed">No matches for current filters.</p>
              <button 
                onClick={() => setFilters({ search: '', category: 'All', pricing: 'All', selectedTags: [] })}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-500 transition-all active:scale-95 focus:ring-4 focus:ring-blue-500/50 outline-none"
              >
                {t.reset}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 pt-20" role="contentinfo">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-t pt-16 ${settings.theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
                <Bot size={24} aria-hidden="true" />
             </div>
             <div>
                <h4 className="font-black text-sm">Tester Tools Hub</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Version 2.0 - Active Reference</p>
             </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest opacity-80">
              {t.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:goldnoamai@gmail.com" className="flex items-center gap-1.5 text-blue-500 text-[10px] font-black hover:underline tracking-widest uppercase focus:ring-2 focus:ring-blue-500 rounded outline-none">
                <Mail size={12} aria-hidden="true" /> {t.feedback}: goldnoamai@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" className={`p-3 border rounded-2xl transition-all hover:-translate-y-1 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${settings.theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600'}`}>
              <Github size={20} aria-hidden="true" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className={`p-3 border rounded-2xl transition-all hover:-translate-y-1 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${settings.theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600'}`}>
              <Twitter size={20} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/noamgold/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className={`p-3 border rounded-2xl transition-all hover:-translate-y-1 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none ${settings.theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600'}`}>
              <Linkedin size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      <DetailedModal 
        tool={detailsTool} 
        onClose={() => setDetailsTool(null)} 
        onRelatedToolClick={setDetailsTool}
        onSpeak={handleSpeak}
        theme={settings.theme}
        t={t}
      />

      <AgentModal 
        tool={agentTool}
        onClose={() => setAgentTool(null)}
        onSpeak={handleSpeak}
        theme={settings.theme}
      />
    </div>
  );
};

export default App;
