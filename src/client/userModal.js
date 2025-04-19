import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserModal = ({ isOpen, onClose, isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('UserModal: isAuthenticated =', isAuthenticated);
  }, [isAuthenticated]);

  if (!isOpen) return null;

  let userData = null;

  if (isAuthenticated) {
    const token = localStorage.getItem('token');
    console.log('Token obtenido del localStorage:', token);
    if (token) {
      try {
        userData = jwtDecode(token);
        console.log('Datos del usuario decodificados:', userData);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100%',
          backgroundColor: '#36fff1',
          color: '#000',
          padding: '20px',
          borderRadius: '10px 0 0 10px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Usuario</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5em',
            }}
          >
            &times;
          </button>
        </div>
        {isAuthenticated && userData ? (
          <>
            <p>Bienvenido, {userData.nombre}</p>
            <p>Email: {userData.email}</p>
            <button
              onClick={() => {
                handleLogout();
                onClose(); // Cerrar el modal después de cerrar sesión
                navigate('/'); // Redirigir a la página de inicio
              }}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                marginTop: '20px',
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              style={{
                marginBottom: '10px',
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/register');
              }}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserModal;
