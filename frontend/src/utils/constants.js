export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Other'
];

export const PAYMENT_METHODS = [
  'PayPal',
  'Credit Card',
  'Debit Card',
  'Cash on Delivery'
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};
