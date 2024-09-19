import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './ProductDelete.css'; // Importa o arquivo CSS

const ProductDelete = ({ onDelete }) => {
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const [success, setSuccess] = useState(false); // Estado para armazenar mensagens de sucesso

  const handleDelete = async () => {
    if (!productId) {
      setError('Product ID cannot be empty.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      setError(null); // Limpa mensagens de erro anteriores
      setSuccess(false); // Limpa mensagem de sucesso anterior
      try {
        await axios.delete(`http://localhost:3005/api/products/${productId}`);
        onDelete();
        setProductId('');
        setSuccess(true); // Define sucesso após exclusão
      } catch (error) {
        console.error('Failed to delete product', error);
        setError('Failed to delete the product. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="product-delete-container">
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID"
        aria-label="Product ID"
      />
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Product'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Product deleted successfully!</p>}
    </div>
  );
};

// Define as prop types
ProductDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default ProductDelete;
