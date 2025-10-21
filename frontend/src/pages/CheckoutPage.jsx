import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@features/cart';
import { useOrders } from '@features/orders';
import { CheckoutForm } from '@features/orders';

export const CheckoutPage = () => {
  const {
    cartItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
    calculatePrices,
  } = useCart();
  
  const { placeOrder, payOrder, isLoading } = useOrders();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    calculatePrices();
  }, [cartItems, navigate]);

  // Handle Place Order (Pay Later)
  const handlePlaceOrder = async ({ shippingAddress: address, paymentMethod }) => {
    setError(null);
    saveShippingAddress(address);
    savePaymentMethod(paymentMethod);

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      })),
      shippingAddress: address,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      const result = await placeOrder(orderData);
      if (result.meta.requestStatus === 'fulfilled') {
        clearCart();
        navigate('/orders');
      } else {
        setError('Failed to place order. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Order failed. Please try again.');
    }
  };

  // Handle Pay Now (Immediate Payment)
  const handlePayNow = async ({ shippingAddress: address, paymentMethod }) => {
    setError(null);
    saveShippingAddress(address);
    savePaymentMethod(paymentMethod);

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      })),
      shippingAddress: address,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      // Step 1: Create the order
      const result = await placeOrder(orderData);
      
      if (result.meta.requestStatus === 'fulfilled') {
        const orderId = result.payload._id;
        
        // Step 2: Immediately mark it as paid
        const paymentResult = {
          id: `PAY-${Date.now()}`,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'customer@example.com',
        };
        
        await payOrder(orderId, paymentResult);
        
        // Step 3: Clear cart and redirect
        clearCart();
        navigate('/orders');
      } else {
        setError('Failed to create order. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Order failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="checkout-page">
        <h1>Checkout</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="checkout-content">
          <div className="checkout-form-section">
            <CheckoutForm
              onPlaceOrder={handlePlaceOrder}
              onPayNow={handlePayNow}
              initialAddress={shippingAddress}
              isLoading={isLoading}
            />
          </div>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item._id} className="summary-item">
                  <span>{item.name} x {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row">
                <span>Items:</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <strong>Total:</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
