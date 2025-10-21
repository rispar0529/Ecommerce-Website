import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '@features/orders';
import { Spinner, Button } from '@components/ui';
import { formatDate } from '@utils/helpers';
import './OrderDetailPage.css';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, isLoading, fetchOrderById, payOrder } = useOrders();

  useEffect(() => {
    if (id) {
      fetchOrderById(id);
    }
  }, [id]);

  const handlePayment = () => {
    navigate(`/payment/${id}`);
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">❌</div>
          <h3>Order Not Found</h3>
          <p>The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate('/orders')}>
          ← Back to Orders
        </button>

        <div className="order-header">
          <div>
            <h1>Order Details</h1>
            <p className="order-id">Order #{order._id?.slice(-8)}</p>
          </div>
          <div className="order-status-badge">
            <span className={`status ${order.isPaid ? 'paid' : 'pending'}`}>
              {order.isPaid ? '✓ Paid' : '⏳ Pending Payment'}
            </span>
            <span className={`status ${order.isDelivered ? 'delivered' : 'processing'}`}>
              {order.isDelivered ? '✓ Delivered' : '📦 Processing'}
            </span>
          </div>
        </div>

        <div className="order-detail-grid">
          {/* Order Items */}
          <div className="order-section">
            <div className="section-card">
              <h3 className="section-title">Order Items</h3>
              <div className="order-items-list">
                {order.orderItems?.map((item) => (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="item-meta">Qty: {item.qty} × ${item.price}</p>
                    </div>
                    <div className="item-total">
                      ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-card">
              <h3 className="section-title">Shipping Address</h3>
              <div className="address-info">
                <p>{order.shippingAddress?.address}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="section-card">
              <h3 className="section-title">Payment Method</h3>
              <div className="payment-info">
                <div className="payment-method-badge">
                  💳 {order.paymentMethod}
                </div>
                <div className={`payment-status ${order.isPaid ? 'paid' : 'unpaid'}`}>
                  {order.isPaid ? (
                    <>
                      <span className="status-icon">✓</span>
                      Paid on {formatDate(order.paidAt)}
                    </>
                  ) : (
                    <>
                      <span className="status-icon">⏳</span>
                      Not Paid
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary-sidebar">
            <div className="summary-card sticky">
              <h3>Order Summary</h3>
              
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Items</span>
                  <span>${order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${order.shippingPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${order.taxPrice?.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>

              {!order.isPaid && (
                <Button onClick={handlePayment} className="btn-primary btn-lg btn-full">
                  Proceed to Payment
                </Button>
              )}

              <div className="order-timeline">
                <div className={`timeline-item ${order.createdAt ? 'completed' : ''}`}>
                  <div className="timeline-icon">📝</div>
                  <div className="timeline-content">
                    <strong>Order Placed</strong>
                    <p>{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                
                <div className={`timeline-item ${order.isPaid ? 'completed' : ''}`}>
                  <div className="timeline-icon">💳</div>
                  <div className="timeline-content">
                    <strong>Payment</strong>
                    <p>{order.isPaid ? formatDate(order.paidAt) : 'Pending'}</p>
                  </div>
                </div>
                
                <div className={`timeline-item ${order.isDelivered ? 'completed' : ''}`}>
                  <div className="timeline-icon">🚚</div>
                  <div className="timeline-content">
                    <strong>Delivery</strong>
                    <p>{order.isDelivered ? formatDate(order.deliveredAt) : 'Processing'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
