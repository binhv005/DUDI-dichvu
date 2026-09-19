import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import AIChatModal from './AIChatModal';
import '../styles/floating.css';

export default function FloatingActions({ onShowToast }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      // Show when scrolled past Hero (approx 350px)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleCallClick = (e) => {
    if (!isMobile) {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(COMPANY_INFO.hotlineRaw);
        onShowToast(`Đã sao chép hotline ${COMPANY_INFO.hotline} vào clipboard!`);
      } else {
        onShowToast(`Hotline: ${COMPANY_INFO.hotline}`);
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* AI Chat Modal Dialog */}
      <AIChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <div className="floating-actions-container">
        {/* 0. Robot Mascot AI Chat Button (Top of the Stack) */}
        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className={`floating-btn floating-btn-ai ${isChatOpen ? 'active' : ''}`}
          aria-label="Mở Trợ lý AI DUDI"
          title="Chat với Trợ lý AI DUDI"
        >
          <div className="btn-pulse-ring-cyan"></div>
          <div className="floating-mascot-img-wrap">
            <img 
              src="/robot-mascot.webp" 
              alt="DUDI AI Robot Mascot" 
              className="floating-mascot-img"
              width={36}
              height={36}
            />
          </div>
          <span className="floating-ai-online-dot"></span>
          <span className="floating-tooltip">Trợ lý AI DUDI</span>
        </button>

        {/* 1. Call Button */}
        {isMobile ? (
          <a
            href={`tel:${COMPANY_INFO.hotlineRaw}`}
            className="floating-btn floating-btn-call"
            aria-label={`Gọi hotline ${COMPANY_INFO.hotline}`}
            title={`Gọi hotline ${COMPANY_INFO.hotline}`}
          >
            <div className="btn-pulse-ring"></div>
            <Phone size={22} color="#ffffff" />
            <span className="floating-tooltip">Gọi ngay</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={handleCallClick}
            className="floating-btn floating-btn-call"
            aria-label={`Sao chép hotline ${COMPANY_INFO.hotline}`}
            title="Click để sao chép hotline"
          >
            <div className="btn-pulse-ring"></div>
            <Phone size={22} color="#ffffff" />
            <span className="floating-tooltip">Sao chép Hotline</span>
          </button>
        )}

        {/* 2. Zalo Button */}
        <a
          href={COMPANY_INFO.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-btn-zalo"
          aria-label="Chat qua Zalo DUDI Software"
          title="Chat qua Zalo"
        >
          <span className="zalo-text-badge">Zalo</span>
          <span className="floating-tooltip">Chat Zalo</span>
        </a>

        {/* 3. Back To Top Button */}
        <button
          type="button"
          onClick={handleScrollToTop}
          className="floating-btn floating-btn-top"
          aria-label="Cuộn lên đầu trang"
          title="Về đầu trang"
        >
          <ArrowUp size={20} color="#ffffff" />
          <span className="floating-tooltip">Về đầu trang</span>
        </button>
      </div>
    </>
  );
}