import React from 'react';
import PropTypes from 'prop-types';
import './NewCollections.css';
import Item from '../Item/Item';
import new_collections from '../../assets/NewCollections';

const NewCollections = ({ collections = new_collections, title = "NEW COLLECTIONS" }) => {
  return (
    <section className="new-collections" aria-labelledby="new-collections-heading">
      <div className="new-collections__header">
        <h1 id="new-collections-heading" className="new-collections__title">
          
          {title.toUpperCase()}
        </h1>
        <div className="new-collections__divider" aria-hidden="true"></div>
      </div>
      
      <div className="new-collections__grid">
        {collections.map((item) => (
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

NewCollections.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      new_price: PropTypes.number.isRequired,
      old_price: PropTypes.number,
    })
  ).isRequired,
  title: PropTypes.string
};

export default NewCollections;