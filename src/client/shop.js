import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    fetch('/api/productos')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('La respuesta no es un array:', data);
          setProductos([]);
        }
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div className="shop-container" style={{ width: '100vw', paddingTop: '20px', padding: '70px', boxSizing: 'border-box' }}>
      <h2 className="shop-title" style={{ color: '#ffffff', fontSize: '3rem', marginBottom: '40px' }}>CATÁLOGO DE PRODUCTOS</h2>
      <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {productos.map(producto => (
          <Link to={`/producto/${producto.id_producto}`} key={producto.id_producto} style={{ textDecoration: 'none' }}>
            <div
              className="product-card"
              style={{
                width: '100%',
                height: 'auto',
                padding: '20px',
                cursor: 'pointer',
                overflow: 'hidden',
                backgroundColor: '#2c2f33', // Fondo de la card
                borderRadius: '20px', // Un poco de borde redondeado para un mejor estilo
              }}
            >
              <img
                src={`/images/caps/${producto.id_producto}.jpeg`}
                alt={producto.nombre_producto}
                className="product-image"
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  marginBottom: '15px',
                  display: 'block',
                }}
              />
              <h3 className="product-name" style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '10px' }}>{producto.nombre_producto}</h3>
              <p className="product-price" style={{ color: '#36fff1', fontSize: '1.5rem', fontWeight: 'bold' }}>${producto.precio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
