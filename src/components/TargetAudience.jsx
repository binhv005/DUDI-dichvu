import React from 'react';
import { Megaphone, Building2, Rocket, RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TARGET_AUDIENCE_DATA } from '../data/content';

const AUDIENCE_THEMES = {
  'ads-business': {
    icon: Megaphone,
    themeClass: 'audience-theme-red',
    color: '#dc2626',
  },
  'b2b-corporate': {
    icon: Building2,
    themeClass: 'audience-theme-blue',
    color: '#2563eb',
  },
  'startup-product': {
    icon: Rocket,
    themeClass: 'audience-theme-emerald',
    color: '#059669',
  },
  'redesign-revamp': {
    icon: RefreshCw,
    themeClass: 'audience-theme-purple',
    color: '#9333ea',
  },
};

export default function TargetAudience({ onSelectPackage }) {
  const handleSelect = (e, packageId) => {
    e.preventDefault();
    if (onSelectPackage) {
      onSelectPackage(packageId);
    }
  };

  return (
    <section id="target-audience" className="section section-screen-fit bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>Dành Riêng Cho Doanh Nghiệp Bạn</span>
          </div>
          <h2 className="section-title">{TARGET_AUDIENCE_DATA.sectionTitle}</h2>
        </div>

        {/* 4 Cards Grid with distinct color themes */}
        <div className="audience-grid">
          {TARGET_AUDIENCE_DATA.items.map((item) => {
            const config = AUDIENCE_THEMES[item.id] || {
              icon: Megaphone,
              themeClass: 'audience-theme-red',
              color: '#dc2626',
            };
            const IconComponent = config.icon;

            return (
              <div key={item.id} className={`audience-card ${config.themeClass}`}>
                <div className="audience-icon-wrap">
                  <IconComponent size={22} color={config.color} />
                </div>

                <h3 className="audience-card-title">{item.title}</h3>
                <p className="audience-card-desc">{item.desc}</p>

                <div className="audience-needs-box">
                  <div className="needs-header">
                    <CheckCircle2 size={14} color={config.color} />
                    <span>Nhu cầu cốt lõi:</span>
                  </div>
                  <p className="needs-text">{item.needs}</p>
                </div>

                <div className="audience-action-box">
                  <span className="suggested-badge">Gợi ý: {item.suggestedPackage}</span>
                  <button
                    type="button"
                    onClick={(e) => handleSelect(e, item.packageId)}
                    className="audience-link-btn"
                  >
                    <span>Xem gói phù hợp</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
