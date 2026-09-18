export const COMPANY_INFO = {
  name: "Công ty TNHH Giải Pháp Phần Mềm DUDI",
  shortName: "DUDI SOFTWARE",
  slogan: "Giải Pháp Thiết Kế Landing Page Tối Ưu Chuyển Đổi",
  taxCode: "0319641544",
  hotline: "0909 163 821",
  hotlineRaw: "0909163821",
  email: "contact@dudisoftware.com",
  address: "49/2 Đường 14, Phường Thủ Đức, Thành phố Hồ Chí Minh",
  zaloUrl: "https://zalo.me/0909163821",
  workingHours: "Thứ 2 - Thứ 7: 8:00 - 18:00",
};

export const NAV_ITEMS = [
  { id: "target-audience", label: "Đối tượng" },
  { id: "problems", label: "Thực trạng" },
  { id: "deliverables", label: "Hạng mục" },
  { id: "pricing", label: "Bảng giá" },
  { id: "process", label: "Quy trình" },
  { id: "cases", label: "Dự án mẫu" },
  { id: "limitations", label: "Phạm vi" },
  {
    id: "web-system",
    label: "Hệ thống web",
    children: [
      { label: "Cập nhật", href: "https://dudi-page.vercel.app/" },
      { label: "Đơn giá", href: "https://dudi-dongia.vercel.app/" },
      { label: "Bán hàng", href: "https://dudi-banhang.vercel.app/" },
      { label: "SEO", href: "https://dudisoftwareseo.vercel.app/" },
      { label: "Bảo trì", href: "https://dudi-baotri.vercel.app/" },
      { label: "Giới thiệu", href: "https://dudi-gioithieu.vercel.app/" },
      { label: "Tổng hợp", href: "https://dudi-tonghop.vercel.app/" },
    ],
  },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Liên hệ" },
];

export const HERO_DATA = {
  badge: "Dịch Vụ Thiết Kế Landing Page Chuyên Nghiệp DUDI SOFTWARE",
  h1: "Thiết Kế Landing Page Tối Ưu Chuyển Đổi — Chuẩn Nhận Diện & Tăng Tốc Bán Hàng",
  description:
    "Giải pháp thiết kế Landing Page trọn gói từ DUDI Software giúp doanh nghiệp truyền tải trọn vẹn thông điệp sản phẩm, tối ưu trải nghiệm người dùng và gia tăng tỷ lệ chuyển đổi đơn hàng hiệu quả.",
  priceHighlight: "Chi phí đầu tư chỉ từ 2.500.000 VNĐ / trang đích trọn gói",
  primaryCta: {
    label: "Đăng ký tư vấn ngay",
    targetId: "contact",
  },
  secondaryCta: {
    label: "Xem bảng gói dịch vụ",
    targetId: "pricing",
  },
  highlights: [
    "Giao diện chuẩn Responsive 100%",
    "Tối ưu tốc độ tải trang dưới 2s",
    "Tích hợp đo lường GA4, Pixel chuẩn xác",
    "Bàn giao source code & hướng dẫn sử dụng",
  ],
};

export const TARGET_AUDIENCE_DATA = {
  sectionTitle: "Đối Tượng Phù Hợp",
  sectionSubtitle:
    "Giải pháp tối ưu cho từng mô hình kinh doanh và mục tiêu chiến dịch cụ thể",
  items: [
    {
      id: "ads-business",
      title: "Doanh Nghiệp Chạy Ads",
      desc: "Tải siêu tốc < 2s, giữ chân khách và tối đa hóa chuyển đổi Ads.",
      needs: "Chuẩn Pixel/GA4, form mượt, tốc độ cao.",
      suggestedPackage: "Tiêu chuẩn",
      packageId: "standard",
    },
    {
      id: "b2b-corporate",
      title: "Doanh Nghiệp B2B & Dịch Vụ",
      desc: "Nâng tầm uy tín thương hiệu và thu thập data khách tiềm năng.",
      needs: "Giao diện cao cấp, chuẩn nhận diện, kết nối CRM.",
      suggestedPackage: "Cao cấp",
      packageId: "premium",
    },
    {
      id: "startup-product",
      title: "Startup & Sản Phẩm Mới",
      desc: "Ra mắt sản phẩm, kiểm thử thị trường và thu thập Waitlist sớm.",
      needs: "Triển khai nhanh 2-3 ngày, tối ưu chi phí.",
      suggestedPackage: "Cơ bản",
      packageId: "basic",
    },
    {
      id: "redesign-revamp",
      title: "Tái Cấu Trúc Page Cũ",
      desc: "Khắc phục trang cũ tải chậm, vỡ giao diện smartphone.",
      needs: "Chuẩn Mobile-First, UI/UX hiện đại.",
      suggestedPackage: "Tiêu chuẩn",
      packageId: "standard",
    },
  ],
};

