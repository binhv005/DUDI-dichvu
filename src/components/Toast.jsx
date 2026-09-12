import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: isSuccess ? '#0f172a' : '#991b1b',
        color: '#ffffff',
        padding: '14px 22px',
        borderRadius: '12px',
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.25)',
        fontSize: '0.9375rem',
        fontWeight: '500',
        animation: 'fadeIn 0.3s ease-out forwards',
        maxWidth: '90vw',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={20} color="#10b981" />
      ) : (
        <AlertCircle size={20} color="#fca5a5" />
      )}
      <span>{toast.message}</span>
      <button
        onClick={onClose}
        aria-label="Đóng thông báo"
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
          marginLeft: '6px',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
