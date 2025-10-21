import api from './api';

export const ordersService = {
  createOrder: async (orderData) => {
    const response = await api.post('/order', orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/order/myorders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/order/${id}`);
    return response.data;
  },

  updateOrderToPaid: async (id, paymentResult) => {
    const response = await api.put(`/order/${id}/pay`, paymentResult);
    return response.data;
  },
};
