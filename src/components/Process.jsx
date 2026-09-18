import React, { useState } from 'react';
import { 
  GitCommit, 
  MessageSquare, 
  Users, 
  FileCheck, 
  Layers, 
  PenTool, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Check,
  ChevronDown 
} from 'lucide-react';
import { PROCESS_DATA } from '../data/content';

const STEP_ICONS = [
  MessageSquare, // 01
  Users,          // 02
  FileCheck,      // 03
  Layers,         // 04
  PenTool,        // 05
  Palette,        // 06
  Code2,          // 07
  ShieldCheck,    // 08
  Rocket,         // 09
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = PROCESS_DATA.steps[activeStep >= 0 ? activeStep : 0] || PROCESS_DATA.steps[0];
  const CurrentIcon = STEP_ICONS[activeStep >= 0 ? activeStep : 0] || MessageSquare;

  return (
    <section id="process" className="section process-stepper-section bg-gray-tint">
      <div className="container process-container">
        {/* Section Header */}
        <div className="section-header process-header-compact">
          <div className="section-tag">
            <GitCommit size={14} color="#dc2626" />
            <span>Tiêu Chuẩn Thực Hiện</span>
          </div>
          <h2 className="section-title">{PROCESS_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{PROCESS_DATA.sectionSubtitle}</p>
        </div>

        {/* 1. DESKTOP VIEW: Horizontal Stepper Timeline Bar */}
        <div className="process-timeline-wrapper desktop-only-stepper">
          <div className="process-track-container">
            {/* Background Line */}
            <div className="process-track-line-bg"></div>
            {/* Active Filled Progress Line */}
            <div 
              className="process-track-line-fill"
              style={{ width: `${(Math.max(0, activeStep) / (PROCESS_DATA.steps.length - 1)) * 100}%` }}
            ></div>

            {/* 9 Stepper Nodes */}
            <div className="process-nodes-row">
              {PROCESS_DATA.steps.map((item, index) => {
                const Icon = STEP_ICONS[index] || MessageSquare;
                const isPassed = index < activeStep;
                const isActive = index === activeStep;

                return (
                  <div
                    key={item.step}
                    className={`process-node-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    onMouseEnter={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Top Icon Floating above Node */}
                    <div className="node-icon-bubble">
                      <Icon size={18} />
                    </div>

                    {/* Circular Step Node on the Line */}
                    <div className="node-circle">
                      {isPassed ? (
                        <Check size={12} strokeWidth={3} />
                      ) : (
                        <span>{item.step}</span>
                      )}
                    </div>

                    {/* Step Title below Node */}
                    <div className="node-label">
                      <span>{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Detail Card Displayed on Desktop */}
        <div className="process-detail-card desktop-only-stepper">
          <div className="detail-card-left">
            <div className="detail-icon-box">
              <CurrentIcon size={24} color="#dc2626" />
            </div>
            <div className="detail-meta">
              <div className="detail-badge">
                <span>BƯỚC {currentStep.step} / 09</span>
              </div>
              <h3 className="detail-title">{currentStep.title}</h3>
            </div>
          </div>

          <div className="detail-card-right">
            <p className="detail-desc">{currentStep.desc}</p>
          </div>
        </div>

        {/* 2. MOBILE VIEW: Vertical Interactive Timeline */}
        <div className="process-mobile-vertical-wrapper mobile-only-stepper">
          <div className="process-vertical-track-line"></div>
          {PROCESS_DATA.steps.map((item, index) => {
            const Icon = STEP_ICONS[index] || MessageSquare;
            const isPassed = activeStep >= 0 && index < activeStep;
            const isActive = index === activeStep;

            return (
              <div
                key={item.step}
                className={`process-v-step-card ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                onClick={() => setActiveStep(isActive ? -1 : index)}
              >
                <div className="v-step-left">
                  <div className="v-step-node-circle">
                    {isPassed ? (
                      <Check size={12} strokeWidth={3} />
                    ) : (
                      <span>{item.step}</span>
                    )}
                  </div>
                </div>

                <div className="v-step-content">
                  <div className="v-step-header">
                    <div className="v-step-icon-box">
                      <Icon size={16} />
                    </div>
                    <div className="v-step-title-wrap">
                      <span className="v-step-num-text">Bước {item.step}</span>
                      <h3 className="v-step-title">{item.title}</h3>
                    </div>
                    <div className={`v-step-toggle-arrow ${isActive ? 'open' : ''}`}>
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <div className={`v-step-body ${isActive ? 'open' : ''}`}>
                    <p className="v-step-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Note Footer */}
        <div className="process-footer-notice-compact">
          <div className="notice-icon-circle">
            <ShieldCheck size={16} color="#dc2626" />
          </div>
          <p>
            <strong>Cam kết tiến độ &amp; chất lượng:</strong> Chốt duyệt Wireframe &amp; nội dung chuẩn xác trước khi code, bàn giao source code và bảo hành kỹ thuật tận tâm.
          </p>
        </div>
      </div>
    </section>
  );
}
