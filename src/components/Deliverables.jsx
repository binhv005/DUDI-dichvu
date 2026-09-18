import React, { useRef, useState, useEffect } from 'react';
import {
  PackageCheck,
  FileCode,
  Palette,
  Database,
  Activity,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  FileText,
  Server,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from 'lucide-react';
import { DELIVERABLES_DATA } from '../data/content';

export const DELIVERABLE_CARDS = [
  {
    id: 'deliv-1',
    category: 'MÃ NGUỒN SẠCH',
    categoryTheme: 'theme-red',
    icon: FileCode,
    title: 'Toàn Bộ Mã Nguồn Hoàn Chỉnh',
    desc: 'Bàn giao source code sạch, tối ưu hiệu năng cao, sẵn sàng triển khai trên Hosting hoặc tên miền của khách hàng.',
    badge: '100% Source Code',
  },
  {
    id: 'deliv-2',
    category: 'THIẾT KẾ ĐỘC QUYỀN',
    categoryTheme: 'theme-purple',
    icon: Palette,
    title: 'Thiết Kế UI/UX Độc Quyền & Chuẩn Mobile',
    desc: 'Giao diện hiện đại, chuẩn nhận diện thương hiệu, tương thích hoàn hảo trên Desktop, Tablet và Mobile.',
    badge: 'Mobile-First',
  },
  {
    id: 'deliv-3',
    category: 'FORM & TỰ ĐỘNG HÓA',
    categoryTheme: 'theme-emerald',
    icon: Database,
    title: 'Hệ Thống Thu Thập Dữ Liệu Form Tự Động',
    desc: 'Form đăng ký kết nối trực tiếp gửi thông báo về Email, Google Sheets hoặc hệ thống CRM nội bộ.',
    badge: 'Auto Sync',
  },
  {
    id: 'deliv-4',
    category: 'ĐO LƯỜNG CHUYỂN ĐỔI',
    categoryTheme: 'theme-blue',
    icon: Activity,
    title: 'Tích Hợp Mã Đo Lường Quảng Cáo',
    desc: 'Cài đặt chuẩn Google Analytics 4, Facebook Pixel / CAPI, TikTok Pixel, Google Tag Manager.',
    badge: 'Tracking Pixel',
  },
  {
    id: 'deliv-5',
    category: 'HIỆU NĂNG & SEO',
    categoryTheme: 'theme-amber',
    icon: Gauge,
    title: 'Tối Ưu Tốc Độ & SEO On-Page Cơ Bản',
    desc: 'Tối ưu nén ảnh, thẻ Meta, OpenGraph, chuẩn SEO kỹ thuật và điểm Google PageSpeed cao.',
    badge: 'Speed > 90',
  },
  {
    id: 'deliv-6',
    category: 'TƯ LIỆU ĐẦU VÀO',
    categoryTheme: 'theme-sky',
    icon: Layers,
    title: 'Logo & Quy Chuẩn Nhận Diện',
    desc: 'Khách hàng cung cấp logo và màu sắc thương hiệu để đồng bộ nhận diện xuyên suốt trên trang đích.',
    badge: 'Thương Hiệu',
  },
  {
    id: 'deliv-7',
    category: 'PHÁP LÝ & MINH BẠCH',
    categoryTheme: 'theme-indigo',
    icon: ShieldCheck,
    title: 'Thông Tin Giới Thiệu & Pháp Lý Doanh Nghiệp',
    desc: 'Giấy phép, mã số thuế, địa chỉ và thông tin chính thống tạo sự tin tưởng tuyệt đối cho khách mua hàng.',
    badge: 'Minh Bạch',
  },
  {
    id: 'deliv-8',
    category: 'TÀI SẢN HÌNH ẢNH',
    categoryTheme: 'theme-rose',
    icon: Sparkles,
    title: 'Hình Ảnh Sản Phẩm & Dịch Vụ Thực Tế',
    desc: 'Hình ảnh sản phẩm, cơ sở vật chất chất lượng sắc nét giúp khách hàng an tâm ra quyết định.',
    badge: 'Visual HD',
  },
  {
    id: 'deliv-9',
    category: 'THÔNG ĐIỆP BÁN HÀNG',
    categoryTheme: 'theme-teal',
    icon: FileText,
    title: 'Nội Dung Văn Bản & Brief Mong Muốn',
    desc: 'Văn bản cơ bản hoặc brief mong muốn truyền tải, DUDI sẽ cùng tối ưu câu từ chốt sales đắt giá nhất.',
    badge: 'Sales Content',
  },
  {
    id: 'deliv-10',
    category: 'HẠ TẦNG CLOUD',
    categoryTheme: 'theme-cyan',
    icon: Server,
    title: 'Tên Miền & Dịch Vụ Lưu Trữ (Hosting)',
    desc: 'Hỗ trợ trỏ tên miền, cấu hình SSL và triển khai hoàn thiện lên Cloud Server cho khách hàng.',
    badge: 'Cloud Ready',
  },
];

export default function Deliverables() {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Triple items for seamless infinite wrap
  const displayItems = [...DELIVERABLE_CARDS, ...DELIVERABLE_CARDS, ...DELIVERABLE_CARDS];

  // Auto-scroll loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Set initial middle position
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft === 0) {
      el.scrollLeft = singleSetWidth;
    }

    const autoSpeed = 0.75;

    const tick = () => {
      if (!isDraggingRef.current && !isHovered) {
        el.scrollLeft += autoSpeed;

        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += singleSetWidth;
        }
      }
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isHovered]);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.6; // multiplier for responsive drag
    el.scrollLeft = scrollLeftRef.current - walk;

    const now = performance.now();
    const dt = now - lastTimeRef.current || 16;
    const dx = e.pageX - lastXRef.current;
    velocityRef.current = dx / dt;
    lastXRef.current = e.pageX;
    lastTimeRef.current = now;

    // Infinite wrap check
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
      scrollLeftRef.current -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
      scrollLeftRef.current += singleSetWidth;
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    // Momentum fling
    const el = containerRef.current;
    if (!el || Math.abs(velocityRef.current) < 0.2) return;

    let v = velocityRef.current * 16;
    const friction = 0.93;
    const singleSetWidth = el.scrollWidth / 3;

    const momentumStep = () => {
      if (isDraggingRef.current) return;
      el.scrollLeft -= v;
      v *= friction;

      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += singleSetWidth;
      }

      if (Math.abs(v) > 0.4) {
        requestAnimationFrame(momentumStep);
      }
    };
    requestAnimationFrame(momentumStep);
  };

  // Touch Handlers for Mobile & Trackpad
  const handleTouchStart = (e) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;

    const now = performance.now();
    const dt = now - lastTimeRef.current || 16;
    const dx = e.touches[0].pageX - lastXRef.current;
    velocityRef.current = dx / dt;
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = now;

    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
      scrollLeftRef.current -= singleSetWidth;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
      scrollLeftRef.current += singleSetWidth;
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // Wheel horizontal gliding
  const handleWheel = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 3) {
      el.scrollLeft += delta * 1.2;
      const singleSetWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += singleSetWidth;
      }
    }
  };

  const slideBy = (offset) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="deliverables" className="section deliverables-marquee-section bg-red-tint">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <PackageCheck size={14} color="#dc2626" />
            <span>Tiêu Chuẩn Bàn Giao</span>
          </div>
          <h2 className="section-title">{DELIVERABLES_DATA.sectionTitle}</h2>
          <p className="section-subtitle">{DELIVERABLES_DATA.sectionSubtitle}</p>
        </div>
      </div>

      {/* Interactive Horizontal Drag & Scroll Track */}
      <div
        className="deliverables-interactive-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUp();
        }}
      >
        {/* Quick Nav Controls */}
        <button
          type="button"
          onClick={() => slideBy(-340)}
          className="deliverables-nav-arrow arrow-left"
          aria-label="Trượt sang trái"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={() => slideBy(340)}
          className="deliverables-nav-arrow arrow-right"
          aria-label="Trượt sang phải"
        >
          <ChevronRight size={22} />
        </button>

        {/* Scrollable Container with direct drag & touch support */}
        <div
          ref={containerRef}
          className={`deliverables-drag-container ${isDragging ? 'is-dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div className="deliverables-drag-track">
            {displayItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`deliverable-marquee-card ${item.categoryTheme}`}
                >
                  {/* Top Badge & Icon */}
                  <div className="marquee-card-top">
                    <div className="marquee-icon-box">
                      <Icon size={18} />
                    </div>
                    <span className="marquee-category-pill">{item.category}</span>
                  </div>

                  {/* Card Title & Desc */}
                  <h3 className="marquee-card-title">{item.title}</h3>
                  <p className="marquee-card-desc">{item.desc}</p>

                  {/* Bottom Footer Feature Tag */}
                  <div className="marquee-card-footer">
                    <div className="marquee-feature-tag">
                      <CheckCircle2 size={12} />
                      <span>{item.badge}</span>
                    </div>
                    <span className="marquee-standard-dot">● Chuẩn DUDI</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag Hint Tag */}
        <div className="deliverables-drag-hint">
          <MoveHorizontal size={13} />
          <span>Kéo chuột hoặc vuốt để lướt nhanh hơn</span>
        </div>
      </div>
    </section>
  );
}

