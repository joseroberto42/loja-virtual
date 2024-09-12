import React from 'react';
import axios from 'axios';

const ProductDelete = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${productId}`);
        onDelete();
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Product
    </button>
  );
};

export default ProductDelete;
