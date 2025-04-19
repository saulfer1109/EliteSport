import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Retrasar la desactivación del modal para permitir que se complete la animación de salida
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'fade-in' : 'fade-out'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className={`modal-content ${isOpen ? 'slide-in' : 'slide-out'}`}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          minWidth: '400px',
          maxWidth: '600px',
          transform: 'translateY(0)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <h2>{title}</h2>
        <div>{children}</div>
        <button className="generic-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
