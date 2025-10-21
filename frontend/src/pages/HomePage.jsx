import React, { useEffect } from 'react';
import { useProducts } from '@features/products';
import { useCart } from '@features/cart';
import { ProductGrid } from '@features/products';
import { Spinner } from '@components/ui';
import './HomePage.css';

export const HomePage = () => {
  const { products, isLoading, fetchProducts } = useProducts();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, qty: 1 });
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing Products
              <span className="hero-gradient">at Unbeatable Prices</span>
            </h1>
            <p className="hero-description">
              Shop the latest trends with confidence. Quality products, fast shipping, and excellent customer service.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{products.length}+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <div className="section-divider"></div>
          </div>
          
          {products && products.length > 0 ? (
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No Products Available</h3>
              <p>Check back soon for amazing deals!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
