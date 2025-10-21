import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '@features/products';
import { useProducts } from '@features/products';

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const { addProduct, isLoading } = useProducts();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setError(null);
    
    try {
      const result = await addProduct(formData);
      
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(`/products/${result.payload._id}`);
      } else {
        setError(result.payload || 'Failed to create product');
      }
    } catch (err) {
      setError(err.message || 'Failed to create product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p className="text-gray-600 mt-2">Add a new product to your inventory</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <ProductForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading}
      />
    </div>
  );
};
