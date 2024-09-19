import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'; // Importa a estilização

const ProductForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia o estado de carregamento
    setMessage('');

    // Validações básicas
    if (price <= 0) {
      setMessage('Price must be a positive number.');
      setLoading(false);
      return;
    }

    const productData = { name, price, description, imageUrl };

    try {
      await axios.post('http://localhost:3005/api/products', productData);
      setMessage('Product added successfully.');
      setName(''); // Limpa os campos após o envio
      setPrice('');
      setDescription('');
      setImageUrl('');
      onSave(); // Notifica o componente pai que o produto foi salvo
    } catch (error) {
      setMessage('Failed to add product. Please try again.');
      console.error('Failed to add product', error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
          disabled={loading}
          aria-describedby="name-helper"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="input-field"
          disabled={loading}
          aria-describedby="price-helper"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea-field"
          disabled={loading}
          aria-describedby="description-helper"
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="input-field"
          disabled={loading}
          aria-describedby="imageUrl-helper"
        />
      </div>
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Saving...' : 'Add Product'}
      </button>
      {message && (
        <p className={`feedback-message ${message.includes('Failed') ? 'error' : 'success'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default ProductForm;


