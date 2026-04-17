import React from 'react';
import * as LucideIcons from 'lucide-react';

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

const features_01: React.FC<FeaturesProps> = ({ config }) => {
  const { theme, siteConfig } = config;
  
  // SAFE EXTRACTION: Use the ?? fallback to ensure 'features' is never null
  const features = siteConfig?.features;

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.HelpCircle size={24} />;
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent size={24} color={theme.primaryColor} />;
    }
    return <LucideIcons.HelpCircle size={24} />;
  };

  // If features object is totally missing, return null safely
  if (!features) return null;

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block - Added ?? "" fallbacks */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 
            style={{ color: theme.primaryColor }}
            className="font-bold tracking-widest uppercase text-sm mb-4"
          >
            {features.topTitle ?? ""}
          </h2>
          <p className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            {features.mainTitle ?? ""}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ensure items is always an array */}
          {(features.items ?? []).map((item, idx) => (
            <div 
              key={idx}
              style={{ borderRadius: theme.borderRadius }}
              className="group p-8 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl transition-all duration-300"
            >
              <div 
                style={{ borderRadius: '12px' }}
                className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-opacity-100 transition-colors"
              >
                <div className="group-hover:text-white transition-colors duration-300">
                  {renderIcon(item.icon)}
                </div>
              </div>

              {/* Added ?? "" for title and desc */}
              <h3 className="text-xl font-bold text-gray-950 mb-3">
                {item.title ?? ""}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc ?? ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .group:hover {
          box-shadow: 0 25px 50px -12px ${theme.primaryColor}20 !important;
        }
        .group:hover .w-12 {
          background-color: ${theme.primaryColor} !important;
        }
        .group:hover svg {
          color: white !important;
        }
      `}</style>
    </section>
  );
};

export default features_01;