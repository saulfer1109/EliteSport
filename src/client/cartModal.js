// cartModal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, [isOpen]);

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...cartItems];
    updatedItems[index].cantidad += change;
    if (updatedItems[index].cantidad <= 0) {
      updatedItems[index].cantidad = 1;
    }
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>CARRITO DE COMPRAS</h2>
          <FontAwesomeIcon icon={faTimes} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        {cartItems.length === 0 ? (
          <p style={{ color: '#ffffff', textAlign: 'center' }}>Tu carrito está vacío</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '5px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: '#000' }}>{item.nombre_producto}</h4>
                    <p style={{ color: '#000' }}>Precio: ${item.precio}</p>
                    <p style={{ color: '#000' }}>Talla: {item.talla}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        style={{
                          backgroundColor: '#000',
                          color: '#fff',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                      >
                        -
                      </button>
                      <span style={{ color: '#000', fontWeight: 'bold' }}>{item.cantidad}</span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        style={{
                          backgroundColor: '#000',
                          color: '#fff',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: '#000', cursor: 'pointer' }}
                    onClick={() => handleRemoveItem(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleCheckout}
          style={{
            marginTop: '20px',
            backgroundColor: '#000',
            color: '#fff',
            padding: '15px 20px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          FINALIZAR COMPRA
        </button>
      </div>
    </div>
  );
};

export default CartModal;
