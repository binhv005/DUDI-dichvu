import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TargetAudience from './components/TargetAudience';
import Problems from './components/Problems';
import Deliverables from './components/Deliverables';
import Pricing from './components/Pricing';
import Process from './components/Process';
import Cases from './components/Cases';
import Limitations from './components/Limitations';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Toast from './components/Toast';

import './styles/index.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/pricing.css';
import './styles/form.css';
import './styles/footer.css';
import './styles/floating.css';
import './styles/aichat.css';
import './styles/cases.css';
import './styles/animations.css';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [toast, setToast] = useState(null);

  // Always reset scroll to top on mount / reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Scroll Reveal Intersection Observer with Staggered Delays
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Auto stagger delays for child cards
    const gridSelectors = [
      '.targets-grid > *',
      '.problems-grid > *',
      '.deliverables-grid > *',
      '.pricing-pills-row > *',
      '.process-steps-grid > *',
      '.scope-cards-grid > *',
      '.faq-list > *',
      '.cases-grid > *',
    ];

    gridSelectors.forEach((selector) => {
      const items = document.querySelectorAll(selector);
      items.forEach((item, index) => {
        const delay = Math.min((index % 5) * 0.08, 0.4);
        if (delay > 0) {
          item.style.transitionDelay = `${delay}s`;
        }
      });
    });

    const revealSelectors = [
      '.reveal',
      '.reveal-left',
      '.reveal-right',
      '.reveal-zoom',
      '.section-header',
      '.target-card',
      '.problem-card',
      '.deliverable-card',
      '.pricing-pill-card',
      '.process-step-card',
      '.case-full-card',
      '.scope-card',
      '.faq-item',
      '.contact-form-wrap',
      '.final-cta-card',
    ];

    const elements = document.querySelectorAll(revealSelectors.join(', '));
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Đã tự động chọn gói dịch vụ cho bạn trong Form đăng ký!');
  };

  return (
    <div className="dudi-landing-page-app">
      {/* S01: Header */}
      <Header onShowToast={showToast} />

      <main>
        {/* S02: Hero */}
        <Hero />

        {/* S03: Đối Tượng Phù Hợp */}
        <TargetAudience onSelectPackage={handleSelectPackage} />

        {/* S04: Thực Trạng Khách Hàng */}
        <Problems />

        {/* S05: Hạng Mục Bàn Giao */}
        <Deliverables />

        {/* S06: Bảng Giá 3 Gói */}
        <Pricing onSelectPackage={handleSelectPackage} />

        {/* S07: Quy Trình 9 Bước */}
        <Process />

        {/* S08: Dự Án Mẫu */}
        <Cases />

        {/* S09: Phạm Vi & Điều Kiện */}
        <Limitations />

        {/* S10: FAQ Accordion */}
        <FAQ />

        {/* S11: Form Đăng Ký Tư Vấn */}
        <ContactForm
          selectedPackage={selectedPackage}
          onPackageChange={setSelectedPackage}
          onShowToast={showToast}
        />

        {/* S12: Final CTA */}
        <FinalCTA onShowToast={showToast} />
      </main>

      {/* S13: Footer */}
      <Footer onShowToast={showToast} />

      {/* Floating Robot AI / Call / Zalo / BackToTop Buttons */}
      <FloatingActions onShowToast={showToast} />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}