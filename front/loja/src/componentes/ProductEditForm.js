import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductEditForm = ({ productToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
      setImageUrl(productToEdit.imageUrl);
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = { name, price, description, imageUrl };

    try {
      await axios.put(`http://localhost:3003/api/products/${productToEdit.id}`, updatedProduct);
      onSave();
    } catch (error) {
      console.error('Failed to edit product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default ProductEditForm;
