import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from './cartModal';
import UserModal from './userModal';

const Navbar = ({
  isAuthenticated,
  handleLogout,
  setIsAuthenticated,
}) => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  const toggleUserModal = () => {
    setUserModalOpen(!isUserModalOpen);
  };

  // Búsqueda en el catálogo
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/productos/buscar?search=${searchTerm}`);
      const data = await response.json();
      navigate('/search', { state: { searchResults: data } });
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Top Hype Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/shop">SHOP</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/productsTable">ADMIN</Link></li>
        </ul>
        <div className="search-cart-container">
          <form onSubmit={handleSearch}>
            <div className="search-box">
              <button type="submit" className="btn-search">
                <span className="material-icons">search</span>
              </button>
              <input
                type="text"
                className="input-search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <span className="material-icons shopping-cart" onClick={toggleCartModal}>shopping_cart</span>
          <span className="material-symbols-outlined account-icon" onClick={toggleUserModal}>account_circle</span>
        </div>
      </nav>
      <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
      <UserModal
        isOpen={isUserModalOpen}
        onClose={toggleUserModal}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;
