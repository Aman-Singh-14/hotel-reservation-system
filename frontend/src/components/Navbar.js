import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a CSS file for Navbar styling

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Staff Menu</Link></li>
        <li><Link to="/hotel-menu">Hotel Menu</Link></li>
        <li><Link to="/client-menu">Client Menu</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
