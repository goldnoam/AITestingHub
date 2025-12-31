
import React from 'react';
import { 
  Shield, 
  Zap, 
  Bot, 
  Settings, 
  Code2, 
  CheckCircle2,
  Lock,
  Eye
} from 'lucide-react';

export const InfographicSummary: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 mb-16">
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-12 shadow-xl overflow-hidden">
        {/* Main Title */}
        <h2 className="text-3xl md:text-5xl font-black text-center text-[#1e293b] mb-12">
          AI Tools for Software Testers: <span className="text-[#0f172a]">Open-Source vs. Paid</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Vertical Divider Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dotted border-slate-300 -translate-x-1/2" />

          {/* Left Column: Open-Source Tools */}
          <div className="space-y-6">
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-3xl p-6 md:p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#22c55e] text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold shadow-md shadow-emerald-200">
                  <Settings size={18} /> Open-Source Tools
                </div>
              </div>

              {/* Evaluation & LLM Testing */}
              <div className="bg-[#dcfce7] rounded-2xl p-4 mb-6">
                <h3 className="text-center font-black text-[#166534] mb-4 text-lg">AI Evaluation & LLM Testing</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'DeepEval', desc: 'LLM unit tests' },
                    { name: 'Promptfoo', desc: 'Red-teaming' },
                    { name: 'Ragas', desc: 'Benchmarks' },
                    { name: 'Red-team', desc: 'Simulations' },
                    { name: 'Ragas', desc: 'RAG quality' },
                    { name: 'OpenAI', desc: 'Model benchmarks' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[#bbf7d0] flex flex-col items-center text-center shadow-sm">
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation & Web Testing */}
              <div className="bg-[#dcfce7] rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute top-2 right-4 opacity-20"><Bot size={40} className="text-[#166534]" /></div>
                <h3 className="text-center font-black text-[#166534] mb-4 text-lg">Automation & Web Testing</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Selenium', desc: 'w/ Agents' },
                    { name: 'Playwright', desc: 'AI wrappers' },
                    { name: 'AI wrappers', desc: 'AI plugins' },
                    { name: 'Appium', desc: 'Mobile Agent' },
                    { name: 'Robot FW', desc: 'Keyword-driven' },
                    { name: 'Cypress', desc: 'Browser E2E' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[#bbf7d0] flex flex-col items-center text-center shadow-sm">
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Paid Tools */}
          <div className="space-y-6">
            <div className="bg-[#f5f3ff] border border-[#ddd6fe] rounded-3xl p-6 md:p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#6366f1] text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold shadow-md shadow-indigo-200">
                  <Shield size={18} /> Paid (Enterprise) Tools
                </div>
              </div>

              {/* Intelligent Automation Platforms */}
              <div className="bg-[#ede9fe] rounded-2xl p-4 mb-6">
                <h3 className="text-center font-black text-[#4338ca] mb-4 text-lg">Intelligent Automation Platforms</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'testRigor', desc: 'Plain English tests' },
                    { name: 'Mabl', desc: 'Auto-healing, visual' },
                    { name: 'Katalon Studio', desc: 'AI-powered stability' },
                    { name: 'Testim (by Tricentis)', desc: 'AI-powered stability' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[#ddd6fe] flex flex-col items-center text-center shadow-sm">
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual AI & Experience Testing */}
              <div className="bg-[#ede9fe] rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute top-2 right-4 opacity-20"><Eye size={40} className="text-[#4338ca]" /></div>
                <h3 className="text-center font-black text-[#4338ca] mb-4 text-lg">Visual AI & Experience Testing</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Applitools', desc: 'Visual AI' },
                    { name: 'Percy (BrowserStack)', desc: 'Visual AI' },
                    { name: 'Reflect', desc: 'Visual review pipelines' },
                    { name: 'Visual AI', desc: 'Self-healing' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-[#ddd6fe] flex flex-col items-center text-center shadow-sm">
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section Table */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-widest">Comparison Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[#f1f5f9] text-[#1e293b]">
                  <th className="p-4 border border-slate-200 font-black text-lg">Cost</th>
                  <th className="p-4 border border-slate-200 text-[#22c55e] font-black text-2xl">FREE</th>
                  <th className="p-4 border border-slate-200 text-[#1e293b] font-black text-xl">Open-Source</th>
                  <th className="p-4 border border-slate-200 text-[#1e293b] font-black text-xl">Data Privacy</th>
                  <th className="p-4 border border-slate-200 text-[#ef4444] font-black text-xl">$$$ (Per user/run)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-6 border border-slate-200 font-bold text-slate-500 uppercase text-xs tracking-widest">Feature</td>
                  <td className="p-6 border border-slate-200 font-bold text-slate-700">Manual; Community</td>
                  <td className="p-6 border border-slate-200 font-bold text-slate-700">High (On-premise)</td>
                  <td className="p-6 border border-slate-200 font-bold text-slate-700">Moderate (Cloud)</td>
                  <td className="p-6 border border-slate-200 font-bold text-slate-700">For QA/Manual Testers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Choice Recommendation Footer */}
        <div className="mt-12 bg-[#3b82f6] rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-blue-100">
          <h3 className="text-center font-black text-2xl mb-8">Which should you choose?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-2xl shrink-0"><CheckCircle2 size={24} /></div>
              <div>
                <p className="font-black text-lg mb-1">Open-Source:</p>
                <p className="text-blue-50/90 text-sm leading-relaxed">For building AI products & dev-centric teams (DeepEval, Playwright).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-2xl shrink-0"><Zap size={24} /></div>
              <div>
                <p className="font-black text-lg mb-1">Paid:</p>
                <p className="text-blue-50/90 text-sm leading-relaxed">For corporate QA, fast automation & low-maintenance (testRigor, Mabl, Applitools).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
