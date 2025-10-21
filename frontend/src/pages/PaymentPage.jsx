import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '@features/orders';
import './PaymentPage.css';

export const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchOrderById, payOrder, order, isLoading } = useOrders();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substr(0, 5);
    }

    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const paymentResult = {
      id: `PAY-${Date.now()}`,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: 'payer@example.com',
    };

    try {
      const result = await payOrder(id, paymentResult);
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(`/orders/${id}`);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
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
    <div className="payment-page">
      <div className="container">
        <div className="payment-grid">
          {/* Payment Form */}
          <div className="payment-form-section">
            <div className="section-header">
              <h1>Complete Payment</h1>
              <p>Secure checkout for order #{order._id?.slice(-8)}</p>
            </div>

            <form onSubmit={handlePayment} className="payment-form">
              {/* Payment Method Selection */}
              <div className="payment-methods">
                <h3>Payment Method</h3>
                <div className="method-options">
                  <label className={`method-option ${paymentMethod === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="method-icon">💳</span>
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className={`method-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="method-icon">🅿️</span>
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="form-control"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={handleChange}
                      maxLength="19"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardHolder">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      className="form-control"
                      placeholder="John Doe"
                      value={paymentDetails.cardHolder}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        className="form-control"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={handleChange}
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className="form-control"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={handleChange}
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-alert">
                  <span>⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-full payment-submit"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="spinner-small"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    🔒 Pay ${order.totalPrice?.toFixed(2)}
                  </>
                )}
              </button>

              <div className="security-badges">
                <span>🔒 Secure Payment</span>
                <span>✅ SSL Encrypted</span>
                <span>🛡️ PCI Compliant</span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-section">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {order.orderItems?.map((item) => (
                  <div key={item._id} className="summary-item-row">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.qty}</p>
                    </div>
                    <p className="item-price">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
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

              <div className="shipping-info">
                <h4>Shipping Address</h4>
                <p>{order.shippingAddress?.address}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
