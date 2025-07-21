// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import { ShopContextProvider } from "./Context/ShopContext"; // ✅ Add provider

import men_banner from "./assets/banner.jpg";
import women_banner from "./assets/women_banner.avif";
import kids_banner from "./assets/kids_banner.jpg";

// ✅ Lazy-loaded pages
const Shop = lazy(() => import("./Pages/Shop"));
const ShopCategory = lazy(() => import("./Pages/ShopCategory"));
const Product = lazy(() => import("./Pages/Product"));
const Cart = lazy(() => import("./Pages/Cart"));
const LoginSignup = lazy(() => import("./Pages/LoginSignup"));

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner fullPage />}>
              <Routes>
                <Route path="/" element={<Shop />} />

                <Route 
                  path="/mens" 
                  element={
                    <ShopCategory 
                      banner={men_banner} 
                      category="men" 
                      title="Men's Collection" 
                    />
                  } 
                />
                <Route 
                  path="/womens" 
                  element={
                    <ShopCategory 
                      banner={women_banner} 
                      category="women" 
                      title="Women's Collection" 
                    />
                  } 
                />
                <Route 
                  path="/kids" 
                  element={
                    <ShopCategory 
                      banner={kids_banner} 
                      category="kid" 
                      title="Kids' Collection" 
                    />
                  } 
                />

                <Route path="/product" element={<Product />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<LoginSignup />} />

                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

// ✅ Simple NotFound page
const NotFound = () => (
  <div className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

export default App;
