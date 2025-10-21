import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@features/products';
import { ProductGrid } from '@features/products';
import { useAuth } from '@features/auth';
import { Spinner } from '@components/ui';
import './MyProductsPage.css';

export const MyProductsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, isLoading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const myProducts = products.filter(
    (product) => product.user === user?._id || product.user?._id === user?._id
  );

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-products-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Products</h1>
            <p className="page-subtitle">Manage your product listings</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/products/create')}>
            + Add New Product
          </button>
        </div>

        {myProducts && myProducts.length > 0 ? (
          <ProductGrid products={myProducts} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No Products Yet</h3>
            <p>You haven't created any products yet. Start selling by adding your first product!</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products/create')}>
              Create First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
