import React from 'react';

/**
 * Reusable Brand Logo component matching official DUDI Software styling
 * Top line: DUDI (Dark/White) + SOFTWARE (Red/Coral)
 * Bottom line: TECHNOLOGY SOLUTIONS HUB (Muted Slate, Tracking-wide)
 */
export default function BrandLogo({ theme = 'light', size = 'normal', className = '' }) {
  const isDark = theme === 'dark';
  const sizeClass = size === 'sm' ? 'brand-logo-sm' : size === 'lg' ? 'brand-logo-lg' : '';

  return (
    <div
      className={`brand-logo-container ${
        isDark ? 'brand-logo-dark' : 'brand-logo-light'
      } ${sizeClass} ${className}`.trim()}
    >
      <div className="brand-logo-main">
        <span className="brand-logo-dudi">DUDI</span>
        <span className="brand-logo-software">SOFTWARE</span>
      </div>
      <div className="brand-logo-sub">TECHNOLOGY SOLUTIONS HUB</div>
    </div>
  );
}
