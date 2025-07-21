import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './Navbar.css';
import logo from '../../assets/logo.webp';
import cart_icon from '../../assets/cart_icon.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { pathname } = useLocation();
  const { getTotalCartItems } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeMenu = () => {
    if (pathname === '/') return 'home';
    if (pathname.includes('/mens')) return 'mens';
    if (pathname.includes('/womens')) return 'womens';
    if (pathname.includes('/kids')) return 'kids';
    return '';
  };

  const menuItems = [
    { id: 'home', path: '/', label: 'Home' },
    { id: 'mens', path: '/mens', label: 'Men' },
    { id: 'womens', path: '/womens', label: 'Women' },
    { id: 'kids', path: '/kids', label: 'Kids' },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Shopify Logo" />
        <p>ShopSphere</p>
      </div>

      <div className="navbar__hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      <ul className={`navbar__menu ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className={`navbar__link ${activeMenu() === item.id ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <Link to="/login" className="navbar__login-btn">
          Login
        </Link>
        <div className="navbar__cart">
          <Link to="/cart">
            <img src={cart_icon} alt="Cart" />
            {getTotalCartItems() > 0 && (
              <span className="navbar__cart-count">{getTotalCartItems()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
