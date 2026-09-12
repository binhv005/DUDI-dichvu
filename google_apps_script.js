/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: GỬI MAIL THÔNG BÁO VỀ vtb22522005@gmail.com
 * VÀ LƯU DỮ LIỆU ĐĂNG KÝ VÀO GOOGLE SHEETS
 * DUDI SOFTWARE - Dịch Vụ Thiết Kế Landing Page
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH (DƯỚI 2 PHÚT):
 * 1. Mở Google Sheet mới (hoặc Sheet bạn muốn lưu dữ liệu).
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. Xóa toàn bộ mã cũ và dán toàn bộ đoạn mã bên dưới vào.
 * 4. Nhấn nút "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment).
 * 5. Chọn loại: "Ứng dụng web" (Web App).
 *    - Mô tả: "DUDI Landing Page Form Webhook"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG!
 * 6. Nhấn "Triển khai" (Deploy), cấp quyền truy cập tài khoản Gmail của bạn nếu Google yêu cầu.
 * 7. Sao chép URL ứng dụng web (Web App URL có dạng: https://script.google.com/macros/s/.../exec).
 * 8. Dán URL vừa sao chép vào biến `webAppUrl` trong file `src/data/content.js`.
 */

// Email nhận thông báo
var RECIPIENT_EMAIL = "vtb22522005@gmail.com";

// Nhận dữ liệu POST từ React Form
function doPost(e) {
  try {
    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var fullName = data.fullName || "Chưa cung cấp";
    var phone = data.phone || "Chưa cung cấp";
    var companyName = data.companyName || "Chưa cung cấp";
    var productService = data.productService || "Chưa cung cấp";
    var packageLabel = data.packageLabel || data.selectedPackage || "Tiêu chuẩn";
    var objectiveLabel = data.objectiveLabel || data.objective || "Chạy quảng cáo Ads";
    var targetDate = data.targetDate || "Chưa xác định";
    var description = data.description || "Không có ghi chú thêm";
    var timestamp = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    // 1. GỬI EMAIL THÔNG BÁO VỀ GMAIL
    sendNotificationEmail({
      fullName: fullName,
      phone: phone,
      companyName: companyName,
      productService: productService,
      packageLabel: packageLabel,
      objectiveLabel: objectiveLabel,
      targetDate: targetDate,
      description: description,
      timestamp: timestamp,
      utmSource: data.utmSource || "Direct",
      landingUrl: data.landingUrl || "Landing Page DUDI"
    });

    // 2. LƯU DỮ LIỆU VÀO GOOGLE SHEET (NẾU SCRIPT GẮN VỚI SHEET)
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      if (sheet.getLastRow() === 0) {
        // Tạo header nếu sheet mới
        sheet.appendRow([
          "Thời Gian",
          "Họ Và Tên",
          "Số Điện Thoại / Zalo",
          "Tên Doanh Nghiệp",
          "Sản Phẩm / Dịch Vụ",
          "Gói Dịch Vụ",
          "Mục Tiêu",
          "Ngày Cần Chạy",
          "Mô Tả Chi Tiết",
          "Nguồn UTM / Trang"
        ]);
        sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#fee2e2").setFontColor("#991b1b");
      }
      sheet.appendRow([
        timestamp,
        fullName,
        phone,
        companyName,
        productService,
        packageLabel,
        objectiveLabel,
        targetDate,
        description,
        data.utmSource ? (data.utmSource + " | " + data.landingUrl) : data.landingUrl
      ]);
    } catch (sheetErr) {
      Logger.log("Lưu sheet bỏ qua: " + sheetErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đã gửi thông tin và gửi email thành công!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Xử lý GET để kiểm tra trạng thái hoạt động của Script
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "DUDI Software Google Apps Script Webhook is active! Ready to receive leads."
  })).setMimeType(ContentService.MimeType.JSON);
}

// Hàm gửi Email HTML đẹp mắt
function sendNotificationEmail(lead) {
  var subject = "🔥 [KHÁCH HÀNG MỚI] " + lead.fullName + " - " + lead.phone + " (" + lead.packageLabel + ")";

  var htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(135deg, #e51b24 0%, #991b1b 100%); padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">DUDI SOFTWARE</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">THÔNG BÁO CÓ KHÁCH HÀNG ĐĂNG KÝ TƯ VẤN LANDING PAGE MỚI</p>
      </div>
      
      <div style="padding: 24px;">
        <div style="background-color: #fef2f2; border-left: 4px solid #e51b24; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0; color: #991b1b; font-size: 13px; font-weight: 700;">Thời gian đăng ký: ${lead.timestamp}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; width: 40%; font-weight: 600;">👤 Họ và tên:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${lead.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">📞 Số điện thoại / Zalo:</td>
            <td style="padding: 10px 0; color: #dc2626; font-weight: 800; font-size: 16px;">
              <a href="tel:${lead.phone}" style="color: #dc2626; text-decoration: none;">${lead.phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">🏢 Tên doanh nghiệp / Đơn vị:</td>
            <td style="padding: 10px 0; color: #0f172a;">${lead.companyName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">🎯 Sản phẩm / Dịch vụ:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${lead.productService}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">📦 Gói dịch vụ quan tâm:</td>
            <td style="padding: 10px 0; color: #b91c1c; font-weight: 700;">${lead.packageLabel}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">🎯 Mục tiêu chính:</td>
            <td style="padding: 10px 0; color: #0f172a;">${lead.objectiveLabel}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">📅 Ngày dự kiến cần chạy:</td>
            <td style="padding: 10px 0; color: #0f172a;">${lead.targetDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top;">📝 Ghi chú / Yêu cầu thêm:</td>
            <td style="padding: 10px 0; color: #334155; line-height: 1.5;">${lead.description}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #94a3b8; text-align: center;">
          <p style="margin: 0;">Nguồn gửi: ${lead.landingUrl}</p>
          <p style="margin: 4px 0 0 0;">Email tự động từ hệ thống Landing Page DUDI Software.</p>
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}
