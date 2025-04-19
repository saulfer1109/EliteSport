import React from 'react';
import './App.css';
import Navbar from './navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container" style={{ padding: '80px', backgroundColor: '#000', color: '#fff', fontFamily: 'Oswald', minHeight: '100vh', width: '100vw' }}>
        <div className="about-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{color: '#36fff1', fontSize: '3rem', marginBottom: '30px', textAlign: 'center' }}>SOBRE NOSOTROS</h1>
          <p style={{color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', textAlign: 'justify', fontWeight: "bold"}}>
            Ubicado en el corazón de Hermosillo, Sonora, nuestro negocio se especializa en ofrecer las mejores gorras y accesorios para los amantes del estilo urbano. Fundado con pasión por la moda y la cultura local, nos dedicamos a brindar una experiencia única para todos aquellos que quieren expresar su personalidad a través de un accesorio esencial: la gorra.
          </p>
          <p style={{color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', marginTop: '20px', textAlign: 'justify', fontWeight: "bold"}}>
            Contamos con una amplia variedad de modelos, desde los clásicos que nunca pasan de moda hasta los más recientes lanzamientos de las marcas más reconocidas. Cada gorra es seleccionada cuidadosamente para asegurar calidad y estilo, ofreciendo algo para todos los gustos y edades.
          </p>
          <p style={{color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', marginTop: '20px', textAlign: 'justify', fontWeight: "bold"}}>
            Nuestro equipo está comprometido con la comunidad de Hermosillo y trabajamos constantemente para traer las mejores tendencias a nuestra ciudad. Más que un simple negocio, somos un punto de encuentro para aquellos que valoran la autenticidad y el buen diseño. Visítanos y descubre por qué nos hemos convertido en la tienda de referencia para las gorras más exclusivas en Sonora.
          </p>
          <p style={{color: '#ffffff', fontSize: '1.5rem', lineHeight: '2', marginTop: '20px', textAlign: 'justify', fontWeight: "bold"}}>
            Ya sea que estés buscando una gorra para complementar tu outfit diario o un modelo especial para destacar en un evento, nuestro catálogo tiene algo para ti. Además, nuestro personal está siempre dispuesto a ayudarte a encontrar la gorra perfecta para tu estilo.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;