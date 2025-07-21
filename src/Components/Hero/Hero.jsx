import React from 'react';
import './Hero.css';
import handIcon from '../../assets/hand_icon.png';
import arrowIcon from '../../assets/arrow_icon.png';
import heroImage from '../../assets/p8.webp';

const Hero = () => {
  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero__container">
        {/* Text Content */}
        <div className="hero__content">
          <h2 className="hero__subtitle">Best Deals! Best Prices!</h2>
          
          <div className="hero__badge" aria-label="New collection badge">
            <p className="hero__badge-text">New</p>
            <img 
              src={handIcon} 
              alt="" 
              className="hero__badge-icon"
              width="60"
              height="60"
              aria-hidden="true"
            />
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line">Collection</span>
            <span className="hero__title-line">For Everyone</span>
          </h1>

          <button className="hero__cta" aria-label="View latest collection">
            Latest Collection
            <img 
              src={arrowIcon} 
              alt="" 
              className="hero__cta-icon"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Image */}
        <div className="hero__image-wrapper">
          <img
            src={heroImage}
            alt="Modern fashion model showcasing latest collection"
            className="hero__image"
            width="400"
            height="600"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;