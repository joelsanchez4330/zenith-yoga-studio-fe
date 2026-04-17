import React from 'react';

interface FooterProps {
  config: {
    theme: { 
        primaryColor: string; 
        secondaryColor: string; 
        borderRadius: string; 
    };
    company: { name: string; };
    siteConfig: {
      footer: {
        socials?: Array<{ label?: string; url?: string }>;
        companyDesc?: string;
        ghostText?: string;
        columns?: Array<{
          title?: string;
          links: Array<{ label?: string; url?: string; italic?: boolean }>;
        }>;
        title?: string;
        highlight?: string;
        subtitle?: string;
        placeholder?: string;
        buttonText?: string;
      };
    };
  };
}

const footer_01: React.FC<FooterProps> = ({ config }) => {
  const { theme, company, siteConfig } = config;
  const footer = siteConfig?.footer;

  // SAFE BRAND LOGIC
  const companyName = company?.name ?? "Studio";
  const nameParts = companyName.split(' ');
  const firstName = nameParts[0] ?? "Studio";
  const secondName = nameParts.slice(1).join(' ') ?? "";

  // If footer data is totally missing, return null safely
  if (!footer) return null;

  return (
    <footer 
      style={{ backgroundColor: theme.secondaryColor ?? '#111827' }} 
      className="text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          
          {/* BRAND COLUMN */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div 
              style={{ color: theme.primaryColor }}
              className="text-3xl font-black tracking-tighter uppercase"
            >
              {firstName} 
              <span className="text-white font-light italic lowercase"> {secondName}</span>
            </div>
            <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
              {footer.companyDesc ?? ""}
            </p>
            
            {/* SOCIAL ICONS - Safe map and substring */}
            <div className="flex gap-4">
              {(footer.socials ?? []).map((social, i) => {
                const label = social?.label ?? "Social";
                return (
                  <a 
                    key={i} 
                    href={social?.url ?? "#"} 
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors text-[10px] font-bold uppercase tracking-tighter"
                    style={{ border: `1px solid ${theme.primaryColor}20` }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.primaryColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  >
                    {label.substring(0, 2)}
                  </a>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC COLUMNS - Safe nested maps */}
          {(footer.columns ?? []).map((col, idx) => (
            <div key={idx}>
              <h4 
                style={{ color: theme.primaryColor }}
                className="font-bold uppercase tracking-widest text-[10px] mb-6"
              >
                {col?.title ?? "Links"}
              </h4>
              <ul className="space-y-4 text-gray-400 font-medium text-sm">
                {(col?.links ?? []).map((link, lIdx) => (
                  <li key={lIdx}>
                    <a 
                      href={link?.url ?? "#"} 
                      className={`hover:text-white transition-all duration-300 ${link?.italic ? 'italic font-serif' : ''}`}
                    >
                      {link?.label ?? "Link"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM GHOST TEXT & COPYRIGHT */}
        <div className="border-t border-white/5 pt-12">
          <h2 className="text-[15vw] font-black tracking-tighter leading-none text-white/5 pointer-events-none select-none -mb-6 lg:-mb-12 uppercase whitespace-nowrap">
            {footer.ghostText || companyName}
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500 gap-4">
            <p>© 2026 {companyName.toUpperCase()} STUDIO</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default footer_01;