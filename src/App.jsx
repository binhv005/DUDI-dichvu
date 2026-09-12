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
import './styles/cases.css';

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
    showToast(`Đã tự động chọn gói dịch vụ cho bạn trong Form đăng ký!`);
  };

  return (
    <div className="dudi-landing-page-app">
      {/* S01: Header */}
      <Header onShowToast={showToast} />

      <main>
        {/* S02: Hero (Nền Đỏ Rất Nhạt) */}
        <Hero />

        {/* S03: Đối Tượng Phù Hợp (Nền Trắng) */}
        <TargetAudience onSelectPackage={handleSelectPackage} />

        {/* S04: Thực Trạng Khách Hàng (Nền Xám Rất Nhạt) */}
        <Problems />

        {/* S05: Hạng Mục Bàn Giao (Nền Đỏ Rất Nhạt) */}
        <Deliverables />

        {/* S06: Bảng Giá 3 Gói (Nền Trắng) */}
        <Pricing onSelectPackage={handleSelectPackage} />

        {/* S07: Quy Trình 9 Bước (Nền Xám Rất Nhạt) */}
        <Process />

        {/* S08: Dự Án Mẫu (Nền Đỏ Rất Nhạt) */}
        <Cases />

        {/* S09: Phạm Vi & Điều Kiện (Nền Trắng) */}
        <Limitations />

        {/* S10: FAQ Accordion (Nền Xám Rất Nhạt) */}
        <FAQ />

        {/* S11: Form Đăng Ký Tư Vấn (Nền Đỏ Rất Nhạt) */}
        <ContactForm
          selectedPackage={selectedPackage}
          onPackageChange={setSelectedPackage}
          onShowToast={showToast}
        />

        {/* S12: Final CTA (Nền Trắng) */}
        <FinalCTA onShowToast={showToast} />
      </main>

      {/* S13: Footer */}
      <Footer onShowToast={showToast} />

      {/* Floating Call / Zalo / BackToTop Buttons */}
      <FloatingActions onShowToast={showToast} />

      {/* Global Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
