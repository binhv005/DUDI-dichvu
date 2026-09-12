import React from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { PRICING_DATA } from '../data/content';

const PACKAGE_METADATA = {
  basic: {
    img: '/pricing_basic.webp',
    code: 'STARTER',
    lineColor: '#2563eb',
  },
  standard: {
    img: '/pricing_standard.webp',
    code: 'STANDARD',
    lineColor: '#e51b24',
  },
  premium: {
    img: '/pricing_premium.webp',
    code: 'PREMIUM',
    lineColor: '#1d4ed8',
  },
};

export default function Pricing({ onSelectPackage }) {
  const handlePackageClick = (e, packageId) => {
    e.preventDefault();
    if (onSelectPackage) {
      onSelectPackage(packageId);
    }
  };

  return (
    <section id="pricing" className="section section-pricing-screen-fit">
      <div className="container">
        {/* Section Header */}
        <div className="section-header pricing-header-compact">
          <div className="section-tag">
            <Zap size={13} color="#e51b24" />
            <span>Báo Giá Minh Bạch</span>
          </div>
          <h2 className="section-title pricing-compact-title">{PRICING_DATA.sectionTitle}</h2>
        </div>

        {/* 3 Pill Pricing Cards */}
        <div className="pricing-pill-grid">
          {PRICING_DATA.packages.map((pkg) => {
            const isPopular = pkg.isPopular;
            const meta = PACKAGE_METADATA[pkg.id] || {
              img: '/pricing_basic.webp',
              code: pkg.id.toUpperCase(),
              lineColor: '#2563eb',
            };

            return (
              <div
                key={pkg.id}
                className={`pricing-pill-card ${isPopular ? 'pricing-pill-popular' : ''}`}
              >
                {/* Popular Ribbon/Badge */}
                {isPopular && (
                  <div className="pricing-popular-pill-badge">
                    <Sparkles size={11} />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Top Illustration Image */}
                <div className="pricing-pill-illustration">
                  <img
                    src={meta.img}
                    alt={pkg.name}
                    className="pricing-pill-img"
                    loading="lazy"
                  />
                </div>

                {/* Title & Underline Bar */}
                <div className="pricing-pill-title-wrap">
                  <div className="pricing-pill-code">{meta.code}</div>
                  <div className="pricing-pill-subname">{pkg.name}</div>
                  <div
                    className="pricing-pill-divider"
                    style={{ backgroundColor: meta.lineColor }}
                  />
                </div>

                {/* Features List */}
                <div className="pricing-pill-features">
                  {pkg.features.slice(0, 5).map((feat, index) => (
                    <div key={index} className="pricing-pill-feature-item">
                      <span className="pill-check-icon">✓</span>
                      <div className="pill-feature-text">
                        <span className="pill-feature-label">{feat.label}: </span>
                        <strong className="pill-feature-val">{feat.value}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Block */}
                <div className="pricing-pill-price-wrap">
                  <div className="pill-price-main">
                    <span className="pill-price-val">{pkg.price}</span>
                    <span className="pill-price-currency">đ</span>
                  </div>
                  <span className="pill-price-sub">trọn gói / không phát sinh</span>
                </div>

                {/* Action CTA Button */}
                <div className="pricing-pill-action">
                  <button
                    type="button"
                    onClick={(e) => handlePackageClick(e, pkg.id)}
                    className="pricing-pill-btn"
                  >
                    <span>{pkg.ctaLabel}</span>
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
