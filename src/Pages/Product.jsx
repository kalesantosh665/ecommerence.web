// src/Pages/Product.jsx

import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams, useNavigate } from 'react-router-dom';
import Bredcrums from '../Components/BreadCrumbs/BreadCrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/Description/Description';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const NotFound = ({ message, onBack }) => (
  <div className="not-found">
    <h2>{message || "Product not found"}</h2>
    <button onClick={onBack} style={{ marginTop: "1rem" }}>
      Back to Shop
    </button>
  </div>
);

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true);
        const found = all_product.find(
          (p) => p.id === Number(productId)
        );

        if (!found) {
          throw new Error("Product not found");
        }

        setProduct(found);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, all_product]);

  // Handle loading state
  if (loading) return <LoadingSpinner fullPage />;

  // Handle error or missing product
  if (error || !product) {
    return (
      <NotFound
        message={error || "Product not found"}
        onBack={() => navigate('/')}
      />
    );
  }

  // Filter related products
  const relatedProducts = all_product.filter(
    (p) =>
      p.category?.toLowerCase() === product.category?.toLowerCase() &&
      p.id !== product.id
  );

  return (
    <div className="product-page">
      <Bredcrums product={product} />

      <main className="product-container">
        <ProductDisplay product={product} />

        <section className="product-details-section">
          <Description product={product} />
          <RelatedProducts
            products={relatedProducts}
            title="You Might Also Like"
          />
        </section>
      </main>
    </div>
  );
};

export default Product;

