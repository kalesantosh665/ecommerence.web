// src/Pages/ShopCategory.jsx
import React, { useContext, useState, useMemo } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import Dropdown from "../Components/Dropdown/Dropdown";
import "../CSS/ShopCategory.css";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
];

const ShopCategory = ({ banner, category, title }) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState("default");
  const [visibleItems, setVisibleItems] = useState(12);

  // 🧠 Filter + sort logic with memoization
  const filteredProducts = useMemo(() => {
    const categoryProducts = all_product.filter((item) => item.category === category);

    switch (sortOption) {
      case "price-low":
        return [...categoryProducts].sort((a, b) => a.new_price - b.new_price);
      case "price-high":
        return [...categoryProducts].sort((a, b) => b.new_price - a.new_price);
      case "newest":
        return [...categoryProducts].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      default:
        return categoryProducts;
    }
  }, [all_product, category, sortOption]);

  const visibleProducts = filteredProducts.slice(0, visibleItems);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 12);
  };

  return (
    <section className="shop-category" aria-labelledby="category-heading">
      <img
        className="shop-category__banner"
        src={banner}
        alt={`${title} collection banner`}
        loading="lazy"
      />

      <div className="shop-category__header">
        <h1 id="category-heading" className="shop-category__title">
          {title}
        </h1>

        <div className="shop-category__controls">
          <p className="shop-category__count">
            Showing{" "}
            <span>
              1-{Math.min(visibleItems, filteredProducts.length)}
            </span>{" "}
            of {filteredProducts.length} products
          </p>

          <Dropdown
            options={SORT_OPTIONS}
            value={sortOption}
            onChange={setSortOption}
            aria-label="Sort products"
          />
        </div>
      </div>

      <div className="shop-category__products">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p className="shop-category__empty">
            No products found in this category.
          </p>
        )}
      </div>

      {visibleItems < filteredProducts.length && (
        <button
          className="shop-category__load-more"
          onClick={handleLoadMore}
          aria-label="Load more products"
        >
          Explore More
        </button>
      )}
    </section>
  );
};

export default ShopCategory;
