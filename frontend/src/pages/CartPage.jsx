import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@features/cart';
import { CartItem, CartSummary } from '@features/cart';
import { Button } from '@components/ui';

export const CartPage = () => {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    removeFromCart,
    updateCartItemQty,
    calculatePrices,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    calculatePrices();
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQty={updateCartItemQty}
            />
          ))}
        </div>
        <CartSummary
          itemsPrice={itemsPrice}
          shippingPrice={shippingPrice}
          taxPrice={taxPrice}
          totalPrice={totalPrice}
          itemsCount={cartItems.reduce((acc, item) => acc + item.qty, 0)}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};
