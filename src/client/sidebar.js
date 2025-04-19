// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseEnter = (index) => setHoverIndex(index);
  const handleMouseLeave = () => setHoverIndex(null);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/Usuarios/usersTable", label: "Gestionar Usuarios" },
    { to: "/productsTable", label: "Gestionar Productos" },
    { to: "/tallasTable", label: "Gestionar Tallas" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Admin Panel</h2>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          style={{
            ...styles.link,
            color: hoverIndex === index ? 'white' : '#00FFFF'
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#2c2f33',
    width: '200px',
    height: '100vh',
    padding: '20px',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  heading: {
    color: '#00FFFF',
    fontSize: '1.2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  link: {
    display: 'block',
    color: '#00FFFF',
    marginBottom: '10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
};

export default Sidebar;