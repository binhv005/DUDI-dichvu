import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Send, 
  Sparkles, 
  CheckCheck, 
  ChevronRight,
  MessageSquare,
  Phone
} from 'lucide-react';
import '../styles/aichat.css';

const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'https://dudi-ai.onrender.com/api/chat';

const QUICK_SUGGESTIONS = [
  {
    id: "services",
    label: "💡 DUDI cung cấp dịch vụ gì?",
    query: "DUDI cung cấp những giải pháp và dịch vụ gì?"
  },
  {
    id: "pricing",
    label: "💰 Chi phí & Báo giá chi tiết",
    query: "Chi phí các gói dịch vụ tại DUDI khoảng bao nhiêu?"
  },
  {
    id: "process",
    label: "⚡ Quy trình triển khai dự án",
    query: "Quy trình triển khai dịch vụ tại DUDI như thế nào?"
  },
  {
    id: "contact",
    label: "📞 Kết nối chuyên viên tư vấn",
    query: "Tôi muốn gặp chuyên viên tư vấn trực tiếp"
  }
];

const BOT_WELCOME_TEXT = "Xin chào! 👋\nTôi là DU - Trợ lý ảo AI của DUDI SOFTWARE.\nTôi có thể hỗ trợ gì cho bạn hôm nay?";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: BOT_WELCOME_TEXT,
    time: '10:30',
    type: 'text'
  }
];

