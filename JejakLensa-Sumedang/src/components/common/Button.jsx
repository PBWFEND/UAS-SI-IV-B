import React from 'react';
import '../../styles/manage.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props 
}) => {
  const getVariantClass = () => {
    switch(variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'success': return 'btn-success';
      case 'danger': return 'btn-danger';
      case 'warning': return 'btn-warning';
      case 'outline': return 'btn-outline';
      case 'ghost': return 'btn-ghost';
      default: return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch(size) {
      case 'small': return 'btn-small';
      case 'large': return 'btn-large';
      default: return 'btn-medium';
    }
  };

  return (
    <button
      type={type}
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;