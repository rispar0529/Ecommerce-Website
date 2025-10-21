import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};
