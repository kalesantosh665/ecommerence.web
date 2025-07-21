import React, { useState } from 'react';
import './Description.css';

const Description = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const reviewCount = product?.reviews?.length || 135;

  const descriptionContent = product?.description || `
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium reiciendis 
    exercitationem amet totam nisi ullam cumque fugit magnam laudantium. Quis eos quam 
    alias nisi explicabo ut, itaque qui fuga officiis.
    
    Maxime labore in molestiae, debitis vel, rem modi repudiandae ullam ipsam delectus 
    dolores quibusdam reiciendis, hic temporibus beatae at aut possimus reprehenderit. 
    Adipisci aut corporis iusto, excepturi quidem possimus omnis?
  `;

  const featuresContent = product?.features || `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed doloremque facilis 
    neque non nihil quam veritatis a. Ratione dolore debitis quia possimus natus quo 
    consequatur exercitationem quae unde, laboriosam iure!
  `;

  return (
    <section className="product-description" aria-label="Product details">
      <div className="description-tabs">
        <button
          className={`description-tab ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
          aria-selected={activeTab === 'description'}
          aria-controls="description-panel"
        >
          Description
        </button>
        <button
          className={`description-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
          aria-selected={activeTab === 'reviews'}
          aria-controls="reviews-panel"
        >
          Reviews ({reviewCount})
        </button>
      </div>

      <div className="description-content">
        {activeTab === 'description' && (
          <div id="description-panel" aria-labelledby="description-tab">
            <div className="description-text">
              {descriptionContent.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="product-features">
              <h3>Key Features</h3>
              {featuresContent.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div id="reviews-panel" aria-labelledby="reviews-tab">
            <p className="reviews-coming-soon">
              Product reviews will be displayed here. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Description;