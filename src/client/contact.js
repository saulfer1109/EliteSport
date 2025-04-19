import React from 'react';
import './App.css';
import Navbar from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container" style={{ padding: '80px', backgroundColor: '#000', color: '#fff', fontFamily: 'Oswald', minHeight: '100vh', width: '100vw' }}>
        <div className="contact-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{color: '#36fff1', fontSize: '3rem', marginBottom: '30px', textAlign: 'center' }}>CONTÁCTANOS</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', fontSize: '1.5rem', lineHeight: '2' }}>
            <div>
              <FontAwesomeIcon icon={faInstagram} style={{ color: '#36fff1', marginRight: '10px' }} />
              <a href="https://www.instagram.com/punto_y_comahmo/?g=5" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Instagram</a>
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: '#36fff1', marginRight: '10px' }} />
              <span style={{ fontWeight: 'bold' }}>tophypestore@gmail.com</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} style={{ color: '#36fff1', marginRight: '10px' }} />
              <span style={{ fontWeight: 'bold' }}>662 155 6724</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faBook} style={{ color: '#36fff1', marginRight: '10px' }} />
              <a href="https://www.canva.com/design/DAGGF0UqPqc/a2bC_ouNP-KccXazDiLFfA/view?utm_content=DAGGF0UqPqc&utm_campaign=designshare&utm_medium=link&utm_source=editor&fbclid=PAZXh0bgNhZW0CMTEAAaYEViiWHekkqUhUnq6ZffCVk8Hv3ZRQwh3b1O8bRVUp0P-F_QNFrPVIZJs_aem_PHGCPF62WESXM0tu_X8zMA" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo Completo</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
