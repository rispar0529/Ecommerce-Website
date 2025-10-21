import React, { useState } from 'react';
import { Button, Input } from '@components/ui';
import { PAYMENT_METHODS } from '@utils/constants';

export const CheckoutForm = ({ onPlaceOrder, onPayNow, initialAddress, isLoading }) => {
  const [shippingAddress, setShippingAddress] = useState(
    initialAddress || {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    }
  );

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [errors, setErrors] = useState({});

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingAddress.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!shippingAddress.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    }
    if (!shippingAddress.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onPlaceOrder({ shippingAddress, paymentMethod });
    }
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onPayNow({ shippingAddress, paymentMethod });
    }
  };

  return (
    <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-section">
        <h3>Shipping Address</h3>
        <div className="form-group">
          <Input
            label="Address"
            name="address"
            value={shippingAddress.address}
            onChange={handleAddressChange}
            required
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="form-group">
          <Input
            label="City"
            name="city"
            value={shippingAddress.city}
            onChange={handleAddressChange}
            required
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        <div className="form-group">
          <Input
            label="Postal Code"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleAddressChange}
            required
          />
          {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
        </div>
        <div className="form-group">
          <Input
            label="Country"
            name="country"
            value={shippingAddress.country}
            onChange={handleAddressChange}
            required
          />
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Payment Method</h3>
        <div className="payment-methods">
          {PAYMENT_METHODS.map((method) => (
            <label key={method} className="radio-label">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="checkout-actions">
        <button 
          type="button" 
          onClick={handlePlaceOrder}
          className="btn btn-secondary btn-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Place Order (Pay Later)'}
        </button>
        <button 
          type="button" 
          onClick={handlePayNow}
          className="btn btn-primary btn-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};
