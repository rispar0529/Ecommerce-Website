import { useAppDispatch, useAppSelector } from '@store/hooks';
import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  updateOrderToPaid, 
  reset 
} from '../ordersSlice';

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, order, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.orders
  );

  const placeOrder = (orderData) => {
    return dispatch(createOrder(orderData));
  };

  const fetchUserOrders = () => {
    return dispatch(getUserOrders());
  };

  const fetchOrderById = (id) => {
    return dispatch(getOrderById(id));
  };

  const payOrder = (id, paymentResult) => {
    return dispatch(updateOrderToPaid({ id, paymentResult }));
  };

  const resetOrdersState = () => {
    dispatch(reset());
  };

  return {
    orders,
    order,
    isLoading,
    isError,
    isSuccess,
    message,
    placeOrder,
    fetchUserOrders,
    fetchOrderById,
    payOrder,
    resetOrdersState,
  };
};
