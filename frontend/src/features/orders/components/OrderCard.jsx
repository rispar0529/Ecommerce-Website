import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@utils/helpers';
import { Card } from '@components/ui';

export const OrderCard = ({ order }) => {
  return (
    <Card className="order-card">
      <div className="order-header">
        <h3>Order #{order._id.slice(-8)}</h3>
        <span className="order-date">{formatDate(order.createdAt)}</span>
      </div>
      <div className="order-body">
        <p><strong>Items:</strong> {order.orderItems.length}</p>
        <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p>
          <strong>Payment:</strong>{' '}
          <span className={order.isPaid ? 'status-paid' : 'status-unpaid'}>
            {order.isPaid ? `Paid on ${formatDate(order.paidAt)}` : 'Not Paid'}
          </span>
        </p>
        <p>
          <strong>Delivery:</strong>{' '}
          <span className={order.isDelivered ? 'status-delivered' : 'status-pending'}>
            {order.isDelivered ? `Delivered on ${formatDate(order.deliveredAt)}` : 'Pending'}
          </span>
        </p>
      </div>
      <div className="order-footer">
        <Link to={`/orders/${order._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </Card>
  );
};
