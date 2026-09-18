import React, { useState } from 'react';
import { Layers, ArrowRight, Check, ExternalLink, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

export const SHOWCASE_PROJECTS = [
  {
    id: 'case-01',
    tabLabel: 'DỰ ÁN 01: Odyssey Ha Giang Loop',
    tabPrice: '11,5tr',
    projectBadge: 'DỰ ÁN 01',
    industry: 'Du lịch & Tour quốc tế',
    price: '11,5 triệu',
    priceUnit: '/ trọn gói',
    title: 'Website Odyssey Ha Giang Loop',
    description:
      'Nền tảng đặt tour du lịch cao cấp khám phá Hà Giang, tối ưu trải nghiệm và tỷ lệ chuyển đổi cho khách quốc tế.',
    features: [
      'Giao diện độc quyền & chuẩn Mobile',
      'Lịch trình tour & Booking đa bước',
      'Kết nối WhatsApp & Email tự động',
      'Tối ưu SEO & Tốc độ tải toàn cầu',
    ],
    domain: 'odysseyhagiangloop.com',
    liveUrl: 'https://www.odysseyhagiangloop.com/',
    targetUrl: 'https://www.odysseyhagiangloop.com/',
    previewType: 'odyssey',
    sectionBg: '/case_odyssey_bg.webp',
  },
  {
    id: 'case-02',
    tabLabel: 'DỰ ÁN 02: Bao Bì Cao Nguyên Xanh',
    tabPrice: '3,5tr',
    projectBadge: 'DỰ ÁN 02',
    industry: 'Sản xuất & In ấn bao bì',
    price: '3,5 triệu',
    priceUnit: '/ trọn gói',
    title: 'Website Bao Bì Cao Nguyên Xanh',
    description:
      'Website hồ sơ năng lực doanh nghiệp sản xuất bao bì giấy, hộp cứng và tem nhãn công nghiệp chuẩn B2B.',
    features: [
      'Showcase năng lực sản xuất & máy in',
      'Danh mục bao bì phân loại theo ngành',
      'Form nhận báo giá nhanh về phòng Sale',
      'Tối ưu chuẩn SEO On-page & Mobile',
    ],
    domain: 'caonguyenxanh.com.vn',
    liveUrl: 'https://caonguyenxanh.com.vn/',
    targetUrl: 'https://caonguyenxanh.com.vn/',
    previewType: 'caonguyenxanh',
    sectionBg: '/case_caonguyenxanh_bg.webp',
  },
];

export default function Cases() {
  const [activeTab, setActiveTab] = useState(0);
  const current = SHOWCASE_PROJECTS[activeTab];

  const handlePrev = () => {
    setActiveTab((prev) => (prev > 0 ? prev - 1 : SHOWCASE_PROJECTS.length - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev < SHOWCASE_PROJECTS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="cases" className="section cases-showcase-section">
      {/* Dynamic Outside Section Background Image */}
      <div
        className="cases-outer-bg"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(200, 20, 32, 0.55) 0%, rgba(130, 12, 20, 0.68) 100%), url(${current.sectionBg})`,
        }}
      />
      <div className="container relative-z2">
        {/* Top Header Row with Single Project Switcher */}
        <div className="cases-top-bar">
          <div className="cases-header-left">
            <div className="cases-tag-badge">
              <Layers size={14} />
              <span>DỰ ÁN THỰC TẾ</span>
            </div>
            <h2 className="cases-main-title">Một số dự án DUDI đã thực hiện</h2>
          </div>

          {/* Project Switcher: Arrows + Single Active Project */}
          <div className="project-switcher-bar">
            <button
              type="button"
              onClick={handlePrev}
              className="switcher-arrow-btn"
              aria-label="Dự án trước"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="switcher-active-pill">
              <span className="switcher-dot">●</span>
              <span className="switcher-title">{current.tabLabel}</span>
              <span className="switcher-price-tag">{current.tabPrice}</span>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="switcher-arrow-btn"
              aria-label="Dự án kế tiếp"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Main Showcase Showcase Box */}
        <div className="showcase-card animate-fade-in" key={current.id}>
          <div className="showcase-grid">
            {/* Left Column: Interactive Web Preview Mockup */}
            <div className="showcase-preview-column">
              <div className="showcase-browser-frame">
                {/* Browser Content */}
                <div
                  className={`mockup-screen ${
                    current.previewType === 'odyssey' ? 'screen-odyssey' : 'screen-caonguyenxanh'
                  }`}
                />

                {/* Bottom Overlay Bar on Preview */}
                <div className="preview-bottom-bar">
                  <div className="preview-domain-tag">
                    <span className="status-dot"></span>
                    <span>{current.domain}</span>
                  </div>
                  <a
                    href={current.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-preview-visit"
                  >
                    <span>Xem web</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Project Details & Features */}
            <div className="showcase-details-column">
              {/* Header Meta */}
              <div className="details-header-meta">
                <div className="project-tags-group">
                  <span className="tag-project-num">{current.projectBadge}</span>
                  <span className="tag-project-industry">{current.industry}</span>
                </div>
                <div className="price-tag-badge">
                  <span className="price-bold">{current.price}</span>
                  <span className="price-unit">{current.priceUnit}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="project-title">{current.title}</h3>
              <p className="project-description">{current.description}</p>

              {/* 4 Feature Checklist Pills */}
              <div className="features-checklist-grid">
                {current.features.map((feat, i) => (
                  <div key={i} className="feature-pill-item">
                    <div className="feat-check-icon">
                      <Check size={13} color="#10b981" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Status & CTA Action Button */}
              <div className="details-bottom-actions">
                <div className="live-status-indicator">
                  <span className="pulse-green-dot"></span>
                  <span>Đang hoạt động</span>
                </div>

                <a
                  href={current.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-visit-project"
                >
                  <span>{current.domain}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Projects Footer Strip */}
        <div className="cases-footer-strip">
          <div className="strip-left">
            <Globe size={16} />
            <span>Khám phá thêm các dự án tiêu biểu tại hệ sinh thái DUDI.</span>
          </div>

          <a
            href="https://www.dudisoftware.com/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="strip-right-link"
          >
            <span>Xem tất cả dự án tại dudisoftware.com/projects</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
