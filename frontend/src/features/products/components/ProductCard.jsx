import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@components/ui';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <Link to={`/products/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="description">{product.description}</p>
        <div className="product-footer">
          <span className="price">${product.price}</span>
          <Button
            onClick={() => onAddToCart?.(product)}
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
