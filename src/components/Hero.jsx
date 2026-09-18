import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HERO_DATA } from '../data/content';

export default function Hero() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section hero-section">
      {/* Ambient Gradient Glow Layers for vivid flowing aura */}
      <div className="hero-ambient-glow glow-1"></div>
      <div className="hero-ambient-glow glow-2"></div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Direct Poster-styled Typography */}
          <div className="hero-content-box animate-fade-in">
            {/* Sub-heading / Tag matching the top line */}
            <div className="hero-subheading">
              <Sparkles size={14} className="subheading-sparkle" />
              <span>{HERO_DATA.badge}</span>
            </div>

            {/* Single H1 Title in bold condensed display font with vivid gradient sheen */}
            <h1 className="hero-title">
              THIẾT KẾ LANDING PAGE <br />
              <span className="nowrap">TỐI ƯU CHUYỂN ĐỔI</span>
            </h1>

            {/* CTAs */}
            <div className="hero-actions">
              <a
                href={`#${HERO_DATA.primaryCta.targetId}`}
                onClick={(e) => handleScroll(e, HERO_DATA.primaryCta.targetId)}
                className="btn btn-primary hero-btn-primary hero-btn-glow"
              >
                <span>{HERO_DATA.primaryCta.label}</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={`#${HERO_DATA.secondaryCta.targetId}`}
                onClick={(e) => handleScroll(e, HERO_DATA.secondaryCta.targetId)}
                className="btn btn-secondary hero-btn-secondary"
              >
                <span>{HERO_DATA.secondaryCta.label}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Completely transparent with NO text overlay on the 3D mascot */}
          <div className="hero-mascot-space"></div>
        </div>
      </div>
    </section>
  );
}
