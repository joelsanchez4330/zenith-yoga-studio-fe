import React, { useState, useEffect } from 'react';

// UNIVERSAL HERO PROPS - Copy this to all Hero files
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
        gallery?: string[]; // Added ? here for safety
        sizes?: { 
          titleFont?: string; 
          subtitleFont?: string; 
          buttonPadding?: string; 
          buttonFontSize?: string; 
          imageHeight?: string; 
          imageMaxWidth?: string; 
        };
      };
    };
  };
}

const Hero_03: React.FC<HeroProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  const hero = siteConfig?.hero;
  
  // SAFE FALLBACKS - This prevents the "split" and "map" crashes
  const sizes = hero?.sizes;
  const gallery = hero?.gallery ?? [];
  const highlight = hero?.highlightWord ?? "";
  const title = hero?.title ?? "";

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    if (gallery.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, gallery.length]);

  if (!hero) return null;

  return (
    <main className="w-full flex flex-col min-h-screen" style={{ fontFamily: theme.fontFamily }}>
      <style>{`
        .react-fade-anim { animation: fadeIn 0.4s ease-in-out forwards; }
        @keyframes fadeIn { 0% { opacity: 0.8; transform: scale(0.98); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
      
      <header className="w-full bg-white shadow-sm flex items-center justify-center p-6 border-b border-gray-100 relative z-50">
        <div style={{ backgroundColor: theme.primaryColor }} className="flex items-center justify-center w-14 h-14 rounded-full text-white font-bold text-xl shadow-md">
          {config.company?.name?.substring(0,2).toUpperCase() || "GH"}
        </div>
      </header>

      <section className="flex-grow flex items-center justify-center py-16 px-4 md:px-12 lg:px-24">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* IMAGE SECTION - Added ?. and ?? safety */}
          <div style={{ height: sizes?.imageHeight ?? '500px' }} className="relative w-full lg:col-span-7 lg:order-1 order-2 overflow-hidden px-8 md:px-12 flex items-center justify-center group">
            <div className="relative w-full h-full flex items-center gap-4 justify-center">
              <div 
                style={{ borderRadius: theme.borderRadius, maxWidth: sizes?.imageMaxWidth ?? '100%' }}
                className="relative w-[85%] h-full overflow-hidden shadow-2xl border-4 border-white z-10 bg-gray-200"
              >
                {gallery.length > 0 && (
                  <img 
                    key={currentIndex} 
                    src={gallery[currentIndex]} 
                    className="absolute inset-0 w-full h-full object-cover react-fade-anim" 
                    alt="Hero"
                  />
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            {gallery.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute left-4 z-30 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextSlide} className="absolute right-4 z-30 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>

          {/* TEXT SECTION - Fixed the .split() crash */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:col-span-5 lg:order-2 order-1">
            <h1 style={{ fontSize: sizes?.titleFont ?? '48px' }} className="font-extrabold text-gray-950 mb-6 leading-tight tracking-tight">
              {title.split(highlight)[0]}
              <span style={{ color: theme.primaryColor }}>{highlight}</span>
              {title.split(highlight)[1]}
            </h1>
            <p style={{ fontSize: sizes?.subtitleFont ?? '18px' }} className="text-gray-600 font-normal mb-10 max-w-xl mx-auto lg:mx-0">
              {hero.subtitle ?? ""}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                style={{ 
                  backgroundColor: theme.primaryColor,
                  fontSize: sizes?.buttonFontSize ?? '16px',
                  padding: sizes?.buttonPadding ?? '12px 24px',
                  borderRadius: theme.borderRadius 
                }}
                className="text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
              >
                {hero.cta01Text ?? "Get Started"}
              </button>
              <button 
                style={{ 
                  fontSize: sizes?.buttonFontSize ?? '16px', 
                  padding: sizes?.buttonPadding ?? '12px 24px', 
                  borderRadius: theme.borderRadius 
                }}
                className="bg-gray-100 text-gray-900 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {hero.cta02Text ?? "Learn More"}
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Hero_03;