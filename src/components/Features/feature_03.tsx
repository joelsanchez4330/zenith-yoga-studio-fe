import React from 'react';

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

const features_03: React.FC<FeaturesProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  
  // SAFE EXTRACTION
  const features = siteConfig?.features;
  const items = features?.items ?? [];

  // Helper to safely get items by index with fallbacks
  const getItem = (index: number) => {
    const item = items[index];
    return {
      title: item?.title ?? "Feature",
      desc: item?.desc ?? "Detailed description coming soon.",
      image: item?.imageUrl || item?.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500"
    };
  };

  if (!features) return null;

  // SAFE TITLE LOGIC
  const mainTitle = features.mainTitle ?? "";
  const highlight = features.highlightWord ?? "";
  const titleParts = mainTitle.split(highlight);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white" style={{ fontFamily: 'inherit' }}>
      <style>{`
        .bento-card { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
        .bento-card:hover { transform: translateY(-5px); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* HEADER - Safe strings */}
        <div className="mb-16">
          <h2 
            style={{ color: theme.primaryColor }}
            className="font-bold uppercase tracking-widest text-sm mb-3"
          >
            {features.topTitle ?? ""}
          </h2>
          <p className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            {titleParts[0]} <br />
            <span className="text-gray-400">{highlight}</span>
            {titleParts[1]}
          </p>
        </div>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[700px]">
          
          {/* CARD 1: LARGE */}
          <div 
            style={{ borderRadius: theme.borderRadius }}
            className="md:col-span-4 bg-white border border-gray-200 p-8 md:p-12 flex flex-col justify-between overflow-hidden relative bento-card shadow-sm"
          >
            <div className="relative z-20 max-w-sm md:max-w-md">
              <h3 className="text-3xl font-bold mb-4">{getItem(0).title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">{getItem(0).desc}</p>
            </div>
            <div className="relative md:absolute -bottom-6 -right-6 w-full md:w-[65%] mt-8 z-10">
              <img 
                src={getItem(0).image} 
                style={{ borderRadius: theme.borderRadius }}
                className="shadow-2xl border-l-4 border-t-4 border-gray-100 object-cover" 
                alt="Feature"
              />
            </div>
          </div>

          {/* CARD 2: DARK */}
          <div 
            style={{ backgroundColor: theme.secondaryColor ?? '#111827', borderRadius: theme.borderRadius }}
            className="md:col-span-2 p-8 flex flex-col justify-between bento-card text-white overflow-hidden relative"
          >
            <div className="relative z-20">
              <h3 className="text-2xl font-bold mb-4">{getItem(1).title}</h3>
              <p className="text-slate-400 leading-relaxed">{getItem(1).desc}</p>
            </div>
            <div style={{ backgroundColor: theme.primaryColor }} className="absolute -bottom-10 -left-10 w-40 h-40 opacity-20 blur-[60px]"></div>
            <div className="relative z-10 self-end">
              <img src={getItem(1).image} className="w-20 h-20 object-contain opacity-50 rounded-lg" alt="" />
            </div>
          </div>

          {/* CARD 3: PRIMARY */}
          <div 
            style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }}
            className="md:col-span-3 p-8 flex items-center justify-between bento-card text-white shadow-lg"
          >
            <div className="max-w-[200px]">
              <h3 className="text-2xl font-bold mb-2">{getItem(2).title}</h3>
              <p className="text-white/80 text-sm">{getItem(2).desc}</p>
            </div>
            <div className="w-24 h-12 bg-white/20 rounded-full flex items-center px-1">
              <div className="w-10 h-10 bg-white rounded-full shadow-lg translate-x-12"></div>
            </div>
          </div>

          {/* CARD 4: SMALL WHITE */}
          <div 
            style={{ borderRadius: theme.borderRadius }}
            className="md:col-span-3 bg-white border border-gray-200 p-8 bento-card shadow-sm hover:shadow-xl flex items-center gap-6"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
               <img src={getItem(3).image} className="w-full h-full object-cover" alt="" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{getItem(3).title}</h3>
              <p className="text-gray-500 text-sm">{getItem(3).desc}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default features_03;