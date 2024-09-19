import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductCard.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Chamando a API para pegar os produtos
    fetch('http://localhost:3005/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>Carregando produtos...</p>
      )}
    </div>
  );
};

export default ProductList;
