import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@features/products';
import { useCart } from '@features/cart';
import { Button, Spinner } from '@components/ui';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, isLoading, fetchProductById } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, qty });
      navigate('/cart');
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Product Not Found</h3>
          <p>The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-detail-grid">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.image} 
                alt={product.name}
                className="gallery-image"
              />
              <div className="image-badge">New</div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-meta">
              <span className="product-brand">{product.brand}</span>
              <span className="product-category">{product.category}</span>
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < Math.floor(product.rating) ? 'star filled' : 'star'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.numReviews} reviews)
              </span>
            </div>

            <div className="product-price-section">
              <div className="price-wrapper">
                <span className="current-price">${product.price}</span>
                <span className="original-price">${(product.price * 1.3).toFixed(2)}</span>
                <span className="discount-badge">30% OFF</span>
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-specs">
              <div className="spec-item">
                <span className="spec-label">Stock Status</span>
                <span className={`spec-value ${product.countInStock > 0 ? 'in-stock' : 'out-stock'}`}>
                  {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {product.countInStock > 0 && (
              <div className="quantity-selector">
                <label htmlFor="qty">Quantity:</label>
                <div className="qty-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                  >
                    −
                  </button>
                  <input
                    id="qty"
                    type="number"
                    min="1"
                    max={product.countInStock}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Math.min(product.countInStock, parseInt(e.target.value) || 1)))}
                    className="qty-input"
                  />
                  <button 
                    className="qty-btn"
                    onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                    disabled={qty >= product.countInStock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="product-actions">
              <Button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="btn-primary btn-lg btn-full"
              >
                {product.countInStock === 0 ? '🔒 Out of Stock' : '🛒 Add to Cart'}
              </Button>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <span className="feature-icon">🚚</span>
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