export const PROBLEMS_DATA = {
  sectionTitle: "Thực Trạng Khách Hàng Thường Gặp",
  sectionSubtitle:
    "Những rào cản phổ biến khiến chiến dịch quảng cáo chưa đạt hiệu quả chuyển đổi mong muốn",
  items: [
    {
      number: "01",
      tag: "Tốc Độ",
      title: "Tải Trang Chậm",
      highlight: "Mất 53%+ Khách Hàng",
      bulletPoints: ["PageSpeed dưới 50 điểm", "Ảnh nặng chưa nén tối ưu", "Lãng phí lớn ngân sách Ads"],
      detail: {
        subtitle: "Tốc độ tải trang quyết định hơn 50% sự thành bại của chiến dịch quảng cáo",
        symptom: "Trang web load nặng nề, mất từ 4 - 8 giây để hiển thị đầy đủ hình ảnh, hiệu ứng và nội dung.",
        impact: "Theo Google, hơn 53% người dùng sẽ rời bỏ nếu trang tải quá 3s. Doanh nghiệp vừa mất tiền click vừa mất khách hàng.",
        solution: "DUDI tối ưu mã nguồn thuần, nén ảnh WebP chuẩn nét nhẹ, cam kết PageSpeed 90+ và thời gian tải dưới 1.5s.",
        metrics: [
          { label: "Thời gian tải", before: "4 - 8s", after: "< 1.5s" },
          { label: "Google PageSpeed", before: "30 - 55", after: "90 - 99" },
          { label: "Tỷ lệ thoát (Bounce)", before: "65%+", after: "< 25%" },
        ],
      },
    },
    {
      number: "02",
      tag: "Mobile",
      title: "Chưa Chuẩn Mobile",
      highlight: "80%+ Lưu Lượng Truy Cập",
      bulletPoints: ["Layout bị co kéo trên điện thoại", "Nút bấm nhỏ khó thao tác", "Trải nghiệm cuộn trang lag"],
      detail: {
        subtitle: "Hơn 80% người dùng tiếp cận quảng cáo qua thiết bị di động",
        symptom: "Giao diện kéo ngang, chữ li ti khó đọc, nút bấm quá sát nhau dễ bấm nhầm trên màn hình dọc.",
        impact: "Khách hàng khó tìm nút đặt mua hoặc không thể điền form trên điện thoại, dẫn đến thoát trang ngay.",
        solution: "Thiết kế chuẩn Mobile-First 100%, tối ưu vùng thao tác ngón tay cái (Thumb-Zone), chạm là mua.",
        metrics: [
          { label: "Tương thích di động", before: "Kém", after: "100% Hoàn hảo" },
          { label: "Tỷ lệ cuộn hết trang", before: "28%", after: "78%+" },
          { label: "Tỷ lệ gửi form mobile", before: "1.2%", after: "6.5%+" },
        ],
      },
    },
    {
      number: "03",
      tag: "Bố Cục",
      title: "Bố Cục Rối, CTA Mờ",
      highlight: "Mất Điểm Nhấn Bán Hàng",
      bulletPoints: ["Nội dung lan man, thiếu điểm nhấn", "Nút CTA chìm, đặt sai vị trí", "Thiếu phễu tâm lý chốt đơn"],
      detail: {
        subtitle: "Cấu trúc thông điệp quyết định tốc độ ra quyết định mua của khách hàng",
        symptom: "Quá nhiều chữ không cần thiết, thiếu phân cấp thị giác rõ ràng, nút kêu gọi hành động (CTA) mờ nhạt.",
        impact: "Người đọc không nắm được ưu điểm cốt lõi sau 5 giây đầu tiên, dẫn đến lướt qua rồi bỏ đi.",
        solution: "Áp dụng phễu nội dung tâm lý AIDA chuẩn UX, thiết kế CTA nổi bật kích thích chốt đơn nhanh.",
        metrics: [
          { label: "Thời gian hiểu thông điệp", before: "> 15s", after: "< 3s" },
          { label: "Click nút kêu gọi (CTA)", before: "2.1%", after: "8.4%+" },
          { label: "Điểm phân cấp thị giác", before: "Thấp", after: "Cao cấp" },
        ],
      },
    },
    {
      number: "04",
      tag: "Đo Lường",
      title: "Thiếu Đo Lường Ads",
      highlight: "Chạy Ads Không Đo Lường",
      bulletPoints: ["Chưa gắn chuẩn Pixel / GA4", "Không đo được sự kiện bấm nút", "Khó tối ưu tệp đối tượng"],
      detail: {
        subtitle: "Không có dữ liệu đo lường chuẩn xác khiến bạn 'đốt tiền mù' cho quảng cáo",
        symptom: "Không cài đặt hoặc cài sai GA4, Facebook Pixel, TikTok Event khiến số liệu báo cáo bị lệch hoàn toàn.",
        impact: "Không biết khách rớt ở bước nào; AI Facebook/TikTok không có dữ liệu để tối ưu tệp khách hàng mua.",
        solution: "Cài đặt trọn bộ tracking sự kiện chuẩn xác: PageView, Scroll, Click Zalo/Phone, Submit Form Thành Công.",
        metrics: [
          { label: "Độ chính xác dữ liệu", before: "< 40%", after: "99.9%" },
          { label: "Sự kiện được đo", before: "0 - 1", after: "8+ Events" },
          { label: "Tối ưu ngân sách Ads", before: "Đoán mò", after: "Dựa trên Data" },
        ],
      },
    },
    {
      number: "05",
      tag: "Chi Phí",
      title: "Phí Nền Tảng Cao",
      highlight: "Phí Định Kỳ Hàng Tháng",
      bulletPoints: ["Phí duy trì 3-10tr/năm kéo dài", "Bị giới hạn tính năng tùy biến", "Không toàn quyền sở hữu code"],
      detail: {
        subtitle: "Mô hình thuê bao nền tảng tốn kém chi phí tích lũy theo năm tháng",
        symptom: "Phải trả phí thuê nền tảng đều đặn hàng năm; khi muốn nâng cấp tính năng riêng thì bị giới hạn.",
        impact: "Tổng chi phí sau 2 - 3 năm đội lên rất lớn. Nếu ngừng đóng phí, toàn bộ website sẽ bị ngưng hoạt động.",
        solution: "DUDI bàn giao 100% mã nguồn sạch, khách hàng sở hữu vĩnh viễn, hoàn toàn KHÔNG mất phí duy trì tháng.",
        metrics: [
          { label: "Phí duy trì nền tảng", before: "3 - 10tr/năm", after: "0 VNĐ" },
          { label: "Quyền sở hữu source", before: "Thuê lại", after: "100% Vĩnh viễn" },
          { label: "Khả năng tùy biến", before: "Bị giới hạn", after: "Không giới hạn" },
        ],
      },
    },
  ],
};