function FormattedMessageText({ text, isBot }) {
  if (!text) return null;
  const lines = text.split('\n');

  const parseInline = (str) => {
    const regex = /(\*\*.*?\*\*|\*[^*]+?\*)/g;
    const parts = str.split(regex);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={idx} style={{ fontWeight: 700, color: isBot ? '#0f172a' : '#ffffff' }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return <em key={idx} style={{ fontStyle: 'italic', opacity: 0.9 }}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div className="ai-chat-formatted-text">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lIdx} style={{ height: '4px' }} />;
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || (trimmed.startsWith('* ') && !trimmed.startsWith('**'));
        const isNumbered = /^\d+\.\s/.test(trimmed);

        if (isBullet) {
          const bulletContent = trimmed.replace(/^[-•*]\s+/, '');
          return (
            <div key={lIdx} className="ai-chat-list-item">
              <span className="ai-chat-bullet-dot">•</span>
              <span style={{ flex: 1 }}>{parseInline(bulletContent)}</span>
            </div>
          );
        }
        if (isNumbered) {
          const numMatch = trimmed.match(/^(\d+)\./);
          const num = numMatch ? numMatch[1] : '•';
          const numberedContent = trimmed.replace(/^\d+\.\s+/, '');
          return (
            <div key={lIdx} className="ai-chat-list-item">
              <span className="ai-chat-number-badge">{num}.</span>
              <span style={{ flex: 1 }}>{parseInline(numberedContent)}</span>
            </div>
          );
        }
        return <div key={lIdx}>{parseInline(line)}</div>;
      })}
    </div>
  );
}

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      const isToggleBtn = event.target.closest('[data-chat-toggle="true"]');
      if (isToggleBtn) return;
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleReset = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: BOT_WELCOME_TEXT,
        time: timeStr,
        type: 'text'
      }
    ]);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

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

    const historyPayload = messages
      .filter((m) => !m.isError)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Máy chủ phản hồi mã: ${response.status}`);
      }

      let botReplyText = '';
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        botReplyText = data.reply || data.response || data.message || data.text || data.answer || JSON.stringify(data);
      } else {
        botReplyText = await response.text();
      }

      if (!botReplyText || !botReplyText.trim()) {
        botReplyText = 'DUDI đã nhận được thông tin từ bạn. Nếu cần giải đáp nhanh hoặc tư vấn chuyên sâu, quý khách có thể liên hệ trực tiếp hotline để được hỗ trợ tức thì!';
      }

      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;

      let actionType = null;
      const lowerReply = botReplyText.toLowerCase();
      if (lowerReply.includes('hotline') || lowerReply.includes('zalo') || lowerReply.includes('liên hệ')) {
        actionType = 'contact';
      } else if (lowerReply.includes('báo giá') || lowerReply.includes('chi phí') || lowerReply.includes('gói') || lowerReply.includes('bảng giá')) {
        actionType = 'pricing';
      } else if (lowerReply.includes('dịch vụ') || lowerReply.includes('giải pháp') || lowerReply.includes('hạng mục')) {
        actionType = 'services';
      } else if (lowerReply.includes('quy trình') || lowerReply.includes('bước')) {
        actionType = 'process';
      }

      const newBotMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText.trim(),
        time: botTimeStr,
        actionType: actionType
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error) {
      console.error('Lỗi kết nối AI Backend:', error);
      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;
      const isTimeout = error.name === 'AbortError';
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: isTimeout
          ? '⚠️ Kết nối tới máy chủ AI đang bị trễ do server đang khởi động. Bạn vui lòng thử lại sau giây lát hoặc liên hệ trực tiếp đội ngũ DUDI để được hỗ trợ ngay!'
          : '⚠️ Không thể kết nối tới máy chủ AI DUDI. Bạn vui lòng kiểm tra kết nối mạng hoặc liên hệ trực tiếp chuyên viên tư vấn qua Hotline/Zalo.',
        time: botTimeStr,
        actionType: 'contact',
        isError: true,
        retryText: text
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="ai-chat-backdrop" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="ai-chat-modal-wrapper">
        <div 
          ref={modalRef}
          className="ai-chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Cửa sổ trò chuyện với Trợ lý AI DU - DUDI SOFTWARE"
        >
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar-wrapper">
                <img 
                  src="/robot-mascot.webp" 
                  alt="DU Trợ lý AI" 
                  className="ai-chat-avatar-img"
                  onError={(e) => {
                    e.target.src = '/robot-mascot.png';
                  }}
                />
                <span className="ai-chat-online-badge" />
              </div>

              <div className="ai-chat-title-group">
                <h3>
                  <span>DU - Trợ lý AI DUDI</span>
                  <Sparkles className="ai-chat-sparkle-icon" />
                </h3>
                <p>
                  <span className="ai-chat-status-dot" />
                  <span>Trực tuyến 24/7 • DUDI AI Backend</span>
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

          {/* Messages Body */}
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
                        alt="DU Bot" 
                        onError={(e) => { e.target.src = '/robot-mascot.png'; }}
                      />
                    </div>
                  )}

                  <div className="ai-chat-bubble-container">
                    <div className={`ai-chat-bubble ${msg.isError ? 'is-error' : ''}`}>
                      <FormattedMessageText text={msg.text} isBot={isBot} />

                      {msg.isError && msg.retryText && (
                        <div>
                          <button
                            type="button"
                            onClick={() => handleSendMessage(msg.retryText)}
                            className="ai-chat-retry-btn"
                          >
                            <RotateCcw size={13} />
                            <span>Thử gửi lại</span>
                          </button>
                        </div>
                      )}

                      {isBot && !msg.isError && msg.actionType && (
                        <div className="ai-chat-actions">
                          {msg.actionType === 'pricing' && (
                            <button
                              type="button"
                              onClick={() => scrollToSection('pricing')}
                              className="ai-chat-action-btn btn-red"
                            >
                              <span>Xem Bảng giá</span>
                              <ChevronRight size={14} />
                            </button>
                          )}
                          {msg.actionType === 'contact' && (
                            <>
                              <a
                                href="https://zalo.me/0909163821"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ai-chat-action-btn btn-blue"
                              >
                                <MessageSquare size={14} />
                                <span>Nhắn Zalo</span>
                              </a>
                              <a
                                href="tel:0909163821"
                                className="ai-chat-action-btn btn-green"
                              >
                                <Phone size={14} />
                                <span>Gọi Hotline</span>
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
                          {msg.actionType === 'process' && (
                            <button
                              type="button"
                              onClick={() => scrollToSection('process')}
                              className="ai-chat-action-btn btn-red"
                            >
                              <span>Xem Quy trình</span>
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="ai-chat-meta">
                      <span>{msg.time}</span>
                      {!isBot && <CheckCheck className="ai-chat-seen-icon" size={14} />}
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
                    alt="Bot" 
                    onError={(e) => { e.target.src = '/robot-mascot.png'; }}
                  />
                </div>
                <div className="ai-chat-typing-bubble">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-text">DU đang soạn câu trả lời...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="ai-chat-suggestions">
            {QUICK_SUGGESTIONS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                disabled={isTyping}
                onClick={() => handleSendMessage(chip.query)}
                className="ai-chat-chip"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Footer Input */}
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
                disabled={isTyping}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isTyping ? "Trợ lý AI đang phản hồi..." : "Nhập tin nhắn của bạn..."}
                className="ai-chat-input"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Gửi tin nhắn"
                className={`ai-chat-send-btn ${inputValue.trim() && !isTyping ? 'active' : ''}`}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
