import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS } from '../data/content';

export default function Header({ onShowToast }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection (ignore dropdown items)
      const validItems = NAV_ITEMS.filter((item) => !item.children);
      const sections = validItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(validItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hoverTimeoutRef = useRef(null);

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setDesktopDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(false);
    }, 180);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setDesktopDropdownOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubItemClick = (e, child) => {
    setDesktopDropdownOpen(false);
    setMobileMenuOpen(false);
    if (!child.href || child.href.startsWith('#')) {
      e.preventDefault();
      if (onShowToast) {
        onShowToast(`Đang chuyển hướng tới: ${child.label}`);
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
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <li
                    key={item.id}
                    className={`nav-item nav-item-dropdown ${desktopDropdownOpen ? 'open' : ''}`}
                    ref={dropdownRef}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button
                      type="button"
                      className={`nav-link nav-dropdown-btn ${desktopDropdownOpen ? 'active' : ''}`}
                      onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                      aria-expanded={desktopDropdownOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`dropdown-chevron ${desktopDropdownOpen ? 'rotated' : ''}`}
                      />
                    </button>

                    <div className={`nav-dropdown-menu ${desktopDropdownOpen ? 'show' : ''}`}>
                      <div className="nav-dropdown-inner">
                        {item.children.map((child, idx) => (
                          <a
                            key={idx}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleSubItemClick(e, child)}
                            className="nav-dropdown-item"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
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
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <li key={item.id} className="mobile-nav-item-dropdown">
                    <button
                      type="button"
                      className={`mobile-nav-link mobile-dropdown-toggle ${
                        mobileDropdownOpen ? 'active' : ''
                      }`}
                      onClick={() => setMobileDropdownOpen((prev) => !prev)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`mobile-dropdown-arrow ${
                          mobileDropdownOpen ? 'rotated' : ''
                        }`}
                      />
                    </button>
                    {mobileDropdownOpen && (
                      <div className="mobile-dropdown-list">
                        {item.children.map((child, idx) => (
                          <a
                            key={idx}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleSubItemClick(e, child)}
                            className="mobile-dropdown-sublink"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
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
