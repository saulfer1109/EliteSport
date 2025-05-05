import React from 'react';
import './App.css';
import Navbar from './navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container" style={{ padding: '80px', backgroundColor: '#000', color: '#fff', fontFamily: 'Oswald', minHeight: '100vh', width: '100vw' }}>
        <div className="about-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ color: '#ffffff', fontSize: '3rem', marginBottom: '30px', textAlign: 'center' }}>SOBRE NOSOTROS</h1>
          <p style={{ color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', textAlign: 'justify', fontWeight: "bold" }}>
            En Elite Sport nos dedicamos a algo más que vender ropa deportiva: impulsamos un estilo de vida. Nacimos en Hermosillo con una visión clara: ofrecer prendas fitness de alta calidad que combinen rendimiento, estilo y exclusividad.
          </p>
          <p style={{ color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', marginTop: '20px', textAlign: 'justify', fontWeight: "bold" }}>
            Cada pieza en nuestro catálogo ha sido seleccionada pensando en quienes entrenan con pasión y se esfuerzan por superarse. Nos enorgullece ser un punto de referencia para quienes buscan algo más que lo básico: buscan diseño, comodidad y presencia.
          </p>
          <p style={{ color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', marginTop: '20px', textAlign: 'justify', fontWeight: "bold" }}>
            Más que una tienda, somos una comunidad en crecimiento. Queremos acompañarte en tu camino, brindándote la mejor ropa fitness para que sigas avanzando, con la confianza de vestir con propósito.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;