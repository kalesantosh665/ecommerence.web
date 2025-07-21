import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ id, name, image, new_price, old_price }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="product-card">
      <Link 
        to={`/product/${id}`} 
        className="product-card__link"
        onClick={handleClick}
        aria-label={`View ${name} details`}
      >
        <div className="product-card__image-container">
          <img
            src={image}
            alt={name}
            className="product-card__image"
            loading="lazy"
          />
        </div>
        
        <div className="product-card__info">
          <h3 className="product-card__name">{name}</h3>
          
          <div className="product-card__pricing">
            <span className="product-card__price product-card__price--new">
              ${new_price.toFixed(2)}
            </span>
            {old_price && (
              <span className="product-card__price product-card__price--old">
                ${old_price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Item;