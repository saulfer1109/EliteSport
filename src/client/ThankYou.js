import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div
      className="thank-you-container"
      style={{
        width: '100vw',
        minHeight: '100vh',
        padding: '100px 20px',
        backgroundColor: '#000',
        color: '#fff',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#ffffff' }}>
        ¡Muchas gracias por su compra!
      </h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '40px', color: '#ffffff' }}>
        Su pedido ha sido procesado con éxito.
      </p>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#ffffff' }}>
        Tiempo estimado de llegada: <strong>3-5 días hábiles</strong>.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '15px 30px',
          backgroundColor: '#ffffff',
          color: '#000',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Regresar al Inicio
      </button>
    </div>
  );
};

export default ThankYou;