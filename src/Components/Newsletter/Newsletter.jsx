import React, { useState } from 'react';
import '../NewsLetter/Newsletter.css';


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Subscribed with:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="newsletter" aria-label="Newsletter subscription">
      <div className="newsletter__container">
        <h1 className="newsletter__title">Get Exclusive Offers on Your Email</h1>
        <p className="newsletter__description">Subscribe to our newsletter and stay updated</p>
        
        {isSubscribed ? (
          <div className="newsletter__success">
            Thank you for subscribing! Check your email for confirmation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter__form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email address"
              className="newsletter__input"
              required
              aria-label="Email address"
            />
            <button type="submit" className="newsletter__button">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;