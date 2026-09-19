import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Send, 
  Sparkles, 
  CheckCheck, 
  MessageSquare, 
  ChevronRight,
  Phone
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

const QUICK_SUGGESTIONS = [
  { id: 'services', label: '💡 DUDI cung cấp dịch vụ gì?', query: 'DUDI cung cấp dịch vụ gì?' },
  { id: 'ai-solution', label: '🚀 Giải pháp AI & Hoạt động của DUDI', query: 'Bạn có thể giải thích ngắn gọn cách AI hoạt động và giải pháp của DUDI không?' },
  { id: 'pricing', label: '💰 Báo giá chi tiết các gói', query: 'Chi phí thiết kế landing page tại DUDI khoảng bao nhiêu?' },
  { id: 'process', label: '⚡ Quy trình 9 bước triển khai', query: 'Quy trình triển khai dịch vụ tại DUDI như thế nào?' },
  { id: 'contact', label: '📞 Kết nối chuyên viên tư vấn', query: 'Tôi muốn gặp chuyên viên tư vấn trực tiếp' }
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Xin chào! 👋\nTôi là trợ lý ảo AI của DUDI.\nTôi có thể hỗ trợ gì cho bạn hôm nay?",
    time: '10:30',
    type: 'text'
  }
];

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [messages, isTyping, isOpen]);

  const handleReset = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Xin chào! 👋\nTôi là trợ lý ảo AI của DUDI.\nTôi có thể hỗ trợ gì cho bạn hôm nay?",
        time: timeStr,
        type: 'text'
      }
    ]);
  };

  const generateBotResponse = (userText) => {
    const query = userText.toLowerCase().trim();

    if (query.includes('ai') || query.includes('hoạt động') || query.includes('giải pháp') || query.includes('cách ai')) {
      return {
        text: `DUDI ứng dụng AI & công nghệ thế hệ mới để nâng tầm chuyển đổi số cho doanh nghiệp:\n\n` +
          `• **Trợ lý AI & Chatbot CSKH 24/7**: Phản hồi tức thì, tư vấn tự động & thu thập khách hàng tiềm năng chuẩn xác.\n` +
          `• **Tối ưu Trải nghiệm (UI/UX)**: Phân tích hành vi người dùng, cá nhân hóa giao diện và tỷ lệ chuyển đổi cao.\n` +
          `• **Tối ưu Hiệu năng & Core Web Vitals**: Tốc độ tải trang dưới 1.5s, 95+ điểm Google PageSpeed.\n` +
          `• **Nền tảng Web/App Hiện đại**: Kiến trúc React/Next.js mượt mà, chuẩn SEO và bảo mật cao cấp.`,
        actionType: 'consult'
      };
    }

    if (query.includes('dịch vụ') || query.includes('cung cấp') || query.includes('làm gì') || query.includes('sản phẩm')) {
      return {
        text: `DUDI chuyên sâu các giải pháp công nghệ website & landing page tối ưu chuyển đổi:\n\n` +
          `1. **Thiết kế Landing Page Tối Ưu Chuyển Đổi**: Giao diện độc quyền chuẩn nhận diện thương hiệu.\n` +
          `2. **Tối ưu Tốc độ & Chuẩn SEO**: Đạt chuẩn Core Web Vitals, tương thích 100% mọi thiết bị.\n` +
          `3. **Tích hợp Form, CRM & AI Chatbot**: Kết nối tự động dữ liệu khách hàng về hệ thống.\n` +
          `4. **Bảo hành & Hỗ trợ kỹ thuật 24/7**: Cam kết bảo trì, an toàn dữ liệu và hỗ trợ tận tâm.`,
        actionType: 'services'
      };
    }

    if (query.includes('giá') || query.includes('chi phí') || query.includes('báo giá') || query.includes('bao nhiêu') || query.includes('gói')) {
      return {
        text: `DUDI cung cấp 3 gói dịch vụ thiết kế rõ ràng và minh bạch:\n\n` +
          `• **Gói Basic (Cơ bản)**: Phù hợp chạy chiến dịch ngắn hạn, ra mắt sản phẩm mới.\n` +
          `• **Gói Standard (Tiêu chuẩn - Khuyên dùng)**: Tối ưu UI/UX chuyên sâu, hiệu ứng động & chuẩn SEO kỹ thuật.\n` +
          `• **Gói Premium (Cao cấp)**: Thiết kế may đo toàn diện, tích hợp tính năng nâng cao & hỗ trợ 24/7 VIP.\n\n` +
          `💡 Bạn có thể xem chi tiết từng gói tại phần Bảng giá hoặc để lại thông tin để nhận báo giá chi tiết!`,
        actionType: 'pricing'
      };
    }

    if (query.includes('quy trình') || query.includes('bước') || query.includes('thời gian') || query.includes('triển khai')) {
      return {
        text: `Quy trình 9 bước chuẩn hóa tại DUDI giúp dự án hoàn thiện bài bản và chuẩn xác:\n\n` +
          `1. Tiếp nhận & Phân tích mục tiêu\n` +
          `2. Nghiên cứu thị trường & Đối thủ\n` +
          `3. Xây dựng Cấu trúc Wireframe\n` +
          `4. Thiết kế Giao diện UI/UX\n` +
          `5. Lập trình Responsive & Tối ưu tải trang\n` +
          `6. Tích hợp Form & Tracking chuyển đổi\n` +
          `7. Kiểm thử đa thiết bị & Bảo mật\n` +
          `8. Bàn giao Source code & Hướng dẫn\n` +
          `9. Bảo hành & Hỗ trợ vận hành sau bàn giao`,
        actionType: 'process'
      };
    }

    if (query.includes('liên hệ') || query.includes('tư vấn') || query.includes('số điện thoại') || query.includes('gặp') || query.includes('hotline') || query.includes('zalo')) {
      return {
        text: `Đội ngũ DUDI luôn sẵn sàng lắng nghe và tư vấn miễn phí cho bạn:\n\n` +
          `📞 Hotline: **${COMPANY_INFO.hotline}**\n` +
          `💬 Zalo Official: Nhấn nút bên dưới để trao đổi trực tiếp\n` +
          `🏢 Địa chỉ: ${COMPANY_INFO.address}\n\n` +
          `Chuyên viên kỹ thuật sẽ phản hồi ngay lập tức trong vòng 15 phút!`,
        actionType: 'contact'
      };
    }

    return {
      text: `Cảm ơn bạn đã quan tâm! DUDI có thể hỗ trợ bạn thiết kế landing page, tối ưu hiệu năng, xây dựng web app hoặc tích hợp trợ lý AI.\n\n` +
        `Bạn muốn tìm hiểu thêm về **Dịch vụ**, **Báo giá** hay cần **Gặp chuyên viên tư vấn** trực tiếp?`,
      actionType: 'general'
    };
  };

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: timeStr,
      type: 'text'
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(text);
      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;

      const newBotMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply.text,
        time: botTimeStr,
        actionType: botReply.actionType
      };

      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="ai-chat-backdrop" onClick={onClose} aria-hidden="true" />

      <div 
        className="ai-chat-modal-wrapper"
        role="dialog"
        aria-modal="true"
        aria-label="Cửa sổ trò chuyện với Trợ lý AI DUDI"
      >
        <div className="ai-chat-window">
          {/* 1. Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar-wrapper">
                <img 
                  src="/robot-mascot.webp" 
                  alt="Trợ lý AI DUDI" 
                  className="ai-chat-avatar-img"
                />
                <span className="ai-chat-online-badge" />
              </div>

              <div className="ai-chat-title-group">
                <h3>
                  <span>Trợ lý AI DUDI</span>
                  <Sparkles size={14} color="#f59e0b" />
                </h3>
                <p>
                  <span className="ai-chat-status-dot" />
                  <span>Luôn sẵn sàng hỗ trợ bạn</span>
                </p>
              </div>
            </div>

            <div className="ai-chat-header-actions">
              <button
                type="button"
                onClick={handleReset}
                title="Làm mới cuộc trò chuyện"
                className="ai-chat-icon-btn"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Đóng cửa sổ chat"
                className="ai-chat-icon-btn"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* 2. Messages List */}
          <div className="ai-chat-body">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`ai-chat-message-row ${isBot ? 'bot' : 'user'}`}
                >
                  {isBot && (
                    <div className="ai-chat-bot-mini-avatar">
                      <img 
                        src="/robot-mascot.webp" 
                        alt="Bot Avatar" 
                      />
                    </div>
                  )}

                  <div className="ai-chat-bubble-container">
                    <div className="ai-chat-bubble">
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {msg.text.split('\n').map((line, i) => {
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <React.Fragment key={i}>
                              {parts.map((part, pIdx) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                              {i < msg.text.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Bot Action Buttons */}
                      {isBot && msg.actionType && (
                        <div className="ai-chat-actions">
                          {msg.actionType === 'pricing' && (
                            <button
                              type="button"
                              onClick={() => scrollToSection('pricing')}
                              className="ai-chat-action-btn btn-indigo"
                            >
                              <span>Xem Bảng giá</span>
                              <ChevronRight size={13} />
                            </button>
                          )}
                          {msg.actionType === 'contact' && (
                            <>
                              <a
                                href={COMPANY_INFO.zaloUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ai-chat-action-btn btn-blue"
                              >
                                <MessageSquare size={13} />
                                <span>Nhắn Zalo</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className="ai-chat-action-btn btn-gray"
                              >
                                <span>Điền Form</span>
                              </button>
                            </>
                          )}
                          {msg.actionType === 'services' && (
                            <button
                              type="button"
                              onClick={() => scrollToSection('deliverables')}
                              className="ai-chat-action-btn btn-indigo"
                            >
                              <span>Hạng mục bàn giao</span>
                              <ChevronRight size={13} />
                            </button>
                          )}
                          {msg.actionType === 'process' && (
                            <button
                              type="button"
                              onClick={() => scrollToSection('process')}
                              className="ai-chat-action-btn btn-indigo"
                            >
                              <span>Sơ đồ 9 bước</span>
                              <ChevronRight size={13} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="ai-chat-meta">
                      <span>{msg.time}</span>
                      {!isBot && <CheckCheck size={13} className="ai-chat-seen-icon" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="ai-chat-message-row bot">
                <div className="ai-chat-bot-mini-avatar">
                  <img 
                    src="/robot-mascot.webp" 
                    alt="Bot Avatar" 
                  />
                </div>
                <div className="ai-chat-typing-bubble">
                  <div className="ai-typing-dot" />
                  <div className="ai-typing-dot" />
                  <div className="ai-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Quick Suggestions Chips */}
          <div className="ai-chat-suggestions">
            {QUICK_SUGGESTIONS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleSendMessage(chip.query)}
                className="ai-chat-chip"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* 4. Footer Input */}
          <div className="ai-chat-footer">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="ai-chat-input-form"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn của bạn..."
                className="ai-chat-input"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Gửi tin nhắn"
                className={`ai-chat-send-btn ${inputValue.trim() ? 'active' : ''}`}
              >
                <Send size={15} style={{ marginLeft: '1px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}