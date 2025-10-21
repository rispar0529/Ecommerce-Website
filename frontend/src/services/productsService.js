import api from './api';

export const productsService = {
  getProducts: async () => {
    const response = await api.get('/product');
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/product', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/product/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    await api.delete(`/product/${id}`);
  },
};
