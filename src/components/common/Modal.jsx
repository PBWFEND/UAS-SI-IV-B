import React from 'react';
import Button from './Button';
import '../../styles/manage.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  type = 'info' // 'info' | 'warning' | 'danger' | 'success'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch(type) {
      case 'warning': return '⚠️';
      case 'danger': return '❌';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  const getConfirmVariant = () => {
    switch(type) {
      case 'danger': return 'danger';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return 'primary';
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-icon">{getIcon()}</div>
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
        
        <div className="modal-footer">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={getConfirmVariant()} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;