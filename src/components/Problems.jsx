import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { PROBLEMS_DATA } from '../data/content';

const PROBLEM_MEDIA = {
  '01': {
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    tag: 'Tốc Độ Chậm',
    tagColor: '#ef4444',
    bgColor: '#fef2f2',
  },
  '02': {
    img: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80',
    tag: 'Chưa Chuẩn Mobile',
    tagColor: '#f97316',
    bgColor: '#fff7ed',
  },
  '03': {
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    tag: 'Bố Cục Rối Rắm',
    tagColor: '#eab308',
    bgColor: '#fefce8',
  },
  '04': {
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tag: 'Thiếu Đo Lường',
    tagColor: '#3b82f6',
    bgColor: '#eff6ff',
  },
  '05': {
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    tag: 'Chi Phí Đắt Đỏ',
    tagColor: '#8b5cf6',
    bgColor: '#f5f3ff',
  },
};

export default function Problems() {
  return (
    <section id="problems" className="section problems-section section-screen-fit bg-gray-tint">
      <div className="container">
        {/* Section Header */}
        <div className="section-header problems-header-compact">
          <div className="section-tag">
            <AlertTriangle size={14} color="#dc2626" />
            <span>Phân Tích Thực Trạng</span>
          </div>
          <h2 className="section-title">{PROBLEMS_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{PROBLEMS_DATA.sectionSubtitle}</p>
        </div>

        {/* 5 Problems Grid with 3D Illustrations */}
        <div className="problems-grid">
          {PROBLEMS_DATA.items.map((item) => {
            const media = PROBLEM_MEDIA[item.number] || {
              img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
              tag: 'Vấn đề',
              tagColor: '#ef4444',
              bgColor: '#fef2f2',
            };

            return (
              <div key={item.number} className="problem-card">
                {/* 3D Illustration Graphic Top - Full Bleed */}
                <div className="problem-img-wrap">
                  <img
                    src={media.img}
                    alt={item.title}
                    className="problem-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Content Area */}
                <div className="problem-card-content">
                  {/* Card Meta Top: Number & Tag */}
                  <div className="problem-card-meta">
                    <span className="problem-num-badge">{item.number}</span>
                    <span
                      className="problem-category-pill"
                      style={{ color: media.tagColor, backgroundColor: media.bgColor }}
                    >
                      {media.tag}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="problem-title">{item.title}</h3>
                  <p className="problem-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

