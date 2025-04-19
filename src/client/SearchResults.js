// src/client/SearchResults.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  return (
    <div className="search-results-container" style={{ padding: '50px', backgroundColor: '#000', color: '#fff', minHeight: '100vh', width: '100vw' }}>
      <h2 style={{ padding: '50px',fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>RESULTADOS DE LA BÚSQUEDA</h2>
      {searchResults.length > 0 ? (
        <div className="products-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px'  }}>
          {searchResults.map((producto) => (
            <Link to={`/producto/${producto.id_producto}`} key={producto.id_producto} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card" style={{ backgroundColor: '#2c2f33', padding: '20px', borderRadius: '10px' }}>
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
                <h3 style={{ marginTop: '15px', color: '#fff' }}>{producto.nombre_producto}</h3>
                <p style={{ color: '#36fff1', fontWeight: 'bold' }}>Precio: ${producto.precio}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ color: '#fff', textAlign: 'center' }}>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default SearchResults;
