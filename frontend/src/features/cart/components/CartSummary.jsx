import React from 'react';
import { Button } from '@components/ui';

export const CartSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  onCheckout,
  itemsCount,
}) => {
  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-item">
        <span>Items ({itemsCount}):</span>
        <span>${itemsPrice.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>Shipping:</span>
        <span>${shippingPrice.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span>Tax (15%):</span>
        <span>${taxPrice.toFixed(2)}</span>
      </div>
      <div className="summary-divider"></div>
      <div className="summary-item total">
        <strong>Total:</strong>
        <strong>${totalPrice.toFixed(2)}</strong>
      </div>
      <Button onClick={onCheckout} fullWidth>
        Proceed to Checkout
      </Button>
    </div>
  );
};
