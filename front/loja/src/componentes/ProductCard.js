import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-list">
            <div className="product-card">
                
                <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-price">${product.price}</p>
            
            </div>
        </div>

    </div>

    
  );
};

export default ProductCard;
