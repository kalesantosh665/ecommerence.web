// src/Components/RelatedProducts/RelatedProducts.jsx
import React from "react";
import PropTypes from "prop-types";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const RelatedProducts = ({
  products = [],
  title = "Related Products",
  maxItems = 4,
}) => {
  const displayedProducts = products.slice(0, maxItems);

  return (
    <section
      className="related-products"
      aria-labelledby="related-products-heading"
    >
      <header className="related-products__header">
        <h2 id="related-products-heading" className="related-products__title">
          {title}
        </h2>
        <hr className="related-products__divider" aria-hidden="true" />
      </header>

      {displayedProducts.length > 0 ? (
        <div className="related-products__grid">
          {displayedProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      ) : (
        <p className="related-products__empty">
          No related products found.
        </p>
      )}
    </section>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      new_price: PropTypes.number.isRequired,
      old_price: PropTypes.number,
    })
  ),
  title: PropTypes.string,
  maxItems: PropTypes.number,
};

export default RelatedProducts;
