// src/Context/ShopContext.jsx
import React, { createContext, useState } from "react";
import all_product from "../assets/all_product";


// ✅ Named export
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

// ✅ Named and default export for provider
export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const decreaseCartQuantity = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] <= 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
  };

  const getTotalCartAmount = () => {
    return all_product.reduce((total, product) => {
      return total + (product.new_price * (cartItems[product.id] || 0));
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    decreaseCartQuantity,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

// ✅ Default export remains for flexibility
export default ShopContextProvider;
