import React from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  type = 'default',
  showCloseButton = true,
  closeOnBackdrop = true
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl'
  };

  const typeClasses = {
    default: 'bg-white',
    warning: 'bg-white border-t-4 border-accent-warning',
    success: 'bg-white border-t-4 border-accent-positive',
    error: 'bg-white border-t-4 border-red-500'
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop animate-fade-in"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className={`
          ${typeClasses[type]} 
          ${sizeClasses[size]} 
          w-full mx-4 rounded-lg shadow-xl animate-slide-up
          max-h-[90vh] overflow-hidden flex flex-col
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold text-primary">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
