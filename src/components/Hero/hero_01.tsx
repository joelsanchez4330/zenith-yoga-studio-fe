import React, { useState } from 'react';

interface HeroProps {
  config: {
    theme: { primaryColor: string; secondaryColor: string; fontFamily: string; borderRadius: string; };
    company: { name: string; logoUrl: string; };
    siteConfig: {
      hero: {
        title: string;
        highlightWord?: string;
        subtitle?: string;
        cta01Text?: string;
        cta02Text?: string;
        imageUrl?: string;
        gallery?: string[];
        sizes?: { titleFont?: string; subtitleFont?: string; buttonPadding?: string; buttonFontSize?: string; imageHeight?: string; imageMaxWidth?: string; };
      };
    };
  };
}

const hero_01: React.FC<HeroProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  const hero = siteConfig?.hero;
  
  // SAFE FALLBACKS: We define these at the top so the HTML part is clean
  const sizes = hero?.sizes;
  const title = hero?.title ?? "Welcome";
  const highlight = hero?.highlightWord ?? "";
  const subtitle = hero?.subtitle ?? "";

  const [isHovered, setIsHovered] = useState(false);

  // If there is no hero data at all, don't crash, just show nothing
  if (!hero) return null;

  return (
    <main className="w-full flex flex-col min-h-screen" style={{ fontFamily: theme.fontFamily }}>
      
      <header className="w-full bg-white shadow-sm flex items-center justify-center p-6 border-b border-gray-100">
        <div style={{ backgroundColor: theme.primaryColor }} 
        className="flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-xl shadow-md">
          {config.company?.name?.substring(0,2).toUpperCase() || "GH"}
        </div>
      </header>
      
      <section className="flex-grow flex items-center justify-center py-16 px-4 md:px-12 lg:px-24">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* SAFE SPLIT: We use the "title" and "highlight" variables we made safe above */}
            <h1 
              style={{ fontSize: sizes?.titleFont ?? '48px' }}
              className="font-extrabold text-gray-950 mb-6 leading-tight tracking-tight"
            >
              {title.split(highlight)[0]}
              <span style={{ color: theme.primaryColor }}>{highlight}</span>
              {title.split(highlight)[1]}
            </h1>
            
            <p 
              style={{ fontSize: sizes?.subtitleFont ?? '18px' }}
              className="text-gray-600 font-normal mb-10 max-w-xl md:max-w-full mx-auto md:mx-0 leading-relaxed"
            >
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                  backgroundColor: isHovered ? theme.primaryColor : theme.secondaryColor, 
                  fontSize: sizes?.buttonFontSize ?? '16px',
                  padding: sizes?.buttonPadding ?? '12px 24px',
                  borderRadius: theme.borderRadius 
                }}
                className="inline-flex justify-center items-center text-white font-semibold transition-colors duration-300 shadow-lg hover:opacity-90"
              >
                {hero.cta01Text ?? "Learn More"}
              </a>
              
              <a 
                href="#" 
                style={{ 
                  fontSize: sizes?.buttonFontSize ?? '16px',
                  padding: sizes?.buttonPadding ?? '12px 24px',
                  borderRadius: theme.borderRadius 
                }}
                className="inline-flex justify-center items-center bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition-colors duration-300"
              >
                {hero.cta02Text ?? "Contact Us"}
              </a>
            </div>
          </div>

          <div 
            style={{ 
              height: sizes?.imageHeight ?? '500px', 
              maxWidth: sizes?.imageMaxWidth ?? '100%',
              borderRadius: theme.borderRadius 
            }}
            className="relative w-full mx-auto md:ml-auto md:mr-0 overflow-hidden shadow-2xl border-4 border-white"
          >
            <img 
              src={hero.imageUrl ?? "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"} 
              alt="Hero Visual" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>
      </section>
    </main>
  );
};

export default hero_01;