import React from 'react';
import { Phone, Mail, MapPin, FileText, ArrowUp, MessageSquare, Globe } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import BrandLogo from './BrandLogo';

export default function Footer({ onShowToast }) {
  const handlePhoneClick = (e) => {
    if (window.innerWidth >= 1024 && !/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(COMPANY_INFO.hotlineRaw);
        onShowToast(`Đã sao chép hotline ${COMPANY_INFO.hotline}!`);
      }
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer-dark">
      <div className="container">
        {/* 3-Column Main Footer Grid */}
        <div className="footer-dark-grid">
          {/* Column 1: Brand & Legal Info */}
          <div className="footer-dark-col-company">
            <div className="footer-brand-header">
              <BrandLogo theme="dark" size="lg" />
            </div>

            <h3 className="footer-company-legal-title">{COMPANY_INFO.name}</h3>
            
            <p className="footer-company-desc">
              Đơn vị cung cấp giải pháp thiết kế website giới thiệu doanh nghiệp chuẩn mực, tối ưu trải nghiệm người dùng và chuyển giao công nghệ toàn diện.
            </p>

            <div className="footer-legal-items">
              <div className="legal-row">
                <FileText size={16} color="#ef4444" className="legal-icon" />
                <span>Mã số thuế: <strong>{COMPANY_INFO.taxCode}</strong></span>
              </div>
              <div className="legal-row">
                <MapPin size={16} color="#ef4444" className="legal-icon" />
                <span>Trụ sở: <strong>{COMPANY_INFO.address}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Contact Channels */}
          <div className="footer-dark-col-contact">
            <h4 className="footer-dark-heading">KÊNH LIÊN HỆ TRỰC TIẾP</h4>
            
            <div className="footer-contact-cards">
              {/* Phone / Hotline Card */}
              <a
                href={`tel:${COMPANY_INFO.hotlineRaw}`}
                onClick={handlePhoneClick}
                className="contact-card-link"
              >
                <div className="contact-icon-badge">
                  <Phone size={15} color="#ef4444" />
                </div>
                <span>Hotline: <strong>{COMPANY_INFO.hotline}</strong></span>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="contact-card-link"
              >
                <div className="contact-icon-badge">
                  <Mail size={15} color="#ef4444" />
                </div>
                <span>Email: <strong>{COMPANY_INFO.email}</strong></span>
              </a>

              {/* Zalo Card */}
              <a
                href={COMPANY_INFO.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-link"
              >
                <div className="contact-icon-badge">
                  <MessageSquare size={15} color="#ef4444" />
                </div>
                <span>Zalo OA: <strong>{COMPANY_INFO.hotline}</strong></span>
              </a>
            </div>
          </div>

          {/* Column 3: Terms & Transparency */}
          <div className="footer-dark-col-terms">
            <h4 className="footer-dark-heading">ĐIỀU KHOẢN & MINH BẠCH</h4>
            <ul className="footer-bullet-list">
              <li>
                <span className="bullet-dot">•</span>
                <span>Minh bạch phạm vi theo hợp đồng</span>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <span>Nghiệm thu theo từng mốc kỹ thuật</span>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <span>Hỗ trợ xử lý lỗi phát sinh sau bàn giao</span>
              </li>
              <li>
                <span className="bullet-dot">•</span>
                <span>Bảo mật thông tin khách hàng</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="footer-back-to-top-btn"
            >
              <ArrowUp size={15} />
              <span>Về đầu trang</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Domain Pill */}
        <div className="footer-dark-bottom">
          <p className="copyright-text-dark">
            © 2024 CÔNG TY TNHH GIẢI PHÁP PHẦN MỀM DUDI. All rights reserved.
          </p>
          <a
            href="https://dudisoftware.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-domain-pill"
          >
            <Globe size={15} color="#ef4444" />
            <span>dudisoftware.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
