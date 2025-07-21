import React from 'react';
import './Offers.css';
import exclusiveImage from '../../assets/exclu.webp';

const Offers = () => {
  return (
    <section className="offers" aria-label="Exclusive offers section">
      <div className="offers__container">
        <div className="offers__content">
          <h1 className="offers__heading">
            <span className="offers__heading-line">Exclusive</span>
            <span className="offers__heading-line">Offers For You</span>
          </h1>
          <p className="offers__subheading">ONLY ON BEST SELLERS PRODUCTS</p>
          <button className="offers__cta" aria-label="Check exclusive offers">
            Check Now
          </button>
        </div>
        
        <div className="offers__image-wrapper">
          <img
            src={exclusiveImage}
            alt="Exclusive products collection"
            className="offers__image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Offers;