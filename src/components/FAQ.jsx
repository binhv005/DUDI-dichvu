import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQ_DATA } from '../data/content';

export default function FAQ() {
  const [openIds, setOpenIds] = useState(['faq-1']);

  const toggleFaq = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(id);
    }
  };

  return (
    <section id="faq" className="section section-screen-fit bg-gray-tint">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={14} color="#dc2626" />
            <span>Hỏi Đáp Thường Gặp</span>
          </div>
          <h2 className="section-title">{FAQ_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{FAQ_DATA.sectionSubtitle}</p>
        </div>

        {/* Accordion FAQ List */}
        <div className="faq-accordion-container" role="region" aria-label="Danh sách câu hỏi thường gặp">
          {FAQ_DATA.items.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  className="faq-question-btn"
                >
                  <span className="faq-question-text">{item.question}</span>
                  <div className={`faq-chevron-box ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={18} color={isOpen ? '#dc2626' : '#64748b'} />
                  </div>
                </button>

                <div
                  id={`faq-content-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`faq-answer-panel ${isOpen ? 'open' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
