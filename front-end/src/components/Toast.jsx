import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  console.log('🎉 Toast Component Rendered:', { message, type });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      case 'info':
        return 'toast-info';
      default:
        return 'toast-default';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className={`custom-toast-container ${getToastStyles()}`}>
      <div className="custom-toast-content">
        <div className="custom-toast-icon">
          {getIcon()}
        </div>
        <div className="custom-toast-message">
          <div className="custom-toast-title">
            {type === 'success' && 'Success!'}
            {type === 'error' && 'Error!'}
            {type === 'warning' && 'Warning!'}
            {type === 'info' && 'Info'}
          </div>
          <div className="custom-toast-text">
            {message}
          </div>
        </div>
        <button 
          className="custom-toast-close" 
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