export const DELIVERABLES_DATA = {
  sectionTitle: "Hạng Mục Bàn Giao & Quy Chuẩn Kỹ Thuật",
  sectionSubtitle:
    "Cam kết minh bạch về sản phẩm đầu ra, chất lượng mã nguồn và tiêu chuẩn kỹ thuật",
  deliverablesList: [
    {
      title: "Toàn Bộ Mã Nguồn Hoàn Chỉnh",
      desc: "Source code sạch, tối ưu hiệu năng cao, bàn giao trọn gói vĩnh viễn.",
    },
    {
      title: "Thiết Kế UI/UX Chuẩn Mobile",
      desc: "Giao diện độc quyền, nhận diện thương hiệu chuẩn nét trên mọi thiết bị.",
    },
    {
      title: "Thu Thập Dữ Liệu Form Tự Động",
      desc: "Kết nối gửi thông báo tức thì về Email, Google Sheets và CRM nội bộ.",
    },
    {
      title: "Tích Hợp Mã Đo Lường Quảng Cáo",
      desc: "Cài đặt chuẩn GA4, Facebook Pixel / CAPI, TikTok Pixel & Event tracking.",
    },
    {
      title: "Tối Ưu Tốc Độ & SEO On-Page",
      desc: "Tối ưu nén ảnh WebP, thẻ Meta, chuẩn SEO kỹ thuật và điểm PageSpeed cao.",
    },
  ],
  clientPrerequisites: [
    "Logo và quy chuẩn nhận diện thương hiệu",
    "Thông tin giới thiệu, liên hệ và pháp lý",
    "Hình ảnh sản phẩm, dịch vụ thực tế",
    "Nội dung văn bản mong muốn truyền tải",
    "Tên miền & hosting (DUDI sẵn sàng tư vấn)",
  ],
};

