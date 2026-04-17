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

const features_04: React.FC<FeaturesProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  const features = siteConfig?.features;
  const items = features?.items ?? [];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!features) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      {/* Header section with safe string fallbacks */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <span style={{ color: theme.primaryColor }} className="uppercase tracking-widest font-bold text-sm">
          {features.topTitle ?? ""}
        </span>
        <h2 className="text-5xl font-black mt-4 text-slate-950">
          {features.mainTitle ?? ""}
        </h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {items.map((item, idx) => {
          const stickyTop = 24 + idx * 8;
          
          // SAFE SPLIT: Ensure title and highlight are strings
          const titleText = item?.title ?? "";
          const highlightText = item?.highlight ?? "";
          const titleParts = titleText.split(highlightText);

          return (
            <div
              key={idx}
              className={`sticky border p-8 md:p-16 shadow-xl flex flex-col items-center gap-12 group transition-all duration-500 
                ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              
              style={{
                top: `${stickyTop}px`,
                backgroundColor: item?.dark ? (theme.secondaryColor || '#111') : '#ffffff',
                borderColor: item?.dark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                color: item?.dark ? '#ffffff' : '#0f172a',
                borderRadius: theme.borderRadius,
              }}
            >
              {/* TEXT BLOCK */}
              <div className="w-full md:w-1/2 space-y-6">
                <span 
                  style={{ color: item?.dark ? '#fff' : theme.primaryColor }}
                  className="font-bold tracking-widest uppercase text-xs opacity-80"
                >
                  {item?.step || item?.tag || `Step 0${idx + 1}`}
                </span>
                
                <h3 className="text-4xl font-black tracking-tight leading-tight">
                  {highlightText ? (
                    <>
                      {titleParts[0]}
                      <span style={{ color: theme.primaryColor }}>{highlightText}</span>
                      {titleParts[1]}
                    </>
                  ) : titleText}
                </h3>
                
                <p className={`${item?.dark ? 'text-slate-400' : 'text-slate-500'} text-lg leading-relaxed`}>
                  {item?.desc ?? ""}
                </p>

                {item?.cta && (
                  <button 
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{ 
                      backgroundColor: hoveredIdx === idx ? theme.primaryColor : (item?.dark ? '#fff' : theme.primaryColor),
                      color: hoveredIdx === idx ? '#fff' : (item?.dark ? '#000' : '#fff'),
                      borderRadius: '9999px',
                      transition: 'all 0.3s ease'
                    }}
                    className="px-8 py-3 font-bold shadow-lg"
                  >
                    {item.cta}
                  </button>
                )}
              </div>

              {/* IMAGE BLOCK */}
              <div 
                className={`w-full md:w-1/2 overflow-hidden aspect-video shadow-inner rounded-2xl`}
                style={{ backgroundColor: item?.dark ? '#1e293b' : '#f1f5f9' }}
              >
                <img 
                  src={item?.imageUrl || item?.image || "https://images.unsplash.com/photo-1497215728101-856f4ea42174"} 
                  alt={item?.title ?? "feature"}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${item?.dark ? 'opacity-80' : 'opacity-100'}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default features_04;