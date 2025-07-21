import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.webp';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Offices', path: '/offices' },
    { label: 'Company', path: '/company' },
    { label: 'Contact', path: '/contact' }
  ];

  const socialIcons = [
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaFacebook />, url: 'https://facebook.com' },
    { icon: <FaWhatsapp />, url: 'https://whatsapp.com' }
  ];

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img 
            src={logo} 
            alt="Shopify logo" 
            className="footer__logo" 
            width="40" 
            height="40"
            loading="lazy"
          />
          <h2 className="footer__brand-name">ShopSphere</h2>
        </div>

        <nav className="footer__navigation" aria-label="Footer navigation">
          <ul className="footer__links">
            {footerLinks.map((link, index) => (
              <li key={index} className="footer__link-item">
                <a href={link.path} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          {socialIcons.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.icon.type.name} profile`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="footer__legal">
          <hr className="footer__divider" />
          <p className="footer__copyright">
            Copyright © {currentYear} - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;