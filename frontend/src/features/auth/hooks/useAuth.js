import { useAppDispatch, useAppSelector } from '@store/hooks';
import { login, register, logout, getProfile, reset } from '../authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = (credentials) => {
    return dispatch(login(credentials));
  };

  const handleRegister = (userData) => {
    return dispatch(register(userData));
  };

  const handleLogout = () => {
    return dispatch(logout());
  };

  const handleGetProfile = () => {
    return dispatch(getProfile());
  };

  const resetAuthState = () => {
    dispatch(reset());
  };

  return {
    user,
    token,
    isLoading,
    isError,
    isSuccess,
    message,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetProfile,
    resetAuthState,
    isAuthenticated: !!user && !!token,
  };
};
