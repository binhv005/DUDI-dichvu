import React from 'react';
import { Phone, Mail, MapPin, FileText, ShieldCheck, ArrowUp, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

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
              <img src="/logo.webp" alt="DUDI Software Logo" className="footer-logo-img" />
              <div className="footer-brand-title">
                <span className="brand-white">DUDI </span>
                <span className="brand-red">Software</span>
              </div>
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
                <span>Địa chỉ: {COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="footer-dark-col-contact">
            <h4 className="footer-dark-heading">LIÊN HỆ TRỰC TIẾP</h4>
            <div className="footer-dark-contact-list">
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

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="contact-card-link"
              >
                <div className="contact-icon-badge">
                  <Mail size={15} color="#ef4444" />
                </div>
                <span>{COMPANY_INFO.email}</span>
              </a>

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

        {/* Bottom Copyright & Official Verification */}
        <div className="footer-dark-bottom">
          <p className="copyright-text-dark">
            Copyright © {new Date().getFullYear()} DUDI Software. All rights reserved.
          </p>
          <div className="footer-verified-badge">
            <ShieldCheck size={16} color="#10b981" />
            <span>Thông tin đăng ký kinh doanh chính thức</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
