
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  theme: 'light' | 'dark';
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, theme, format = 'auto', className = "" }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const isDark = theme === 'dark';

  return (
    <div 
      className={`w-full overflow-hidden my-12 flex flex-col items-center rounded-3xl border transition-all duration-300 ${
        isDark 
          ? 'bg-slate-900/40 border-slate-800/50 shadow-inner' 
          : 'bg-slate-100/50 border-slate-200/50'
      } ${className}`} 
      aria-hidden="true"
    >
      <div className={`text-[9px] font-black uppercase tracking-[0.2em] py-2 px-4 mb-2 opacity-30 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Advertisement
      </div>
      <div className="w-full max-w-4xl px-4 pb-4">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client="ca-pub-0274741291001288"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};
