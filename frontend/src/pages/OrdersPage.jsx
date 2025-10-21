import React, { useEffect } from 'react';
import { useOrders } from '@features/orders';
import { OrderCard } from '@features/orders';
import { Spinner } from '@components/ui';
import { useNavigate } from 'react-router-dom';
import './OrdersPage.css';

export const OrdersPage = () => {
  const { orders, isLoading, fetchUserOrders } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Orders</h1>
            <p className="page-subtitle">Track and manage all your orders</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>

        {orders && orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div 
                key={order._id} 
                className="order-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
