import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Arquivo CSS para estilizar a Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Loja Online</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
          
        </li>
        <li>
        <Link to="/produtos">Produtos</Link>
          
        </li>
        <li>
        <Link to="/sobre">Sobre</Link>

        </li>
        <li>
        <Link to="/carrinho">Carrinho</Link>
          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
