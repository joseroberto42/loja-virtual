// src/pages/ProductPage.js
import React, { useState } from 'react';
import ProductList from '../../componentes/ProductList';
import ProductForm from '../../componentes/ProductForm';
import axios from 'axios';
import Navbar from '../../componentes/navbar';
const ProductPage = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setRefresh(!refresh); // Trigger a refresh of the product list
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const handleSave = () => {
    setEditingProduct(null);
    setRefresh(!refresh); // Trigger a refresh of the product list
  };

  return (
    <div>
        <Navbar></Navbar>
      <ProductForm productToEdit={editingProduct} onSave={handleSave} />
      <ProductList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductPage;

