import React from 'react';
import PropTypes from 'prop-types';
import './Popular.css';
import Item from '../Item/Item';
import data_product from '../../assets/data.js';

const Popular = ({ category = "WOMEN", items = data_product }) => {
  return (
    <section className="popular" aria-labelledby="popular-heading">
      <div className="popular__header">
        <h1 id="popular-heading" className="popular__title">
          POPULAR IN {category.toUpperCase()}
        </h1>
        <div className="popular__divider" aria-hidden="true"></div>
      </div>
      
      <div className="popular__items">
        {items.map((item) => (
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
    </section>
  );
};

Popular.propTypes = {
  category: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      new_price: PropTypes.number.isRequired,
      old_price: PropTypes.number,
    })
  ),
};

Popular.defaultProps = {
  category: "WOMEN",
  items: data_product
};

export default Popular;