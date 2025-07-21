import React from 'react';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import './Breadcrumbs.css';

const Breadcrumbs = ({ product }) => {
  const crumbs = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: `/shop/${product.category}`, label: product.category },
    { label: product.name } // Current page (no link)
  ];

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {crumbs.map((crumb, index) => (
          <li key={index} className="breadcrumbs__item">
            {index < crumbs.length - 1 ? (
              <>
                <Link to={crumb.path} className="breadcrumbs__link">
                  {crumb.label}
                </Link>
                <HiChevronRight className="breadcrumbs__separator" />
              </>
            ) : (
              <span className="breadcrumbs__current" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
