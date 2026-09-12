import React from 'react';
import { ShieldCheck, Check, Plus, AlertCircle, ArrowRight } from 'lucide-react';
import { LIMITATIONS_DATA } from '../data/content';

export default function Limitations() {
  return (
    <section id="limitations" className="section limitations-section section-screen-fit">
      <div className="container">
        {/* Section Header */}
        <div className="section-header limitations-header">
          <div className="section-tag">
            <ShieldCheck size={14} color="#dc2626" />
            <span>MINH BẠCH & RÕ RÀNG</span>
          </div>
          <h2 className="section-title">{LIMITATIONS_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{LIMITATIONS_DATA.sectionSubtitle}</p>
        </div>

        {/* 3 Pillars Grid matching User's Mockup */}
        <div className="scope-cards-grid">
          {/* Pillar 1: Included (Green Theme) */}
          <div className="scope-card card-theme-green">
            {/* Circular Avatar Top */}
            <div className="scope-avatar-wrap">
              <div className="scope-avatar-circle">
                <img
                  src="/scope_support.webp"
                  alt="Hạng Mục Bao Gồm Trong Gói"
                  className="scope-avatar-img"
                />
              </div>
              <div className="scope-badge-pill green-pill">TRỌN GÓI</div>
            </div>

            {/* Card Content */}
            <div className="scope-card-body">
              <h3 className="scope-card-title green-title">Hạng Mục Bao Gồm Trong Gói</h3>
              <p className="scope-card-desc">Cam kết đầy đủ tính năng tiêu chuẩn</p>

              <ul className="scope-items-list">
                {LIMITATIONS_DATA.included.map((item, index) => (
                  <li key={index} className="scope-item">
                    <span className="scope-bullet green-bullet">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom 3D Tab Button */}
            <div className="scope-card-footer">
              <a href="#contact" className="scope-btn green-btn">
                <span>TƯ VẤN GÓI NÀY</span>
              </a>
            </div>
          </div>

          {/* Pillar 2: Extra Quotation (Yellow/Amber Theme) */}
          <div className="scope-card card-theme-yellow">
            {/* Circular Avatar Top */}
            <div className="scope-avatar-wrap">
              <div className="scope-avatar-circle">
                <img
                  src="/scope_guidance.webp"
                  alt="Hạng Mục Báo Giá Riêng"
                  className="scope-avatar-img"
                />
              </div>
              <div className="scope-badge-pill yellow-pill">MỞ RỘNG</div>
            </div>

            {/* Card Content */}
            <div className="scope-card-body">
              <h3 className="scope-card-title yellow-title">Hạng Mục Báo Giá Riêng</h3>
              <p className="scope-card-desc">Tùy chọn nâng cấp theo nhu cầu riêng</p>

              <ul className="scope-items-list">
                {LIMITATIONS_DATA.extraQuotation.map((item, index) => (
                  <li key={index} className="scope-item">
                    <span className="scope-bullet yellow-bullet">
                      <Plus size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom 3D Tab Button */}
            <div className="scope-card-footer">
              <a href="#contact" className="scope-btn yellow-btn">
                <span>YÊU CẦU BÁO GIÁ</span>
              </a>
            </div>
          </div>

          {/* Pillar 3: Conditions (Red Theme) */}
          <div className="scope-card card-theme-red">
            {/* Circular Avatar Top */}
            <div className="scope-avatar-wrap">
              <div className="scope-avatar-circle">
                <img
                  src="/scope_refuse.webp"
                  alt="Điều Kiện & Nghiệm Thu"
                  className="scope-avatar-img"
                />
              </div>
              <div className="scope-badge-pill red-pill">NGHIỆM THU</div>
            </div>

            {/* Card Content */}
            <div className="scope-card-body">
              <h3 className="scope-card-title red-title">Điều Kiện & Nghiệm Thu</h3>
              <p className="scope-card-desc">Quy chuẩn phối hợp minh bạch đôi bên</p>

              <ul className="scope-items-list">
                {LIMITATIONS_DATA.conditions.map((item, index) => (
                  <li key={index} className="scope-item">
                    <span className="scope-bullet red-bullet">
                      <AlertCircle size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom 3D Tab Button */}
            <div className="scope-card-footer">
              <a href="#contact" className="scope-btn red-btn">
                <span>XEM QUY TRÌNH</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
