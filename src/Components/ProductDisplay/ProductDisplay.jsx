import React, { useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductDisplay.css';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Safely handle missing product or image
  if (!product || !product.image) {
    return <div className="product-loading">Loading product details...</div>;
  }

  // Create image array with fallbacks
  const productImages = [
    product.image,
    product.image_secondary || product.image,
    product.image_tertiary || product.image,
    product.image_quaternary || product.image
  ].filter(Boolean); // Remove any undefined values

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const rating = product.rating || 4.2;
  const reviewCount = product.review_count || 130;

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product.id, quantity, selectedSize);
  };

  // Safely format prices
  const formatPrice = (price) => {
    return price ? `$${price.toFixed(2)}` : '$0.00';
  };

  return (
    <section className="product-display" aria-label="Product details">
      <div className="product-display__gallery">
        <div className="product-display__thumbnails">
          {productImages.map((img, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img 
                src={img} 
                alt={`${product.name || 'Product'} thumbnail ${index + 1}`} 
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </button>
          ))}
        </div>

        <div className="product-display__main-image">
          <button 
            className="nav-button prev"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          
          <img
            src={productImages[currentImageIndex]}
            alt={product.name || 'Product'}
            className="main-image"
            loading="eager"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          
          <button 
            className="nav-button next"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="product-display__details">
        <h1 className="product-title">{product.name || 'Product Name'}</h1>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              i < Math.floor(rating) ? 
                <FaStar key={i} className="star-filled" /> : 
                <FaRegStar key={i} className="star-empty" />
            ))}
          </div>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>

        <div className="product-pricing">
          <span className="current-price">{formatPrice(product.new_price)}</span>
          {product.old_price && (
            <span className="original-price">{formatPrice(product.old_price)}</span>
          )}
        </div>

        <p className="product-description">
          {product.description || 'No description available.'}
        </p>

        <div className="size-selection">
          <h2>Select Size</h2>
          <div className="size-options">
            {sizes.map(size => (
              <button
                key={size}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="quantity-selector">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
          />
        </div>

        <button 
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          ADD TO CART
        </button>

        <div className="product-meta">
          <div className="meta-item">
            <span className="meta-label">Category:</span>
            <span className="meta-value">{product.category || 'Uncategorized'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Tags:</span>
            <span className="meta-value">
              {product.tags || 'Modern, Latest'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;