export const PRICING_DATA = {
  sectionTitle: "Bảng Giá Gói Dịch Vụ Thiết Kế Landing Page",
  sectionSubtitle:
    "Chi phí trọn gói rõ ràng, minh bạch — Không phát sinh chi phí ẩn",
  packages: [
    {
      id: "basic",
      name: "Gói Cơ Bản",
      targetAudience: "Phù hợp ra mắt sản phẩm thử nghiệm, bán lẻ đơn giản, ngân sách tiết kiệm",
      price: "2.500.000",
      unit: "VNĐ",
      isPopular: false,
      badge: "Tiết kiệm",
      ctaLabel: "Chọn Gói Cơ Bản",
      features: [
        { label: "Quy mô", value: "4 - 5 Sections tiêu chuẩn" },
        { label: "Thiết kế", value: "UI/UX chuẩn Responsive, hiện đại" },
        { label: "Form đăng ký", value: "Gửi thông tin trực tiếp về Email" },
        { label: "Đo lường", value: "Cài đặt Google Analytics 4 & 1 Pixel" },
        { label: "SEO Onpage", value: "Thẻ Meta Title, Description, OpenGraph" },
        { label: "Tích hợp", value: "Nút gọi Hotline, Chat Zalo, Messenger" },
        { label: "Chỉnh sửa", value: "2 vòng chỉnh sửa sau khi demo" },
        { label: "Thời gian", value: "2 - 3 ngày làm việc" },
      ],
      scope: "Bàn giao mã nguồn hoàn thiện, hỗ trợ trỏ tên miền lên hosting.",
    },
    {
      id: "standard",
      name: "Gói Tiêu Chuẩn",
      targetAudience: "Lựa chọn tối ưu cho doanh nghiệp chạy Ads đa kênh và tăng tốc bán hàng",
      price: "4.500.000",
      unit: "VNĐ",
      isPopular: true,
      badge: "Phổ Biến Nhất",
      ctaLabel: "Chọn Gói Tiêu Chuẩn",
      features: [
        { label: "Quy mô", value: "6 - 8 Sections chuyển đổi chuyên sâu" },
        { label: "Thiết kế", value: "UI/UX tùy biến cao cấp, animation mượt" },
        { label: "Form đăng ký", value: "Gửi Email + Tự động lưu Google Sheets" },
        { label: "Đo lường", value: "GA4 + Facebook CAPI + TikTok Pixel + Event Tracking" },
        { label: "SEO & Tốc độ", value: "Tối ưu Core Web Vitals, Schema JSON-LD" },
        { label: "Tích hợp", value: "Hotline, Zalo, Messenger, Popup ưu đãi" },
        { label: "Chỉnh sửa", value: "3 vòng chỉnh sửa hoàn thiện" },
        { label: "Thời gian", value: "4 - 5 ngày làm việc" },
      ],
      scope: "Bàn giao source code, bảo hành kỹ thuật 6 tháng, tối ưu PageSpeed.",
    },
    {
      id: "premium",
      name: "Gói Cao Cấp",
      targetAudience: "Dành cho thương hiệu lớn, doanh nghiệp B2B, chiến dịch quy mô toàn diện",
      price: "7.500.000",
      unit: "VNĐ",
      isPopular: false,
      badge: "Chuyên Sâu",
      ctaLabel: "Chọn Gói Cao Cấp",
      features: [
        { label: "Quy mô", value: "9 - 12 Sections đa tầng nội dung" },
        { label: "Thiết kế", value: "Thiết kế độc quyền, micro-interactions sáng tạo" },
        { label: "Form & CRM", value: "Tích hợp trực tiếp CRM/ERP, SMS/Email Automation" },
        { label: "Đo lường", value: "Toàn bộ Funnel chuyển đổi + GTM + Server CAPI" },
        { label: "SEO Kỹ thuật", value: "Tối ưu SEO toàn diện, Schema chuyên biệt" },
        { label: "Tích hợp", value: "Đa ngôn ngữ, Cổng thanh toán hoặc API tùy biến" },
        { label: "Chỉnh sửa", value: "4 vòng chỉnh sửa chi tiết" },
        { label: "Thời gian", value: "6 - 8 ngày làm việc" },
      ],
      scope: "Bàn giao đầy đủ mã nguồn, tài liệu hướng dẫn vận hành, bảo hành kỹ thuật 12 tháng.",
    },
  ],
};

