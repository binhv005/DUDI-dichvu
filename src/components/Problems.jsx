import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingDown,
  ChevronDown,
  Sparkles,
  Zap,
  Smartphone,
  LayoutGrid,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { PROBLEMS_DATA } from '../data/content';

// Theme configurations for the 5 problem cards
const PROBLEM_THEMES = {
  '01': {
    id: 'speed',
    gradient: 'linear-gradient(135deg, #ff2a6d 0%, #d90429 50%, #9f1239 100%)',
    primaryColor: '#e11d48',
    glowColor: 'rgba(225, 29, 72, 0.25)',
    accentBg: '#fff1f2',
    accentText: '#be123c',
    icon: Zap,
    wavePath: 'M0,0 L200,0 L200,75 C165,108 135,72 85,102 C45,120 15,90 0,102 Z',
    droplets: [
      { cx: '18', cy: '112', r: '4.5' },
      { cx: '142', cy: '115', r: '5.5' },
      { cx: '185', cy: '92', r: '4' }
    ]
  },
  '02': {
    id: 'mobile',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #1d4ed8 100%)',
    primaryColor: '#2563eb',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    accentBg: '#eff6ff',
    accentText: '#1d4ed8',
    icon: Smartphone,
    wavePath: 'M0,0 L200,0 L200,82 C160,70 125,112 75,85 C35,115 15,95 0,105 Z',
    droplets: [
      { cx: '24', cy: '116', r: '5' },
      { cx: '118', cy: '118', r: '4.5' },
      { cx: '180', cy: '98', r: '5' }
    ]
  },
  '03': {
    id: 'layout',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #581c87 100%)',
    primaryColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    accentBg: '#faf5ff',
    accentText: '#6d28d9',
    icon: LayoutGrid,
    wavePath: 'M0,0 L200,0 L200,78 C155,115 130,75 80,108 C40,92 18,118 0,98 Z',
    droplets: [
      { cx: '16', cy: '115', r: '4' },
      { cx: '135', cy: '116', r: '6' },
      { cx: '188', cy: '88', r: '4.5' }
    ]
  },
  '04': {
    id: 'tracking',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0369a1 100%)',
    primaryColor: '#0d9488',
    glowColor: 'rgba(13, 148, 136, 0.25)',
    accentBg: '#f0fdfa',
    accentText: '#0f766e',
    icon: BarChart3,
    wavePath: 'M0,0 L200,0 L200,85 C165,72 130,116 80,88 C38,118 12,98 0,108 Z',
    droplets: [
      { cx: '22', cy: '118', r: '5' },
      { cx: '146', cy: '112', r: '5' },
      { cx: '182', cy: '95', r: '4.5' }
    ]
  },
  '05': {
    id: 'cost',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #c2410c 100%)',
    primaryColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.25)',
    accentBg: '#fffbeb',
    accentText: '#c2410c',
    icon: DollarSign,
    wavePath: 'M0,0 L200,0 L200,78 C160,112 128,78 78,105 C42,95 16,118 0,100 Z',
    droplets: [
      { cx: '20', cy: '114', r: '4.5' },
      { cx: '128', cy: '118', r: '5.5' },
      { cx: '184', cy: '92', r: '4' }
    ]
  },
};

export default function Problems() {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (num) => {
    setActiveCard((prev) => (prev === num ? null : num));
  };

  return (
    <section id="problems" className="section problems-section bg-gray-tint">
      <div className="container">
        {/* Section Header */}
        <div className="section-header problems-header-compact">
          <div className="section-tag">
            <AlertTriangle size={13} color="#dc2626" />
            <span>Phân Tích Thực Trạng</span>
          </div>
          <h2 className="section-title">{PROBLEMS_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{PROBLEMS_DATA.sectionSubtitle}</p>
        </div>

        {/* 5 Problems Grid with Hover-to-Reveal Dropdown */}
        <div className="problems-grid">
          {PROBLEMS_DATA.items.map((item) => {
            const theme = PROBLEM_THEMES[item.number] || PROBLEM_THEMES['01'];
            const IconComponent = theme.icon;
            const isOpen = activeCard === item.number;

            return (
              <div
                key={item.number}
                className={`problem-card problem-card-modern ${isOpen ? 'is-active' : ''}`}
                onClick={() => toggleCard(item.number)}
                tabIndex={0}
              >
                {/* Fluid Wave & Blob Header Top */}
                <div className="problem-blob-header">
                  <svg
                    viewBox="0 0 200 130"
                    className="problem-blob-svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id={`grad-${item.number}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={theme.primaryColor} stopOpacity="0.95" />
                        <stop offset="100%" stopColor={theme.accentText} stopOpacity="1" />
                      </linearGradient>
                    </defs>

                    {/* Fluid Wave Fill */}
                    <path
                      d={theme.wavePath}
                      fill={`url(#grad-${item.number})`}
                      className="blob-main-path"
                    />

                    {/* Floating Droplets */}
                    {theme.droplets.map((drop, idx) => (
                      <circle
                        key={idx}
                        cx={drop.cx}
                        cy={drop.cy}
                        r={drop.r}
                        fill={`url(#grad-${item.number})`}
                        className="blob-droplet"
                      />
                    ))}
                  </svg>

                  {/* Top Meta: Number badge on corner */}
                  <div className="problem-blob-top-meta">
                    <span className="problem-blob-num-pill">{item.number}</span>
                  </div>

                  {/* Inside Header: Icon + Category Tag */}
                  <div className="problem-blob-content">
                    <div className="problem-blob-icon">
                      <IconComponent size={20} color="#ffffff" strokeWidth={2.4} />
                    </div>
                    <span className="problem-blob-tag">{item.tag}</span>
                  </div>
                </div>

                {/* Card Main Visible Area */}
                <div className="problem-card-content">
                  {/* Highlight Impact Badge */}
                  <div
                    className="problem-highlight-pill"
                    style={{
                      backgroundColor: theme.accentBg,
                      color: theme.accentText,
                      borderColor: `${theme.primaryColor}30`,
                    }}
                  >
                    <TrendingDown size={12} strokeWidth={2.5} />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Title with Chevron Indicator */}
                  <div className="problem-title-row">
                    <h3 className="problem-title">{item.title}</h3>
                    <ChevronDown size={16} className="problem-dropdown-chevron" />
                  </div>

                  {/* Hover Dropdown Content Drawer */}
                  <div className="problem-dropdown-drawer">
                    <div className="problem-drawer-inner">
                      <ul className="problem-bullets-list">
                        {item.bulletPoints.map((bullet, bIdx) => (
                          <li key={bIdx} className="problem-bullet-item">
                            <span
                              className="problem-bullet-dot"
                              style={{ background: theme.gradient }}
                            />
                            <span className="problem-bullet-text">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {item.detail?.solution && (
                        <div className="problem-solution-snippet">
                          <Sparkles size={13} color={theme.primaryColor} />
                          <span>{item.detail.solution}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


