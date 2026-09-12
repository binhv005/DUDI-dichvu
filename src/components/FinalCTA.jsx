import React from 'react';
import { ArrowRight, Phone, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { FINAL_CTA_DATA, COMPANY_INFO } from '../data/content';

export default function FinalCTA({ onShowToast }) {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
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
    <section className="section bg-white final-cta-section">
      <div className="container">
        <div className="final-cta-card">
          <div className="cta-badge">
            <Sparkles size={14} />
            <span>Tối Ưu Chuyển Đổi — Bứt Phá Doanh Số</span>
          </div>

          <h2 className="final-cta-title">{FINAL_CTA_DATA.title}</h2>
          <p className="final-cta-desc">{FINAL_CTA_DATA.description}</p>

          <div className="final-cta-actions">
            <a
              href={`#${FINAL_CTA_DATA.primaryCta.targetId}`}
              onClick={(e) => handleScroll(e, FINAL_CTA_DATA.primaryCta.targetId)}
              className="btn btn-primary btn-lg final-action-btn"
            >
              <span>{FINAL_CTA_DATA.primaryCta.label}</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Contact Channels Strip */}
          <div className="cta-channels-strip">
            <a
              href={`tel:${COMPANY_INFO.hotlineRaw}`}
              onClick={handlePhoneClick}
              className="cta-channel-pill"
            >
              <Phone size={15} color="#dc2626" />
              <span>Hotline: {COMPANY_INFO.hotline}</span>
            </a>

            <a
              href={COMPANY_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-channel-pill"
            >
              <MessageSquare size={15} color="#0068ff" />
              <span>Zalo: {COMPANY_INFO.hotline}</span>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="cta-channel-pill"
            >
              <Mail size={15} color="#059669" />
              <span>Email: {COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