export const PROCESS_DATA = {
  sectionTitle: "Quy Trình Triển Khai Chuyên Nghiệp",
  sectionSubtitle:
    "9 bước tiêu chuẩn đảm bảo chất lượng, đúng tiến độ và minh bạch từng giai đoạn",
  steps: [
    {
      step: "01",
      title: "Tiếp Nhận",
      desc: "Ghi nhận yêu cầu ban đầu, thông tin sản phẩm/dịch vụ và mục tiêu chiến dịch của khách hàng.",
    },
    {
      step: "02",
      title: "Xác Nhận & Tư Vấn",
      desc: "Phân tích nhóm đối tượng mục tiêu, tư vấn cấu trúc section và đề xuất gói dịch vụ tối ưu.",
    },
    {
      step: "03",
      title: "Chốt Brief",
      desc: "Thống nhất phạm vi công việc, thời gian thực hiện, tài liệu khách cung cấp và chi phí hợp đồng.",
    },
    {
      step: "04",
      title: "Lên Wireframe",
      desc: "Xây dựng khung cấu trúc phân tầng các khối nội dung và bố cục trước khi thiết kế đồ họa chi tiết.",
    },
    {
      step: "05",
      title: "Tối Ưu Nội Dung",
      desc: "Soạn thảo và sắp xếp tiêu đề, thông điệp chuyển đổi, lợi ích và câu chữ kêu gọi hành động (CTA).",
    },
    {
      step: "06",
      title: "Thiết Kế UI/UX",
      desc: "Thiết kế giao diện trực quan với màu sắc thương hiệu, hình ảnh sắc nét và bố cục bắt mắt.",
    },
    {
      step: "07",
      title: "Lập Trình (Code)",
      desc: "Chuyển đổi thiết kế thành mã nguồn chuẩn React/HTML5/CSS3, tối ưu Responsive và tích hợp form.",
    },
    {
      step: "08",
      title: "Kiểm Thử (Test)",
      desc: "Kiểm tra hiển thị đa thiết bị, tốc độ tải trang, luồng nhận dữ liệu form và các mã tracking.",
    },
    {
      step: "09",
      title: "Nghiệm Thu & Bàn Giao",
      desc: "Khách hàng duyệt hoàn thiện, bàn giao source code, cấu hình tên miền và hướng dẫn quản trị.",
    },
  ],
};

