import { useAppDispatch, useAppSelector } from '@store/hooks';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  reset 
} from '../productsSlice';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, product, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.products
  );

  const fetchProducts = () => {
    return dispatch(getProducts());
  };

  const fetchProductById = (id) => {
    return dispatch(getProductById(id));
  };

  const addProduct = (productData) => {
    return dispatch(createProduct(productData));
  };

  const editProduct = (id, productData) => {
    return dispatch(updateProduct({ id, productData }));
  };

  const removeProduct = (id) => {
    return dispatch(deleteProduct(id));
  };

  const resetProductsState = () => {
    dispatch(reset());
  };

  return {
    products,
    product,
    isLoading,
    isError,
    isSuccess,
    message,
    fetchProducts,
    fetchProductById,
    addProduct,
    editProduct,
    removeProduct,
    resetProductsState,
  };
};
