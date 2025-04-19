import React, { useState, useEffect } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import HomePage from './homepage';
import Shop from './shop';
import ChatModal from './chatModal';
import About from './about';
import Contact from './contact';
import Product from './product';
import CartModal from './cartModal';
import SearchResults from './SearchResults'; // Importamos la vista de resultados de búsqueda
import ProductsTable from './productsTable';
import TallasTable from './tallasTable';
import Register from './Register';
import Login from './Login';
import UsersTable from './Usuarios/usersTable';
import Checkout from './checkout';
import Dashboard from './dashboard';

const App = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      console.log('Usuario autenticado al cargar la aplicación');
    } else {
      console.log('Usuario no autenticado al cargar la aplicación');
    }
  }, []);

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // navigate('/'); // Asegúrate de que esta línea esté comentada o eliminada
  };

  return (
    <Router>
      <div className="container" style={{ margin: 0, padding: 0, height: '100vh', backgroundColor: '#000' }}>
        <Navbar
          className="navbar"
          toggleCartModal={toggleCartModal}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/producto/:id_producto" element={<Product />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout isAuthenticated={isAuthenticated} />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/productsTable" element={<ProductsTable />} />
            <Route path="/tallasTable" element={<TallasTable />} />
            <Route path="/Usuarios/usersTable" element={<UsersTable />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <ChatModal />
        <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
        {/* Ya no usamos UserModal aquí */}
      </div>
    </Router>
  );
};

export default App;
