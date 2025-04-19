import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setErrorMessage(data.message || 'Credenciales inválidas.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Ingresar</h2>
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button onClick={handleLogin} className="auth-button">INICIAR SESIÓN</button>
        <div className="auth-footer">
          <p>¿Olvidó su contraseña?</p>
          <p>¿No tienes una cuenta? <span onClick={() => navigate('/register')} className="auth-link">Crear cuenta</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
