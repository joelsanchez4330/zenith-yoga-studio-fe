import React from 'react';

interface GalleryProps {
  config: {
    theme: { primaryColor: string; borderRadius: string; };
    siteConfig: {
      gallery: {
        tag?: string;
        title?: string;
        highlight?: string;
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

const gallery_01: React.FC<GalleryProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  
  // SAFE EXTRACTION
  const data = siteConfig?.gallery;

  // If gallery data is totally missing, return null safely
  if (!data) return null;

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      {/* HEADER SECTION */}
      <header className="max-w-[1400px] mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div>
          <h2 
            style={{ color: theme.primaryColor }}
            className="font-bold uppercase tracking-widest text-xs mb-2"
          >
            {data.tag ?? ""}
          </h2>
          <p className="text-5xl md:text-7xl font-black tracking-tighter text-slate-950">
            {data.title ?? "Gallery"} <span className="text-gray-300 italic font-light">{data.highlight ?? ""}</span>
          </p>
        </div>

        {/* CATEGORY FILTERS - Added fallback ?? [] */}
        <div className="flex flex-wrap gap-3">
          {(data.categories ?? []).map((cat, i) => (
            <button 
              key={i}
              className="px-6 py-2 rounded-full border border-gray-200 font-bold text-sm hover:bg-black hover:text-white transition-all duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* MASONRY GRID - Added fallback ?? [] for items */}
      <div className="max-w-[1400px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
        {(data.items ?? []).map((item, idx) => (
          <div key={idx} className="break-inside-avoid mb-8">
            <div 
              style={{ borderRadius: theme.borderRadius }}
              className={`group relative overflow-hidden bg-gray-100 ${item?.aspect ?? 'aspect-square'} shadow-sm hover:shadow-2xl transition-all duration-500`}
            >
              <img 
                src={`${item?.url ?? "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"}?auto=format&fit=crop&w=800&q=80`} 
                alt={item?.title ?? "Gallery Image"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* HOVER OVERLAY */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white text-left"
                style={{ backgroundColor: `${item?.overlayColor ?? theme.primaryColor}E6` }} 
              >
                <span className="text-xs font-bold uppercase tracking-widest mb-1">
                  {item?.category ?? ""}
                </span>
                <h3 className="text-2xl font-black">
                  {item?.title ?? ""}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default gallery_01;