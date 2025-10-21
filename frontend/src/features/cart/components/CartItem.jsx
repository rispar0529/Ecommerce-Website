import React from 'react';
import { Button } from '@components/ui';

export const CartItem = ({ item, onRemove, onUpdateQty }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="item-info">
        <h4>{item.name}</h4>
        <p className="price">${item.price}</p>
        <div className="quantity-controls">
          <label>Quantity:</label>
          <select
            value={item.qty}
            onChange={(e) => onUpdateQty(item._id, Number(e.target.value))}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
        <p className="subtotal">Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
      </div>
      <Button onClick={() => onRemove(item._id)} variant="danger">
        Remove
      </Button>
    </div>
  );
};