export const CASES_DATA = {
  sectionTitle: "Dự Án Mẫu & Đã Nghiệm Thu",
  sectionSubtitle:
    "Các dự án thực tế được xây dựng theo đúng quy chuẩn thiết kế và kỹ thuật tối ưu chuyển đổi",
  items: [
    {
      id: "case-edu",
      industry: "Giáo Dục & Đào Tạo",
      title: "Landing Page Khóa Học Trực Tuyến & Workshop",
      objective: "Thu hút học viên đăng ký tư vấn lộ trình và tham gia buổi học thử miễn phí.",
      sectionsCount: "7 sections",
      status: "Đã nghiệm thu & Đang hoạt động",
      tech: "React, Tối ưu Form, GA4 Tracking",
      imageCategory: "Education & Courses",
    },
    {
      id: "case-realestate",
      industry: "Bất Động Sản",
      title: "Landing Page Dự Án Khu Đô Thị & Nghỉ Dưỡng",
      objective: "Thu thập Lead khách hàng có nhu cầu nhận bảng giá và đăng ký tham quan nhà mẫu.",
      sectionsCount: "8 sections",
      status: "Đã nghiệm thu & Đang hoạt động",
      tech: "Responsive, Popup Form, Facebook CAPI",
      imageCategory: "Real Estate & Architecture",
    },
    {
      id: "case-cosmetics",
      industry: "Làm Đẹp & Mỹ Phẩm",
      title: "Landing Page Ra Mắt Bộ Sản Phẩm Dưỡng Da Thiên Nhiên",
      objective: "Giới thiệu thành phần tự nhiên, chứng nhận an toàn và thúc đẩy đặt mua combo ưu đãi.",
      sectionsCount: "6 sections",
      status: "Đã nghiệm thu & Đang hoạt động",
      tech: "Fast Loading, Google Sheets Sync, TikTok Pixel",
      imageCategory: "Beauty & Skincare",
    },
    {
      id: "case-saas",
      industry: "Công Nghệ Phần Mềm",
      title: "Landing Page Giới Thiệu Phần Mềm Quản Trị Bán Hàng",
      objective: "Chuyển đổi khách hàng doanh nghiệp đăng ký trải nghiệm dùng thử miễn phí 14 ngày.",
      sectionsCount: "10 sections",
      status: "Đã nghiệm thu & Đang hoạt động",
      tech: "Full Funnel Tracking, CRM Integration, Multi-step Form",
      imageCategory: "SaaS & Tech Solutions",
    },
  ],
};

export const LIMITATIONS_DATA = {
  sectionTitle: "Phạm Vi Dịch Vụ & Điều Kiện Nghiệm Thu",
  sectionSubtitle:
    "Làm rõ các hạng mục bao gồm và các yêu cầu mở rộng để đảm bảo quyền lợi đôi bên trước khi triển khai",
  included: [
    "Thiết kế UI/UX theo số section gói đã chọn.",
    "Lập trình chuẩn Responsive (Desktop, Tablet, Mobile).",
    "Tích hợp Form nhận lead (Email, Sheets, CRM).",
    "Cài đặt mã đo lường (GA4, Meta Pixel).",
    "Hỗ trợ chỉnh sửa theo số vòng cam kết.",
    "Hỗ trợ trỏ tên miền & cài đặt Hosting.",
  ],
  extraQuotation: [
    "Thiết kế mới Logo & nhận diện thương hiệu.",
    "Dịch vụ quay phim, chụp ảnh sản phẩm.",
    "Viết nội dung PR chuyên sâu ngoài cấu trúc.",
    "Hệ thống CMS hoặc giỏ hàng đa sản phẩm.",
    "Chi phí duy trì Tên miền & Hosting hàng năm.",
  ],
  conditions: [
    "Cung cấp đầy đủ thông tin, tư liệu ban đầu.",
    "Nghiệm thu theo Wireframe & thiết kế đã duyệt.",
    "Phát sinh thêm section tính phí bổ sung hợp lý.",
  ],
};

