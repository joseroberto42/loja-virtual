import React, { useState } from 'react';
import axios from 'axios';
import './ProductEditForm.css'; // Estilização

const ProductEditForm = ({ onSave }) => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Função que carrega os dados do produto a ser editado com base no ID informado
  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/products/${productId}`);
      const product = response.data;
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
    } catch (error) {
      console.error('Product not found', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica se o ID foi informado
    if (!productId) {
      console.error('Product ID is missing.');
      return;
    }

    const updatedProduct = { name, price, description, imageUrl };

    try {
      await axios.put(`http://localhost:3005/api/products/${productId}`, updatedProduct);
      onSave(); // Chama a função de callback para notificar que o produto foi salvo
    } catch (error) {
      console.error('Failed to edit product', error);
    }
  };

  return (
    <form className="product-edit-form" onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
      <div className="form-group">
        <label>Product ID:</label>
        <input 
          type="text" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)} 
          required 
          className="input-field" 
          placeholder="Enter Product ID"
        />
        <button type="button" onClick={fetchProductById} className="fetch-btn">Load Product</button>
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="textarea-field"
        />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input 
          type="text" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          className="input-field"
        />
      </div>
      <button type="submit" className="submit-btn">Update Product</button>
    </form>
  );
};

export default ProductEditForm;

