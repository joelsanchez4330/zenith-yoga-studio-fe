import React, { useState } from 'react';

interface CTAProps {
  config: {
    theme: { 
      primaryColor: string; 
      secondaryColor: string; 
      borderRadius: string;
      fontFamily?: string; 
    };
    siteConfig: {
      cta: {
        topTitle?: string;
        mainTitle?: string;
        highlight?: string;
        subtitle?: string;
        primaryBtn?: string;
        secondaryBtn?: string;
        // cta_02 fields included in interface for universal compatibility
        tag?: string;
        line1?: string;
        buttonText?: string;
      };
    };
  };
}

const cta_01: React.FC<CTAProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  const cta = siteConfig?.cta; // Added ?. for safety
  
  const [isHovered, setIsHovered] = useState(false);

  // If the cta object is missing entirely, don't crash the build
  if (!cta) return null;

  return (
    <section className="py-24 px-6 bg-white" style={{ fontFamily: theme.fontFamily }}>
      <div className="max-w-7xl mx-auto">
        
        <div 
          style={{ 
            backgroundColor: theme.secondaryColor, 
            borderRadius: theme.borderRadius 
          }}
          className="relative overflow-hidden p-12 md:p-24 text-center shadow-2xl"
        >
          
          {/* AMBIENT GLOWS */}
          <div 
            style={{ backgroundColor: theme.primaryColor }}
            className="absolute top-0 left-0 w-64 h-64 opacity-20 blur-[100px] -translate-x-1/2 -translate-y-1/2"
          ></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Top Tagline - Added fallback ?? "" */}
            <h2 
              style={{ color: theme.primaryColor }}
              className="font-bold uppercase tracking-[0.3em] text-xs mb-6"
            >
              {cta.topTitle ?? ""}
            </h2>

            {/* Main Heading - Added fallback ?? "" */}
            <p className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
              {cta.mainTitle ?? ""} <br />
              <span className="text-gray-500 italic font-light">{cta.highlight ?? ""}</span>
            </p>

            {/* Subtitle - Added fallback ?? "" */}
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
              {cta.subtitle ?? ""}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ 
                  backgroundColor: theme.primaryColor,
                  borderRadius: '9999px',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isHovered ? `0 0 40px ${theme.primaryColor}66` : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="group relative px-10 py-5 text-white font-black"
              >
                {/* Fallback to "Get Started" if button text is missing */}
                {cta.primaryBtn ?? "Get Started"}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>

              <a 
                href="#" 
                className="text-white font-bold border-b-2 border-white/10 hover:border-white transition-all pb-1"
                style={{ borderColor: isHovered ? theme.primaryColor : 'rgba(255,255,255,0.1)' }}
              >
                {/* Fallback to "Contact Us" */}
                {cta.secondaryBtn ?? "Contact Us"}
              </a>
            </div>
          </div>

          <div 
            style={{ background: `linear-gradient(to right, transparent, ${theme.primaryColor}80, transparent)` }}
            className="absolute bottom-0 left-0 right-0 h-[1px]"
          ></div>
        </div>

      </div>
    </section>
  );
};

export default cta_01;