import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS } from '../data/content';

export default function Header({ onShowToast }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneClick = (e) => {
    if (window.innerWidth >= 1024 && !/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(COMPANY_INFO.hotlineRaw);
        onShowToast(`Đã sao chép hotline ${COMPANY_INFO.hotline}!`);
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo Image */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="header-brand"
          aria-label="DUDI SOFTWARE - Trang chủ"
        >
          <img src="/logo.webp" alt="DUDI SOFTWARE Logo" className="brand-logo-img" />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <a
            href={`tel:${COMPANY_INFO.hotlineRaw}`}
            onClick={handlePhoneClick}
            className="header-hotline"
            title="Hotline tư vấn"
          >
            <div className="hotline-icon">
              <Phone size={15} />
            </div>
            <div className="hotline-details">
              <span className="hotline-label">Hotline 24/7</span>
              <span className="hotline-number">{COMPANY_INFO.hotline}</span>
            </div>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn btn-primary btn-sm header-cta"
          >
            <span>Tư vấn ngay</span>
            <ArrowRight size={15} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu-footer">
            <a
              href={`tel:${COMPANY_INFO.hotlineRaw}`}
              className="btn btn-secondary mobile-phone-btn"
            >
              <Phone size={16} />
              <span>Gọi Hotline: {COMPANY_INFO.hotline}</span>
            </a>
            <a
              href={COMPANY_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mobile-zalo-btn"
            >
              <MessageSquare size={16} />
              <span>Chat Zalo DUDI</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="btn btn-primary mobile-cta-btn"
            >
              <span>Đăng ký tư vấn ngay</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
