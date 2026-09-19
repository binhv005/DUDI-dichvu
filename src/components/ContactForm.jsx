import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Lock, PhoneCall } from 'lucide-react';
import { FORM_DATA, COMPANY_INFO, GOOGLE_SCRIPT_CONFIG } from '../data/content';

export default function ContactForm({ selectedPackage, onPackageChange, onShowToast }) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    companyName: '',
    productService: '',
    objective: 'ads',
    selectedPackage: selectedPackage || 'standard',
    targetDate: '',
    description: '',
    _gotcha: '', // Honeypot field for bot protection
  });

  // Errors State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Metadata State (UTM, referrer, landing URL)
  const [metaInfo, setMetaInfo] = useState({
    landingUrl: '',
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
  });

  // Calculate today string for min date (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, selectedPackage }));
    }
  }, [selectedPackage]);

  useEffect(() => {
    // Capture tracking params on mount
    const urlParams = new URLSearchParams(window.location.search);
    setMetaInfo({
      landingUrl: window.location.href,
      referrer: document.referrer || 'Direct / None',
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
    });
  }, []);

  // Validate form
  const validate = () => {
    const newErrors = {};

    // 1. Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ và tên tối thiểu 2 ký tự.';
    }

    // 2. Phone validation (Vietnam format 10 digits)
    const phoneClean = formData.phone.replace(/[\s.-]/g, '');
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneClean) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hoặc Zalo.';
    } else if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (Ví dụ: 0909163821).';
    }

    // 3. Product / Service validation
    if (!formData.productService.trim()) {
      newErrors.productService = 'Vui lòng nhập sản phẩm hoặc dịch vụ cần thiết kế.';
    }

    // 4. Target Date validation (Must not be in past)
    if (formData.targetDate && formData.targetDate < todayStr) {
      newErrors.targetDate = 'Ngày cần chạy không thể ở trong quá khứ.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'selectedPackage' && onPackageChange) {
      onPackageChange(value);
    }

    // Clear field error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      companyName: '',
      productService: '',
      objective: 'ads',
      selectedPackage: selectedPackage || 'standard',
      targetDate: '',
      description: '',
      _gotcha: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData._gotcha) {
      console.warn('Bot detected by honeypot');
      return;
    }

    // Rate limiting (10 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      onShowToast('Bạn đang gửi quá nhanh. Vui lòng chờ vài giây trước khi gửi lại.');
      return;
    }

    if (!validate()) {
      onShowToast('Vui lòng kiểm tra lại các trường thông tin có thông báo lỗi.');
      return;
    }

    setIsSubmitting(true);

    // Map labels for human readable email notification
    const pkgObj = FORM_DATA.packageOptions.find((p) => p.value === formData.selectedPackage);
    const objObj = FORM_DATA.objectiveOptions.find((o) => o.value === formData.objective);
    const packageLabel = pkgObj ? pkgObj.label : (formData.selectedPackage || 'Gói Tiêu Chuẩn');
    const objectiveLabel = objObj ? objObj.label : formData.objective;

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const fbLeadId = 'DUDI-' + randomSuffix;
    const fbCreatedAt = new Date().toISOString();
    const requirementsText = `Mục tiêu: ${objectiveLabel} | SP/Dịch vụ: ${formData.productService || 'Chưa điền'} | Hạn hoàn thành: ${formData.targetDate || 'Càng sớm càng tốt'} | Ghi chú: ${formData.description || 'Không có'}`;

    // =========================================================================
    // 1. GỬI ĐỒNG THỜI VÀO FIREBASE FIRESTORE (DASHBOARD REALTIME VERCEL)
    // =========================================================================
    const FIREBASE_PROJECT_ID = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || 'dudi-leads';
    const FIREBASE_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || 'AIzaSyBv2l4OH6dtaBqCx5D_rxtDT2HkMPfZ3kA';

    const fbUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/leads/${fbLeadId}?key=${FIREBASE_API_KEY}`;
    
    const fbPayload = {
      fields: {
        id: { stringValue: fbLeadId },
        customerName: { stringValue: formData.fullName.trim() || 'Khách hàng' },
        phone: { stringValue: formData.phone.trim() || 'Chưa cung cấp' },
        email: { stringValue: 'Chưa cung cấp' },
        company: { stringValue: formData.companyName.trim() || 'Khách cá nhân' },
        serviceId: { stringValue: 'dudi-dichvu' },
        serviceName: { stringValue: 'Landing Page CRO' },
        budget: { stringValue: packageLabel },
        source: { stringValue: 'Website Landing Page CRO' },
        sourceUrl: { stringValue: typeof window !== 'undefined' ? window.location.href : 'https://dudi-dichvu.vercel.app' },
        status: { stringValue: 'new' },
        priority: { stringValue: 'high' },
        createdAt: { stringValue: fbCreatedAt },
        requirements: { stringValue: requirementsText }
      }
    };

    // Firebase Sync Promise
    const fbPromise = fetch(fbUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fbPayload)
    }).then(res => {
      console.log('🔥 [Firebase Live] Lead synced to Dashboard:', fbLeadId, res.status);
    }).catch(err => console.warn('Firebase sync warning:', err));

    // Google Apps Script Payload & Promise
    const payload = {
      lead_id: fbLeadId,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim() || 'Cá nhân / Chưa đặt tên',
      productService: formData.productService.trim(),
      selectedPackage: formData.selectedPackage,
      packageLabel: packageLabel,
      objective: formData.objective,
      objectiveLabel: objectiveLabel,
      targetDate: formData.targetDate || 'Càng sớm càng tốt',
      description: formData.description.trim() || 'Không có ghi chú thêm',
      recipientEmail: GOOGLE_SCRIPT_CONFIG.recipientEmail,
      landingUrl: metaInfo.landingUrl || (typeof window !== 'undefined' ? window.location.href : ''),
      utmSource: metaInfo.utmSource,
      referrer: metaInfo.referrer,
      createdAt: fbCreatedAt,
    };

    let googleScriptPromise = Promise.resolve();
    if (GOOGLE_SCRIPT_CONFIG.webAppUrl && !GOOGLE_SCRIPT_CONFIG.webAppUrl.includes('SAMPLE_')) {
      googleScriptPromise = fetch(GOOGLE_SCRIPT_CONFIG.webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(err => console.warn('Google Script Submission Log:', err));
    }

    // Fast resolution: Set a max timeout of 600ms so the user transitions to Success screen instantly!
    const fastTimeout = new Promise(resolve => setTimeout(resolve, 350));
    
    // Wait either for background tasks or max 350ms for instantaneous user feedback
    await Promise.race([
      Promise.allSettled([fbPromise, googleScriptPromise]),
      fastTimeout
    ]);

    // Transition immediately to Success State
    setIsSubmitting(false);
    setIsSubmitted(true);
    setLastSubmitTime(Date.now());
    onShowToast('Gửi thông tin đăng ký thành công! DUDI Software sẽ liên hệ lại ngay.');

    // Scroll to success card smoothly
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'lead_form_submit',
        package: formData.selectedPackage,
        objective: formData.objective,
        meta: metaInfo,
      });
    }
  };

  return (
    <section id="contact" className="section contact-bg-custom">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Send size={14} color="#dc2626" />
            <span>Tư Vấn Miễn Phí</span>
          </div>
          <h2 className="section-title">{FORM_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{FORM_DATA.sectionSubtitle}</p>
        </div>

        <div className="contact-form-wrapper">
          {isSubmitted ? (
            /* Success State */
            <div className="form-success-card animate-fade-in">
              <div className="success-icon-box">
                <CheckCircle2 size={48} color="#10b981" />
              </div>
              <h3 className="success-title">Đăng Ký Tư Vấn Thành Công!</h3>
              <p className="success-message">
                Cảm ơn <strong>{formData.fullName}</strong>. Chuyên viên của{' '}
                <strong>{COMPANY_INFO.name}</strong> đã nhận được yêu cầu tư vấn gói{' '}
                <strong>
                  {FORM_DATA.packageOptions.find((p) => p.value === formData.selectedPackage)?.label || formData.selectedPackage}
                </strong>
                . Chúng tôi sẽ liên hệ lại qua số điện thoại <strong>{formData.phone}</strong> trong vòng 30 phút.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn btn-primary"
                >
                  <span>Gửi thêm yêu cầu khác</span>
                </button>
                <a
                  href={`tel:${COMPANY_INFO.hotlineRaw}`}
                  className="btn btn-secondary"
                >
                  <PhoneCall size={16} />
                  <span>Gọi Hotline {COMPANY_INFO.hotline}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} noValidate className="lead-form">
              {/* Honeypot hidden input for anti-bot spam */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="form-grid">
                {/* 1. Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Họ và tên <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                    maxLength={100}
                    required
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                {/* 2. Phone / Zalo */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại / Zalo <span className="req-star">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ví dụ: 0909 163 821"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    maxLength={20}
                    required
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                {/* 3. Company Name */}
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">
                    Tên doanh nghiệp / Đơn vị
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Tên công ty hoặc thương hiệu của bạn"
                    className="form-input"
                    maxLength={150}
                  />
                </div>

                {/* 4. Product / Service */}
                <div className="form-group">
                  <label htmlFor="productService" className="form-label">
                    Sản phẩm / Dịch vụ cần thiết kế <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="productService"
                    name="productService"
                    value={formData.productService}
                    onChange={handleChange}
                    placeholder="Ví dụ: Khóa học trực tuyến, Mỹ phẩm, Bất động sản..."
                    className={`form-input ${errors.productService ? 'input-error' : ''}`}
                    maxLength={150}
                    required
                  />
                  {errors.productService && (
                    <span className="error-text">{errors.productService}</span>
                  )}
                </div>

                {/* 5. Objective */}
                <div className="form-group">
                  <label htmlFor="objective" className="form-label">
                    Mục tiêu chính của Landing Page
                  </label>
                  <select
                    id="objective"
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {FORM_DATA.objectiveOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Selected Package (Auto updated on CTA click) */}
                <div className="form-group">
                  <label htmlFor="selectedPackage" className="form-label">
                    Gói dịch vụ quan tâm
                  </label>
                  <select
                    id="selectedPackage"
                    name="selectedPackage"
                    value={formData.selectedPackage}
                    onChange={handleChange}
                    className="form-select package-highlight-select"
                  >
                    {FORM_DATA.packageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Target Date (No past dates) */}
                <div className="form-group">
                  <label htmlFor="targetDate" className="form-label">
                    Ngày dự kiến cần chạy
                  </label>
                  <input
                    type="date"
                    id="targetDate"
                    name="targetDate"
                    min={todayStr}
                    value={formData.targetDate}
                    onChange={handleChange}
                    className={`form-input ${errors.targetDate ? 'input-error' : ''}`}
                  />
                  {errors.targetDate && <span className="error-text">{errors.targetDate}</span>}
                </div>

                {/* 8. Description */}
                <div className="form-group form-group-full">
                  <label htmlFor="description" className="form-label">
                    Mô tả yêu cầu chi tiết hoặc câu hỏi thêm
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Hãy chia sẻ thêm về mong muốn, mẫu trang đích bạn thích, hoặc tính năng đặc thù..."
                    className="form-textarea"
                    maxLength={1000}
                  ></textarea>
                </div>
              </div>

              {/* Form Footer & Submit */}
              <div className="form-footer-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg submit-btn"
                >
                  {isSubmitting ? (
                    <span>Đang gửi thông tin...</span>
                  ) : (
                    <>
                      <span>Gửi thông tin đăng ký tư vấn</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                <div className="form-security-note">
                  <Lock size={14} color="#64748b" />
                  <span>
                    Thông tin của quý khách được bảo mật tuyệt đối theo quy định pháp luật.
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}