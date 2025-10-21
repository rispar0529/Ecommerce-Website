import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartItemQty as updateCartItemQtyAction,
  saveShippingAddress as saveShippingAddressAction,
  savePaymentMethod as savePaymentMethodAction,
  clearCart as clearCartAction,
  calculatePrices as calculatePricesAction,
} from '../cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const addToCart = (item) => {
    dispatch(addToCartAction(item));
    dispatch(calculatePricesAction());
  };

  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id));
    dispatch(calculatePricesAction());
  };

  const updateCartItemQty = (id, qty) => {
    dispatch(updateCartItemQtyAction({ id, qty }));
    dispatch(calculatePricesAction());
  };

  const saveShippingAddress = (address) => {
    dispatch(saveShippingAddressAction(address));
  };

  const savePaymentMethod = (method) => {
    dispatch(savePaymentMethodAction(method));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
    dispatch(calculatePricesAction());
  };

  const calculatePrices = () => {
    dispatch(calculatePricesAction());
  };

  return {
    ...cart,
    addToCart,
    removeFromCart,
    updateCartItemQty,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
    calculatePrices,
  };
};