export const FAQ_DATA = {
  sectionTitle: "Câu Hỏi Thường Gặp (FAQ)",
  sectionSubtitle:
    "Giải đáp chi tiết các thắc mắc phổ biến về dịch vụ thiết kế Landing Page tại DUDI Software",
  items: [
    {
      id: "faq-1",
      question: "Thời gian hoàn thành một Landing Page là bao lâu?",
      answer:
        "Thời gian thực hiện phụ thuộc vào gói dịch vụ quý khách lựa chọn: Gói Cơ bản từ 2 - 3 ngày làm việc, Gói Tiêu chuẩn từ 4 - 5 ngày làm việc và Gói Cao cấp từ 6 - 8 ngày làm việc (kể từ khi hai bên chốt duyệt nội dung và tài liệu thiết kế).",
    },
    {
      id: "faq-2",
      question: "Tôi chưa có tên miền và hosting thì DUDI có hỗ trợ không?",
      answer:
        "DUDI Software sẵn sàng tư vấn và hỗ trợ khách hàng đăng ký tên miền, lựa chọn gói Hosting/Cloud Server phù hợp và tối ưu chi phí nhất, cũng như cấu hình triển khai trang đích hoàn toàn miễn phí trong phạm vi hợp đồng.",
    },
    {
      id: "faq-3",
      question: "Sau khi bàn giao tôi có thể tự sửa nội dung hoặc thay hình ảnh được không?",
      answer:
        "Sau khi bàn giao, DUDI cung cấp toàn bộ mã nguồn cùng tài liệu hướng dẫn chi tiết. Đội ngũ kỹ thuật của DUDI luôn sẵn sàng hỗ trợ hướng dẫn để quý khách hoặc nhân sự nội bộ có thể chủ động cập nhật các thông tin cơ bản.",
    },
    {
      id: "faq-4",
      question: "DUDI có chính sách bảo hành và hỗ trợ sau bàn giao như thế nào?",
      answer:
        "DUDI Software bảo hành kỹ thuật từ 6 đến 12 tháng tùy theo gói dịch vụ đã chọn (cam kết khắc phục sự cố lỗi hiển thị, lỗi form, mã tracking trong suốt thời gian bảo hành) và hỗ trợ kỹ thuật nhanh chóng qua Hotline / Zalo.",
    },
    {
      id: "faq-5",
      question: "Tôi cần chuẩn bị những tài liệu gì trước khi bắt đầu?",
      answer:
        "Quý khách chỉ cần chuẩn bị: Logo công ty, thông tin pháp lý/liên hệ, hình ảnh sản phẩm hoặc dịch vụ thực tế, và bản mô tả sơ lược về ưu điểm/chương trình ưu đãi của sản phẩm. Đội ngũ DUDI sẽ hỗ trợ cấu trúc và tối ưu lại nội dung cho phù hợp với Landing Page.",
    },
    {
      id: "faq-6",
      question: "Landing Page thiết kế tại DUDI có đảm bảo hiển thị đẹp trên điện thoại không?",
      answer:
        "Chắc chắn có. Tất cả các trang đích do DUDI phát triển đều tuân theo nguyên tắc Mobile-First, được tối ưu chuẩn xác trên các kích thước màn hình phổ biến (1440px, 1024px, 768px, 390px, 360px), đảm bảo tốc độ tải mượt mà và thao tác cảm ứng dễ dàng.",
    },
  ],
};

export const FORM_DATA = {
  sectionTitle: "Đăng Ký Tư Vấn & Nhận Báo Giá Chi Tiết",
  sectionSubtitle:
    "Điền thông tin dự án của bạn để chuyên viên DUDI Software liên hệ tư vấn giải pháp tối ưu trong vòng 30 phút",
  packageOptions: [
    { value: "basic", label: "Gói Cơ Bản (2.500.000 VNĐ)" },
    { value: "standard", label: "Gói Tiêu Chuẩn (4.500.000 VNĐ) - Phổ biến" },
    { value: "premium", label: "Gói Cao Cấp (7.500.000 VNĐ)" },
    { value: "consult", label: "Chưa xác định — Cần tư vấn thêm" },
  ],
  objectiveOptions: [
    { value: "ads", label: "Chạy quảng cáo Facebook / Google / TikTok Ads" },
    { value: "lead", label: "Thu thập thông tin khách hàng tiềm năng (Lead Gen)" },
    { value: "product", label: "Ra mắt giới thiệu sản phẩm / Dịch vụ mới" },
    { value: "redesign", label: "Thiết kế lại và nâng cấp Landing Page cũ" },
    { value: "other", label: "Mục tiêu khác" },
  ],
};

export const FINAL_CTA_DATA = {
  title: "Sẵn Sàng Tăng Tốc Chuyển Đổi Doanh Thu Ngay Hôm Nay?",
  description:
    "Đội ngũ kỹ sư và chuyên gia UI/UX tại DUDI SOFTWARE luôn sẵn sàng đồng hành xây dựng trang đích chuyên nghiệp, tối ưu chi phí và bứt phá hiệu quả kinh doanh cho bạn.",
  primaryCta: {
    label: "Đăng ký nhận tư vấn ngay",
    targetId: "contact",
  },
  contactChannels: [
    { type: "hotline", label: "Hotline: 0909 163 821", value: "0909163821" },
    { type: "zalo", label: "Chat Zalo: 0909 163 821", value: "https://zalo.me/0909163821" },
    { type: "email", label: "Email: contact@dudisoftware.com", value: "contact@dudisoftware.com" },
  ],
};

export const GOOGLE_SCRIPT_CONFIG = {
  recipientEmail: import.meta.env.VITE_RECIPIENT_EMAIL || "vtb22522005@gmail.com",
  webAppUrl: import.meta.env.VITE_GOOGLE_SCRIPT_URL || "",
};

