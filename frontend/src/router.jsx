import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '@components';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ProductsPage,
  ProductDetailPage,
  CreateProductPage,
  MyProductsPage, 
  CartPage,
  CheckoutPage,
  OrdersPage,
  OrderDetailPage,
} from '@pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/create"
        element={
          <PrivateRoute>
            <CreateProductPage />
          </PrivateRoute>
        }
      />
      {
      <Route
        path="/products/my-products"
        element={
          <PrivateRoute>
            <MyProductsPage />
          </PrivateRoute>
        }
      />
      }
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <PrivateRoute>
            <OrderDetailPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
