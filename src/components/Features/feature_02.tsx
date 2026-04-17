import React, { useState } from 'react';

interface FeaturesProps {
  config: {
    theme: { primaryColor: string; borderRadius: string; secondaryColor?: string; };
    siteConfig: {
      features: {
        tag?: string;
        topTitle?: string;
        mainTitle?: string;
        highlightWord?: string;
        items: Array<{
          title: string;
          desc: string;
          image?: string; 
          icon?: string;
          tag?: string;
          highlight?: string; 
          list?: string[];    
          cta?: string;
          imageUrl?: string;
          dark?: boolean; 
          step?: string; 
        }>;
      };
    };
  };
}

const features_02: React.FC<FeaturesProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  
  // SAFE EXTRACTION
  const features = siteConfig?.features;
  const items = features?.items ?? []; 

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!features) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto space-y-32">
        {items.map((row, idx) => {
          const isReversed = idx % 2 !== 0;

          // SAFE SPLIT: Ensuring these are always strings
          const titleText = row?.title ?? "";
          const highlightText = row?.highlight ?? "";
          const titleParts = titleText.split(highlightText);

          return (
            <div 
              key={idx} 
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* TEXT BLOCK */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div 
                  style={{ 
                    backgroundColor: `${theme.primaryColor}10`, 
                    color: theme.primaryColor 
                  }}
                  className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  {row?.tag ?? "Feature"}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-950">
                  {titleParts[0]}
                  <span style={{ color: theme.primaryColor }}>{highlightText}</span>
                  {titleParts[1]}
                </h2>
                
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  {row?.desc ?? ""}
                </p>

                {row?.list && (
                  <ul className="space-y-3">
                    {(row.list ?? []).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <span style={{ color: theme.primaryColor }}>✓</span> {item ?? ""}
                      </li>
                    ))}
                  </ul>
                )}

                {row?.cta && (
                  <button 
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{ 
                      backgroundColor: hoveredIdx === idx ? theme.primaryColor : (theme.secondaryColor || theme.primaryColor),
                      borderRadius: theme.borderRadius,
                      transition: 'all 0.3s ease'
                    }}
                    className="px-6 py-3 text-white font-bold shadow-lg"
                  >
                    {row.cta}
                  </button>
                )}
              </div>
              
              {/* IMAGE BLOCK */}
              <div 
                className={`w-full lg:w-1/2 rounded-[2.5rem] p-4 lg:p-8 border border-slate-200 shadow-inner`}
                style={{ backgroundColor: isReversed ? '#eff6ff' : '#f8fafc' }}
              >
                <img 
                  src={row?.imageUrl || row?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c"} 
                  alt={row?.tag || "feature image"} 
                  style={{ borderRadius: theme.borderRadius }}
                  className="shadow-2xl border border-white w-full object-cover max-h-[500px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default features_02;