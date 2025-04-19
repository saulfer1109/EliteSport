import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Importamos la hoja de estilos

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    suburb: '',
    postalCode: '',
    city: '',
    state: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // creditCard o paypal
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Obtener los productos del carrito del local storage o cualquier otro almacenamiento
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div
      className="checkout-container"
      style={{
        width: '100vw',
        minHeight: '100vh',
        padding: '100px 20px 50px 20px',
        backgroundColor: '#000',
        color: '#fff',
        boxSizing: 'border-box',
      }}
    >
      <div className="checkout-content" style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Información de contacto y entrega */}
        <div className="checkout-left" style={{ flex: 1, marginRight: '20px' }}>
          <h2 className="checkout-title" style={{ marginBottom: '20px', color: '#36fff1' }}>CONTACTO</h2>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={contactInfo.email}
            onChange={handleInputChange}
            className="auth-input"
            style={{ width: '100%', marginBottom: '15px' }}
          />
          <h2 className="checkout-title" style={{ marginBottom: '20px', color: '#36fff1' }}>ENTREGA</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              name="firstName"
              placeholder="Nombres"
              value={contactInfo.firstName}
              onChange={handleInputChange}
              className="auth-input"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellidos"
              value={contactInfo.lastName}
              onChange={handleInputChange}
              className="auth-input"
              style={{ flex: 1 }}
            />
          </div>
          <input
            type="text"
            name="address"
            placeholder="Calle y número exterior e interior"
            value={contactInfo.address}
            onChange={handleInputChange}
            className="auth-input"
            style={{ width: '100%', marginBottom: '15px' }}
          />
          <input
            type="text"
            name="suburb"
            placeholder="Colonia"
            value={contactInfo.suburb}
            onChange={handleInputChange}
            className="auth-input"
            style={{ width: '100%', marginBottom: '15px' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              name="postalCode"
              placeholder="Código postal"
              value={contactInfo.postalCode}
              onChange={handleInputChange}
              className="auth-input"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={contactInfo.city}
              onChange={handleInputChange}
              className="auth-input"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              name="state"
              placeholder="Estado"
              value={contactInfo.state}
              onChange={handleInputChange}
              className="auth-input"
              style={{ flex: 1 }}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={contactInfo.phone}
            onChange={handleInputChange}
            className="auth-input"
            style={{ width: '100%', marginBottom: '15px' }}
          />

          <h2 className="checkout-title" style={{ marginBottom: '20px', color: '#36fff1' }}>PAGO</h2>
          <div className="payment-methods" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === 'creditCard'}
                onChange={() => handlePaymentChange('creditCard')}
                style={{ marginRight: '10px' }}
              />
              Tarjeta de crédito
            </label>
            {paymentMethod === 'creditCard' && (
              <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  className="auth-input"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
                <input
                  type="text"
                  placeholder="Fecha de vencimiento (MM / AA)"
                  className="auth-input"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
                <input
                  type="text"
                  placeholder="Código de seguridad"
                  className="auth-input"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
                <input
                  type="text"
                  placeholder="Nombre del titular"
                  className="auth-input"
                  style={{ width: '100%' }}
                />
              </div>
            )}
            <label style={{ display: 'block' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => handlePaymentChange('paypal')}
                style={{ marginRight: '10px' }}
              />
              PayPal
            </label>
          </div>
        </div>

        {/* Resumen del carrito */}
        <div className="checkout-right" style={{ flex: 0.5, padding: '20px', backgroundColor: '#202020', borderRadius: '10px' }}>
          <h2 className="checkout-title" style={{ marginBottom: '20px', color: '#36fff1' }}>Resumen del Pedido</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ color: '#000' }}>{item.nombre_producto}</h4>
                  <p style={{ color: '#000' }}>Precio: ${item.precio}</p>
                  <p style={{ color: '#000' }}>Cantidad: {item.cantidad}</p>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '16px' }}>Subtotal: ${cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</p>
            <p style={{ fontSize: '16px' }}>Envío: GRATIS</p>
            <h3 style={{ marginTop: '15px', fontSize: '20px' }}>Total: ${cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</h3>
          </div>
          <button
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '15px',
              backgroundColor: '#36fff1',
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            PAGAR AHORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
