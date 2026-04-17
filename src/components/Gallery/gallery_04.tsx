import React from 'react';

interface GalleryProps {
  config: {
    theme: { primaryColor: string; borderRadius: string; };
    siteConfig: {
      gallery: {
        tag?: string;
        title?: string;
        highlight?: string;
        hint?: string;
        categories?: string[];
        items: Array<{ 
          url: string; 
          aspect?: string; 
          overlayColor?: string; 
          title?: string; 
          category?: string; 
        }>;
      };
    };
  };
}

const gallery_04: React.FC<GalleryProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  const data = siteConfig?.gallery; 

  // SAFE EXTRACTION: Helper to get image by index with professional fallbacks
  const getImage = (index: number) => {
    const url = data?.items?.[index]?.url;
    if (url) return url;
    
    // Fallbacks based on index to ensure different images if data is missing
    const fallbacks = [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5"
    ];
    return fallbacks[index] ?? fallbacks[0];
  };

  if (!data) return null;

  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-x-hidden" style={{ fontFamily: 'inherit' }}>
      <style>{`
        .stack-card {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* HEADER */}
      <div className="text-center mb-16 relative z-50 text-left">
        <h2 
          style={{ color: theme.primaryColor }}
          className="font-bold uppercase tracking-widest text-xs mb-2"
        >
          {data.tag ?? ""}
        </h2>
        <p className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-tight">
          {data.title ?? "Gallery"} <span className="italic font-light text-gray-400">{data.highlight ?? ""}</span>
        </p>
      </div>

      {/* THE STACK CONTAINER */}
      <div className="relative w-full max-w-md aspect-[3/4] group cursor-pointer">
        
        {/* CARD 1 (Bottom Left) */}
        <div className="absolute inset-0 bg-white p-4 shadow-xl stack-card group-hover:-rotate-12 group-hover:-translate-x-48 group-hover:-translate-y-12" style={{ borderRadius: theme.borderRadius }}>
          <div className="w-full h-full overflow-hidden rounded-2xl bg-gray-200">
            <img src={getImage(0)} className="w-full h-full object-cover" alt="Gallery 1" />
          </div>
        </div>

        {/* CARD 2 (Top Right) */}
        <div className="absolute inset-0 bg-white p-4 shadow-xl stack-card group-hover:rotate-6 group-hover:translate-x-40 group-hover:-translate-y-8" style={{ borderRadius: theme.borderRadius }}>
          <div className="w-full h-full overflow-hidden rounded-2xl bg-gray-200">
            <img src={getImage(1)} className="w-full h-full object-cover" alt="Gallery 2" />
          </div>
        </div>

        {/* CARD 3 (Bottom Center) */}
        <div className="absolute inset-0 bg-white p-4 shadow-xl stack-card group-hover:-rotate-3 group-hover:-translate-x-8 group-hover:translate-y-40" style={{ borderRadius: theme.borderRadius }}>
          <div className="w-full h-full overflow-hidden rounded-2xl bg-gray-200">
            <img src={getImage(2)} className="w-full h-full object-cover" alt="Gallery 3" />
          </div>
        </div>

        {/* CARD 4 (Main Top Card) */}
        <div className="absolute inset-0 bg-white p-4 shadow-2xl stack-card group-hover:rotate-3 group-hover:scale-105" style={{ borderRadius: theme.borderRadius }}>
          <div className="w-full h-full overflow-hidden rounded-2xl bg-gray-300">
            <img src={getImage(3)} className="w-full h-full object-cover" alt="Gallery 4" />
          </div>
          <div className="mt-4 flex justify-between items-center text-left">
            <span 
              style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
              className="text-xs px-2 py-1 rounded-full font-bold uppercase"
            >
              {data.items?.[3]?.title ?? 'Featured'}
            </span>
          </div>
        </div>

      </div>

      {/* HINT FOOTER */}
      <div className="mt-48 text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px] animate-pulse">
        {data.hint ?? "Hover to explore"}
      </div>

    </section>
  );
};

export default gallery_04;