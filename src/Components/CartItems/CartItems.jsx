import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import './CartItems.css';

const CartItems = () => {
  const { 
    all_product, 
    cartItems, 
    addToCart,
    removeFromCart,
    decreaseCartQuantity,
    getTotalCartAmount,
  } = useContext(ShopContext);
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setMessage('Please enter a promo code');
      return;
    }

    const code = promoCode.toUpperCase();
    if (code === 'DISCOUNT10') {
      const discountAmount = getTotalCartAmount() * 0.1;
      setDiscount(discountAmount);
      setMessage(`10% discount applied! Saved $${discountAmount.toFixed(2)}`);
    } else if (code === 'FREESHIP') {
      setMessage('Free shipping applied!');
    } else {
      setMessage('Invalid promo code');
    }
  };

  const handleAddToCart = (productId) => {
    addToCart(productId);
    const product = all_product.find(p => p.id === productId);
    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(''), 3000);
  };

  const grandTotal = Math.max(0, getTotalCartAmount() - discount);
  const hasItems = Object.values(cartItems).some(quantity => quantity > 0);

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      
      {message && <div className="cart-message">{message}</div>}

      {!hasItems ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/shop" className="continue-shopping">Continue Shopping</a>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
            <div>Actions</div>
          </div>

          <div className="cart-items">
            {all_product.map((product) => (
              cartItems[product.id] > 0 && (
                <div key={product.id} className="cart-item">
                  <div className="product-info">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                    </div>
                  </div>
                  <div className="price">${product.new_price.toFixed(2)}</div>
                  <div className="quantity">
                    <button onClick={() => decreaseCartQuantity(product.id)}>
                      <FiMinus />
                    </button>
                    <span>{cartItems[product.id]}</span>
                    <button onClick={() => handleAddToCart(product.id)}>
                      <FiPlus />
                    </button>
                  </div>
                  <div className="subtotal">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-totals">
              <h2>Cart Summary</h2>
              <div className="total-row">
                <span>Subtotal</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              {discount > 0 && (
                <div className="total-row discount">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="promo-code">
              <h3>Promo Code</h3>
              <p>Enter your promo code if you have one</p>
              <div className="promo-input">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  onKeyPress={(e) => e.key === 'Enter' && applyPromoCode()}
                />
                <button onClick={applyPromoCode}>APPLY</button>
              </div>
              <div className="promo-examples">
                <p>Try these promo codes:</p>
                <ul>
                  <li>DISCOUNT10 - 10% off</li>
                  <li>FREESHIP - Free shipping</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;